import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import iconNassau from "../assets/icon.png";

import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  const [matricula, setMatricula] = React.useState("");
  const [senha, setSenha] = React.useState("");

  const navigate = useNavigate();

  async function handleClick(e) {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:3000/aluno/changePassword",
        {
          matricula,
          novaSenha: senha,
        }
      );

      if (response.status === 200) {
        alert("Senha alterada com sucesso!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleMatriculaChange(e) {
    setMatricula(e.target.value);
  }

  function handleSenhaChange(e) {
    setSenha(e.target.value);
  }

  return (
    <div className="w-full flex flex-col gap-20 items-center mt-10">
      <div className="flex flex-col items-center">
        <img src={iconNassau} className="w-40 mb-4" />
        <h1 className="mt-2 text-2xl font-bold">Mudar Senha</h1>
      </div>

      <form className="w-1/2 max-w-xs flex items-center flex-col gap-2">
        <Input value={matricula} onChange={handleMatriculaChange}>
          Matricula
        </Input>
        <div className="w-full flex flex-col">
          <Input value={senha} onChange={handleSenhaChange}>
            Nova Senha
          </Input>
          <Button onClick={handleClick}>Mudar Senha</Button>
        </div>
      </form>
    </div>
  );
}
