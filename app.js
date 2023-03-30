const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");

app.use(express.json());

const port = 8000;
const host = "127.0.0.1";
const dbName = "MyProject";
const client = new MongoClient(`mongodb://${host}:27017`, dbName);

client.connect();
console.log("Connected successfully to server");
const db = client.db(dbName);
const collection = db.collection("users");

app.get("/users", async (req, res) => {
  try {
    const users = await collection.find({});

    res.json({
      status: "success",
      data: { users },
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "something went wrong",
    });
  }
});
// app.post("/users", async (req, res) => {
//   try {
//     const { firstname, lastname, username, password } = req.body;

//     const user = await client.create({
//       firstname,
//       lastname,
//       username,
//       password,
//     });

//     res.json({
//       status: "success",
//       data: { user },
//     });
//   } catch (error) {
//     console.log(error);

//     res.json({
//       status: "error",
//       message: "something went wrong",
//     });
//   }
// });

app.listen(port, host, () => console.log(`Listening on ${host}:${port} ...`));
