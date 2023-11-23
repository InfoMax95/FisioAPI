import express, { Request, Response } from "express";
import { MongoClient, ServerApiVersion } from 'mongodb';
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import router from "router";

const app = express();

app.use(cors({
    credentials: true,
}));
app.use("/", router());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;
const uri: string = process.env.DB_CONN || "mongodb+srv://massimilianogasaro95:<password>@api-giorgia.k3obtav.mongodb.net/?retryWrites=true&w=majority";

const server = http.createServer(app);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`)
});

run().catch(console.dir);
