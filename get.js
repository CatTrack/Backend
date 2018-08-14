const admin = require("firebase-admin");

var serviceAccount = require("C:\\Users\\Ilyas.Sung\\OneDrive - UTC Reading\\Think Engineer\\TestQueries\\te-cattrack-0d7ba9c4ca92.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

var collectionRef = db.collection("users");

collectionRef.get().then(snapshot => {
     snapshot.forEach(doc => {
       console.log("Parent Document ID: ", doc.id);

       let subCollectionDocs = collectionRef.doc(doc.id).collection("subCollection").get()
         .then(snapshot => {
           snapshot.forEach(doc => {
             console.log("Sub Document ID: ", doc.id);
           })
         }).catch(err => {
           console.log("Error getting sub-collection documents", err);
         })
     });
   }).catch(err => {
   console.log("Error getting documents", err);
 });