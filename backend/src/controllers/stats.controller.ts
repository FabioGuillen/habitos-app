import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

export const getStats = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "No autorizado",
      });
    }

    const month = Number(req.query.month);

    const year = Number(req.query.year);

    if (
      !Number.isInteger(month) ||
      !Number.isInteger(year) ||
      month < 1 ||
      month > 12
    ) {
      return res.status(400).json({
        message: "Mes o año inválido",
      });
    }

    const habits = await prisma.habit.findMany({
      where: {
        userId,
        month,
        year,
      },
      include: {
        logs: {
          where: {
            month,
            year,
          },
        },
      },
    });

    const goals = await prisma.goal.findMany({
      where: {
        userId,
        month,
        year,
      },
    });

    const moods = await prisma.moodEntry.findMany({
      where: {
        userId,
        month,
        year,
      },
    });

    const daysInMonth = new Date(year, month, 0).getDate();

    const totalChecks = habits.length * daysInMonth;

    let completeChecks = 0;

    let bestHabit: string | null = null;

    let bestCount = 0;

    const weeklyActivity = [
      { day: "Lun", value: 0 },
      { day: "Mar", value: 0 },
      { day: "Mié", value: 0 },
      { day: "Jue", value: 0 },
      { day: "Vie", value: 0 },
      { day: "Sáb", value: 0 },
      { day: "Dom", value: 0 },
    ];

    const dayMap = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

    for (const habit of habits) {
      const completedLogs = habit.logs.filter((log) => log.completed);

      const done = completedLogs.length;

      completeChecks += done;

      if (done > bestCount) {
        bestCount = done;
        bestHabit = habit.title;
      }

      completedLogs.forEach((log) => {
        const date = new Date(log.year, log.month - 1, log.day);

        const jsDay = date.getDay();

        const dayName = dayMap[jsDay];

        const item = weeklyActivity.find((d) => d.day === dayName);

        if (item) {
          item.value += 1;
        }
      });
    }

    const completionRate =
      totalChecks === 0 ? 0 : Math.round((completeChecks / totalChecks) * 100);

    const goalsCompleted = goals.filter((g) => g.completed).length;

    const moodAverage =
      moods.length === 0
        ? 0
        : Number(
            (
              moods.reduce((acc, item) => acc + item.mood, 0) / moods.length
            ).toFixed(1),
          );

    return res.status(200).json({
      completionRate,
      goalsCompleted,
      bestHabit,
      moodAverage,
      weeklyActivity,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al obtener estadísticas",
    });
  }
};
