import { Client, Guild, TextChannel } from 'discord.js';
import Channel from '../class/channel';

const channelList: Channel[] = [];
const memberList: string[] = [];

function handleReady(client: Client) {
  console.log(`Logged in as ${client.user?.tag}!`);

  client.guilds.cache.forEach((guild: Guild) => {
    guild.channels.cache.forEach((channel) => {
      if (channel instanceof TextChannel) {
        const newChannel: Channel = new Channel();
        newChannel.add(channel.id, channel.name);
        channelList.push(newChannel);
      }
    });

    guild.members
      .fetch()
      .then((members) => {
        members.forEach((member) => {
          memberList.push(member.user.username);
        });
      })
      .catch(console.error);
  });

  client.user?.setActivity({
    name: 'Development in progress ...',
  });
}

export { handleReady, channelList, memberList };
