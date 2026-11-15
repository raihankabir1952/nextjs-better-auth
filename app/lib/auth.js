import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { role } from "better-auth/plugins";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db("better-auth2");

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        autoSignIn: false  //auto sign in off
    },

    //for role
    user: {
      additionalFields: {
        role: {
          type: 'string',
          defaultValue: 'customer',
          input: false
        },
      },
    },
  database: mongodbAdapter(db,{
    client,
  }),
});