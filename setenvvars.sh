#!/usr/bin/env bash

export SERVER_PORT=${SERVER_PORT:=3000}
export MONGO_URI=${MONGO_URI:=mongodb://localhost:27017/blog}

npm start