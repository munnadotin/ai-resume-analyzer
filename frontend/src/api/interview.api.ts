import axios from "axios";
import { api } from "./api";

/**
 * @description generate interview report
 * @route POST /api/interview
 */
export async function generateInterviewReport(data: FormData) {
    try {
        const res = await api.post('/api/interview', data);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || "Generate Report failed"
            )
        }
        throw new Error("Something went wrong");
    }
}

/**
 * @description get interview report by id
 * @route GET /api/interview/report/:id
 */
export async function getInterviewReport(id: string) {
    try {
        const res = await api.get(`/api/interview/report/${id}`);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || "Failed to fetch report"
            )
        }
        throw new Error("Something went wrong");
    }
}

/**
 * @description fetch all generated reports
 * @route GET /api/interview/
 */

export async function getAllInterveiwReports() {
    try {
        const res = await api.get("/api/interview");
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || "Failed to fetch all reports"
            )
        }
        throw new Error("Something went wrong");
    }
}