require('dotenv').config();
let serveur = require('app');
let mnist = require('routes_mnist');
serveur.use(`/${process.env.APP}/mnist`, mnist);
serveur.listen(process.env.PORT, () => console.log(`En ecoute sur le port ${process.env.PORT}`));
module.exports = serveur;
