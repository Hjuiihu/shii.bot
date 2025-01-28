const shaiisql = require('../Shaii/shaiisql'); // Corrige le chemin d'importation

module.exports = {
  name: 'ready',
  once: true,
  execute(shaii) {
    // Enregistrer les guildes dans la base de données
    shaii.guilds.cache.forEach((guild) => {
      shaiisql.query(
        `INSERT INTO guilds (guildId, guildName) VALUES (?, ?) ON DUPLICATE KEY UPDATE guildName = ?`,
        [guild.id, guild.name, guild.name],
        (err) => {
          if (err) {
            console.error(`Erreur lors de l'enregistrement de la guilde ${guild.id}:`, err);
          }
        }
      );
    });

    //logs du nombre de server et leurs nom
    const serverCount = shaii.guilds.cache.size;
    const serverNames = shaii.guilds.cache.map((guild) => guild.name).join(' | ');
    console.log(`❱•❰ Ana. est connecté à ${serverCount} serveurs :`);
    console.log(serverNames);
  },
};