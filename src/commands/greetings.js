module.exports = {
  name: 'greetings',  // Utilise `name` directement
  description: 'Répond aux saluts comme "salut", "hello", "hey", "yo"',
  execute(message) {
    const greetings = ['salut', 'hello', 'hey', 'yo'];

    if (greetings.includes(message.content.toLowerCase())) {
      message.reply('Yup !');
    }
  },
};