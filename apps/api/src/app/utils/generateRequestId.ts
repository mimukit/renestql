import { CUSTOM_ID_CHARACTERS, REQUEST_ID_LENGTH } from '../const';

const generate = require('nanoid/generate');

export const generateRequestId = () =>
  generate(CUSTOM_ID_CHARACTERS, REQUEST_ID_LENGTH);
