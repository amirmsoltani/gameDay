const apiUrl = 'https://aps-healthy-prd.azurewebsites.net';
const baseUrl = 'https://witty-sea-0ae5f8e1e.azurestaticapps.net';
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
    blobBaseUrl: 'https://apsconnecthealingstorage.blob.core.windows.net/images',
    blobUrl:
        'https://apsconnecthealingstorage.blob.core.windows.net/?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2032-06-13T17:52:28Z&st=2022-06-13T09:52:28Z&spr=https&sig=JXb%2BKm9C3ZWDQmJ1SoS%2BT4nc78X9RP0Nw8eX%2BCfoLak%3D',
    containerName: 'images',
    firebase: {
        apiKey: "AIzaSyBJSaOdM59d2QnzuHYq8IaojYmR8VW07a8",
        authDomain: "aps-game-day-prd.firebaseapp.com",
        projectId: "aps-game-day-prd",
        storageBucket: "aps-game-day-prd.appspot.com",
        messagingSenderId: "588566845999",
        appId: "1:588566845999:web:0554c18549a17381f084da"
    }
};

module.exports = config;
