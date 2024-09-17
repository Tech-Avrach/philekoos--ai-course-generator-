/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://courseDb_owner:ODVlQxe9g2ML@ep-broad-firefly-a5qd67sl.us-east-2.aws.neon.tech/courseDb?sslmode=require",
    }
  };