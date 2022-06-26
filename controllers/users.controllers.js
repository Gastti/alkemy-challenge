const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { createToken } = require('../helpers/jwt-generator');
const User = require('../models/user');


const Register = async (req, res = response) => {

    const { nickname, email, password } = req.body;
    const user = await User.create({nickname, email, password});

    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt)
    user.save();
    res.json({
        user
    })

}

const Login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'Email / Contraseña no son validos.'
            })
        }

        if (!user.state) {
            return res.status(400).json({
                msg: 'Usuario no esta habilitado.'
            })
        }

        const validPassword = bcryptjs.compareSync( password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta.'
            })
        }

        const token = await createToken(user.id);

        res.json({
            msg: 'Haz iniciado sesión correctamente.',
            token
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Error en el servidor. (users.controllers.js)'
        })
    }

}

module.exports = {
    Register,
    Login
}