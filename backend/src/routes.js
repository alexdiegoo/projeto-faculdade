const express = require("express");

const router = express.Router();

const AlunoController = require("./controllers/alunosController");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "OK",
  });
});

router.get("/alunos", AlunoController.index);
router.post("/alunos", AlunoController.create);
router.delete("/alunos/:id", AlunoController.delete);
router.put("/alunos/:id", AlunoController.update);

router.post("/login", AlunoController.login);

module.exports = router;
