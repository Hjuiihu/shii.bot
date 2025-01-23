const { Client, IntentsBitField, Collection } = require('discord.js');
const shaiisys = require('fs'); // Renommage de fs en shaiisys
const path = require('path');

// Créer le client Discord
const shaii = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

// Charger les commandes (slash et classiques)
shaii.commands = new Collection();
const ShaiicmdFiles = shaiisys.readdirSync(path.resolve(__dirname, '../commands')).filter(file => file.endsWith('.js'));

if (ShaiicmdFiles.length === 0) {
  console.log('Aucune commande à charger dans le dossier "commands".');
}

for (const file of ShaiicmdFiles) {
  const shaiicmd = require(path.resolve(__dirname, '../commands', file));

  if (shaiicmd.data) {
    // Pour les commandes Slash
    shaii.commands.set(shaiicmd.data.name, shaiicmd);
    console.log(`Commande Slash chargée: ${shaiicmd.data.name}`);
  } else if (shaiicmd.name) {
    // Pour les commandes classiques
    shaii.commands.set(shaiicmd.name, shaiicmd);
    console.log(`Commande classique chargée: ${shaiicmd.name}`);
  } else {
    console.warn(`Commande non valide : ${file}`);
  }
}

// Charger les événements
const ShaiieventFiles = shaiisys.readdirSync(path.resolve(__dirname, '../events')).filter(file => file.endsWith('.js'));

for (const file of ShaiieventFiles) {
  const Shaiievent = require(path.resolve(__dirname, '../events', file));
  if (Shaiievent.once) {
    shaii.once(Shaiievent.name, (...args) => Shaiievent.execute(...args, shaii));
  } else {
    shaii.on(Shaiievent.name, (...args) => Shaiievent.execute(...args, shaii));
  }
  console.log(`Événement chargé: ${Shaiievent.name}`);
}

// Gérer les messages classiques, comme les salutations
shaii.on('messageCreate', (message) => {
  if (message.author.bot) return; // Ignore les messages des autres bots
  
  const shaiigreetings = shaii.commands.get('greetings');
  if (shaiigreetings) {
    shaiigreetings.execute(message); // Exécute la commande "greetings"
  }
});

// Exporter le client
module.exports = shaii;

// ��█    █▄ ��█   ��█  ��█
//      
//                -%#-
//               *@@@@*
//              -@@%%@@-
//        :====:-@@@@@@=:====:
//      *@@@@@@@@*+##@#+@@@@@@@*
//       #@@@#@%##%.++=#%@*@@@#  by Hjuiihu & Friends
//        -*@@%***-  :%@@@@@*-     ▄▄▄·  ▐ ▄  ▄▄▄·
//           :#@@%+-%+****:       ▐█ ▀█ •█▌▐█▐█ ▀█ ▪
//          -@@@@%@-@@%@@@@-      ▄█▀▀█ ▐█▐▐▌▄█▀▀█
//          #@@%%@@=+@@@%@@#      ▐█ ▪▐▌██▐█▌▐█ ▪▐▌
//          #@@@@*:  :#@@@@#       ▀  ▀ ▀▀ █▪ ▀  ▀