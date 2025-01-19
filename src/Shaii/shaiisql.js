const mysql = require('mysql2');

// Configuration de la connexion à MySQL
const shaiisql = mysql.createPool({
  host: 'localhost',    // Hôte de la base de données
  user: 'root',         // Utilisateur MySQL
  password: '', // Mot de passe MySQL
  database: 'shaii.bot',   // Nom de la base de données
  waitForConnections: true,
  connectionLimit: 10,
});

// Vérification de la connexion
shaiisql.getConnection((err, connection) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
  } else {
    console.log('Connecté à la base de données MySQL.');
    connection.release();
  }
});

// Créer une table pour les guildes
shaiisql.query(`
  CREATE TABLE IF NOT EXISTS guilds (
    guildId VARCHAR(255) PRIMARY KEY,
    guildName VARCHAR(255) NOT NULL
  )
`, (err) => {
  if (err) console.error('Erreur lors de la création de la table guilds :', err);
});

module.exports = shaiisql;