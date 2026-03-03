import { createRequire } from "module";
import { generateInterviewReport } from "../services/ai.service.js";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

export async function interviewController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const { selfDescription, jobDescription } = req.body;
        const data = await pdf(req.file.buffer);

        const analysisContext = generateInterviewReport({
            resume: data.text,
            selfDescription,
            jobDescription
        })

        res.json({
            text: analysisContext
        });

    } catch (error) {
        console.error("REAL ERROR:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}