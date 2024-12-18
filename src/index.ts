import mongoose from "mongoose";
import { createRequestQueue, getRequestQueues, RequestQueue } from "./db/Requestqueue";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

app.get("/request-queue", async (req, res) => {
  console.log("RequestQueue:", RequestQueue); // Should not be undefined

  try {
    const requestQueue = await RequestQueue.find(); // Fetch all documents
    res.json(requestQueue);
  } catch (error) {
    console.error("Error fetching request queues:", error);
    res.status(500).json({ error: "Failed to fetch request queues" });
  }
});

app.post("/request-queue", async (req, res) => {
  const { topic, creatorRole, participantRole,paymentStatus } = req.body;

  try {
    const newRequest = await createRequestQueue({ topic, creatorRole, participantRole });
    console.log("New Request Queue Created:", newRequest);
    res.status(201).json(newRequest);
  } catch (error) {
    console.error("Error creating request queue:", error);
    res.status(500).json({ error: "Failed to create request queue" });
  }
});

// Server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// MongoDB Connection
mongoose.Promise = Promise;
const url="mongodb+srv://kishore:kishore@cluster0.7lj4e.mongodb.net/testpro?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(url);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (error: Error) => {
  console.error("MongoDB connection error:", error);
});
