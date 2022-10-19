const apiUrl = 'https://aps-healthy-prd.azurewebsites.net';
const baseUrl = 'https://witty-sea-0ae5f8e1e.azurestaticapps.net';
const baseCononicalUrl = 'https://witty-sea-0ae5f8e1e.azurestaticapps.net';
const subscriptionUrl = 'wss://aps-healthy-prd.azurewebsites.net/graphql';
const supportMail = 'support@nubba.com';
const generatorUrl = 'https://aps-genues-hotel-dev.azurewebsites.net/graphql/';

const config = {
    apiUrl,
    baseUrl,
    baseCononicalUrl,
    subscriptionUrl,
    generatorUrl,
    supportMail,
    blobBaseUrl: 'https://apsgamedaystorage.blob.core.windows.net/images',
    blobUrl:
        'https://apsgamedaystorage.blob.core.windows.net/?sp=racwdli&st=2022-08-03T04:59:48Z&se=2122-08-03T12:59:48Z&spr=https&sv=2021-06-08&sr=c&sig=K7Vr7fRedsPdDPm7AZtnkU8XmHWmkZmPPlgdw2B8E%2F4%3D',
    containerName: 'images',
    firebase: {
        apiKey: 'AIzaSyD5ACiY63e-NrL4qBB2-NywAmuJWJpFRLg',
        authDomain: 'aps-healthy-prd.firebaseapp.com',
        projectId: 'aps-healthy-prd',
        storageBucket: 'aps-healthy-prd.appspot.com',
        messagingSenderId: '298152592253',
        appId: '1:298152592253:web:6c44e469d2610ccbe0c214'
    }
};

module.exports = config;
