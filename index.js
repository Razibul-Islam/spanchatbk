const express = require("express");
const multer = require("multer");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const upload = multer();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://userData:bmflSGbad1dQttBY@cluster0.bg9rqij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const userDataCollection = client.db("userData").collection("data");

    app.post("/uploadPhoto", upload.none(), async (req, res) => {
      try {
        const data = req.body;
        const result = await userDataCollection.insertOne(data);
        res.send(result);
      } catch (error) {
        console.error("Error storing user data:", error);
        res.status(500).send("Error storing user data");
      }
    });

    app.get("/getUserData", async (req, res) => {
      try {
        const users = await userDataCollection.find({}).toArray();
        res.json(users);
      } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Error fetching user data");
      }
    });
  } finally {
  }
}

app.listen(port, () => {
  console.log("Hello");
});
run().catch(console.dir);
