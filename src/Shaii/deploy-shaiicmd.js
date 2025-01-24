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