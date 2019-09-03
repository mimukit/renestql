const generate = require('nanoid/generate');
import { CUSTOM_ID_CHARACTERS, CUSTOM_ID_LENGTH } from '../const';

export const generateRefCode = () => {
  const refCode = generate(CUSTOM_ID_CHARACTERS, CUSTOM_ID_LENGTH);

  return refCode;
};
