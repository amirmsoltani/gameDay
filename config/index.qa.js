const baseUrl = 'https://aps-hep-now-qa.azurewebsites.net';
const baseCononicalUrl = 'https://aps-hep-now-qa.azurewebsites.net';
const apiUrl = 'https://aps-hep-now-qa.azurewebsites.net';
const generatorUrl = 'https://aps-hep-now-qa.azurewebsites.net/graphql';
const subscriptionUrl = 'wss://aps-hep-now-qa.azurewebsites.net/graphql';
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
    containerName: 'images',
    firebase: {
        apiKey: 'AIzaSyBIrZYFYePlv4vy9hSGf_oIg2au549ht5g',
        authDomain: 'aps-hep-now-qa.firebaseapp.com',
        projectId: 'aps-hep-now-qa',
        storageBucket: 'aps-hep-now-qa.appspot.com',
        messagingSenderId: '415652967553',
        appId: '1:415652967553:web:eec731ee6049f452e14980'
    }
};

module.exports = config;
