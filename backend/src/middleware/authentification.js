const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensaje: "Acceso denegado"});
    }

    try {
        const user_verify = jwt.verify(token, "clavesecreta");
        req.user = user_verify;
        next();
    } catch (err) {
        return res.status(403).json({ mensaje: "Token invalido"});
    }
}