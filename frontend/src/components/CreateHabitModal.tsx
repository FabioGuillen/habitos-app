import { X } from "lucide-react";
import { createHabit, updateMyHabit } from "../services/habits";
import toast from "react-hot-toast";
import { useHabitsStore } from "../store/habits.store";

interface Props {
  onClose: () => void;
  onCreated: () => void;
}
const colors = [
  "#22C55E",
  "#3B82F6",
  "#A855F7",
  "#F59E0B",
  "#EF4444",
  "#F97316",
  "#EC4899",
  "#06B6D4",
  "#0400ff",
  "#84CC16",
];
const CreateHabitModal = ({ onClose, onCreated }: Props) => {
  const { open, editHabit, updateHabit, color, setColor, setTitle, title } =
    useHabitsStore();

  const handleSubmit = async () => {
    if (!title.trim()) return;

    try {
      if (editHabit) {
        console.log(editHabit);

        const res = await updateMyHabit(editHabit.id, {
          title,
          color,
          icon: "check",
        });
        updateHabit(res.data);
      } else {
        await createHabit({
          title,
          color,
          icon: "check",
        });
      }

      toast.success(
        `Producto ${editHabit ? "actualizado" : "creado"} correctamente`,
      );
      setTitle("");
      setColor("#22C55E");
      onCreated();
      onClose();
    } catch (error) {
      console.error("Error al crear el hábito:", error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center">
      <div className="bg-[#111827] w-full md:w-[430px] rounded-t-3xl md:rounded-3xl p-6 border border-[#1F2937]">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Nuevo hábito</h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 space-y-5">
          <input
            placeholder="Ej: Ir al Gym"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#0B0F14] border border-[#1F2937] rounded-xl px-4 py-3 outline-none focus:border-[#22C55E] transition text-white"
          />

          <div>
            <p className="text-sm text-gray-400 mb-3">Color</p>

            <div className="flex gap-4">
              {colors.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setColor(item)}
                  className={`w-6 h-6 rounded-full transition-all duration-200 ${
                    color === item
                      ? "ring-2 ring-white ring-offset-2 ring-offset-[#111827] scale-110"
                      : "hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: item,
                  }}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-[#22C55E] hover:bg-[#16A34A] transition-colors text-black font-semibold py-3 rounded-xl"
          >
            {editHabit ? "Editar hábito" : "Guardar hábito"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateHabitModal;
