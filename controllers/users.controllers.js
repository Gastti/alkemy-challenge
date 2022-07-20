const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { createToken } = require('../helpers/jwt-generator');
const { Op } = require("sequelize");
const User = require('../models/user');

const Register = async (req, res = response) => {

    try {

        const { nickname, email, password } = req.body;
        const salt = bcryptjs.genSaltSync(10);

        const user = await User.findOrCreate({
            where: {
                [Op.or]: [
                    { nickname: nickname },
                    { email: email }
                ]
            },
            defaults: {
                nickname,
                email,
                password: bcryptjs.hashSync(password, salt)
            }
        })

        const userExists = user[1];
        if (!userExists) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con este Nickname o Email.'
            })
        }

        res.json({ data: user })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Error en Register, ubicado en "users.controllers.js"'
        })
    }

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

        const validPassword = bcryptjs.compareSync(password, user.password);
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