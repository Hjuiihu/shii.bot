require('dotenv').config();
const shaii = require('./Shaii/shaiiclient'); // Import du client configuré

// Lorsque le bot est prêt
shaii.on('ready', () => {
  console.log(`
              -%#-
         *@@@@*
        -@@%%@@-
  :====:-@@@@@@=:====:
*@@@@@@@@*+##@#+@@@@@@@*
 #@@@#@%##%.++=#%@*@@@#  by Hjuiihu & Friends
  -*@@%***-  :%@@@@@*-     ▄▄▄·  ▐ ▄  ▄▄▄·
     :#@@%+-%+****:       ▐█ ▀█ •█▌▐█▐█ ▀█ ▪
    -@@@@%@-@@%@@@@-      ▄█▀▀█ ▐█▐▐▌▄█▀▀█
    #@@%%@@=+@@@%@@#      ▐█ ▪▐▌██▐█▌▐█ ▪▐▌
    #@@@@*:  :#@@@@#       ▀  ▀ ▀▀ █▪ ▀  ▀
  `);

  // Affichage du message de connexion
  console.log(`Logged in as ${shaii.user.tag}!`);
});

// Démarre la connexion avec Discord
shaii.login(process.env.TOKEN);