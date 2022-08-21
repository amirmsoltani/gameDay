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
    blobBaseUrl: 'https://apshealthystorage.blob.core.windows.net/images',
    blobUrl:
        'https://apshealthystorage.blob.core.windows.net/?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2032-02-01T15:20:31Z&st=2022-02-01T07:20:31Z&spr=https&sig=7NKKvTpHCROh5RshoAKiGHlXgJv5%2FpI3CmLAsAlW3tw%3D',
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
