const hexTable: string[] = [];

for (let i = 0; i < 256; i++) {
  hexTable[i] = (i < 16 ? "0" : "") + i.toString(16);
}

export const generateUuid = () => {
  const d0 = (Math.random() * 0xffffffff) | 0;
  const d1 = (Math.random() * 0xffffffff) | 0;
  const d2 = (Math.random() * 0xffffffff) | 0;
  const d3 = (Math.random() * 0xffffffff) | 0;

  return (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    hexTable[d0 & 0xff]! +
    hexTable[(d0 >> 8) & 0xff] +
    hexTable[(d0 >> 16) & 0xff] +
    hexTable[(d0 >> 24) & 0xff] +
    "-" +
    hexTable[d1 & 0xff] +
    hexTable[(d1 >> 8) & 0xff] +
    "-" +
    hexTable[((d1 >> 16) & 0x0f) | 0x40] +
    hexTable[(d1 >> 24) & 0xff] +
    "-" +
    hexTable[(d2 & 0x3f) | 0x80] +
    hexTable[(d2 >> 8) & 0xff] +
    "-" +
    hexTable[(d2 >> 16) & 0xff] +
    hexTable[(d2 >> 24) & 0xff] +
    hexTable[d3 & 0xff] +
    hexTable[(d3 >> 8) & 0xff] +
    hexTable[(d3 >> 16) & 0xff] +
    hexTable[(d3 >> 24) & 0xff]
  );
};
