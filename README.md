# API TESTING PROJECT

This project is testing publicly available API using cypress. Technologies used are Visual Studio Code, node.js and Cypress. [Here](https://simple-books-api.glitch.me/) you can find API that is used for testing and its [documentation](https://github.com/vdespa/introduction-to-postman-course/blob/main/simple-books-api.md#submit-an-order). 
This project is made as a part of an internship in which the main subject was web testing using Cypress.

### Installation:
Test cases can be found [here](https://docs.google.com/spreadsheets/d/1D25dH7hj0fixjEcwapn1oEJG2WVxgCb_9Ded_o02558/edit?usp=sharing)

#### Installation steps:
To run this Cypress script, you need to install the following:
1. Download Node.js installer for your OS from the [official page](https://nodejs.org/en/download/). Follow the steps and install node.js on your computer.
2. Open Terminal or Command Prompt and check Node installation with this command: 
```
node -v
```

3. Download Visual Studio Code from the [official page](https://code.visualstudio.com/download) and install VSC following the steps.
4. Download the link of this project to your computer and open it in VSC (more ways to do this step).
5. In command line run following command to install cypress:
 ```
 npm install cypress --save-dev
```
This will install Cypress locally as dev dependency for this project. To be sure that you have successfully installed cypress, open package.json file and search for the cypress version in devDependencies.

6. Open cypress using command: 
```
npx cypress open
```
This will run the test directly in the Terminal of Visual Studio Code.

e2e/APItesting folder contains all Cypress test files and each file tests one of the api functionalities.

Before trying to run the cypress project, you can try and test this api using Postman to gain a better understanding of the api used in this project. 
