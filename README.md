# Whack a mole game

live: [Whack a mole](https://krzysztofkot.github.io/blackjack/)

## General info:
This project is a whack a mole game, where You can choose 3 different game levels.

## About app:
When starting game, player can choose one from three different game levels:
- easy: 9 moles, mole speed: 1.5s
- medium: 12 moles, mole speed: 1.2s
- hard: 20 moles, mole speed: 0.8s

Each game duration is 30s, but You can change it in index.js-> App.gameTime. 
Game is counting points 

## Technologies:
 - HTML5 
 - CSS(SCSS)
 - VanillaJS
 - Parcel
 - Cypress

 
## How to lunch my project:
 To run this project, install it locally using npm:
 ```
 $ npm install
 ```
 For lunching in development mode (devserver):
 ```
 $ npm run dev
 ```
 Production build:
 ```
 $ npm run build
 ```
 Open Cypress test runner:
 ```
 $ npm run cypress:open
```
Run CYpress e2e tests:
 ```
 $ npm run cypress:run-full

### Todos

 - add insurance bet option like in real casino game
 - add split card
 - save current cash in local storage
 - add more players (up to 3)


