const uuid = require('uuid');
const ApiError = require("../../errors/ApiErrors");
const {User} = require("../../models/models")

class UserController {


    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const user = await User.destroy({where: {id}})
            res.status(200).json({user})
        } catch (err) {
            next(err)
        }
    }


    async update(req, res, next) {
        try {
            // Ну как нужно как ну нах не надо
        } catch (err) {
            next(err)
        }
    }

    async getAll(req, res) {
        const users = await User.findAll() // Для статистики
        res.status(200).json(users)
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params; //Для админки
            const user = await User.findOne({where: {id}})
            res.status(200).json({user})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new UserController();