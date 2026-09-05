import express from "express";
import cors from "cors";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const app = express();

app.use(cors());
app.use(express.json());


// ===============================
// MCP CLIENT CONNECTION
// ===============================

const mcpClient = new Client({
    name: "HealthTrack AI Backend",
    version: "1.0.0"
});

const transport = new StdioClientTransport({
    command: "node",
    args: ["mcpserver.js"]
});

await mcpClient.connect(transport);

console.log("Connected to HealthTrack AI MCP Server");


// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {
    res.send("HealthTrack AI Backend is Running!");
});


// ===============================
// ANALYZE HEALTH DATA
// ===============================

app.post("/analyze", async (req, res) => {

    try {

        const healthData = req.body.healthData;

console.log("Health Data Received:", healthData);


        // Send data to MCP Tool
        const result = await mcpClient.callTool({
            name: "analyze_health",
            arguments: {
                healthData: healthData
            }
        });


        console.log("MCP Result:", result);


        res.json({
            message: "Health analysis completed successfully!",
            result: result
        });

    } catch (error) {

        console.error("MCP Error:", error);

        res.status(500).json({
            message: "Health analysis failed",
            error: error.message
        });

    }

});


// ===============================
// START SERVER
// ===============================

app.listen(5000, () => {
    console.log("HealthTrack AI server running on port 5000");
});