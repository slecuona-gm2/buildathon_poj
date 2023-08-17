import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  PUSH_CHANNEL_PK: process.env.PUSH_CHANNEL_PK || '',
  PUSH_PRIVATE_KEY: process.env.PUSH_PRIVATE_KEY || '',
  PUSH_CHANNEL_ADDRESS: process.env.PUSH_CHANNEL_ADDRESS || '',
  MONGO_URI: process.env.MONGO_URI || '',
  PORT: Number(process.env.PORT) || 3100,
};
