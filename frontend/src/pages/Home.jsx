import React from "react";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!Cookie.get("token") && !user) {
      navigate("/login");
    }

    if (Cookie.get("user") && !user) {
      setUser(JSON.parse(Cookie.get("user")));
    }
  }, [user]);

  function handleLogoff() {
    Cookie.remove("token");
    Cookie.remove("user");
    setUser(null);
  }

  return user ? (
    <div className="w-full">
      <h1 className="text-lg mb-3">Olá, {user.nome}</h1>

      <h1>Seus dados: </h1>
      <h2>Matricula: {user.matricula}</h2>
      <h2>Email: {user.email}</h2>

      <p
        className="w-20 text-center mt-3 cursor-pointer 
        text-lg border border-red-600 rounded-sm p-1 text-red-600 font-bold"
        onClick={handleLogoff}
      >
        Sair
      </p>
    </div>
  ) : (
    ""
  );
}
