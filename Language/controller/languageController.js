const uuid = require('uuid');
const ApiError = require("../errors/ApiErrors");
const {Language} = require("../../models/models")

class LanguageController {

    async create(req, res, next) {
        try {
            const {language} = req.body;
            if (!language) next(ApiError.badRequest(err.message))
            const lang = await Language.create({language})
            res.status(200).json({language})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            console.log(id)
            const language = await Language.destroy({where: {id}})
            res.status(200).json({language})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }


    async update(req, res, next) {
        try {
            const {id} = req.params;
            const {language} = req.body;

            const languageUp = await Language.update(
                {language: language},
                {where: {id}})

            res.status(200).json({languageUp})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getAll(req, res) {
        const languages = await Language.findAll()
        res.status(200).json(languages)
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            const language = await Language.findOne({where: {id}})
            res.status(200).json({language})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
}

module.exports = new LanguageController();