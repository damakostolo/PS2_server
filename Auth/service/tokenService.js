const jwt = require('jsonwebtoken')


class TokenService{
    generateToken(payload){
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES})
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
}

module.exports = new TokenService();