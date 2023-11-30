require("dotenv").config();
const app = require("./src/app");

const port = process.env.PORT || 3000;

try {
  app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
  });
} catch (error) {
  console.log(error);
}
