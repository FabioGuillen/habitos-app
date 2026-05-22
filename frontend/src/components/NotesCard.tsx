// components/NoteCard.tsx

import { motion } from "framer-motion";

import { CalendarDays, Pencil, Sparkles, Trash2 } from "lucide-react";

interface NoteCardProps {
  note: any;
  onClick: () => void;
  handleOpenDeleteModal: (id: string) => void;
}

const NotesCard = ({ note, onClick, handleOpenDeleteModal }: NoteCardProps) => {
  const preview =
    note.note.length > 140 ? note.note.slice(0, 140) + "..." : note.note;

  const gradients = [
    "from-[#22C55E]/10 to-transparent",
    "from-blue-500/10 to-transparent",
    "from-purple-500/10 to-transparent",
    "from-orange-500/10 to-transparent",
  ];

  const gradient = gradients[note.day % gradients.length];

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -5,
      }}
      transition={{
        duration: 0.25,
      }}
      className="group relative overflow-hidden bg-[#111827] border border-[#1F2937] hover:border-[#22C55E]/30 transition-all duration-300 rounded-[32px] p-6 "
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0B0F14] border border-[#1F2937] flex items-center justify-center">
                <CalendarDays size={20} className="text-[#22C55E]" />
              </div>

              <div>
                <p className="text-gray-400 text-sm">Día</p>

                <h2 className="text-2xl font-bold">{note.day}</h2>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            {" "}
            <button
              onClick={onClick}
              className="w-11 h-11 rounded-2xl bg-[#0B0F14] border border-[#1F2937] flex items-center justify-center hover:border-[#22C55E]/40 transition-all"
            >
              <Pencil size={18} className="text-gray-300" />
            </button>
            <button
              onClick={() => handleOpenDeleteModal(note.id)}
              className="w-11 h-11 rounded-2xl bg-[#0B0F14] border border-[#1F2937] flex items-center justify-center hover:border-[#22C55E]/40 transition-all"
            >
              <Trash2 size={18} className="text-red-500" />
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="mt-6">
          <p className="text-gray-200 leading-relaxed text-[15px]">{preview}</p>
        </div>

        {/* FOOTER */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#22C55E] text-sm font-medium">
            <Sparkles size={16} />
            Reflexión guardada
          </div>

          <div className="text-xs text-gray-500">Journal</div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotesCard;
