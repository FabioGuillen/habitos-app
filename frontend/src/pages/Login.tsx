import { useNavigate, Link } from "react-router-dom";

import { useState } from "react";

import { getMe, loginUser } from "../services/auth";

import { useAuthStore } from "../store/auth.store";

const Login = () => {
  const nav = useNavigate();

  const { setAuth, fetchUser } = useAuthStore();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const res = await loginUser(email, password);

      setAuth(res.data.user, res.data.token);
      await fetchUser();
      await getMe();
      nav("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#111827] border border-[#1F2937] rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-white">Iniciar sesión</h1>

        <p className="text-gray-400 mt-2">Sigue construyendo tu disciplina</p>

        <form onSubmit={handleLogin} className="space-y-4 mt-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#0B0F14] border border-[#1F2937] rounded-xl px-4 py-3 text-white outline-none focus:border-[#22C55E]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#0B0F14] border border-[#1F2937] rounded-xl px-4 py-3 text-white outline-none focus:border-[#22C55E]"
          />

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#22C55E] hover:bg-[#16A34A] transition text-black font-semibold py-3 rounded-xl disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-5">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-green-400 hover:text-green-300">
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
