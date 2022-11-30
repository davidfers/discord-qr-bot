import { Client, Interaction } from 'discord.js';

export const interactionCreateHandler = async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
}

export const clientReadyHandler = (client: Client<true>) => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
}
