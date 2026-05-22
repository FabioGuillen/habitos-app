import { useEffect, useState, useMemo } from "react";
import {
  BookOpen,
  Plus,
  Sparkles,
  Calendar,
  PenLine,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { deleteNote, getMonthNotes } from "../services/notes";
import NotesCard from "../components/NotesCard";
import toast from "react-hot-toast";
import DeleteConfirmModal from "../components/DeleteConfirmarModal";
import NoteModal from "../components/NoteModal";
import NotesPageSkeleton from "../skeleton/NotesSkeleton";
import { useNotesStore } from "../store/notes.store";
const months = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];
const Notes = () => {
  const [openNote, setOpenNote] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [noteIdToDelete, setNoteIdToDelete] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { notes, setNotes } = useNotesStore();
  const [loading, setLoading] = useState(notes.length === 0);
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const year = now.getFullYear();

  const daysInMonth = new Date(year, selectedMonth + 1, 0).getDate();

  const visibleMonths = months.map((m, index) => ({
    name: m,
    offset: index - selectedMonth,
  }));
  const load = async (showSkeleton = true) => {
    if (showSkeleton) setLoading(true);
    const now = new Date();

    try {
      const data = await getMonthNotes(selectedMonth + 1, now.getFullYear());
      setNotes(data.data);
    } catch (error) {
      console.error("Error al cargar las notas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(notes.length === 0);
  }, [selectedMonth]);

  const { totalNotes, longestNoteLength } = useMemo(() => {
    const total = notes.length;
    const longest = notes.reduce(
      (max, current) =>
        (current.note?.length || 0) > (max.note?.length || 0) ? current : max,
      { note: "" },
    );
    return {
      totalNotes: total,
      longestNoteLength: longest.note?.length || 0,
    };
  }, [notes]);

  const handleOpenDeleteModal = (id: string) => {
    setNoteIdToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!noteIdToDelete) return;

    try {
      setDeleteLoading(true);
      await deleteNote(noteIdToDelete);
      toast.success("Nota eliminada correctamente");
      load();
    } catch (error) {
      console.log("Error, no se pudo eliminar la nota: ", error);
      toast.error("No se pudo eliminar la nota");
    } finally {
      setDeleteLoading(false);
      setDeleteModalOpen(false);
      setNoteIdToDelete(null);
    }
  };

  const handleOpenTodayNote = () => {
    setSelectedDay(now.getDate());
    setOpenNote(true);
  };
  if (loading) {
    return <NotesPageSkeleton />;
  }
  return (
    <div className="space-y-8">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#090d14] p-6 sm:p-8 md:p-10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.75)]">
        {/* Glow */}
        <div className="absolute -top-32 -right-32 h-[450px] w-[450px] rounded-full bg-[#22C55E]/10 blur-[140px]" />
        <div className="absolute bottom-0 left-0 h-[250px] w-[250px] rounded-full bg-[#22C55E]/5 blur-[100px]" />
        <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative z-10 flex flex-col gap-12">
          <div className="w-full space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#22C55E]/20 bg-[#22C55E]/10 px-4 py-1">
              <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="uppercase tracking-widest text-xs font-bold text-[#22C55E]">
                Personal Journal
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black leading-tight text-white">
              Captura ideas,
              <br />
              <span className="text-[#22C55E]">pensamientos y progreso.</span>
            </h1>

            <p className="text-gray-400 leading-relaxed text-[15px] max-w-xl">
              Registra tus pensamientos, experiencias y reflexiones de{" "}
              <span className="text-white font-semibold">
                {months[selectedMonth]}
              </span>{" "}
              para construir una historia continua de tu crecimiento.
            </p>
          </div>

          <div className="flex flex-row items-center justify-between gap-6">
            <div
              className="
      flex
      items-center
      gap-4
      rounded-3xl
      border
      border-white/5
      bg-white/[0.03]
      backdrop-blur-xl
      px-4
      py-3"
            >
              <div
                className="
        h-12
        w-12
        rounded-2xl
        bg-[#22C55E]/10
        border
        border-[#22C55E]/20
        flex
        items-center
        justify-center"
              >
                <Calendar size={20} className="text-[#22C55E]" />
              </div>

              <div className="relative h-[60px] w-[150px] overflow-hidden flex items-center justify-center">
                {visibleMonths.map(({ name, offset }) => {
                  if (Math.abs(offset) > 1) return null;

                  return (
                    <motion.div
                      key={name}
                      animate={{
                        y: offset * 32,
                        opacity: offset === 0 ? 1 : 0.3,
                        scale: offset === 0 ? 1 : 0.8,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className={`absolute ${
                        offset === 0
                          ? "text-white text-2xl font-black"
                          : "text-gray-500 text-xs"
                      }`}
                    >
                      {name}
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex flex-col gap-1">
                <button
                  onClick={() =>
                    setSelectedMonth((p) => (p === 0 ? 11 : p - 1))
                  }
                  className="text-gray-400 hover:text-[#22C55E] transition"
                >
                  <ChevronUp size={14} />
                </button>

                <button
                  onClick={() =>
                    setSelectedMonth((p) => (p === 11 ? 0 : p + 1))
                  }
                  className="text-gray-400 hover:text-[#22C55E] transition"
                >
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>
            {/* CTA */}
            <button
              onClick={handleOpenTodayNote}
              className="
          group
          rounded-2xl
          bg-gradient-to-r from-[#22C55E] to-[#16A34A]
          px-7 py-4
          font-bold text-black
          flex items-center gap-3
          shadow-[0_15px_40px_-10px_rgba(34,197,94,0.4)]
          hover:scale-[1.04]
          transition-all"
            >
              <Plus size={18} className="transition group-hover:rotate-90" />
              <span className="hidden md:inline">Nueva Nota</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <div className="bg-[#111827] border border-[#1F2937] rounded-[30px] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Notas escritas</p>
              <h3 className="text-4xl font-bold mt-3">{totalNotes}</h3>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#22C55E]/10 flex items-center justify-center">
              <PenLine className="text-[#22C55E]" />
            </div>
          </div>
        </div>

        <div className="bg-[#111827] border border-[#1F2937] rounded-[30px] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Días del mes</p>
              <h3 className="text-4xl font-bold mt-3">{daysInMonth}</h3>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <Calendar className="text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#111827] border border-[#1F2937] rounded-[30px] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Reflexión más larga</p>
              <h3 className="text-2xl font-bold mt-3">
                {longestNoteLength}{" "}
                {longestNoteLength === 1 ? "carácter" : "caracteres"}
              </h3>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center">
              <Sparkles className="text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* NOTES GRID */}

      {notes.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5"
        >
          {notes.map((note) => (
            <NotesCard
              key={note.id}
              note={note}
              onClick={() => {
                setSelectedDay(note.day);
                setOpenNote(true);
              }}
              handleOpenDeleteModal={handleOpenDeleteModal}
            />
          ))}
        </motion.div>
      ) : (
        <div className="relative overflow-hidden bg-gray-900/30 border border-dashed border-gray-800 rounded-[36px] p-10 md:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-[#22C55E]/5 to-transparent opacity-50 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-[#22C55E]/10 flex items-center justify-center mb-8 border border-[#22C55E]/20">
              <BookOpen size={32} className="text-[#22C55E]" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white">
              El diario de {months[selectedMonth]} está vacío
            </h2>

            <p className="text-gray-400 mt-4 max-w-lg leading-relaxed">
              Aún no has registrado tus pensamientos para este mes. Comienza a
              documentar tus aprendizajes hoy mismo.
            </p>

            <button
              onClick={handleOpenTodayNote}
              className="mt-10 bg-white hover:bg-gray-200 text-black font-bold px-8 py-4 rounded-2xl inline-flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-[0_10px_20px_-5px_rgba(255,255,255,0.1)]"
            >
              <Plus size={20} />
              Crear nota para hoy
            </button>
          </motion.div>
        </div>
      )}

      <NoteModal
        open={openNote}
        day={selectedDay}
        currentNote={notes.find((n) => n.day === selectedDay)?.note}
        onClose={() => setOpenNote(false)}
        onSaved={load}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setNoteIdToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
      />
    </div>
  );
};

export default Notes;
