const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('textme')
    .setDescription('Envoyer ou modifier un message via le bot.')
    // Option obligatoire en premier
    .addChannelOption(option =>
      option.setName('salon')
        .setDescription('Le salon où envoyer le message.')
        .setRequired(true)
    )
    // Options facultatives ensuite
    .addStringOption(option =>
      option.setName('contenu')
        .setDescription('Le contenu du message.')
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('image')
        .setDescription('URL de l\'image à attacher.')
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('modifier')
        .setDescription('ID du message à modifier (doit être envoyé par le bot).')
        .setRequired(false)
    ),

  async execute(interaction) {
    const contenu = interaction.options.getString('contenu');
    const image = interaction.options.getString('image');
    const salon = interaction.options.getChannel('salon');
    const modifier = interaction.options.getString('modifier');

    // Logique de la commande ici
    try {
      if (modifier) {
        const message = await salon.messages.fetch(modifier);
        if (!message || message.author.id !== interaction.client.user.id) {
          return interaction.reply({
            content: 'Impossible de modifier ce message.',
            ephemeral: true,
          });
        }
        await message.edit({
          content: contenu || message.content,
          embeds: image ? [{ image: { url: image } }] : message.embeds,
        });
        return interaction.reply({ content: `Message modifié dans ${salon}`, ephemeral: true });
      } else {
        const payload = { content: contenu || '' };
        if (image) payload.embeds = [{ image: { url: image } }];
        await salon.send(payload);
        return interaction.reply({ content: `Message envoyé dans ${salon}`, ephemeral: true });
      }
    } catch (error) {
      console.error('Erreur dans la commande /textme :', error);
      return interaction.reply({ content: 'Une erreur est survenue.', ephemeral: true });
    }
  },
};