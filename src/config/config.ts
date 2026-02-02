import { connect } from 'http2';

export default {
  database: {
    connectionString: process.env.CONNECTION_STRING,

    secrets: {
      jwtSecret: 'your_jwt_secret_key',
    },
  },
  port: process.env.PORT || 3000,
};
