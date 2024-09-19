const uuid = require('uuid');
const ApiError = require("../errors/ApiErrors");
const {User} = require("../../models/models")

class UserController {

    async create(req, res, next) {
        try {
            const {user} = req.body;
            const lang = await User.create({language})
            res.status(200).json({language})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const user = await User.destroy({where: {id}})
            res.status(200).json({user})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }


    async update(req, res, next) {
        try {

        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getAll(req, res) {
        const users = await User.findAll()
        res.status(200).json(users)
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            const user = await User.findOne({where: {id}})
            res.status(200).json({user})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
}

module.exports = new UserController();