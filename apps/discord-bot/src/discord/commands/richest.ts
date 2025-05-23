import { SlashCommandBuilder } from 'discord.js';
import { getRichest } from '../services/gp.service';

export const command = {
  data: new SlashCommandBuilder()
    .setName('richest')
    .setDescription('Affiche le classement de GP (Gils premium).'),
  async execute(interaction: import('discord.js').ChatInputCommandInteraction) {
    try {
      const richest = await getRichest();
      const userClassification = richest.topUsers.map((user, index) => {
        const rank = (() => {
          switch (index) {
            case 0:
              return ':first_place:';
            case 1:
              return ':second_place:';
            case 2:
              return ':third_place:';
            default:
              return `${index + 1}.`;
          }
        })();

        return {
          username: `${rank} ${user.username}`,
          gp: user.gp,
        };
      });

      const fields = [
        {
          name: ':bank: Total du serveur',
          value: `:coin: ${richest.totalGp}`,
          inline: false,
        },
        ...userClassification.map((user) => ({
          name: user.username,
          value: `:coin: ${user.gp}`,
          inline: false,
        })),
      ];

      const embed = {
        color: parseInt('0099ff', 16),
        title: 'Kuirith Empire - Joueurs les plus riches',
        fields,
      };

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
    }
  },
};
