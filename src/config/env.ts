import dotenv from "dotenv";

dotenv.config();

type EnvType = {
  DATABASE_URL: string;
  PORT:number
};

 const env: EnvType = {
  DATABASE_URL: process.env.DATABASE_URL as string,
  PORT: Number(process.env.PORT) || 5000 
}

export default env