module.exports = {
  name: 'interactionCreate',
  async execute(interaction, shaii) {
    // Vérifie si l'interaction est une commande
    if (!interaction.isCommand()) return;

    // Récupère la commande basée sur le nom
    const shaiicmd = shaii.commands.get(interaction.commandName);
    if (!shaiicmd) return;

    try {
      // Exécute la commande
      await shaiicmd.execute(interaction);
    } catch (error) {
      console.error(`Erreur lors de l'exécution de la commande ${interaction.commandName}:`, error`\nGuilde : ${interaction.guild?.name || 'DM'} (${interaction.guildId || 'DM'})`,
        `\nUtilisateur : ${interaction.user.tag} (${interaction.user.id})`
      );

      // Répond à l'utilisateur en cas d'erreur
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ 
          content: 'Une erreur est survenue lors de l\'exécution de cette commande.', 
          ephemeral: true,
        });
      } else {
        await interaction.reply({ 
          content: 'Une erreur est survenue lors de l\'exécution de cette commande.', 
          ephemeral: true,
        });
      }
    }
  },
};