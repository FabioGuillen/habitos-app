import type { Response, Request } from "express";
import { prisma } from "../config/prisma.js";

export const createGoal = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "No autorizado",
      });
    }

    const { title, month, type, year, targetValue } = req.body;

    console.log("BODY GOAL:", req.body);
    console.log("USER:", userId);

    const goal = await prisma.goal.create({
      data: {
        userId,
        title,
        month,
        type,
        year,
        targetValue,
      },
    });

    return res.status(201).json(goal);
  } catch (error) {
    console.error("CREATE GOAL ERROR:", error);

    return res.status(500).json({
      message: "Error al crear Goal",
    });
  }
};
export const getGoals = async (req: Request, res: Response) => {
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
    const goals = await prisma.goal.findMany({
      where: {
        userId: userId,
        month,
        year,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener Goals" });
  }
};

export const updateGoal = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { title, targetValue } = req.body;

    const updated = await prisma.goal.update({
      where: { id },
      data: {
        title,
        targetValue,
      },
    });
    res.status(201).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar goal" });
  }
};
export const deleteGoal = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    await prisma.goal.delete({
      where: { id },
    });
    res.json({ message: "Goal eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar goal" });
  }
};

export const updateGoalProgress = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { value } = req.body;
    const goal = await prisma.goal.findUnique({
      where: { id },
    });
    if (!goal) {
      return res.status(404).json({ message: "Goal no encontrado" });
    }
    const current = Number(goal.currentValue) + Number(value);

    const completed = current > Number(goal.targetValue);

    const updated = await prisma.goal.update({
      where: { id },
      data: {
        currentValue: current,
        completed,
      },
    });
    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar progreso del goal" });
  }
};
