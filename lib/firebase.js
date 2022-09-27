//we have to load the firebase-admin in order to interact with our firebase project
import admin from 'firebase-admin';

//to get ready to send a authentication request to firebase, we load the json
//we load the json string and convert to an actual JSON object (instead of loading file)
//this is more secure
const serviceAccount = JSON.parse(
//NEXT_PUBLIC_FIREBASE_DATABASE_PRIVATEKEY is coming from .evn.local
    process.env.NEXT_PUBLIC_FIREBASE_DATABASE_PRIVATEKEY
);

//let's wrap all of our code that tries to talk to firebase in a try{}
try {
    admin.initializeApp(
        {//serviceAccount comes from the const
            credential: admin.credential.cert(serviceAccount),
            databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
        }
    )
}
catch(err) {
    //if error happens...
    console.log('firebase error: '+ err.stack)
}

export default admin.firestore();