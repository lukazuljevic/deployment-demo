const configuration = () => ({
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: Number.parseInt(process.env.PORT ?? '3000', 10),
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: Number.parseInt(process.env.SMTP_PORT ?? '587', 10),
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  MAIL_FROM: process.env.MAIL_FROM,
});
export default configuration;
