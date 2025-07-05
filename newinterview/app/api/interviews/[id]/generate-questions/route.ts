import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { db } from "@/lib/db";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the interview
    const interview = await db.findInterviewById(params.id);

    if (!interview) {
      console.error(`Interview with ID ${params.id} not found`);
      return NextResponse.json({ error: "Interview not found" }, { status: 404 });
    }

    // Check authorization
    if (interview.userId !== session.user.id) {
      console.error(`User ${session.user.id} not authorized to access interview ${params.id}`);
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Get the domain, subdomain, and level from the interview
    const domain = interview.domain;
    const subDomain = interview.subDomain;
    const level = interview.level;

    console.log(`Generating questions for domain: ${domain}, subdomain: ${subDomain}, level: ${level}`);

    let questionsData = [];
    let useGeminiAPI = true;

    // Try to generate questions using Gemini API
    if (useGeminiAPI) {
      try {
        // Get API key from environment variables
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
          console.error("Gemini API key not configured");
          throw new Error("API key not configured");
        }

        // Create a prompt for Gemini API based on domain, subdomain, and level
        const promptText = `
You are an expert technical interviewer creating questions for a ${domain} developer position with a focus on ${subDomain}. The candidate's skill level is ${level}.

Please generate 5 interview questions that are appropriate for this position and skill level. For each question:
1. Make sure it's relevant to the ${domain} domain and specifically to ${subDomain}
2. Ensure the difficulty is appropriate for a ${level} level developer
3. Include a mix of question types (conceptual, problem-solving, coding, etc.)

Format your response as a JSON array with the following structure for each question:
[
  {
    "question": "Question text here",
    "answer": "",
    "feedback": ""
  },
  // more questions...
]

Make sure your response is valid JSON that can be parsed directly.
`;

        console.log("Sending prompt to Gemini API:", promptText);

        // Call Gemini API
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [{ text: promptText }]
                },
              ],
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Gemini API error:", errorData);
          throw new Error("Failed to generate questions from AI");
        }

        const data = await response.json();
        const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!aiResponseText) {
          throw new Error("Empty response from AI");
        }

        console.log("AI response received:", aiResponseText);

        // Extract JSON from the response
        // The AI might include markdown code blocks or other text, so we need to extract just the JSON part
        const jsonMatch = aiResponseText.match(/\[\s*\{.*\}\s*\]/s);

        if (!jsonMatch) {
          throw new Error("Could not extract valid JSON from AI response");
        }

        try {
          // Parse the JSON
          questionsData = JSON.parse(jsonMatch[0]);
          console.log("Parsed questions:", questionsData);

          // Validate the questions format
          if (!Array.isArray(questionsData) || questionsData.length === 0) {
            throw new Error("Invalid questions format");
          }

          // Ensure each question has the required fields
          questionsData = questionsData.map(q => ({
            question: q.question,
            answer: "",
            feedback: ""
          }));

        } catch (parseError) {
          console.error("Error parsing AI response:", parseError);
          throw new Error("Failed to parse AI-generated questions");
        }
      } catch (aiError) {
        console.error("Error using Gemini API:", aiError);

        // Fall back to predefined questions
        console.log("Falling back to predefined questions");
        useGeminiAPI = false;
      }
    }

    // If Gemini API failed or returned invalid data, use fallback questions
    if (!useGeminiAPI || questionsData.length === 0) {
      console.log("Using fallback questions");

      // Create fallback questions based on domain, subDomain and level
      questionsData = [
        { 
          question: `What are the key principles of ${subDomain} development in ${domain}?`, 
          answer: "", 
          feedback: "" 
        },
        { 
          question: `Explain how you would implement a ${subDomain} solution for a common ${domain} problem.`, 
          answer: "", 
          feedback: "" 
        },
        { 
          question: `What are the best practices for ${level} ${subDomain} development?`, 
          answer: "", 
          feedback: "" 
        },
        { 
          question: `How would you debug a complex issue in a ${domain} application?`, 
          answer: "", 
          feedback: "" 
        },
        { 
          question: `Describe your experience with ${subDomain} frameworks and libraries.`, 
          answer: "", 
          feedback: "" 
        }
      ];
    }

    // Limit to 5 questions
    questionsData = questionsData.slice(0, 5);

    console.log(`Updating interview with ${questionsData.length} questions`);

    // Update the interview with the generated questions
    const updatedInterview = await db.updateInterview(params.id, {
      questions: questionsData
    });

    return NextResponse.json({
      message: "Questions generated successfully",
      interview: updatedInterview,
    });
  } catch (error) {
    console.error("Error generating questions:", error);

    // Provide more detailed error information
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        error: "Failed to generate questions",
        message: errorMessage,
        details: "There was an error generating questions for this interview. Please try again or contact support if the issue persists."
      },
      { status: 500 }
    );
  }
}
