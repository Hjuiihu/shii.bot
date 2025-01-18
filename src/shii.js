require('dotenv').config();
const { Client, IntentsBitField, } = require('discord.js');

const shaii = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

shaii.on('ready', () => {
  console.log(`Logged in as ${shaii.user.tag}!`);
});

shaii.on('messageCreate', (message) => {
  console.log(message)

  if (message.author.bot) {
    return;
  }
  if (message.content === 'Hello') {
    message.reply(`Yup !`);
  }
})

shaii.login(process.env.TOKEN);