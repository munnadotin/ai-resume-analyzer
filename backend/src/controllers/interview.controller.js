import { createRequire } from "module";
import { generateInterviewReport } from "../services/ai.service.js";
import { interviewModel } from "../models/interview.model.js";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

export async function interviewController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }
        const data = await pdf(req.file.buffer);
        const { selfDescription, jobDescription } = req.body;

        const analysisContext = await generateInterviewReport({
            resume: data.text,
            selfDescription,
            jobDescription
        })

        const interviewReport = await interviewModel.create({
            user: req.user._id,
            resume: data.text,
            selfDescription,
            jobDescription,
            ...analysisContext
        })

        res.json({
            message: "Interview report generated successfully.",
            interviewReport
        });

    } catch (error) {
        console.error("REAL ERROR:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function interviewReportById(req, res) {
    try {
        const interviewReport = await interviewModel.findOne({ _id: req.params.id, user: req.user._id });

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found"
            })
        }

        res.status(200).json({
            message: "Interview report fetched successfully",
            interviewReport
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export async function getAllInterviewReport(req, res) {
    try {
        const interviewReports = await interviewModel.find({ user: req.user._id }).sort({ createdAt: -1 }).select('-jobDescription -resume -selfDescription -matchScore -technicalQuestions -behaviourQuestions -skillGaps -preparationPlan -__v -user');

        res.status(200).json({
            message: "Interview report fetched successfully",
            interviewReports
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export async function generateResumePdf(req, res) {
    
}