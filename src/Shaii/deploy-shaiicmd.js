require('dotenv').config();
const { SlashCommandBuilder } = require('discord.js');
const { REST, Routes } = require('discord.js');

const shaiislashcommands = [
  // Ajoutez les commandes ici
  new SlashCommandBuilder().setName('ping').setDescription('Répond avec "UHhhhh?!"'),
  
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