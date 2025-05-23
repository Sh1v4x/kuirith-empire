import { GuildMember, SlashCommandBuilder } from 'discord.js';
import { verifyUser } from '../services/user.service';
import { createEmbed } from '../utils/embedBuilder';
import { giveDaily } from '../services/gp.service';

export const command = {
  data: new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Récupère tes points journaliers'),
  async execute(interaction: import('discord.js').ChatInputCommandInteraction) {
    try {
      const member = interaction.member;
      const user = await verifyUser(member as GuildMember);
      const message = await giveDaily(user.discord_username);
      const embed = createEmbed(
        {
          color: 0x0099ff,
          author: {
            name: user.username,
            iconURL: user.avatar,
          },
        },
        message,
      );
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
    }
  },
};
