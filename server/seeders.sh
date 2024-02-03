#!/bin/bash
TYPE=$1
NAME=$2

# a script to start migration
if [ "$TYPE" = "create" ];
then
  npx sequelize-cli seed:generate --name $NAME
elif [ "$TYPE" = "undo" ]; then
  # name should be the name of the whole file including the .js
  npx sequelize-cli db:seed:undo --seed $NAME --config ./config/config.js
else
  npx sequelize-cli db:seed:all --config ./config/config.js
fi