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

//Fonction pour charger les commandes depuis un dossier
function loadCommands(dir) { 
  const ShaiicmdFiles = shaiisys.readdirSync(dir, { withFileTypes: true });

  if (ShaiicmdFiles.length === 0) {
    console.log('Aucune commande à charger dans le dossier "commands".');
  }

  for (const file of ShaiicmdFiles) {
    const fullPath = path.resolve(dir, file.name);
    if (file.isDirectory()) {
      loadCommands(fullPath); // appel récursif pour les dossiers
    } else if (file.name.endsWith('.js')) {
      const shaiicmd = require(fullPath);

      if (shaiicmd.data) {
        // pour les commandes slash
        shaii.commands.set(shaiicmd.data.name, shaiicmd);
        console.log(`Commande Slash chargée : ${shaiicmd.data.name}`);
      } else if (shaiicmd.name) {
        // pour les commandes  classiques
        shaii.commands.set(shaiicmd.name, shaiicmd);
        console.log(`commande classique chargée : ${shaiicmd.name}`);
      } else {
        console.log(`Commande non valide : ${file.name}`);
      }
    }
  }
}

// Charger les commandes depuis le dossier `commands` et `commands/premium`
loadCommands(path.resolve(__dirname, '../commands', '../commands/premium'));


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