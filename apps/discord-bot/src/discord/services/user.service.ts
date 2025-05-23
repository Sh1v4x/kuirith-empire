// user.service.ts
import { GuildMember } from 'discord.js';
import { PrismaService } from '../../prisma/prisma.service';

export async function verifyUser(member: GuildMember) {
  const prisma = new PrismaService();
  const user = member.user;

  let findUser = await prisma.client.user.findFirst({
    where: { discord_username: user.username },
  });

  if (!findUser) {
    findUser = await prisma.client.user.create({
      data: {
        discord_username: user.username,
        username: member.displayName,
        password: '',
        avatar: user.displayAvatarURL({ forceStatic: false }),
        is_account_created: false,
        role: member.roles.highest?.name ?? 'Membre',
        created_at: new Date(),
        gp: 0,
        xp: 0,
        level: 0,
        last_daily: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        consecutive_daily: 0,
        is_admin: false,
      },
    });
  }

  return findUser;
}
