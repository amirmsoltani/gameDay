const baseUrl = 'https://gray-sea-05b034a1e.1.azurestaticapps.net';
const baseCononicalUrl = 'https://gray-sea-05b034a1e.1.azurestaticapps.net';
const apiUrl = 'https://aps-connect-4healing-stg.azurewebsites.net';
const generatorUrl = 'https://aps-connect-4healing-stg.azurewebsites.net/graphql/';
const subscriptionUrl = 'wss://aps-connect-4healing-stg.azurewebsites.net/graphql';
const supportMail = 'support@mychimebeauty.com';

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
        apiKey: "AIzaSyA6S-D8ljGOtDr2tDScyaGE67w1vyVB7qw",
        authDomain: "aps-connect-4healing-stg.firebaseapp.com",
        projectId: "aps-connect-4healing-stg",
        storageBucket: "aps-connect-4healing-stg.appspot.com",
        messagingSenderId: "944770483240",
        appId: "1:944770483240:web:cfb58b99070839ccde611d"
    }
};

module.exports = config;
