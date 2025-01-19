require('dotenv').config();
const { SlashCommandBuilder } = require('discord.js');
const { REST, Routes } = require('discord.js');

const shaiislashcommands = [
  // Ajoutez les commandes ici
  new SlashCommandBuilder().setName('ping').setDescription('Répond avec "UHhhhh?!"'),
];

//créer une instance REST pour interagir avec l'application
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// register commands globally
(async () => {
  try {
    console.log('Déploiement des commandes globales...');

    await rest.put(
      Routes.applicationCommands(process.env.BOT_ID),
      { body: shaiislashcommands.map(command => command.toJSON()) }
    );

    console.log('Commandes déployées avec succès !');
  } catch (err) {
    console.error('Erreur lors du déploiement des commandes globales:', err);
  }
})();