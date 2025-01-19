const { Client, IntentsBitField, Collection } = require('discord.js');
const shaiisys = require('fs'); // Renommage de fs en shaiisys
const path = require('path');

// Créer le client Discord
const shaii = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

// Charger les commandes (non slash)
shaii.commands = new Collection();
const commandFiles = shaiisys.readdirSync(path.resolve(__dirname, '../commands')).filter(file => file.endsWith('.js'));

if (commandFiles.length === 0) {
  console.log('Aucune commande à charger dans le dossier "commands".');
}

for (const file of commandFiles) {
  const shaiicmd = require(path.resolve(__dirname, '../commands', file));
  shaii.commands.set(shaiicmd.name, shaiicmd); // Charger les commandes classiques
  console.log(`Commande classique chargée: ${shaiicmd.name}`);
}

// Charger les interactions slash

shaii.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const shaiislashcommands = shaii.commands.get(interaction.commandName);
  if (!shaiislashcommands) return;

  try { 
    await shaiislashcommands.execute(interaction); // Exécute les commandes slash
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Une erreur est survenue lors de l\'exécution de cette commande.', ephemeral: true });
  }
});

const eventFiles = shaiisys.readdirSync(path.resolve(__dirname, '../events')).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(path.resolve(__dirname, '../events', file));
  if (event.once) {
    shaii.once(event.name, (...args) => event.execute(...args, shaii));
  } else {
    shaii.on(event.name, (...args) => event.execute(...args, shaii));
  }
  console.log(`Événement chargé: ${event.name}`);
}

// Ecoute la commande "greetings" si le message correspond à une salution
shaii.on('messageCreate', (message) => {
  if (message.author.bot) return; // Ignore les messages des autres bots
  
  const shaiigreetings = shaii.commands.get('greetings');
  if (shaiigreetings) {
    shaiigreetings.execute(message); // Exécute la commande "greetings"
  }
});

module.exports = shaii;