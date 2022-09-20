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
    blobBaseUrl: 'https://apsconnecthealingstorage.blob.core.windows.net/images',
    blobUrl:
        'https://apsconnecthealingstorage.blob.core.windows.net/?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2032-06-13T17:52:28Z&st=2022-06-13T09:52:28Z&spr=https&sig=JXb%2BKm9C3ZWDQmJ1SoS%2BT4nc78X9RP0Nw8eX%2BCfoLak%3D',
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
