const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Répond avec "UHhhhh?!"'),

  async execute(interaction) {
    console.log('Commande /ping reçue');  // Log pour voir si la commande est bien reçue
    try {
      await interaction.reply('UHhhhh?!');
    } catch (error) {
      console.error('Erreur lors de l\'exécution de la commande /ping:', error);
      await interaction.reply({ content: 'Une erreur est survenue en essayant de répondre.', ephemeral: true });
    }
  },
};