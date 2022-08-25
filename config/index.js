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
    blobBaseUrl: 'https://apshepnowstorage.blob.core.windows.net/images',
    blobUrl:
        'https://apshepnowstorage.blob.core.windows.net/images?sp=racwdli&st=2022-07-15T18:15:01Z&se=2122-07-16T02:15:01Z&spr=https&sv=2021-06-08&sr=c&sig=tkOVBEQyX%2FRTwymp9%2F4K7CjZD17yErg6FySE2oehBVA%3D',
    // blobUrl:'https://apsconnecthealingstorage.blob.core.windows.net/?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2032-06-13T17:52:28Z&st=2022-06-13T09:52:28Z&spr=https&sig=JXb%2BKm9C3ZWDQmJ1SoS%2BT4nc78X9RP0Nw8eX%2BCfoLak%3D',
    containerName: 'images',
    firebase: {
        apiKey: "AIzaSyDXDAJ4SksUEvGLvjdqgNyCJjxbtGddtAg",
        authDomain: "aps-game-day-dev.firebaseapp.com",
        projectId: "aps-game-day-dev",
        storageBucket: "aps-game-day-dev.appspot.com",
        messagingSenderId: "210172595578",
        appId: "1:210172595578:web:c25b8e9ad5aca8201f1ac3"
      }
};

module.exports = config;
