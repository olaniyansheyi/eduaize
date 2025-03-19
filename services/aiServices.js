import axios from "axios";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

export async function getAIInsights(student, $openaiApiKey) {
  try {
    const studentScores = extractStudentData(student);

    const prompt = `Here is a student's academic performance data: ${JSON.stringify(
      studentScores
    )}. 
    - Provide an AI insight about their progress.
    - Suggest study focus areas.
    - Provide a motivational message.
    - Offer a brief progress insight.
    
    Keep responses short and concise.`;

    const response = await axios.post(
      OPENAI_URL,
      {
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: prompt }],
        max_tokens: 300,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${$openaiApiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    return {
      insight: "Unable to generate insights at this time.",
      studyFocus: [],
      motivation: "Keep pushing forward! Your hard work will pay off!",
      progressInsight: "No progress data available.",
    };
  }
}

function extractStudentData(student) {
  const subjects = student.subjects || {};
  return Object.keys(subjects).map((subject) => ({
    subject,
    term_1_average: subjects[subject].average_term_1 || 0,
    term_2_average: subjects[subject].average_term_2 || 0,
    attendance: subjects[subject].attendance || {},
    scores: {
      term_1: subjects[subject].term_1_scores || [],
      term_2: subjects[subject].term_2_scores || [],
    },
    teacher_remark: subjects[subject].teacher_remark || {},
  }));
}
