import { EmbedBuilder } from '@discordjs/builders';

export const createEmbed = (
  {
    color = 0x0099ff,
    title = null,
    url = null,
    description = null,
    thumbnail = null,
    image = null,
    footer = null,
    timestamp = null,
    author = null as { name: string; iconURL?: string; url?: string } | null,
  },
  messageReponse: string,
) => {
  const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle(title)
    .setURL(url)
    .setDescription(description)
    .setThumbnail(thumbnail)
    .setImage(image)
    .setFooter(footer)
    .setTimestamp(timestamp)
    .addFields({ name: ' ', value: messageReponse });

  if (author) {
    embed.setAuthor({
      name: author.name,
      iconURL: author.iconURL,
      url: author.url,
    });
  }

  return embed;
};
