# MielPei-MarketPlace

#Projet de market place de miel à la réunion

Ce projet utilise les technologies suivantes : 
*     Node js en backend
*     Vue en frontend
*     Sequelize 

#Initialisation du projet 

Après avoir fait un git clone de ce projet, vous devez effectué les actions suivantes :

*    backend : cd server && npm install && node ./bin/www
*    frontend : cd client && npm install && npm run serve

Accès à la base de donnée :

- remplir vos informations de bdd dans un fichier config.json (qu'il faudra crée) dans le dossier config (en utilisant l'example un fichier database.json)
- npx sequelize db:create
- npx sequelize db:migrate
- npx sequelize db:seed:all

##Identifiants de connexion :

Producteurs : 
*  email : producteurd@gmail.com
*  mot de passe : test


Admin : 
* admin@gmail.com
*  mot de passe : test


Lien du site internet :
http://31.220.54.89:8081/
