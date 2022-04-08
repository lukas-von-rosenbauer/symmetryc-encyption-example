const d_generateKey = (
  junkStartKey: number,
  junkEndKey: number,
  seed1: number,
  seed2: number
): string => {
  return `${seed1}${seed2}${junkStartKey}e${junkEndKey}`;
};

module.exports = d_generateKey;
