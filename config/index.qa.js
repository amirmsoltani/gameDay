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
    blobBaseUrl: 'https://apshepnowstorage.blob.core.windows.net/images',
    blobUrl:
        'https://apshepnowstorage.blob.core.windows.net/images?sp=racwdli&st=2022-07-15T18:15:01Z&se=2122-07-16T02:15:01Z&spr=https&sv=2021-06-08&sr=c&sig=tkOVBEQyX%2FRTwymp9%2F4K7CjZD17yErg6FySE2oehBVA%3D',
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
