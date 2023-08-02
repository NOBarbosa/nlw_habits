import { FastifyInstance } from "fastify";
import { prisma } from "./prisma";
import { z } from "zod";

export async function appRoutes(app: FastifyInstance) {
  app.post("/habits", async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });
    const { title, weekDays } = createHabitBody.parse(request.body);

    await prisma.habit.create({
      data: {
        title,
        creates_at: new Date(),

        weekDays: {
          create: weekDays.map((weekDay) => {
            return {
              week_day: weekDay,
            };
          }),
        },
      },
    });
  });
}
