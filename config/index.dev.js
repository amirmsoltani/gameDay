const baseUrl = 'https://aps-game-day-dev.azurewebsites.net';
const baseCononicalUrl = 'https://aps-game-day-dev.azurewebsites.net';
const apiUrl = 'https://aps-game-day-dev.azurewebsites.net';
const generatorUrl = 'https://aps-game-day-dev.azurewebsites.net/graphql/';
const subscriptionUrl = 'wss://aps-game-day-dev.azurewebsites.net/graphql';
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
        apiKey: 'AIzaSyDXDAJ4SksUEvGLvjdqgNyCJjxbtGddtAg',
        authDomain: 'aps-game-day-dev.firebaseapp.com',
        projectId: 'aps-game-day-dev',
        storageBucket: 'aps-game-day-dev.appspot.com',
        messagingSenderId: '210172595578',
        appId: '1:210172595578:web:c25b8e9ad5aca8201f1ac3'
    }
};

module.exports = config;
