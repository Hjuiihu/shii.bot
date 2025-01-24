const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear') // Nom de la commande
    .setDescription('❱•❰ Ana. Vous fait le Nettoyages ^^')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Le nombre de messages à supprimer (1 à 100)')
        .setRequired(true) // Ajout de l'option amount
        .setMinValue(1) // Valeur minimale du nombre de messages
        .setMaxValue(100) // Valeur maximale du nombre de messages
    ),
  
  async execute(interaction) {
    const amount = interaction.options.getInteger('amount'); // Récupération de la valeur de l'option amount
    console.log(`Option récupérée: amout = ${amount}`);

    // verifie si l'user a la permission de gérer les messages
    if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
      return interaction.reply({
        content: "Sorry, mais tu n'as pas le droit de faire cela ;-;",
        ephemeral: true,
      });
    }

    try {
      // Supprime les messages dans le salon actuel
      const deletedMessages = await interaction.channel.bulkDelete(amount, true);

      return interaction.reply({
        content: `J'ai supprimé **${deletedMessages.size}** messages !!`,
        ephemeral: true,
      });
    } catch (error) { 
      console.error('❱•❰ Ana. à eu une erreur lors de la suppression des messages :', error);
      return interaction.reply({
        content: 'Une erreur est survenue lors de la suppression des messages',
        ephemeral: true,
      });
    }
  },
};