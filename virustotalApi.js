// routes/virustotal.js
import express from "express";
import axios from "axios";
import qs from "qs";

const router = express.Router();

const VIRUSTOTAL_API_KEY = 'd3bf8c93b68419cd6ff88127e7cb56256d3f50488eed38292bb69fae9ff476f6';

const vtClient = axios.create({
    baseURL: "https://www.virustotal.com/api/v3",
    headers: {
        "x-apikey": VIRUSTOTAL_API_KEY,
    },
});

// Submit a URL for scanning
router.post("/api/submit-url", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        const response = await vtClient.post(
            "/urls",
            qs.stringify({ url }),
            {
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    accept: "application/json",
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("VirusTotal submit error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to submit URL to VirusTotal" });
    }
});

// Fetch URL analysis report by ID
router.get("/api/url-analysis/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const response = await vtClient.get(`/analyses/${id}`);
        res.json(response.data);
    } catch (error) {
        console.error("VirusTotal analysis error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch VirusTotal analysis" });
    }
});

// ✅ NEW: Get IP address report
router.get("/api/ip-info/:ip", async (req, res) => {
    const { ip } = req.params;

    if (!ip) {
        return res.status(400).json({ error: "IP address is required" });
    }

    try {
        const response = await vtClient.get(`/ip_addresses/${ip}`);
        res.json(response.data);
    } catch (error) {
        console.error("VirusTotal IP error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch IP info from VirusTotal" });
    }
});

export default router;
