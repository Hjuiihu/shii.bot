require('dotenv').config();
const { SlashCommandBuilder } = require('discord.js');
const { REST, Routes } = require('discord.js');

const shaiislashcommands = [
  // Ajoutez les commandes ici

  // Commande Ping
  new SlashCommandBuilder().setName('ping').setDescription('Répond avec "UHhhhh?!"'),
  
  // Commande Clear
  new SlashCommandBuilder()
  .setName('clear')
  .setDescription('❱•❰ Ana. Vous fait le Nettoyages ^^')
  .addIntegerOption(option =>
    option.setName('amount')
      .setDescription('Le nombre de messages à supprimer (1-100)')
      .setRequired(true)
      .setMinValue(1)
      .setMaxValue(100)
  ),

 // Commande Textme
 new SlashCommandBuilder()
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

  // Commande Shaiiembed
 new SlashCommandBuilder()
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
];

//créer une instance REST pour interagir avec l'application
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// register commands globally
(async () => {
  try {
    console.log('Déploiement des commandes globales...');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: shaiislashcommands.map(command => command.toJSON()) }
    );

    console.log('Commandes déployées avec succès !');
  } catch (err) {
    console.error('Erreur lors du déploiement des commandes globales:', err);
  }
})();