# MaxenceTourneux_7_14052021

Before your start, make sure you have access to a Mysql server. You'll need to create a .env file a the root of your backend file, with the following:

DB_HOST=//your host - if local, localhost
DB_USER=//your username - if local, root
DB_PASSWORD=//your password - if local, empty
DB_DATABASE=groupomania //must be groupomania

DB_NAME_DEV=//your host - if local, localhost
DB_USER_DEV=//your username - if local, root
DB_MDP_DEV=//your password - if local, empty

DB_NAME_PROD=groupomania //must be groupomania
DB_USER_PROD=//username MariaDB
DB_MDP_PROD=//password MariaDB

Then you can go :

npm install

npm start => Production
npm dev => Development
