# AR Haru Game

This project was developed together with Strichpunkt as part of a project work at the Stuttgart Media University. 

It is a small Augmented Reality Game (Tic Tac Toe) which runs as a web application in the browser. You can follow the link [here](https://ar.harus-worlds.com) to play it. Keep in mind that you need a specially designed marker for the tracking. For the best experience you should use your phone with the newest Chrome or Safari version. 

The used tech-stack includes: 
- React, styled-components and Express
- socket.io
- MindAR
- ThreeJS


## Installation and start
To get this running on your own computer you just have to clone this repository and run the following commands: 
- ```npm install```
- ```npm run start:game```
after that the game should be available under localhost:3000


## Known problems
While the application generally works as intended, the tracking of the marker is not good in particular. The marker itself has to many similar aspects and thus the tracker has a hard time to recognize it. 
