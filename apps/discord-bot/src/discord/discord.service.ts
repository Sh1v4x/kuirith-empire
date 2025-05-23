import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  Client,
  GatewayIntentBits,
  Collection,
  Interaction,
  Message,
} from 'discord.js';
import * as dotenv from 'dotenv';
import DeployClient from './utils/deploy_commands';
import { handleReady, channelList, memberList } from './event/ready';

dotenv.config();

interface Command {
  data: { name: string; toJSON: () => any };
  execute: (interaction: Interaction) => Promise<void>;
}

interface ExtendedClient extends Client {
  commands: Collection<string, Command>;
}

@Injectable()
export class DiscordService implements OnModuleInit {
  private client: ExtendedClient;

  constructor(private prisma: PrismaService) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    }) as ExtendedClient;

    this.client.commands = new Collection();

    this.setupMessageListener();
  }

  async onModuleInit() {
    await this.client.login(process.env.DISCORD_TOKEN);

    await DeployClient(this.client);
    handleReady(this.client);
    setTimeout(() => {
      channelList.forEach((channel) => {
        console.log(`ID: ${channel.id}, Nom: ${channel.channel}`);
      });
      memberList.forEach((member) => {
        console.log(`Membre: ${member}`);
      });
    }, 5000);

    console.log('✅ Bot connected and commands deployed.');
  }

  private setupMessageListener() {
    this.client.on('messageCreate', (message: Message) => {
      if (message.author.bot) return;

      if (message.content === '!infos') {
        message
          .reply(
            `
**DisplayName :** ${message.member?.displayName}
**ID :** ${message.author.id}
**Username :** ${message.author.username}
**Role Highest Name :** ${message.member?.roles.highest.name}
**Avatar :** ${message.author.displayAvatarURL({ forceStatic: false })}
            `,
          )
          .catch(console.error);
      }
    });
  }
}
