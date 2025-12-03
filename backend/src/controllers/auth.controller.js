const AuthUser = require("../models/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    async register (req, res) {
        const { email, password, nombres, rol } = req.body;
        console.log(req.body);
        const password_hashed = await bcrypt.hash(password, 10);
        const new_user = AuthUser.create({
            email: email,
            password: password_hashed,
            nombres: nombres,
            rol: rol
        });

        res.status(201).json(
            {
                mensaje: "Usuario creado",
                new_user
            }     
        )
    },
    async login(req, res) {
        const { email, password} = req.body;
        const user = await AuthUser.findOne({ where: {email}});

        if (!user) {
            return res.status(404).json({ mensaje: "email invalido"});
        }

        const user_valid = await bcrypt.compare(password, user.password);

        if (!user_valid) {
            return res.status(401).json({ mensaje: "password incorrecto"});
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            "clavesecreta",
            { expiresIn: '1h' }
        );

        res.json({ token })
    },
    async logout(req, res) {}
}