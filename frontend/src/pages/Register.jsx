import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import iconNassau from "../assets/icon.png";

import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  const [nome, setNome] = React.useState("");
  const [cpf, setCPF] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/alunos", {
        nome,
        cpf,
        email,
        senha,
      });

      alert("Cadastro realizado com sucesso!");
      navigate("/login");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleSenhaChange(e) {
    setSenha(e.target.value);
  }

  function handleCPFChange(e) {
    setCPF(e.target.value);
  }

  function handleNomeChange(e) {
    setNome(e.target.value);
  }

  return (
    <div className="w-full flex flex-col gap-20 items-center mt-10">
      <div className="flex flex-col items-center">
        <img src={iconNassau} className="w-40 mb-4" />
        <h1 className="mt-2 text-2xl font-bold">Cadastro</h1>
      </div>

      <form className="w-1/2 max-w-xs flex items-center flex-col gap-2">
        <Input value={nome} onChange={handleNomeChange}>
          Nome
        </Input>
        <Input value={cpf} onChange={handleCPFChange}>
          CPF
        </Input>
        <Input value={email} onChange={handleEmailChange}>
          E-mail
        </Input>
        <Input value={senha} onChange={handleSenhaChange}>
          Senha
        </Input>
        <Button onClick={handleRegister}>Cadastrar</Button>
        <p
          className="text-sm text-sky-800 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Já tem uma conta?
        </p>
      </form>
    </div>
  );
}
