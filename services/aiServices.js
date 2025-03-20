import axios from "axios";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

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
  console.log("Using API Key:", openaiApiKey);

  try {
    const studentScores = extractStudentData(student);

    const prompt = `Here is a student's academic performance data: ${JSON.stringify(
      studentScores
    )}. 
    - Provide an AI insight about their progress.
    - Suggest study focus areas.
    - Provide a motivational message.
    - Offer a brief progress insight.
    - Generate a personalized 7-day study plan based on their weaknesses.

    Return the response in valid JSON format with this structure:
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
      model: "gpt-4o",
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

    return JSON.parse(content);
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
