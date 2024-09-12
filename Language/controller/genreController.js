const uuid = require('uuid');
const ApiError = require("../errors/ApiErrors");
const {Genre} = require("../../models/models")

class GenreController {

    async create(req,res ,next){
        try {
            const {name} =req.body;
            if(!name) next(ApiError.badRequest(err.message))
            const type = await Genre.create({name})
            res.status(200).json(type)
        }catch (err){
            next(ApiError.badRequest(err.message))
        }

    }

    async delete(req,res){

    }

    async update(req,res){

    }

    async getAll(req,res){
        const types = await Type.findAll()
        res.status(200).json(types)
    }

    async getOne(req,res){

    }

}

module.exports= new GenreController();