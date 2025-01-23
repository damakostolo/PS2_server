const {Game , GameInfo, Genre, Language} = require("../../models/models")
const FileService = require("../service/fileService")
const gameInfoController = require("./gameInfoController")
const {Op} = require("sequelize")

class GameController{

    async create(req,res ,next){ // Корочу создаём "игру" и сохраняем её надо запелить ещё наверное провер но она уже есть на уровне бд
        //Тут возможна хуйня
        try {
            const {name, year, genreId, languageId, linkGame, description} = req.body;
            const {img, imgGame} = req.files;

            const fileName = await FileService.uploadFile(img) // обращаемся к сервис и он делает всё что надо сохраняет фото и возвращает название
            const game = await Game.create({name, year, img: fileName})// Тут создаём игру

            // Додавання жанрів
            const genres = await Genre.findAll({ where: { id: genreId.split(',').map(Number) } }); // Припустимо, жанри з id 1, 2, 3
            await game.addGenres(genres);
            
            // Додавання мов
            const languages = await Language.findAll({ where: { id: languageId.split(',').map(Number) } }); // Мови з id 1 і 4
            await game.addLanguages(languages);
            
            const gameInfo = await gameInfoController.createInfo(imgGame, linkGame , description , game, next) // вынес логику создания инфы в соседный фаил

            return res.status(200).json({game , gameInfo});
        }catch (err){
            next(err)
        }

    }

    async delete(req,res, next){
        try {
            const {id} = req.params;
            const gameDel = await Game.destroy({where: {id}})
            const gameInfoDel = await GameInfo.destroy({where: {gameId: id}}) // тут надо проверить
            res.status(200).json({gameDel, gameInfoDel})
        } catch (err) {
            next(err)
        }
    }

    async update(req,res, next){
        try {
            const {id} = req.params;

            const {name, year, genreId, developerId, languageId, linkGame, description} = req.body;
            const {img, imgGame} = req.files;

            if(linkGame || description || imgGame){
                // тут будет импорт из класс файла где я буду тскать игру по айди и находить связаную с ней игру  через запросс и обновлять уже там
            }

            const fileName = await FileService.uploadFile(img) // обращаемся к сервис и он делает всё что надо сохраняет фото и возвращает название

            const gameUp = await Game.update(
                {
             
                },
                {where: {id}})

            res.status(200).json({gameUp})

        }catch (err){
            next(err)
        }
    }

    async getAll(req,res, next){
        try { // доработать
            let {limit, page, genreId, languageId} = req.query;
            
            page = page || 1;
            limit = limit || 9;
            let offset = page * limit - limit;
            let games

            if(!genreId && !languageId){
                games = await Game.findAll({limit, offset});
            }

                if (genreId && !languageId) {
                    games = await Game.findAll({
                        limit,
                        offset,
                        include: [
                            {
                                model: Genre,
                                through: { attributes: [] },
                                where: { id: Number(genreId.id) }, // Фільтруємо за id жанру
                            },
                        ],
                    });
                }

            if(!genreId && languageId){
                games = await Game.findAll({
                    limit,
                    offset,
                    include: [
                        {
                            model: Language,
                            through: { attributes: [] },
                            where: { id: Number(languageId.id) }, // Фільтруємо за id жанру
                        },
                    ],
                });
            }


            return res.status(200).json({games});
        }catch (err){
            next(err)
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;

            // Отримання гри разом із жанрами, мовами та додатковою інформацією
            const game = await Game.findOne({
                where: { id },
                include: [
                    {
                        model: Genre,
                        through: { attributes: [] }, // Приховує проміжну таблицю GameGenres
                    },
                    {
                        model: Language,
                        through: { attributes: [] }, // Приховує проміжну таблицю GameLanguages
                    },
                ],
            });

            // Отримання додаткової інформації про гру
            const gameInfo = await GameInfo.findOne({ where: { gameId: id } });

            if (!game) {
                return res.status(404).json({ message: "Game not found" });
            }

            return res.status(200).json({ game, gameInfo });
        } catch (err) {
            next(err);
        }
    }

    async getCount(req,res,next){
        try{
            const count = await Game.count();
            return res.status(200).json({count});
        }catch(err){
            next(err)
        }
    }

    async getGameName(req, res, next){
        try {
            const {name} = req.body;
            console.log(name)
            const games = await Game.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%` // Чувствительный к регистру поиск 
                    }
                }
            }); // Кайф, по контексту ищет, так что проблем с моиском не должено быть
            return res.status(200).json({games});
        }catch (err){
            next(err)
        }
    }
    
}

module.exports= new GameController();