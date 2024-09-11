const uuid = require('uuid');
const path = require('path');
const ApiError = require("../errors/ApiErrors");
const {Game} = require("../../models/models")

class GameController{

    async create(req,res ,next){ // Корочу создаём "игру" и сохраняем её надо запелить ещё наверное провер но она уже есть на уровне бд
        try {
            const {name, year, genreId , developerId, languageId} = req.body;
            const {img} = req.file;

            let fileName = uuid.v4() + ".jpg"; // генерация уникального имени для нашей картинки
            img.mv = (path.resolve('__dirname', '..', 'static', fileName)) // а тут мы сохраняем в выбранную папку

            const game = await Game.create({name, year, genreId, developerId, languageId, img: fileName})

            return res.status(200).json({game});
        }catch (err){
            next(ApiError.badRequest(err.message))
        }

    }

    async delete(req,res){

    }

    async update(req,res){

    }

    async getAll(req,res){
        res.send('game');
    }

    async getOne(req,res){

    }

}

module.exports= new GameController();