const baseUrl = 'https://aps-hep-now-dev.azurewebsites.net';
const baseCononicalUrl = 'https://aps-hep-now-dev.azurewebsites.net';
const apiUrl = 'https://aps-hep-now-dev.azurewebsites.net';
const generatorUrl = 'https://aps-hep-now-dev.azurewebsites.net/graphql/';
const subscriptionUrl = 'wss://aps-hep-now-dev.azurewebsites.net/graphql';
const supportMail = 'support@mychimebeauty.com';

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
        apiKey: 'AIzaSyBm7kZSgGozAzbs6kw_8IWuWd_H5EVqxfY',
        authDomain: 'aps-hep-now-dev.firebaseapp.com',
        projectId: 'aps-hep-now-dev',
        storageBucket: 'aps-hep-now-dev.appspot.com',
        messagingSenderId: '142139422371',
        appId: '1:142139422371:web:b6c265cf60670fbd313116'
    }
};

module.exports = config;
