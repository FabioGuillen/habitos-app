import { useState, useEffect } from "react";
import { Camera, Save, User, Mail, Lock, Eye, EyeOff } from "lucide-react";

import { useAuthStore } from "../store/auth.store";
import { updateProfile } from "../services/auth";
import toast from "react-hot-toast";
import EditProfileSkeleton from "../skeleton/EditProfileSkeleton";

const EditProfile = () => {
  const { user } = useAuthStore();

  const [avatar, setAvatar] = useState<File | null>(null);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [preview, setPreview] = useState<string | null>(user?.avatar || null);

  const [loading, setLoading] = useState(!user);

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");

      if (!avatar) {
        setPreview(user.avatar || null);
      }
    }
  }, [user, avatar]);
  useEffect(() => {
    if (user) setLoading(false);
  }, [user]);
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setAvatar(file);

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
  };

  const togglePassword = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const wantsPasswordChange = currentPassword || password || confirmPassword;

    if (wantsPasswordChange) {
      if (!currentPassword) {
        return toast.error("Ingresa tu contraseña actual");
      }

      if (!password) {
        return toast.error("Ingresa una nueva contraseña");
      }

      if (password.length < 8) {
        return toast.error("La contraseña debe tener mínimo 8 caracteres");
      }

      if (password === currentPassword) {
        return toast.error("La nueva contraseña debe ser diferente");
      }

      if (password !== confirmPassword) {
        return toast.error("Las contraseñas no coinciden");
      }
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);

      if (wantsPasswordChange) {
        formData.append("currentPassword", currentPassword);

        formData.append("password", password);
      }

      if (avatar) {
        formData.append("avatar", avatar);
      }

      const updatedUser = await updateProfile(formData);

      useAuthStore.getState().setUser(updatedUser);

      toast.success("Perfil actualizado");

      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
      setAvatar(null);
    } catch (error: any) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Error al actualizar el perfil",
      );
    } finally {
      setLoading(false);
    }
  };

  const passwordFields = [
    {
      label: "Contraseña actual",
      value: currentPassword,
      set: setCurrentPassword,
      show: showPasswords.current,
      key: "current",
    },
    {
      label: "Nueva contraseña",
      value: password,
      set: setPassword,
      show: showPasswords.new,
      key: "new",
    },
    {
      label: "Confirmar contraseña",
      value: confirmPassword,
      set: setConfirmPassword,
      show: showPasswords.confirm,
      key: "confirm",
    },
  ];
  if (loading) return <EditProfileSkeleton />;
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black">Editar perfil</h1>

        <p className="text-gray-400 mt-2">
          Actualiza tu información y seguridad
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid xl:grid-cols-3 gap-6">
        <div>
          <div className="relative overflow-hidden bg-[#111827] border border-[#1F2937] rounded-[36px] p-7">
            <div className="absolute top-0 right-0 w-60 h-60 bg-[#22C55E]/10 blur-3xl rounded-full" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="relative">
                {preview ? (
                  <img
                    src={preview}
                    className="w-36 h-36 rounded-[30px] object-cover"
                  />
                ) : (
                  <div className="w-36 h-36 rounded-[30px] bg-[#22C55E] flex items-center justify-center text-black text-5xl font-bold">
                    {user?.name?.charAt(0)}
                  </div>
                )}

                <label className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl bg-[#22C55E] flex items-center justify-center text-black cursor-pointer">
                  <Camera size={18} />

                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                  />
                </label>
              </div>

              <h2 className="text-2xl font-bold mt-5">{user?.name}</h2>

              <p className="text-gray-400">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="xl:col-span-2">
          <div className="bg-[#111827] border border-[#1F2937] rounded-[36px] p-8">
            {/* INFORMACIÓN PERSONAL */}
            <div>
              <h3 className="text-xl font-bold mb-6">Información personal</h3>

              <div className="space-y-5">
                <div>
                  <label className="text-sm text-gray-400 block mb-2">
                    Nombre
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre"
                      className="
              w-full
              bg-[#0B0F14]
              border border-[#1F2937]
              rounded-2xl
              pl-12 pr-4 py-4
              outline-none
              transition-all
              focus:border-[#22C55E]
              focus:shadow-[0_0_0_4px_rgba(34,197,94,.12)]
              "
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-2">
                    Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="
              w-full
              bg-[#0B0F14]
              border border-[#1F2937]
              rounded-2xl
              pl-12 pr-4 py-4
              outline-none
              transition-all
              focus:border-[#22C55E]
              focus:shadow-[0_0_0_4px_rgba(34,197,94,.12)]
              "
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="my-8 border-t border-[#1F2937]" />

            <div>
              <h3 className="text-xl font-bold">Seguridad</h3>

              <p className="text-gray-400 text-sm mt-2 mb-6">
                Para cambiar la contraseña debes ingresar la contraseña actual.
              </p>

              <div className="space-y-5">
                {passwordFields.map((field) => (
                  <div key={field.label}>
                    <label className="text-sm text-gray-400 block mb-2">
                      {field.label}
                    </label>

                    <div className="relative">
                      <Lock
                        size={18}
                        className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-500
                "
                      />

                      <input
                        type={field.show ? "text" : "password"}
                        value={field.value}
                        onChange={(e) => field.set(e.target.value)}
                        className={`
                w-full
                bg-[#0B0F14]
                border
                rounded-2xl
                pl-12
                pr-14
                py-4
                outline-none
                transition-all

                ${field.value ? "border-[#22C55E]/40" : "border-[#1F2937]"}

                focus:border-[#22C55E]
                focus:shadow-[0_0_0_4px_rgba(34,197,94,.12)]
                `}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          togglePassword(
                            field.key as "current" | "new" | "confirm",
                          )
                        }
                        className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-gray-500
                hover:text-white
                transition
                "
                      >
                        {field.show ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
      mt-8
      bg-[#22C55E]
      hover:bg-[#16A34A]
      disabled:opacity-50
      px-8
      py-4
      rounded-2xl
      text-black
      font-semibold
      flex
      items-center
      gap-3
      shadow-lg
      shadow-green-500/20
      transition-all
      "
            >
              <Save size={20} />

              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
