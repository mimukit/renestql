const generate = require('nanoid/async/generate');
import { CUSTOM_ID_CHARACTERS, CUSTOM_ID_LENGTH } from '../const';

export const gererateCustomId = async (prefix: string) => {
  const nanoId = await generate(CUSTOM_ID_CHARACTERS, CUSTOM_ID_LENGTH);

  const generatedCustomId = prefix + nanoId;

  return generatedCustomId;
};
