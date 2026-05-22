import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

export const createHabit = async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    if (!userId) {
      return res.status(401).json({ message: "No autorizado" });
    }
    const { title, color, icon, month, year } = req.body;

    const habit = await prisma.habit.create({
      data: {
        title,
        color,
        icon,
        month,
        year,
        userId,
      },
    });
    if (!habit) {
      return res.status(400).json({ message: "Error creating habit" });
    }

    res.status(201).json(habit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getHabits = async (req: Request, res: Response) => {
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
    const habits = await prisma.habit.findMany({
      where: {
        userId: userId,
        month,
        year,
      },
      include: {
        logs: {
          where: {
            month,
            year,
          },
          orderBy: {
            day: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    res.json(habits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los hábitos" });
  }
};

export const updateHabits = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;

    if (!idParam || Array.isArray(idParam)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    const id = idParam;
    const { title, color, icon } = req.body;
    const habit = await prisma.habit.update({
      where: { id },
      data: { title, color, icon },
    });
    res.json(habit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteHabit = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;

    if (!idParam || Array.isArray(idParam)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    const id = idParam;
    const habit = await prisma.habit.delete({
      where: { id },
    });
    res.json("Habitos eliminado!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const toggleHabitLog = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { day, year, month } = req.body;
    const habit = await prisma.habitLog.findUnique({
      where: { habitId_day_month_year: { habitId: id, day, month, year } },
    });
    if (habit) {
      const updatedHabit = await prisma.habitLog.update({
        where: { id: habit.id },
        data: { completed: !habit.completed },
      });
      return res.json(updatedHabit);
    }
    const created = await prisma.habitLog.create({
      data: {
        habitId: id,
        day,
        month,
        year,
        completed: true,
      },
    });
    res.status(201).json(created);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al actualizar el registro del hábito" });
  }
};
