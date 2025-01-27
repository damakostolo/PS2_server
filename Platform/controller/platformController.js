const ApiError = require("../../errors/ApiErrors");
const {Platform} = require("../../models/models")

class PlatformController {

    async create(req, res, next) {
        try {
            const {name} = req.body;
            if (!name) next(ApiError.badRequest(err.message))
            const platform = await Platform.create({name})
            res.status(200).json({platform})
        } catch (err) {
            next(`Така мове вже є`)
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const platform = await Platform.destroy({where: {id}})
            res.status(200).json({platform})
        } catch (err) {
            next(err)
        }
    }


    async update(req, res, next) {
        try {
            const {id} = req.params;
            const {name} = req.body;

            const platformUp = await Platform.update(
                {name: name},
                {where: {id}}
            )

            res.status(200).json({platformUp})
        } catch (err) {
            next(err)
        }
    }

    async getAll(req, res) {
        try {
            const platforms = await Platform.findAll()
            res.status(200).json(platforms)
        } catch (err) {
            next(err)
        }

    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            const platform = await Platform.findOne({where: {id}})
            res.status(200).json({platform})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new PlatformController();