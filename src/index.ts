const encryptMessage = require("./encrypt");
const decryptMessage = require("./decrypt");

const app = async () => {
  const args = process.argv.slice(2);

  if (args.length === 0) console.error("Please specify atleast 1 argument");
  else if (args.length === 1) {
    console.log(await encryptMessage(args[0]));
  } else if (args.length === 2) {
    console.log(await decryptMessage(args[0], args[1]));
  } else console.error("Too many arguments");
};

app();
