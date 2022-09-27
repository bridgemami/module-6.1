// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

//import our firebase lib so we get connected to the firestore db
import firebase from '../../lib/firebase';

// export async default api function (async so we can use await inside)
export default async function handler(req, res) {
  //res.status(200).json({ name: 'John Doe' })
  try {
//ask the firestore to get every document in the "resource"(name of the collection) collection
const snapshot = await firebase.collection('characters').get();
//loop through each document in the returned array in a snapshot
let output = [];

snapshot.forEach((doc) => {
  output.push({
    id: doc.id,
    data: doc.data()
  });
}

);
console.log(output);
//return the newly constructed object value of all firestore document data 
res.statusCode = 200;
res.setHeader('Content-Type', 'application/json');
res.json({output});
  }
  catch (error) {
    //if error, show in the node console the whole error object
    console.error(error);
    // also send back to the broswer a 500 server error status and text of error message
    res.status(500).end(err.message);
  }
}
