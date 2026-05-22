import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/auth";

const Register = () => {
  const nav = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      await registerUser(name, email, password);

      nav("/login");
    } catch {
      alert("Error al registrar");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#111827] border border-[#1F2937] rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-white">Crear cuenta</h1>

        <form onSubmit={handleRegister} className="space-y-4 mt-6">
          <input
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#0B0F14] border border-[#1F2937] rounded-xl px-4 py-3"
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#0B0F14] border border-[#1F2937] rounded-xl px-4 py-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#0B0F14] border border-[#1F2937] rounded-xl px-4 py-3"
          />

          <button
            type="submit"
            className="w-full bg-[#22C55E] text-black py-3 rounded-xl font-semibold"
          >
            Crear cuenta
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-5">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-green-400">
            Ingresar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
