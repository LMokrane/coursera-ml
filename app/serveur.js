require('dotenv').config();
let serveur = require('app');
let routes = require('routeur');
serveur.use(`/${process.env.APP}`, routes);
serveur.listen(process.env.PORT, () => console.log(`En ecoute sur le port ${process.env.PORT}`));
module.exports = serveur;
