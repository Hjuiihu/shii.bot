const { SlashCommandBuilder, EmbedBuilder, Colors } = require('discord.js');

// Fonction pour générer une couleur aléatoire
function generateRandomColor() {
  const randomHex = Math.floor(Math.random() * 16777215).toString(16); // Génère un HEX aléatoire
  return `#${randomHex.padStart(6, '0')}`; // Assure une longueur de 6 caractères
}

// Fonction pour convertir des noms de couleurs ou HEX
function resolveColorInput(input) {
  if (!input) return parseInt(generateRandomColor().replace('#', ''), 16);

  const colorName = Colors[input.toUpperCase()];
  if (colorName) return colorName;

  if (/^#?[0-9A-F]{6}$/i.test(input)) {
    return parseInt(input.replace('#', ''), 16);
  }

  throw new Error(`La couleur "${input}" n'est pas valide. Utilisez un code HEX ou un nom standard.`);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shaiiembed')
    .setDescription('Créer un message Embed personnalisé.')
    .addChannelOption(option =>
      option.setName('salon')
        .setDescription('Salon où envoyer l\'Embed.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('titre')
        .setDescription('Titre de l\'Embed.')
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('description')
        .setDescription('Description de l\'Embed.')
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('couleur')
        .setDescription('Couleur de l\'Embed (HEX ou nom de couleur standard).')
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('url')
        .setDescription('Lien associé au titre de l\'Embed.')
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('author')
        .setDescription('Nom de l\'auteur de l\'Embed.')
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('author_icon')
        .setDescription('URL de l\'icône de l\'auteur.')
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('footer')
        .setDescription('Texte du bas de l\'Embed.')
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('footer_icon')
        .setDescription('URL de l\'icône du footer.')
        .setRequired(false)
    )
    .addBooleanOption(option =>
      option.setName('timestamp')
        .setDescription('Ajouter un timestamp à l\'Embed.')
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('image')
        .setDescription('URL de l\'image pour l\'Embed.')
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('thumbnail')
        .setDescription('URL de la miniature pour l\'Embed.')
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('field1_name')
        .setDescription('Nom du premier champ.')
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('field1_value')
        .setDescription('Valeur du premier champ.')
        .setRequired(false)
    )
    .addBooleanOption(option =>
      option.setName('field1_inline')
        .setDescription('Afficher le champ 1 en ligne ?')
        .setRequired(false)
    ),

  async execute(interaction) {
    const titre = interaction.options.getString('titre');
    const description = interaction.options.getString('description');
    const couleur = interaction.options.getString('couleur');
    const url = interaction.options.getString('url');
    const author = interaction.options.getString('author');
    const authorIcon = interaction.options.getString('author_icon');
    const footer = interaction.options.getString('footer');
    const footerIcon = interaction.options.getString('footer_icon');
    const timestamp = interaction.options.getBoolean('timestamp');
    const image = interaction.options.getString('image');
    const thumbnail = interaction.options.getString('thumbnail');
    const field1Name = interaction.options.getString('field1_name');
    const field1Value = interaction.options.getString('field1_value');
    const field1Inline = interaction.options.getBoolean('field1_inline');
    const salon = interaction.options.getChannel('salon');

    // Créer l'Embed
    const embed = new EmbedBuilder();
    if (titre) embed.setTitle(titre);
    if (description) embed.setDescription(description);
    if (url) embed.setURL(url);

    try {
      embed.setColor(resolveColorInput(couleur));
    } catch (error) {
      return interaction.reply({ content: error.message, ephemeral: true });
    }

    if (author) embed.setAuthor({ name: author, iconURL: authorIcon || null });
    if (footer) embed.setFooter({ text: footer, iconURL: footerIcon || null });
    if (timestamp) embed.setTimestamp();
    if (image) embed.setImage(image);
    if (thumbnail) embed.setThumbnail(thumbnail);

    if (field1Name && field1Value) {
      embed.addFields({
        name: field1Name,
        value: field1Value,
        inline: field1Inline || false,
      });
    }

    try {
      await salon.send({ embeds: [embed] });
      await interaction.reply({ content: 'Embed envoyé avec succès !', ephemeral: true });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'Embed :', error);
      await interaction.reply({ content: 'Une erreur est survenue lors de l\'envoi de l\'Embed.', ephemeral: true });
    }
  },
};