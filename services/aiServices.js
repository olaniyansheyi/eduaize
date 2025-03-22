// import axios from "axios";

// const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

// // Fallback cache for server-side
// const insightsCache = new Map();

// async function fetchWithRetry(url, data, headers, retries = 3, delay = 1000) {
//   try {
//     return await axios.post(url, data, { headers });
//   } catch (error) {
//     if (error.response?.status === 429 && retries > 0) {
//       console.warn(`Rate limited. Retrying in ${delay}ms...`);
//       await new Promise((resolve) => setTimeout(resolve, delay));
//       return fetchWithRetry(url, data, headers, retries - 1, delay * 2);
//     }
//     throw error;
//   }
// }

// // ✅ Function to get AI Insights with LocalStorage support
// export async function getAIInsights(student, openaiApiKey) {
//   try {
//     const studentScores = extractStudentData(student);
//     const cacheKey = JSON.stringify(studentScores);

//     // ✅ Check for cache in LocalStorage (Client-side)
//     if (process.client) {
//       const cachedData = localStorage.getItem(cacheKey);
//       if (cachedData) {
//         console.log("Returning cached AI insights from LocalStorage.");
//         return JSON.parse(cachedData);
//       }
//     } else if (insightsCache.has(cacheKey)) {
//       // ✅ Check for cache in Server-side memory
//       console.log("Returning cached AI insights from memory.");
//       return insightsCache.get(cacheKey);
//     }

//     // OpenAI API request
//     const prompt = `Here is a student's academic performance data: ${JSON.stringify(
//       studentScores
//     )}.

//     Analyze the data and provide insights strictly in **valid JSON format** with NO extra formatting, NO explanations, and NO Markdown code blocks.

//     Return only this JSON structure:
//     {
//       "insight": "Short AI insight",
//       "studyFocus": ["Topic 1", "Topic 2"],
//       "motivation": "Motivational message",
//       "progressInsight": "Brief progress insight",
//       "studyPlan": [
//         { "day": "Monday", "subject": "Math", "topic": "Algebra Equations" },
//         { "day": "Tuesday", "subject": "English", "topic": "Essay Writing" }
//       ]
//     }`;

//     const headers = {
//       Authorization: `Bearer ${openaiApiKey}`,
//       "Content-Type": "application/json",
//     };

//     const data = {
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: prompt }],
//       max_tokens: 400,
//       temperature: 0.7,
//     };

//     const response = await fetchWithRetry(OPENAI_URL, data, headers, 3, 1000);

//     console.log("OpenAI Response:", response.data);

//     const content = response.data.choices?.[0]?.message?.content;
//     if (!content) {
//       throw new Error("No content received from OpenAI.");
//     }

//     // Ensure valid JSON by stripping unwanted formatting
//     const cleanedContent = content.replace(/```json|```/g, "").trim();
//     const parsedResponse = JSON.parse(cleanedContent);

//     // ✅ Store in cache (LocalStorage if Client-side, Memory if Server-side)
//     if (process.client) {
//       localStorage.setItem(cacheKey, JSON.stringify(parsedResponse));
//     } else {
//       insightsCache.set(cacheKey, parsedResponse);
//     }

//     return parsedResponse;
//   } catch (error) {
//     console.error(
//       "Error fetching AI insights:",
//       error.response?.data || error.message
//     );
//     return {
//       insight: "Unable to generate insights at this time.",
//       studyFocus: [],
//       motivation: "Keep pushing forward! Your hard work will pay off!",
//       progressInsight: "No progress data available.",
//       studyPlan: [],
//     };
//   }
// }

// // ✅ Extract student data
// function extractStudentData(student) {
//   if (!student || !student.subjects) {
//     return [];
//   }

//   return Object.keys(student.subjects).map((subject) => ({
//     subject,
//     term_1_average: student.subjects[subject].average_term_1 || 0,
//     term_2_average: student.subjects[subject].average_term_2 || 0,
//     attendance: student.subjects[subject].attendance || {},
//     scores: {
//       term_1: student.subjects[subject].term_1_scores || [],
//       term_2: student.subjects[subject].term_2_scores || [],
//     },
//     teacher_remark: student.subjects[subject].teacher_remark || {},
//   }));
// }

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
  try {
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

    // Ensure valid JSON by stripping unwanted formatting
    const cleanedContent = content.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanedContent);
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
