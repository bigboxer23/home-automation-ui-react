## About
This project is a web front end written in react for [VeraAutomationHub](https://github.com/bigboxer23/VeraAutomationHub).

It provides UI to control services exposed via VeraAutomationHub, including: 
1) House climate controls
2) Room's lights
3) Garage door integration ([PiGarage2](https://github.com/bigboxer23/PiGarage2))
4) Scenes defined via OpenHAB
5) Meural artwork control 

## Sample UI
<img src='https://user-images.githubusercontent.com/716472/214951617-84efab9b-1083-4707-bb5b-c9a935f63418.png' width='250px'/> <img src='https://user-images.githubusercontent.com/716472/214954054-4892999b-db47-47a7-bbda-0e71d4d9bc09.png' width='250px'/>

## Installation
To build this project, run `yarn build`

To debug/develop run `yarn start`

deploy.sh can be used to push content to the public directory created with a deployed VeraAutomationHub so the content can be served.
