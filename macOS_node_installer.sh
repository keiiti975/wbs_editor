#!/bin/bash
MY_DIRNAME=$(dirname $0)
cd $MY_DIRNAME
wget https://nodejs.org/dist/v12.14.1/node-v12.14.1.pkg
sudo installer -pkg node-v12.14.1.pkg -target /