import express from "express";
import { getClient } from "../db";
import Shoutout from "../models/Shoutout";

const shoutoutRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

shoutoutRouter.get("/shoutouts", async (req, res) => {
  try {
    const client = await getClient();
    const cursor = client.db().collection<Shoutout>("shoutouts").find();
    const results = await cursor.toArray();
    res.status(200).json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

shoutoutRouter.post("/shoutouts", async (req, res) => {
  const newShoutout: Shoutout = req.body;
  try {
    const client = await getClient();
    await client.db().collection<Shoutout>("shoutouts").insertOne(newShoutout);
    res.status(201).json(newShoutout);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default shoutoutRouter;
