export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432
    },
    jwt:{
      secret: process.env.JWT_SECRET,
    },
    crypto: {
      secret: process.env.CRYPTO_SECRET,
      salt: parseInt(process.env.CRYPTO_SALT)
    }
  });