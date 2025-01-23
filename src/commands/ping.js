const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Répond avec UHhhhh?!'),

  async execute(interaction) {
    try {
      console.log('Commande /ping reçue');

      // Empêche les réponses multiples
      if (interaction.deferred || interaction.replied) {
        console.warn('Interaction déjà différée ou répondue, annulation.');
        return;
      }

      // Diffère la réponse pour éviter un timeout
      await interaction.deferReply();

      // Répond avec le message final
      await interaction.editReply('UHhhhh?!');
    } catch (error) {
      console.error('Erreur lors de l\'exécution de la commande /ping:', error);

      // Gestion des erreurs
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: 'Une erreur est survenue en essayant de répondre.',
          flags: 64,
        });
      }
    }
  },
};