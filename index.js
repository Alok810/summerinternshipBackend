import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Fetch attacker IPs from HoneyDB
import honeydbRoutes from './honeydbApi.js';
import virustotalRoutes from './virustotalApi.js';


app.use(virustotalRoutes);
app.use(honeydbRoutes);



app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
