import { X } from "lucide-react";
import { createGoal, updagteGoalNote } from "../services/goals";
import { useGoalsStore } from "../store/goals.store";
import toast from "react-hot-toast";
import { useState } from "react";
type GoalType = "COUNT" | "MONEY" | "DAYS" | "CUSTOM";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

const CreateGoalModal = ({ open, onClose, onCreated }: Props) => {
  const { goalForm, setGoalForm, editGoal, updateGoal } = useGoalsStore();
  const [loading, setLoading] = useState(false);
  if (!open) return null;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setGoalForm({
      ...goalForm,
      [name]:
        name === "targetValue" || name === "currentValue"
          ? Number(value)
          : value,
    });
  };
  const handleSave = async () => {
    const { targetValue, title, type } = goalForm;

    if (!title.trim()) {
      return toast.error("Ingrese un título");
    }

    if (targetValue <= 0) {
      return toast.error("Ingrese un objetivo válido");
    }

    setLoading(true);

    try {
      const payload = {
        title: title.trim(),
        targetValue,
        type,
      };

      if (editGoal) {
        const res = await updagteGoalNote(editGoal.id, payload);

        updateGoal(res.data);
      } else {
        await createGoal(payload);
      }

      onCreated();
      onClose();

      setGoalForm({
        title: "",
        targetValue: 0,
        type: "COUNT",
      });

      toast.success(
        `Goal ${editGoal ? "actualizado" : "creado"} correctamente`,
      );
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center">
      <div className="bg-[#111827] w-full md:w-[450px] rounded-t-3xl md:rounded-3xl p-6 border border-[#1F2937]">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Nueva meta</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="space-y-4 mt-5">
          <input
            value={goalForm.title}
            name="title"
            onChange={handleChange}
            placeholder="Ej: Ir al gym"
            className="w-full bg-[#0B0F14] border border-[#1F2937] rounded-xl px-4 py-3"
          />
          <select
            name="type"
            value={goalForm.type}
            onChange={(e) =>
              setGoalForm({
                ...goalForm,
                type: e.target.value as GoalType,
              })
            }
            className="w-full bg-[#0B0F14] border border-[#1F2937] rounded-xl px-4 py-3"
          >
            <option value="COUNT">Cantidad</option>
            <option value="MONEY">Dinero</option>
            <option value="DAYS">Días</option>
            <option value="CUSTOM">Personalizado</option>
          </select>
          <input
            type="number"
            value={goalForm.targetValue}
            onChange={handleChange}
            name="targetValue"
            className="w-full bg-[#0B0F14] border border-[#1F2937] rounded-xl px-4 py-3"
          />

          <button
            onClick={handleSave}
            className="w-full bg-[#22C55E] text-black py-3 rounded-xl font-semibold"
          >
            {loading
              ? "Guardando..."
              : editGoal
                ? "Guardar cambios"
                : "Crear meta"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGoalModal;
