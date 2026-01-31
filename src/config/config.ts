import { connect } from 'http2';
export default () => ({
  database: {
    connectionString: process.env.CONNECTION_STRING,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  port: process.env.PORT,
});
