const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAPDRX3F8SMa9ar4LLGov5WWe4SM27PpMg",
  authDomain: "genealogyresearchsite.firebaseapp.com",
  projectId: "genealogyresearchsite",
});

var db = firebase.firestore();

const fs = require('fs');
const csv = require('@fast-csv/parse');
const { stringify } = require("querystring");

let i =0;
const f = [];
csv.parseFile('./excel_datasets/final_data.csv')
    .on('error', error => console.error(error))
    .on('data', element =>{
      if (i>0){
        db.collection("oneToMany").add({
          name: element[1],
          sex: element[2],
          email: element[3],
          kitnumber:element[4],
          age: element[5],
          type : element[6],
          Mt: element[7],
          Y : element[8],
          autosomaltotalcm : parseFloat(element[9]),
          autosomallargest : parseFloat(element[10]),
          gen: element[11],
          xdnatotalcm : parseFloat(element[12]),
          xdnalargest : parseFloat(element[13]),
          source: element[14],
          overlap: element[15],
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      }
      i+=1;


    })
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));




  /*

   db.collection("oneToMany").add({
          name: element[0],
          gender: element[1],
          email: element[2],
          kitnumber:element[3],
          age: element[4],
          type : element[5],
          Mt: element[6],
          Y : element[7],
          autosomaltotalcm : element[8],
          autosomallargest : element[9],
          gen: element[10],
          xdnatotalcm : element[11],
          xdnlargest : element[12],
          souce: element[13],
          overlap: element[14],
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
  */



