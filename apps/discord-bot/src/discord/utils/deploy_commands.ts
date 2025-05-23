import { Collection, Client, Interaction, REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

interface Command {
  data: { name: string; toJSON: () => any };
  execute: (interaction: Interaction) => Promise<void>;
}

interface ExtendedClient extends Client {
  commands: Collection<string, Command>;
}

const DeployClient = async (client: ExtendedClient): Promise<void> => {
  client.commands = new Collection();

  const commands: any[] = [];

  const commandsPath: string = join(process.cwd(), './src/discord/commands');
  const commandFiles: string[] = readdirSync(commandsPath).filter(
    (file: string) => file.endsWith('.ts') || file.endsWith('.js'),
  );

  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    try {
      // Import dynamique ESM (async)
      const commandModule = (await import(filePath)) as { command?: Command };
      const command = commandModule.command;

      if (command && 'data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
        console.log(`Command deployed: ${command.data.name}`);
        client.commands.set(command.data.name, command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
        );
      }
    } catch (error) {
      console.error(`[ERROR] Failed to load command at ${filePath}:`, error);
    }
  }

  const rest: REST = new REST().setToken(process.env.DISCORD_TOKEN!);

  await (async (): Promise<void> => {
    try {
      console.log(
        `Started refreshing ${commands.length} application (/) commands.`,
      );

      const data = (await rest.put(
        Routes.applicationGuildCommands(
          process.env.CLIENT_ID!,
          process.env.GUILD_ID!,
        ),
        { body: commands },
      )) as unknown[];

      console.log(
        `Successfully reloaded ${data.length} application (/) commands.`,
      );
    } catch (error) {
      console.error(error);
    }
  })();

  client.on('interactionCreate', (interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`,
      );
      return;
    }

    void (async () => {
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content: 'There was an error while executing this command!',
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true,
          });
        }
      }
    })();
  });
};

export default DeployClient;
