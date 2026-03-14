# AI Resume Analyzer & Generator

An AI-powered web application that analyzes a candidate's resume against a target job description, calculates ATS compatibility, identifies skill gaps, and generates an optimized resume tailored for the job.

---

## Features

* **User Authentication**

  * Secure login and registration system
  * Protected routes for authenticated users

* **AI Resume Analysis**

  * Users provide:

    * Resume
    * Self description
    * Target job description
  * AI analyzes the information and provides:

    * Resume–Job **Match Score**
    * **ATS Score**

* **Interview Preparation Support**

  * Generates:

    * Technical questions
    * Behavioral questions
    * Preparation guidance

* **Skill Gap Detection**

  * Identifies missing skills required for the target job.

* **AI Resume Generator**

  * Users can generate an **optimized resume tailored for the target job role**.

* **PDF Resume Export**

  * AI generated resume can be converted to **PDF format** for download or preview.

* **Database Management**

  * All generated resumes, reports, and analysis data are stored in the database for future access.

---

## How It Works

1. User signs in to the platform.
2. User submits:

   * Resume
   * Self description
   * Target job description
3. AI analyzes the inputs.
4. System generates:

   * ATS score
   * Resume match score
   * Skill gaps
   * Interview preparation questions
5. User can generate an **AI-optimized resume**.
6. Resume is saved in the database and can be **downloaded as PDF** anytime.

---

## Tech Stack

### Frontend

* React
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### AI & Tools

* Gemini AI API
* Puppeteer (HTML → PDF generation)
* Zod (Schema validation)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/munnadotin/ai-resume-analyzer.git
```

Install dependencies:

```bash
npm install
```

Run the project:

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file and add:

```
PORT=
CLIENT_URL=
MONGO_URI=
JWT_SECRET=
GEMINI_API_KEY=
```

---

## Future Improvements

* Resume version history
* Multiple resume templates
* Resume editing UI
* AI interview simulator
* Job scraping integration

---

## Author

Munna Kumar

---

## If you like this project

Give it a star on GitHub!
