const axios = require("axios");
const generateKey = require("./key");

interface Response {
  data: {
    activity: string;
    participants: number;
    price: number;
    key: string;
  };
}

interface Junk {
  intial: string;
  key: string;
}

interface EncryptedMessage {
  message: string;
  key: string;
}

const p_encryptMessage = async (message: string): Promise<EncryptedMessage> => {
  const resolvedGenerateJunkStart = await generateJunk();
  const resolvedGenerateJunkEnd = await generateJunk();

  let seed1 = (await generateJunk()).key;
  seed1 = seed1[seed1.length - 1];

  let seed2 = (await generateJunk()).key;
  seed2 = seed2[seed2.length - 1];

  const [junkStart, junkEnd] = [
    resolvedGenerateJunkStart.intial,
    resolvedGenerateJunkEnd.intial
  ];

  let encrypted: any = `${junkStart} ${message} ${junkEnd}`
    .toLowerCase()
    .split("");

  encrypted = encrypted.map((char: string, index: number) => {
    return index % 2 == 0
      ? String.fromCharCode(char.charCodeAt(0) + (Number.parseInt(seed1) % 3))
      : String.fromCharCode(char.charCodeAt(0) + (Number.parseInt(seed2) % 3));
  });

  return {
    message: encrypted.reverse().join(""),
    key: generateKey(
      resolvedGenerateJunkStart.key,
      resolvedGenerateJunkEnd.key,
      Number.parseInt(seed1),
      Number.parseInt(seed2)
    )
  };
};

const generateJunk = async (): Promise<Junk> => {
  const result = await axios.get("https://www.boredapi.com/api/activity");

  return {
    intial: result.data.activity,
    key: result.data.key
  };
};

module.exports = p_encryptMessage;
