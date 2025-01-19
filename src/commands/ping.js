const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')  // Le nom de la commande (c'est ce que l'utilisateur tapera après le "/")
    .setDescription('Répond avec Pong !'),  // Description de la commande, affichée dans Discord

  async execute(interaction) {
    // Répondre à l'interaction avec "Pong!"
    await interaction.reply('UHHhhh?!');
  },
};