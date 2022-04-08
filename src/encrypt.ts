const generateKey = require("./key");
const generateJunk = require("./fetch");

interface Response {
  data: {
    activity: string;
    participants: number;
    price: number;
    key: string;
  };
}

interface EncryptedMessage {
  message: string;
  key: string;
}

const d_encryptMessage = async (
  message: string,
  passedKey: string = ""
): Promise<EncryptedMessage> => {
  let tmp = passedKey ? passedKey.slice(2).split("e") : "";

  const resolvedGenerateJunkStart = passedKey
    ? await generateJunk(tmp[0])
    : await generateJunk();
  const resolvedGenerateJunkEnd = passedKey
    ? await generateJunk(tmp[1])
    : await generateJunk();

  let seed1 = passedKey ? passedKey[0] : (await generateJunk()).key;
  seed1 = seed1.length === 1 ? seed1 : seed1[seed1.length - 1];

  let seed2 = passedKey ? passedKey[1] : (await generateJunk()).key;
  seed2 = seed2.length === 1 ? seed2 : seed2[seed2.length - 1];

  const [junkStart, junkEnd] = [
    resolvedGenerateJunkStart.initial,
    resolvedGenerateJunkEnd.initial
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
    key: passedKey
      ? passedKey
      : generateKey(
          resolvedGenerateJunkStart.key,
          resolvedGenerateJunkEnd.key,
          Number.parseInt(seed1),
          Number.parseInt(seed2)
        )
  };
};

module.exports = d_encryptMessage;
