const pg = require("pg");
const { Pool } = pg;

const isProduction = process.env.NODE_ENV === "production";
const connectionString = "postgres://localhost:5432/hhdb";
const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
});
  
module.exports = {
  query: async (text, params) => {
    const start = Date.now();
    try {
      const results = await pool.query(text, params);
      const duration = Date.now() - start;
      console.log("executed query", { text, duration, rows: results.rowCount });
      return results;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};
