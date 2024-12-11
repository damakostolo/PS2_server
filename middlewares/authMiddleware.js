const jwt = require('jsonwebtoken')


module.exports = function (req, res, next) {
    if(req === "option"){
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).json({message: "user not authenticated"})
        }
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
        req.user = decoded;
        next()
    }catch(e){
        return res.status(401).json({message: "user not authenticated"})
    }
}