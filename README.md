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

- remplir vos informations dans un fichier .env (préalablement crée) en copiant le fichier .env.example
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
http://mielpei.barret-alison-dev.xyz//
