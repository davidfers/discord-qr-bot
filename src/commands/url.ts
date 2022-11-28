import { ChatInputCommandInteraction, SlashCommandBuilder, } from 'discord.js';
import { generateQR, isUrl } from '../utils'

module.exports = {
  data: new SlashCommandBuilder()
    .setName("url2qr")
    .setDescription("Generates a QR code from a URL")
    .addStringOption((option) =>
      option
        .setName("url")
        .setDescription("Enter a valid url")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("color")
        .setDescription("Pick a color for the QR code")
        .setRequired(true)
        .addChoices(
          { name: 'Black', value: '#17202A' },
          { name: 'Red', value: '#E74C3C' },
          { name: 'Purple', value: '#884EA0' },
          { name: 'Blue', value: '#2E86C1' },
          { name: 'Green', value: '#27AE60' },
          { name: 'Yellow', value: '#F4D03F' },
          { name: 'Orange', value: '#E67E22' },
        )),
  async execute(interaction: ChatInputCommandInteraction) {
    const url = interaction.options.getString('url');
    const color = interaction.options.getString('color');
    if (url && color && isUrl(url)) {
      const image = await generateQR(url, color);
      if (image) {
        await interaction.deferReply();
        await interaction.editReply({
          files: [{
            attachment: image,
            name: `${Date.now()}.png`
          }],
          options: {
            ephemeral: true
          }
        });
      } else {
        await interaction.reply('Something went wrong... Try again')
      }
    } else {
      interaction.reply('Not a good url...')
    }
  },
};
