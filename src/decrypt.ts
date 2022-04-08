const fetchJunk = require("./fetch");

const d_decryptMessage = async (
  message: string,
  key: string
): Promise<string> => {
  let tmp = key.slice(2).split("e");

  const seed1 = key[0];
  const seed2 = key[1];

  const junkStartKey = tmp[0];
  const junkEndKey = tmp[1];

  const trimStart = (await fetchJunk(junkStartKey)).initial;
  const trimEnd = (await fetchJunk(junkEndKey)).initial;

  const decrypted = message
    .split("")
    .reverse()
    .map((char: string, index: number) => {
      return index % 2 == 0
        ? String.fromCharCode(char.charCodeAt(0) - (Number.parseInt(seed1) % 3))
        : String.fromCharCode(
            char.charCodeAt(0) - (Number.parseInt(seed2) % 3)
          );
    })
    .join("");

  return decrypted
    .slice(0, decrypted.length - trimEnd.length - 1)
    .slice(trimStart.length + 1);
};

module.exports = d_decryptMessage;
