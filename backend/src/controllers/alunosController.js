require("dotenv").config();

const model = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Aluno } = model;

class AlunoController {
  async index(req, res) {
    try {
      const alunos = await Aluno.findAll();
      return res.status(200).json({ ...alunos });
    } catch (error) {
      console.log("[Erro ao buscar alunos] " + error);
      return res.status(400).json({ message: "Erro ao buscar alunos" });
    }
  }

  async login(req, res) {
    try {
      const { senha, matricula } = req.body;

      // Verificar se o usuário existe
      const aluno = await Aluno.findOne({ where: { matricula } });
      if (!aluno) {
        return res.status(404).json({ message: "Aluno não encontrado" });
      }

      const isValidPassword = await bcrypt.compare(senha, aluno.senha);

      if (!isValidPassword) {
        return res.status(404).json({ message: "Senha incorreta" });
      }
      // Gerar token JWT
      const token = jwt.sign({ userId: aluno.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return res
        .status(200)
        .json({
          message: "Login bem-sucedido",
          token,
          aluno: {
            nome: aluno.nome,
            id: aluno.id,
            email: aluno.email,
            matricula: aluno.matricula,
            cpf: aluno.cpf,
          },
        });
    } catch (error) {
      console.log("[Erro ao fazer login] " + error);
      return res.status(400).json({ message: "Erro ao buscar alunos" });
    }
  }

  async create(req, res) {
    try {
      const { nome, cpf, email, senha } = req.body;

      const BCRYPT_COST = process.env.BCRYPT_COST || 10;

      const senhaHashed = await bcrypt.hash(senha, parseInt(BCRYPT_COST));

      const matricula = new Date().getFullYear().toString() + cpf;

      const newAluno = await Aluno.create({
        nome: String(nome),
        cpf: String(cpf),
        email: String(email),
        senha: String(senhaHashed),
        matricula,
      });

      return res.status(201).json({ newAluno });
    } catch (error) {
      console.log("[Erro ao cadastrar aluno] " + error);
      return res.status(400).json({ message: "Erro ao cadastrar aluno" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      await Aluno.destroy({ where: { id } });
      return res.status(200).json({ message: "Aluno deletado com sucesso!" });
    } catch (error) {
      console.log("[Erro ao excluir aluno] " + error);
      return res.status(400).json({ message: "Erro ao deletar aluno" });
    }
  }

  async update(req, res) {
    try {
      const { userId: id } = req.user;
      const { nome, email, password } = req.body;

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(404).json({ message: "Aluno não encontrado" });
      }

      if (nome) aluno.nome = nome;
      if (email) aluno.email = email;

      await aluno.save();
      return res.status(200).json({ ...aluno });
    } catch (error) {
      console.log("[Erro ao atualizar aluno] " + error);
      return res.status(400).json({ message: "Erro ao atualizar aluno" });
    }
  }
}

module.exports = new AlunoController();
