import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

export const createOrUpdateNote = async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    if (!userId) {
      return res.status(401).json({ message: "No autorizado" });
    }
    const { day, month, year, note } = req.body;

    const existingNote = await prisma.dailyNote.findUnique({
      where: {
        userId_day_month_year: {
          userId: userId,
          day,
          month,
          year,
        },
      },
    });
    if (existingNote) {
      const updatedNote = await prisma.dailyNote.update({
        where: { id: existingNote.id },
        data: { note },
      });
      return res.json(updatedNote);
    }
    const createdNote = await prisma.dailyNote.create({
      data: {
        userId: userId,
        note,
        day,
        month,
        year,
      },
    });
    res.status(201).json(createdNote);
  } catch (error) {}
};

export const getMonthNotes = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "No autorizado" });
    }
    const month = Number(req.query.month);
    const year = Number(req.query.year);
    if (
      !Number.isInteger(month) ||
      !Number.isInteger(year) ||
      month < 1 ||
      month > 12
    ) {
      return res.status(400).json({ message: "Mes o año inválido" });
    }
    const notes = await prisma.dailyNote.findMany({
      where: {
        userId: userId,
        month,
        year,
      },
      orderBy: {
        day: "asc",
      },
    });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las notas del mes" });
  }
};

export const getDayNote = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "No autorizado" });
    }
    const day = Number(req.query.day);
    const month = Number(req.query.month);
    const year = Number(req.query.year);

    if (
      !Number.isInteger(month) ||
      !Number.isInteger(year) ||
      month < 1 ||
      month > 12
    ) {
      return res.status(400).json({ message: "Mes o año inválido" });
    }
    const note = await prisma.dailyNote.findUnique({
      where: {
        userId_day_month_year: { userId: userId, day, month, year },
      },
    });
    if (!note) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la nota del día" });
  }
};
export const deleteNote = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    await prisma.dailyNote.delete({
      where: { id },
    });
    res.json({ message: "Nota eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la nota" });
  }
};
