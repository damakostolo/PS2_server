const ApiError = require("../../errors/ApiErrors");
const {Language} = require("../../models/models")

class LanguageController {

    async create(req, res, next) {
        try {
            const {name} = req.body;
            if (!name) next(ApiError.badRequest(err.message))
            const language = await Language.create({name})
            res.status(200).json({language})
        } catch (err) {
            next(`Така мове вже є`)
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const language = await Language.destroy({where: {id}})
            res.status(200).json({language})
        } catch (err) {
            next(err)
        }
    }


    async update(req, res, next) {
        try {
            const {id} = req.params;
            const {name} = req.body;

            const languageUp = await Language.update(
                {name: name},
                {where: {id}})

            res.status(200).json({languageUp})
        } catch (err) {
            next(err)
        }
    }

    async getAll(req, res) {
        try {
            const languages = await Language.findAll()
            res.status(200).json({languages})
        } catch (err) {
            next(err)
        }

    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            const language = await Language.findOne({where: {id}})
            res.status(200).json({language})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new LanguageController();