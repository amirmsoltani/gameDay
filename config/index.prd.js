const baseUrl = 'https://aps-game-day-prd.azurewebsites.net';
const baseCononicalUrl = 'https://aps-game-day-prd.azurewebsites.net';
const apiUrl = 'https://aps-game-day-prd.azurewebsites.net';
const generatorUrl = 'https://aps-game-day-prd.azurewebsites.net/graphql/';
const subscriptionUrl = 'wss://aps-game-day-prd.azurewebsites.net/graphql';
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
        apiKey: 'AIzaSyBJSaOdM59d2QnzuHYq8IaojYmR8VW07a8',
        authDomain: 'aps-game-day-prd.firebaseapp.com',
        projectId: 'aps-game-day-prd',
        storageBucket: 'aps-game-day-prd.appspot.com',
        messagingSenderId: '588566845999',
        appId: '1:588566845999:web:0554c18549a17381f084da'
    }
};

module.exports = config;
