const ApiError = require("../../errors/ApiErrors");

const {Game , GameInfo} = require("../../models/models")
const FileService = require("../service/fileService")
const gameInfoController = require("./gameInfoController")

class GameController{

    async create(req,res ,next){ // Корочу создаём "игру" и сохраняем её надо запелить ещё наверное провер но она уже есть на уровне бд
        try {
            const {name, year, genreId, developerId, languageId, linkGame, description} = req.body;
            const {img, imgGame} = req.files;

            const fileName = await FileService.uploadFile(img) // обращаемся к сервис и он делает всё что надо сохраняет фото и возвращает название
            const game = await Game.create({name, year, genreId, developerId, languageId, img: fileName})// Тут создаём игру

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
            res.status(200).json({gameDel})
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
                    name: name,
                    year: year,
                    genreId: genreId,
                    developerId: developerId,
                    languageId: languageId,
                    img: fileName,
                },
                {where: {id}})

            res.status(200).json({gameUp})

        }catch (err){
            next(err)
        }
    }

    async getAll(req,res, next){
        try {
            const games = await Game.findAll();
            return res.status(200).json({games});
        }catch (err){
            next(err)
        }
    }

    async getOne(req,res , next){
        try {
            const {id} = req.params;
            const game = await Game.findOne({where:{id}});
            return res.status(200).json({game});
        }catch (err){
            next(err)
        }

    }

}

module.exports= new GameController();