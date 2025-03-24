import axios from "axios";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

// In-memory cache (works server-side)
const insightsCache = new Map();

// Utility function to fetch with retry
async function fetchWithRetry(url, data, headers, retries = 3, delay = 1000) {
  try {
    return await axios.post(url, data, { headers });
  } catch (error) {
    if (error.response?.status === 429 && retries > 0) {
      console.warn(`Rate limited. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(url, data, headers, retries - 1, delay * 2);
    }
    throw error;
  }
}

export async function getAIInsights(student, openaiApiKey) {
  try {
    const studentKey = JSON.stringify(student); // Unique key for caching

    // Check in-memory cache first
    if (insightsCache.has(studentKey)) {
      console.log("Returning cached AI insights from memory...");
      return insightsCache.get(studentKey);
    }

    // Check sessionStorage for client-side caching (works for Nuxt 3 client)
    if (process.client) {
      const cachedData = sessionStorage.getItem(`insights-${studentKey}`);
      if (cachedData) {
        console.log("Returning cached AI insights from sessionStorage...");
        return JSON.parse(cachedData);
      }
    }

    const studentScores = extractStudentData(student);

    const prompt = `Here is a student's academic performance data: ${JSON.stringify(
      studentScores
    )}.

    Analyze the data and provide insights strictly in **valid JSON format** with NO extra formatting, NO explanations, and NO Markdown code blocks.

    Return only this JSON structure:
    {
      "insight": "Short AI insight",
      "studyFocus": ["Topic 1", "Topic 2"],
      "motivation": "Motivational message",
      "progressInsight": "Brief progress insight",
      "studyPlan": [
        { "day": "Monday", "subject": "Math", "topic": "Algebra Equations" },
        { "day": "Tuesday", "subject": "English", "topic": "Essay Writing" }
      ]
    }`;

    const headers = {
      Authorization: `Bearer ${openaiApiKey}`,
      "Content-Type": "application/json",
    };

    const data = {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
      temperature: 0.7,
    };

    const response = await fetchWithRetry(OPENAI_URL, data, headers, 3, 1000);
    console.log("OpenAI Response:", response.data);

    const content = response.data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("No content received from OpenAI.");
    }

    const cleanedContent = JSON.parse(
      content.replace(/```json|```/g, "").trim()
    );

    // Store in in-memory cache
    insightsCache.set(studentKey, cleanedContent);

    // Store in sessionStorage for client-side caching
    if (process.client) {
      sessionStorage.setItem(
        `insights-${studentKey}`,
        JSON.stringify(cleanedContent)
      );
    }

    return cleanedContent;
  } catch (error) {
    console.error(
      "Error fetching AI insights:",
      error.response?.data || error.message
    );
    return {
      insight: "Unable to generate insights at this time.",
      studyFocus: [],
      motivation: "Keep pushing forward! Your hard work will pay off!",
      progressInsight: "No progress data available.",
      studyPlan: [],
    };
  }
}

function extractStudentData(student) {
  if (!student || !student.subjects) {
    return [];
  }

  return Object.keys(student.subjects).map((subject) => ({
    subject,
    term_1_average: student.subjects[subject].average_term_1 || 0,
    term_2_average: student.subjects[subject].average_term_2 || 0,
    attendance: student.subjects[subject].attendance || {},
    scores: {
      term_1: student.subjects[subject].term_1_scores || [],
      term_2: student.subjects[subject].term_2_scores || [],
    },
    teacher_remark: student.subjects[subject].teacher_remark || {},
  }));
}
