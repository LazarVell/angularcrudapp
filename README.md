# Angularcrudapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5.

# About the app

I created this app for the purpose of learning more about the Angular framework. This is a rework of my old crud app that can be found here: https://github.com/LazarVell/crudapp

The main difference is that this app reuses 1 form to handle both adding and editing contacts, as well as supporting a local JSON storage to store the contacts, which can be loaded back into the webpage, even after PC restart.

## JSON server

This app is setup to work with a local JSON server. If you wish to download the code and use it in a local angular enviroment, please do the following:
1. Install JSON server ( npm install -g json-server)
2. run the command "json-server --watch db.json" without the ""
3. the default port should be 3000 for the app to work properly.
