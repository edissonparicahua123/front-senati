const User = require("../models/user");

// CRUD USERS

module.exports = {
    async listUsers(req, res) {
        const users = await User.findAll();
        res.json(users);
    },
    async createUser(req, res) {
        const { username, password } = req.body;
        const user_new = await User.create({ username, password });
        res.status(201).json(user_new);
    },
    async updateUser(req, res) {
        const { id } = req.params;
        const { username, password } = req.body;
        await User.update({ username, password }, { where: { id } });
        res.json({ mensaje: "User actualizado" });
    },
    async destroidUser(req, res) {
        const { id } = req.params;
        await User.destroy({ where: { id } });
        res.json({ mensaje: "User eliminado" });
    },
};