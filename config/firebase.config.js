const admin = require('firebase-admin');
const dotenv = require('dotenv');


// Initialization
dotenv.config();


const credentialsOptions = {
	"type": "service_account",
	"project_id": process.env.PROJECT_ID,
	"private_key_id": process.env.PRIVATE_KEY_ID,
	"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDHWgX644Zu5NjO\ni6Sfu0um0vPFZl47fqI2uMwNmvjlYytoslaiopweX8FUz33OmP5UOT/5QQLqV9F5\nIZmhB1Xazdu2SjQvV0B0zQg0qNscNTUHyPMxT4re+sngLs9uBogW8MORYfHmiFTS\n2YldtDG5DYGYzGjCxw2SghtaT/3uew9bj0BkSvItR8n0dYHBfPLNiT7/yDyhNzU1\nuNkda8TShrOhv6v5lrsBShcTaohCyDAjKBB/77acF7C2SxL2Eb5A+ulIBaJLh28l\nm4hRdxfchdVhTGVcbWzdNSUSflAE91YJbOSXxyafKb1FrjPGl4IF80PynjrLOoKz\ntUIULjdJAgMBAAECggEAKXNriOZkXoyRFClvGpN8QHzemS4W6/IB0rUMIMwXcsLz\nFLr4TqrXIW2xqmvWce3X/DVHOxGshIOsF67H3fbDgFKLm9TEEw/mZCL50NFHdg8O\nLsc24grzCjhFX6r8EJmlFHgNgh5GiTPRx2HaMTS1ng/T4aynH9D53nvVKis11q87\nm3I4tOEzNQglF7EuMOkIqpSCz0Jy3sYBWTgRceIgYfOHA4iJZMeG22X08LMhGASn\nWKZ21u9ZRFS8z6PYDSwjrSjAya27TsZeDKi6jljCXu/7dt1We+VD4Lokf0J3KV7w\n2uwynp0aE68CDCk6zgTMdZ4NDxpP8toxY7M/Vn87bQKBgQD0yiXxCQjcS3pRzfEj\no2NNh3uSGBpG/wilFMMhmQLTsrN8jtVbRmWHlOBOrbOIhHU10ATOOlo85ODp+1fI\nf0IVFt5PUTPUhK2e9fOTDftVtxRUNNIAHLhf/9Y/NWvCs/37uwXWcAQiqSd6HOMf\nq6TsN+U6X4/8+iGE1/Xod2pvIwKBgQDQeyvzhwglqHqtEwfV/abx31O0ArB0pKBe\nImYG++EwBOf0rqSQNdVJYtEjZ3+LwSWVXKDau77qAcuUUdkNY8byYzuLGJsxRyXr\naCtTfnKO9aAzGd1a1j77qByAzgtPuCVm+ILK2QiuPlDBmzcLLVjF9wlsDIoKskRK\nE343q6H8owKBgDAE15yI4SwVwlD5zSvoiTpUMXFfOQhkTxXTFNQqZ9uPWpY8jq3x\nCUmncrj8ahOFqFh+DfNGjx0S6Ov9WiMCk7v/WGzGyRwPSt+776QRQhR2bY53LhrH\nh4ONdEHCAPmYxWH0NhjysFz8Qbo6oHM+AIQ2Esl4pY5CowCkPKD1i/NxAoGASqRO\n0BoAaLsxcNXncE4of2Cd700nMBvg7tMSBF4Z+b9H7Oq6MIeVnXiruClOGRNGCXvo\ne2fMqquJ38iOFaUrjYzJvLtKlRIMGYRqPrJ/AYAfoywXfHZIhoFh8xvSIPClM4C2\nEzoxSXE2KJsR0gaiSf5weSbkJYA9wufHwNbKYFECgYAP/YEE/wivig+yCGs2Vspv\nFlE9YFDAt3rIN496eGH+m4CMaB0M3BxPnqNjxahgiKUm8lqZZtiQlwUAkebjcL7B\nhwe2CwPZ5r0NSkm2lncqlbNb/VZIvCzDe4++h0HCE/w8wmRCCJOkyPI+uQEJH+8Z\nO25jQ6tNI7mOOTsGtNhoew==\n-----END PRIVATE KEY-----\n", 
	"client_email": process.env.CLIENT_EMAIL,
	"client_id": process.env.CLIENT_ID,
	"auth_uri": process.env.AUTH_URI,
	"token_uri": process.env.TOKEN_URI,
	"auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
	"client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
}

exports.initializeFirebase = () => {
    admin.initializeApp({	
        credential: admin.credential.cert(credentialsOptions)
    });
}
