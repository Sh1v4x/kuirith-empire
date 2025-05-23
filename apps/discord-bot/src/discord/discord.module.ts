// apps/discord-bot/src/discord/discord.module.ts
import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [DiscordService, PrismaService],
  exports: [],
})
export class DiscordModule {}
