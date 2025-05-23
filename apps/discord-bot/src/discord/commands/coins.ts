import { GuildMember, SlashCommandBuilder } from 'discord.js';
import { verifyUser } from '../services/user.service';
import { createEmbed } from '../utils/embedBuilder';

export const command = {
  data: new SlashCommandBuilder()
    .setName('coins')
    .setDescription('Indique le nombre de coins que vous avez'),
  async execute(interaction: import('discord.js').ChatInputCommandInteraction) {
    try {
      // const appService = new AppService();
      // appService.getHello();

      // const prisma = new PrismaService();
      // const user = await prisma.client.user.findMany();
      // console.log(`user : ${JSON.stringify(user)}`);
      const member = interaction.member;
      const user = await verifyUser(member as GuildMember);
      const embed = createEmbed(
        {
          color: 0x0099ff,
          author: {
            name: user.username,
            iconURL: user.avatar,
          },
        },
        `Tu as actuellement **${user.gp} :coin:**`,
      );
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
    }
  },
};
