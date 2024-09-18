const ApiError = require("../errors/ApiErrors");
const {Genre} = require("../../models/models")

class GenreController {

    async create(req,res ,next){
        try {
            const {name} = req.body;
            if(!name) next(ApiError.badRequest(err.message))
            const type = await Genre.create({name})
            res.status(200).json(type)
        }catch (err){
            next(ApiError.badRequest(err.message))
        }

    }

    async delete(req,res, next){
        try{
            const {id} = req.params;
            console.log(id);q
            const genreDel = await Genre.destroy({where:{id}})
            res.status(200).json({genreDel})
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }

    }

    async update(req,res, next){
        try{

        }catch (err) {
            next(ApiError.badRequest(err.message))
        }

    }

    async getAll(req,res, next){
        try{
            const genres = await Genre.findAll()
            res.status(200).json(genres)
        }catch (err) {
            next(ApiError.badRequest(err.message))
        }

    }

    async getOne(req,res, next){
        try {
            const {id} = req.params;
            const genre = await Genre.findOne({where: {id}})
            res.status(200).json({genre})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }

    }

}

module.exports= new GenreController();