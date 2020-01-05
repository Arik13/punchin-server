// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;

// let db;

// const mongoConnect = (callback) => {
//     MongoClient.connect(
//         "mongodb+srv://arik:sjEni561gT5JG4np@cluster0-lw22l.mongodb.net/punchin?retryWrites=true&w=majority"
//     )
//         .then(client => {
//             console.log("Connected to mongodb");
//             db = client.db();
//             callback();
//         })
//         .catch(err => {
//             console.log("Mongodb connect error: ", err);
//             throw err;
//         });
// };

// const getDb = () => {
//     if (db) {
//         return db;
//     }
//     throw "No database found";
// }

// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;