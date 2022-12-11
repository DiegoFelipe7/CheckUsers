require("dotenv").config();
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
var data = require("../conexion.json");
admin.initializeApp({
  credential: admin.credential.cert(data),
});

const db = getFirestore();
module.exports = {
  db,
};
