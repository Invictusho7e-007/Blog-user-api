import { connect } from 'http2';
export default () => ({
  database: {
    connectionString: process.env.CONNECTION_STRING,
  },
  
  port: process.env.PORT,
});
