const express = requre("express");
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
app.post("/users", async (req, res) => {
  try {
    const { firstname, lastname, username, password } = req.body;

    const user = await client.create({
      firstname,
      lastname,
      username,
      password,
    });

    res.json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    console.log(error);

    res.json({
      status: "error",
      message: "something went wrong",
    });
  }
});

app.get("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await client.findById(userId);

    res.json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "something went wrong",
    });
  }
});

app.patch("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const modifedInfo = req.body;

    const result = await client.findByIdAndUpdate(userId, modifedInfo, {
      new: true,
    });

    res.json({
      status: "success",
      data: { result },
    });
  } catch (error) {
    console.log(error);

    res.json({
      status: "error",
      message: "something went wrong",
    });
  }
});

app.delete("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await User.findByIdAndDelete(userId);

    res.json({
      status: "success",
      data: { result },
    });
  } catch (error) {
    console.log(error);

    res.json({
      status: "error",
      message: "something went wrong",
    });
  }
});

app.listen(port, host, () => console.log(`Listening on ${host}:${port} ...`));
