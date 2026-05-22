import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  title?: string;
  description?: string;
}

const DeleteConfirmModal = ({
  open,
  onClose,
  onConfirm,
  loading,
  title = "¿Estás seguro de eliminar este elemento?",
  description = "Esta acción es irreversible y perderás todos los datos asociados.",
}: Props) => {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative bg-[#111827] w-full max-w-md rounded-[32px] p-6 border border-[#1F2937] shadow-2xl shadow-red-500/5 overflow-hidden z-10"
          >
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-red-500/10 blur-3xl rounded-full" />

            <div className="flex flex-col items-center text-center mt-2">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5 animate-pulse">
                <AlertTriangle className="text-red-500" size={28} />
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">
                {title}
              </h3>

              <p className="text-gray-400 mt-2 text-sm leading-relaxed max-w-xs">
                {description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 order-2 sm:order-1 bg-[#0B0F14] hover:bg-[#111827] border border-[#1F2937] hover:border-gray-700 text-gray-300 font-semibold py-4 rounded-2xl transition duration-200 disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className="flex-1 order-1 sm:order-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition duration-200 shadow-lg shadow-red-500/10 disabled:opacity-50"
              >
                <Trash2 size={18} />
                {loading ? "Eliminando..." : "Sí, eliminar"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
