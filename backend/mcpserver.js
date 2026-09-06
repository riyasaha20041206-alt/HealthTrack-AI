
import OpenAI from "openai";
import "dotenv/config";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

console.error(
    "OPENAI_API_KEY present:",
    Boolean(process.env.OPENAI_API_KEY)
);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


const server = new McpServer({
    name: "HealthTrack AI",
    version: "1.0.0"
});

// ==========================================
// HEALTH ANALYSIS TOOL
// ==========================================

server.registerTool(
    "analyze_health",
    {
        description: "Analyze 7-day health data and provide health insights",

        inputSchema: {
            healthData: z.array(
                z.object({
                    weight: z.number(),
                    bloodPressure: z.string(),
                    bloodSugar: z.number(),
                    heartRate: z.number(),
                    waterIntake: z.number(),
                    sleepHours: z.number()
                })
            )
        }
    },

    async ({ healthData }) => {

        console.error("Health data received by MCP:", healthData);

        // ==========================================
        // WATER ANALYSIS
        // ==========================================

        let goodWaterDays = 0;

        healthData.forEach(day => {
            if (day.waterIntake >= 2) {
                goodWaterDays++;
            }
        });

        // ==========================================
        // SLEEP ANALYSIS
        // ==========================================

        let goodSleepDays = 0;

        healthData.forEach(day => {
            if (day.sleepHours >= 7) {
                goodSleepDays++;
            }
        });

        // ==========================================
        // HEART RATE ANALYSIS
        // ==========================================

        let goodHeartRateDays = 0;

        healthData.forEach(day => {
            if (day.heartRate >= 60 && day.heartRate <= 100) {
                goodHeartRateDays++;
            }
        });

        // ==========================================
        // BLOOD SUGAR ANALYSIS
        // ==========================================

        let goodBloodSugarDays = 0;

        healthData.forEach(day => {
            if (day.bloodSugar >= 70 && day.bloodSugar <= 99) {
                goodBloodSugarDays++;
            }
        });

        // ==========================================
        // BLOOD PRESSURE ANALYSIS
        // ==========================================

        let goodBloodPressureDays = 0;

        healthData.forEach(day => {

            const bp = day.bloodPressure.split("/");

            const systolic = Number(bp[0]);
            const diastolic = Number(bp[1]);

            if (
                systolic >= 90 &&
                systolic <= 120 &&
                diastolic >= 60 &&
                diastolic <= 80
            ) {
                goodBloodPressureDays++;
            }
        });

        // ==========================================
        // WEIGHT ANALYSIS
        // ==========================================

        const totalDays = healthData.length;

        const averageWeight =
            healthData.reduce(
                (sum, day) => sum + day.weight,
                0
            ) / totalDays;

        let goodWeightDays = 0;

        healthData.forEach(day => {

            if (Math.abs(day.weight - averageWeight) <= 5) {
                goodWeightDays++;
            }

        });

        // ==========================================
        // HEALTH SCORE
        // ==========================================

        const waterScore =
            (goodWaterDays / totalDays) * 20;

        const sleepScore =
            (goodSleepDays / totalDays) * 20;

        const heartRateScore =
            (goodHeartRateDays / totalDays) * 20;

        const bloodSugarScore =
            (goodBloodSugarDays / totalDays) * 15;

        const bloodPressureScore =
            (goodBloodPressureDays / totalDays) * 15;

        const weightScore =
            (goodWeightDays / totalDays) * 10;

        const healthScore = Math.round(
            waterScore +
            sleepScore +
            heartRateScore +
            bloodSugarScore +
            bloodPressureScore +
            weightScore
        );

        // ==========================================
        // HEALTH SUMMARY
        // ==========================================

        let recommendations = [];

        if (waterScore < 20) {
            recommendations.push(
                "Try to increase your daily water intake."
            );
        }

        if (sleepScore < 20) {
            recommendations.push(
                "Try to maintain at least 7 hours of sleep."
            );
        }

        if (heartRateScore < 20) {
            recommendations.push(
                "Monitor your heart rate regularly."
            );
        }

        if (bloodSugarScore < 15) {
            recommendations.push(
                "Monitor your blood sugar regularly."
            );
        }

        if (bloodPressureScore < 15) {
            recommendations.push(
                "Monitor your blood pressure regularly."
            );
        }

        if (weightScore < 10) {
            recommendations.push(
                "Monitor your weight regularly and maintain a consistent routine."
            );
        }

        if (recommendations.length === 0) {
            recommendations.push(
                "Your health indicators were stable during this week."
            );
        }

        // ==========================================
// OPENAI AI HEALTH SUMMARY
// ==========================================

const aiResponse = await openai.responses.create({
    model: "gpt-5.6-luna",

    instructions: `
You are a health and wellness assistant for HealthTrack AI.

Analyze the user's 7-day health data and calculated health scores.

Give:
1. A short personalized health summary.
2. 3 to 5 practical recommendations.

Important:
- Do not diagnose diseases.
- Do not prescribe medicines.
- Do not exaggerate health risks.
- If readings are outside the configured reference ranges, advise the user to monitor them and consider consulting a healthcare professional.
- Keep the language simple and understandable.
`,

    input: JSON.stringify({
        healthData,
        healthScore,
        scores: {
            water: Number(waterScore.toFixed(1)),
            sleep: Number(sleepScore.toFixed(1)),
            heartRate: Number(heartRateScore.toFixed(1)),
            bloodSugar: Number(bloodSugarScore.toFixed(1)),
            bloodPressure: Number(bloodPressureScore.toFixed(1)),
            weight: Number(weightScore.toFixed(1))
        }
    })
});

const aiSummary = aiResponse.output_text;

console.error("AI SUMMARY:", aiSummary);

        // ==========================================
        // RETURN RESULT
        // ==========================================

        return {

            content: [

                {
                    type: "text",

                    text: JSON.stringify({

                        message: "7-day health analysis completed",

                        days: totalDays,

                        healthScore: healthScore,

                        averageWeight: Number(
                            averageWeight.toFixed(1)
                        ),

                        scores: {

                            water: Number(
                                waterScore.toFixed(1)
                            ),

                            sleep: Number(
                                sleepScore.toFixed(1)
                            ),

                            heartRate: Number(
                                heartRateScore.toFixed(1)
                            ),

                            bloodSugar: Number(
                                bloodSugarScore.toFixed(1)
                            ),

                            bloodPressure: Number(
                                bloodPressureScore.toFixed(1)
                            ),

                            weight: Number(
                                weightScore.toFixed(1)
                            )

                        },

                        analysis: {

                            goodWaterDays,

                            goodSleepDays,

                            goodHeartRateDays,

                            goodBloodSugarDays,

                            goodBloodPressureDays,

                            goodWeightDays

                        },

                        recommendations,
                        aiSummary

                    })
 
                }

            ]

        };

    }
);

// ==========================================
// START MCP SERVER
// ==========================================

const transport = new StdioServerTransport();

await server.connect(transport);

