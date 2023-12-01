#!/bin/bash
TYPE=$1
# a script to start migration
if [ "$TYPE" = "undo" ]; then
  npx sequelize db:migrate:undo --config ./config/dbConfig.js
else
  npx sequelize db:migrate --config ./config/dbConfig.js
fi