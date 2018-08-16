const admin = require("firebase-admin");
var serviceAccount = require("C:\\Users\\Ilyas.Sung\\OneDrive - UTC Reading\\Think Engineer\\Github Repo\\Backend\\Firestore Example Node JS Code\\te-cattrack-0d7ba9c4ca92.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

db.collection('users').doc('0').collection('Cats').get()
   .then(snapshot => {
     snapshot.forEach(doc => {
       console.log(doc.id, '=>', doc.data()["Identifier"]);
     });
   })
   .catch(err => {
     console.log('Error getting documents', err);
   });
