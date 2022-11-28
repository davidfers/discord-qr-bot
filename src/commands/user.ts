import { ChatInputCommandInteraction, SlashCommandBuilder, } from 'discord.js';
import { generateQR } from '../utils'

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user2qr")
    .setDescription("Generates a QR code from your username"),
  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.user.username;
    const image = await generateQR(user);
    if (image) {
      await interaction.deferReply();
      await interaction.editReply({
        files: [{
          attachment: image,
          name: `${Date.now()}.png`
        }],
        options: {
          ephemeral: true,
        }
      })
    } else {
      await interaction.reply('Something went wrong... Try again')
    }
  },
};
