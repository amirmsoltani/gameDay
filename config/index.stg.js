const baseUrl = 'https://aps-game-day-stg.azurewebsites.net';
const baseCononicalUrl = 'https://aps-game-day-stg.azurewebsites.net';
const apiUrl = 'https://aps-game-day-stg.azurewebsites.net';
const generatorUrl = 'https://aps-game-day-stg.azurewebsites.net/graphql/';
const subscriptionUrl = 'wss://aps-game-day-stg.azurewebsites.net/graphql';
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
        apiKey: "AIzaSyCiQMRaseeFONED5jLyWujIcSfekcVgJic",
        authDomain: "aps-game-day-stg.firebaseapp.com",
        projectId: "aps-game-day-stg",
        storageBucket: "aps-game-day-stg.appspot.com",
        messagingSenderId: "519966205749",
        appId: "1:519966205749:web:acb18d8188808ebc968e7c"
    }
};

module.exports = config;
