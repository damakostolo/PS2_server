const uuid = require('uuid');
const ApiError = require("../../errors/ApiErrors");
const {Developer} = require("../../models/models")

class DeveloperController {

    async create(req, res, next) {
        try {
            const {name} = req.body;
            if (!name) next(ApiError.badRequest(err.message))
            const developer = await Developer.create({name})
            res.status(200).json({developer})
        } catch (err) {
            next(err)
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            console.log(id)
            const developer = await Developer.destroy({where: {id}})
            res.status(200).json({developer})
        } catch (err) {
            next(err);
        }
    }


    async update(req, res, next) {
        try {
            const {id} = req.params;
            const {name} = req.body;

            const developerUp = await Developer.update(
                {name: name},
                {where: {id}})

            res.status(200).json({developerUp})
        } catch (err) {
            next(err)
        }
    }

    async getAll(req, res) {
        const developers = await Developer.findAll()
        res.status(200).json(developers)
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            const developer = await Developer.findOne({where: {id}})
            res.status(200).json({developer})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new DeveloperController();