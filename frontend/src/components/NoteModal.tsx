import { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { saveNote } from "../services/notes";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  day: number | null;
  currentNote?: string;
  onClose: () => void;
  onSaved: () => void;
}

const NoteModal = ({
  open,
  day,
  currentNote = "",
  onClose,
  onSaved,
}: Props) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setText(currentNote);
    } else {
      setText("");
    }
  }, [currentNote, open]);

  if (!open || !day) return null;

  const isEditing = currentNote.trim().length > 0;

  const handleSave = async () => {
    try {
      await saveNote(day, text);

      onSaved();
      onClose();

      if (isEditing) {
        toast.success("Nota actualizada correctamente");
      } else {
        toast.success("Nota creada exitosamente!");
      }
    } catch (error) {
      console.error(error);
      toast.error("No se pudo guardar la nota");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-[#111827] w-full md:w-[500px] rounded-t-3xl md:rounded-3xl p-6 border border-[#1F2937] shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#22C55E]/5 blur-2xl rounded-full" />

        <div className="flex justify-between items-center relative z-10">
          <h2 className="text-xl font-bold text-white">
            {isEditing ? "Editar nota" : "Nueva nota"} — Día {day}
          </h2>

          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-white transition disabled:opacity-30"
          >
            <X size={20} />
          </button>
        </div>

        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe algo importante sobre este día..."
          disabled={loading}
          className="w-full mt-5 bg-[#0B0F14] border border-[#1F2937] focus:border-[#22C55E]/50 rounded-xl p-4 outline-none resize-none text-white placeholder-gray-600 transition disabled:opacity-50"
        />

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full mt-5 bg-[#22C55E] hover:bg-[#16A34A] disabled:bg-gray-700 text-black disabled:text-gray-400 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition duration-200"
        >
          <Save size={18} />
          {loading ? "Guardando..." : "Guardar nota"}
        </button>
      </div>
    </div>
  );
};

export default NoteModal;
