import { GoogleGenAI } from "@google/genai";
import { z } from 'zod';
import { zodToJsonSchema } from "zod-to-json-schema";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const interviewReportSchema = z.object({
    matchScore: z.number().describe("The match score between 0 and 100 indicating how well the candidate matches the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question asked during the interview"),
        intention: z.string().describe("The intention behind asking the technical question"),
        answer: z.string().describe("how the candidate answered the technical question"),
    })),
    behaviourQuestions: z.array(z.object({
        question: z.string().describe("The technical question asked during the interview"),
        intention: z.string().describe("The intention behind asking the technical question"),
        answer: z.string().describe("how the candidate answered the technical question"),
    })),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill that the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap"),
    })),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day of the preparation plan"),
        focus: z.string().describe("The focus of the preparation plan for that day"),
        tasks: z.array(z.string()).describe("The tasks to be completed on that day"),
    }))
})

export async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `Generate an interview report based on the following information:
                    Job Description: ${jobDescription}
                    Resume: ${resume}
                    Self Description: ${selfDescription}`;

    const response = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: zodToJsonSchema(interviewReportSchema),
        }
    })

    const recipe = interviewReportSchema.parse(JSON.parse((await response).text));
    console.log(recipe);
}