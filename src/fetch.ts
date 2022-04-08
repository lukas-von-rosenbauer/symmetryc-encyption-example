const axios = require("axios");

interface Junk {
  initial: string;
  key: string;
}

const d_fetchJunk = async (key: string = ""): Promise<Junk> => {
  const result = await axios.get(
    key
      ? `https://www.boredapi.com/api/activity?key=${key}`
      : `https://www.boredapi.com/api/activity`
  );
  return {
    initial: result.data.activity,
    key: result.data.key
  };
};

module.exports = d_fetchJunk;
