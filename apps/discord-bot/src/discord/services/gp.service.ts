import { PrismaService } from '../../prisma/prisma.service';

export const giveDaily = async (discord_username: string): Promise<string> => {
  const prisma = new PrismaService();

  const user = await prisma.client.user.findUnique({
    where: { discord_username },
    select: {
      gp: true,
      last_daily: true,
      consecutive_daily: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const now = new Date();
  const lastDaily = new Date(user.last_daily);
  const diffMs = now.getTime() - lastDaily.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  const randomGp = Math.floor(Math.random() * (120 - 50 + 1)) + 50;

  if (diffHours >= 24) {
    const bonusPercentage = Math.min(
      Math.max(user.consecutive_daily * 0.01, 0.1),
      0.1,
    );
    const bonusGp =
      user.consecutive_daily > 1 ? Math.floor(randomGp * bonusPercentage) : 0;
    const newGp = user.gp + randomGp + bonusGp;

    // Réinitialisation si plus de 48h
    if (diffHours >= 48) {
      await prisma.client.user.update({
        where: { discord_username },
        data: {
          gp: newGp,
          last_daily: now,
          consecutive_daily: 1,
        },
      });

      return `Voici votre récompense quotidienne : ${randomGp} :coin:`;
    }

    // Série quotidienne maintenue
    await prisma.client.user.update({
      where: { discord_username },
      data: {
        gp: newGp,
        last_daily: now,
        consecutive_daily: user.consecutive_daily + 1,
      },
    });

    return `${
      user.consecutive_daily
    } jours d'affilée ! Voici votre récompense quotidienne avec votre bonus de série : ${
      randomGp + bonusGp
    } :coin:`;
  } else {
    const remainingHours = Math.floor(24 - diffHours);
    const remainingMinutes = Math.floor((24 - diffHours - remainingHours) * 60);

    return `Tu ne peux pas le demander plus d'une fois par jour. Tu dois attendre **${remainingHours} heures et ${remainingMinutes} minutes** pour faire une nouvelle demande.`;
  }
};

export const getRichest = async (): Promise<{
  topUsers: { username: string; gp: number; avatar: string }[];
  totalGp: number;
}> => {
  const prisma = new PrismaService();

  const topUsers = await prisma.client.user.findMany({
    select: {
      username: true,
      gp: true,
      avatar: true,
    },
    orderBy: {
      gp: 'desc',
    },
    take: 10,
  });

  const totalGpAggregate = await prisma.client.user.aggregate({
    _sum: {
      gp: true,
    },
  });

  return {
    topUsers,
    totalGp: totalGpAggregate._sum.gp ?? 0,
  };
};
