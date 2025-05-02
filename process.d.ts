declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_NAME: string;
      DB_PASSWORD: string;
      DB_PORT: string;
      DB_USER: string;
      DB_HOST: string;
      REGION: string;
      SECRET_ACCESS_KEY: string;
      ACCESS_KEY_ID: string;
      PORT: string;
      RAZORPAY_KEY_ID: string;
      RAZORPAY_KEY_SECRET: string;
    }
  }
}

export {};
