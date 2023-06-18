import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

export const list = process.env.SPREAD_LIST;
export const uri = process.env.MONGO_URI;
export const db = process.env.MONGO_DB;
export const coll = process.env.MONGO_COLLECTION;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
