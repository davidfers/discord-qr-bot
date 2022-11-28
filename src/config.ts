import path from "path";
import dotenv from "dotenv";

// .env sanitizer, throws error if BOT_TOKEN, CLIENT_ID or GUILD_ID are undefined

dotenv.config({ path: path.resolve(__dirname, "../.env") });

interface ENV {
  BOT_TOKEN: string | undefined;
  CLIENT_ID: string | undefined;
  GUILD_ID: string | undefined;
}

interface Config {
  BOT_TOKEN: string;
  CLIENT_ID: string;
  GUILD_ID: string;
}

const getConfig = (): ENV => {
  return {
    BOT_TOKEN: process.env.BOT_TOKEN,
    CLIENT_ID: process.env.CLIENT_ID,
    GUILD_ID: process.env.GUILD_ID,
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined || value.length === 0) {
      throw new Error(`Missing ${key} in .env file`);
    }
  }
  return config as Config;
};

const config = getConfig();
const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
