import { GoogleGenAI } from "@google/genai";

const apiKeyGemini = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: apiKeyGemini });

export const generate = async (req, res) => {
    console.log(req.body);
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: req.body.prompt,
            config: {
                systemInstruction: `
                    You are a form generator assistant. Given a description of a form in natural language, your job is to output only the JSON representation of the form.
            
                    The JSON must include:
                    - "title": Title of the form
                    - "description": Short instructions or purpose of the form
                    - "fields": An array of objects. Each form field should contain:
                    - "label": The visible label of the field
                    - "type": One of ["text", "email", "date", "radio", "checkbox", "textarea", "select"]
                    - "uuid": A uuid for the field
                    - "required": true or false
                    - "placeholder": to show the user what to enter if applicable(max 25 characters)
                    - "options": Only required for "radio", "checkbox", and "select" types (array of strings)
            
                    Only return raw JSON. Do not include markdown, explanations, or code blocks.
                  `,
            },
        });
        console.log(response.text);
        const output = response.text;
        const cleanJson = output.replace(/```json|```/g, "").trim(); // remove ```json ``` if needed
        const data = JSON.parse(cleanJson);
        console.log(data);
        return res.status(200).json({ success: true, data: data });
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
}