const express = require("express");

const router = express.Router();
const { authenticateToken } = require("./middlewares/authentication");

const AlunoController = require("./controllers/alunosController");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "OK",
  });
});

router.get("/alunos", AlunoController.index);
router.post("/alunos", AlunoController.create);
router.delete("/alunos/:id", authenticateToken, AlunoController.delete);
router.put("/alunos/:id", authenticateToken, AlunoController.update);
router.put("/aluno/changePassword", AlunoController.changePassword);

router.post("/login", AlunoController.login);

module.exports = router;
