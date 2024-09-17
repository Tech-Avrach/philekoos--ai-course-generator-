import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon("postgresql://courseDb_owner:ODVlQxe9g2ML@ep-broad-firefly-a5qd67sl.us-east-2.aws.neon.tech/courseDb?sslmode=require");

export const db = drizzle(sql);

