const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWTValidation = async (req, res, next) => {

    const token = req.header('token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token.'
        })
    }

    try {

        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        //Leer el usuario
        const user = await User.findByPk(id);
        req.user = user;

        if(!user){
            return res.status(401).json({
                msg: "Token no válido - Usuario no existe en DB"
            })
        }

        //Verificar si el uid tiene estado en true
        if(!user.state){
            return res.status(401).json({
                msg: "Token no válido - Usuario con estado: false"
            })
        }
        
        next();

    } catch (error) {
        console.log(token);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}

module.exports = {
    JWTValidation
}