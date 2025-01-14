const jwt = require('jsonwebtoken')
const {User} = require('../../models/models')


class TokenService{

    generateToken(payload){
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {expiresIn: process.env.ACCESS_EXPIRES})
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES})

        return {accessToken, refreshToken}
    }

    async saveToken(userId, refreshToken, User){ // тут мы сотрим в нашу БД находим юзера и перезаписуем ему рефреш токен , в целом норм
        const newUser = await User.update(
            { refreshToken: refreshToken },
            { where: { id: userId } }
        );
        
        return newUser;
    }

    async validateAccessToken(token){
        try {
            const userData = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
            return userData;
        }catch (e){
            return null;
        }
    }

    async validateRefreshToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_SECRET_KEY)
            return userData;
        }catch (e){
            return null;
        }
    }

    async deleteToken (token){
        const tokenDate = await User.destroy({where: {refreshToken: token}});
        return tokenDate;
    }

    async findToken (token){
        const tokenDate = await User.findOne({where: {refreshToken: token}});
        return tokenDate;
    }

}

module.exports = new TokenService();