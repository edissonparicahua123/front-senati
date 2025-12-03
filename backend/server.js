const app = require("./src/app");
const sequelize = require("./src/settings/db");

const PORT = 3000;

async function start() {
    try {
        await sequelize.sync();
        app.listen(PORT, () => {console.log("Inciando Servidor Express")});
    } catch(err) {
        console.error("Error ", err);
    }
}

start();