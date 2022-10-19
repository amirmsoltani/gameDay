const baseUrl = 'https://aps-game-day-qa.azurewebsites.net';
const baseCononicalUrl = 'https://aps-game-day-qa.azurewebsites.net';
const apiUrl = 'https://aps-game-day-qa.azurewebsites.net';
const generatorUrl = 'https://aps-game-day-qa.azurewebsites.net/graphql/';
const subscriptionUrl = 'wss://aps-game-day-qa.azurewebsites.net/graphql';
const supportMail = 'fatemeh.karami@apsaaz.com';

const config = {
    apiUrl,
    baseUrl,
    generatorUrl,
    baseCononicalUrl,
    subscriptionUrl,
    supportMail,
    blobBaseUrl: 'https://apsgamedaystorage.blob.core.windows.net/images',
    blobUrl:
        'https://apsgamedaystorage.blob.core.windows.net/?sp=racwdli&st=2022-08-03T04:59:48Z&se=2122-08-03T12:59:48Z&spr=https&sv=2021-06-08&sr=c&sig=K7Vr7fRedsPdDPm7AZtnkU8XmHWmkZmPPlgdw2B8E%2F4%3D',
    containerName: 'images',
    firebase: {
        apiKey: "AIzaSyB3a3qh9Kvg9Jb3gMidEU3r9yX332-ZOKs",
        authDomain: "aps-game-day-qa.firebaseapp.com",
        projectId: "aps-game-day-qa",
        storageBucket: "aps-game-day-qa.appspot.com",
        messagingSenderId: "471703418057",
        appId: "1:471703418057:web:5b22b0097206e05b5a4918"
    }
};

module.exports = config;
