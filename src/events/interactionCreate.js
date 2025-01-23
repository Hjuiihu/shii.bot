module.exports = {
  name: 'interactionCreate',
  async execute(interaction, shaii) {
    console.log(`Interaction reçue : ${interaction.commandName}`);

    if (!interaction.isCommand()) return;

    const command = shaii.commands.get(interaction.commandName);
    if (!command) {
      console.error(`Commande inconnue : ${interaction.commandName}`);
      return;
    }

    try {
      console.log(`Exécution de la commande : ${interaction.commandName}`);
      await command.execute(interaction);
    } catch (error) {
      console.error(`Erreur lors de l'exécution de la commande ${interaction.commandName}:`, error);

      // Empêche une double réponse en vérifiant l'état de l'interaction
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: 'Une erreur est survenue lors de l\'exécution de cette commande.',
          flags: 64,
        });
      }
    }
  },
};