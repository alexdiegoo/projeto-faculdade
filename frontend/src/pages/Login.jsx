import React from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

import iconNassau from "../assets/icon.png";

import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  const [matricula, setMatricula] = React.useState("");
  const [senha, setSenha] = React.useState("");

  React.useEffect(() => {
    if (Cookie.get("token")) {
      navigate("/");
    }
  }, []);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        matricula,
        senha,
      });

      if (response.status === 200) {
        Cookie.set("token", response.data.token);
        const user = {
          nome: response.data.aluno.nome,
          matricula: response.data.aluno.matricula,
          email: response.data.aluno.email,
        };
        Cookie.set("user", JSON.stringify(user));
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.message);
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
        <h1 className="mt-2 text-2xl font-bold">Login</h1>
      </div>

      <form className="w-1/2 max-w-xs flex items-center flex-col gap-2">
        <Input value={matricula} onChange={handleMatriculaChange}>
          Matricula
        </Input>
        <div className="w-full flex flex-col">
          <Input value={senha} onChange={handleSenhaChange}>
            Senha
          </Input>
          <Button onClick={handleLogin}>Entrar</Button>
        </div>

        <p
          className="text-sm text-sky-800 cursor-pointer"
          onClick={() => navigate("/esqueci-senha")}
        >
          Esqueceu sua senha?
        </p>
      </form>
    </div>
  );
}
