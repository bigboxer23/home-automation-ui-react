[![CodeQL](https://github.com/bigboxer23/home-automation-ui-react/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/bigboxer23/home-automation-ui-react/actions/workflows/github-code-scanning/codeql)

## About

This project is a web front end written in react for [VeraAutomationHub](https://github.com/bigboxer23/VeraAutomationHub).

It provides UI to control services exposed via VeraAutomationHub, including:

1. House climate controls
2. Room's lights
3. Garage door integration ([PiGarage2](https://github.com/bigboxer23/PiGarage2))
4. Scenes defined via OpenHAB
5. Meural artwork control

## Sample UI

<img src='https://user-images.githubusercontent.com/716472/215645227-20a72669-555b-4c65-8f4d-f5e2e3c651dd.PNG' width='250px' alt='main display'/> <img src='https://user-images.githubusercontent.com/716472/215645255-45a73834-51e0-4fc6-bc5d-27b298370cbf.PNG' width='250px' alt='sub page'/>

## Installation

To build this project, run `yarn build`

To debug/develop run `yarn start`

deploy.sh can be used to push content to the public directory created with a deployed VeraAutomationHub so the content can be served.
