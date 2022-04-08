import { writeFileSync } from "fs";

const encryptMessage = require("./encrypt");
const decryptMessage = require("./decrypt");

const app = async () => {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("index.js - available command overview");
    console.log("index.js [message] - encrypt the massage and generate a key");
    console.log(
      "index.js [massage] [key] - encrypt the message with a set key"
    );
    console.log("index.js [anything] [massage] [key] - decrypt a message");
  } else if (args.length === 1) {
    const enc = await encryptMessage(args[0]);
    console.log(enc);
    writeFileSync("secret.txt", enc.message);
  } else if (args.length === 2) {
    const enc = await encryptMessage(args[0], args[1]);
    console.log(enc);
    writeFileSync("secret.txt", enc.message);
  } else if (args.length === 3) {
    console.log(await decryptMessage(args[1], args[2]));
  } else console.error("Too many arguments");
};

app();
