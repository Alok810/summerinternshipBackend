import { Router } from "express";
import axios from 'axios';

const router = Router();
const HONEYDB_API_ID = 'c35accafd74297929ebb7871dfa13c028c19d9bd489e395741ad84bc804099b4';
const HONEYDB_API_KEY = '69abf79dc5480424e350c32bc5aa5fac07ffa31724ccb164d26814cdb63992b8';

// Get list of services
router.get('/api/services', async (req, res) => {
    try {
        const response = await axios.get('https://honeydb.io/api/services', {
            headers: {
                'X-HoneyDb-ApiId': HONEYDB_API_ID,
                'X-HoneyDb-ApiKey': HONEYDB_API_KEY
            }
        });
        res.json(response.data);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to fetch data from HoneyDB' });
    }
});

// Get list of bad hosts
router.get('/api/badHost', async (req, res) => {
    try {
        const response = await axios.get('https://honeydb.io/api/bad-hosts', {
            headers: {
                'X-HoneyDb-ApiId': HONEYDB_API_ID,
                'X-HoneyDb-ApiKey': HONEYDB_API_KEY
            }
        });
        res.json(response.data);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to fetch data from HoneyDB' });
    }
});

// Get IP history from HoneyDB
router.get('/api/ip-history/:ip', async (req, res) => {
    const { ip } = req.params;

    try {
        const response = await axios.get(`https://honeydb.io/api/ip-history/${ip}`, {
            headers: {
                'X-HoneyDb-ApiId': HONEYDB_API_ID,
                'X-HoneyDb-ApiKey': HONEYDB_API_KEY
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('HoneyDB IP History Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch data from HoneyDB' });
    }
});

// ✅ NEW: Get NetInfo lookup for IP from HoneyDB
router.get('/api/netinfo/:ip', async (req, res) => {
    const { ip } = req.params;

    try {
        const response = await axios.get(`https://honeydb.io/api/netinfo/lookup/${ip}`, {
            headers: {
                'X-HoneyDb-ApiId': HONEYDB_API_ID,
                'X-HoneyDb-ApiKey': HONEYDB_API_KEY
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('HoneyDB NetInfo Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch netinfo from HoneyDB' });
    }
});

export default router;
