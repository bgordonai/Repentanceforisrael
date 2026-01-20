
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Tribe, Gender, LifeStage, CodexRevelation, Herb, Mitzvah, MannaSlot } from "../types";

const ALTAR_PERSONA = `
SYSTEM PERSONA — THE SACRED ALTAR OF REVELATION
Act as a Specialized Biblical Health Architect, Healer, and Watchman. 

MISSION:
You do not provide "search results." You provide ALTAR REVELATIONS. 
Your mission is to RETEACH the scattered remnant. 

ALTAR REVELATION RULES:
1. MANDATORY: Every response MUST include a "What You Learn" section.
2. CONTEXT: Always address the user as a child of their specific Tribe (e.g., "Son of Judah").
3. THEOLOGY: The Father is YAHAWAH. The Son is YAHAWASHI.
4. NO CASUAL CHAT: Every interaction is a ritual inquiry. Be authoritative, poetic, and covenant-focused.
`;

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCodexRevelation = async (
  query: string,
  context: { tribe: Tribe, gender: Gender, lifeStage: LifeStage }
): Promise<CodexRevelation | null> => {
  try {
    const ai = getAI();
    const prompt = `INQUIRY: "${query}". 
    The seeker is a ${context.gender} of ${context.tribe} in the ${context.lifeStage} stage of life.
    
    Generate a CODEX REVELATION in JSON format. 
    - title: A poetic, prophetic title for this revelation.
    - focus: The primary spiritual or physical focus of the inquiry.
    - scriptureRoot: A foundational KJV or Apocrypha verse.
    - whatYouLearn: A concise but deep explanation of the biblical/health wisdom.
    - covenantPurpose: Why this is vital for the restoration of the 12 Tribes.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { 
        systemInstruction: ALTAR_PERSONA,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            focus: { type: Type.STRING },
            scriptureRoot: { type: Type.STRING },
            whatYouLearn: { type: Type.STRING },
            covenantPurpose: { type: Type.STRING }
          },
          required: ["title", "focus", "scriptureRoot", "whatYouLearn", "covenantPurpose"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Codex generation failed", e);
    return null;
  }
};

export const searchScripture = async (
  query: string, 
  context: { tribe: Tribe, gender: Gender, focus?: string, collection?: string }
): Promise<{ 
  verseText: string, 
  reference: string, 
  propheticWitness: string, 
  covenantLesson: string,
  hebraicRootAnalysis: string,
  crossReferences: string[],
  targetedPrayer: string
} | null> => {
  try {
    const ai = getAI();
    const prompt = `INQUIRY: "${query}". 
    TRIBAL LENS: ${context.gender} of ${context.tribe}.
    INQUIRY FOCUS: ${context.focus || 'General Restoration'}.
    COLLECTION TARGET: ${context.collection || 'All Sacred Records'}.

    Search the 1611 KJV and Apocrypha. Provide a deep prophetic synthesis in JSON.
    - verseText: The specific scripture.
    - reference: Book, Chapter, Verse.
    - propheticWitness: How this relates to the current awakening of the 12 tribes.
    - covenantLesson: Practical application of the law or promise.
    - hebraicRootAnalysis: Break down a key word from the original tongue.
    - crossReferences: 2-3 other verses that support this witness.
    - targetedPrayer: A 1611 style prayer based on this verse.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { 
        systemInstruction: ALTAR_PERSONA,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verseText: { type: Type.STRING },
            reference: { type: Type.STRING },
            propheticWitness: { type: Type.STRING },
            covenantLesson: { type: Type.STRING },
            hebraicRootAnalysis: { type: Type.STRING },
            crossReferences: { type: Type.ARRAY, items: { type: Type.STRING } },
            targetedPrayer: { type: Type.STRING }
          },
          required: ["verseText", "reference", "propheticWitness", "covenantLesson", "hebraicRootAnalysis", "crossReferences", "targetedPrayer"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (e) { return null; }
};

export const generatePropheticArt = async (testimony: string, tribe: Tribe): Promise<string | null> => {
  try {
    const ai = getAI();
    const prompt = `A sacred biblical illumination in the style of an ancient Hebrew manuscript or stained glass. 
    Visualizing the spiritual breakthrough: "${testimony}". 
    The theme MUST incorporate the symbol of Tribe ${tribe}. 
    Style: Gold leaf accents, deep sapphire and crimson tones, parchment texture, holy and majestic. 
    No modern elements. Purely symbolic and ancestral.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: { imageConfig: { aspectRatio: "1:1" } }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (e) { return null; }
};

export const chantScripture = async (text: string, language: 'Hebrew' | 'English'): Promise<string | null> => {
  try {
    const ai = getAI();
    const prompt = language === 'Hebrew' 
      ? `Chant this Hebrew transliteration with priestly authority, deep resonance, and rhythmic cadence: ${text}`
      : `Recite this scripture with the weight of an ancient prophet, authoritative and holy: ${text}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio || null;
  } catch (e) { return null; }
};

export const getSacredCounsel = async (
  userProblem: string, 
  history: { role: 'user' | 'model', text: string }[],
  context: { tribe: Tribe, gender: Gender, lifeStage: LifeStage, score: number, activeLaws: Mitzvah[] }
) => {
  try {
    const ai = getAI();
    const contents = history.map(h => ({ role: h.role as any, parts: [{ text: h.text }] }));
    contents.push({ role: 'user', parts: [{ text: `INQUIRY: "${userProblem}"` }] });
    const lawsContext = context.activeLaws.map(l => `LAW #${l.id}: ${l.title} (${l.scripture}) - Intent: ${l.divineIntent}`).join('\n');
    const instruction = `${ALTAR_PERSONA}
USER CONTEXT: ${context.tribe} ${context.gender} ${context.lifeStage}
CURRENT COVENANT OBLIGATIONS (Active Mitzvot):
${lawsContext}
Explain how these laws provide a solution. Address them as "Son/Daughter of [Tribe]".`;
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: { systemInstruction: instruction, temperature: 0.75 },
    });
    return response.text;
  } catch (error) { return "The Altar is silent."; }
};

export const interpretDream = async (dreamText: string, context: { tribe: Tribe, gender: Gender }) => {
  try {
    const ai = getAI();
    const prompt = `Interpret vision for ${context.gender} of ${context.tribe}: "${dreamText}". Return JSON.`;
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: { 
        systemInstruction: ALTAR_PERSONA + "\nPersona: Master of Dreams (Joseph/Daniel).",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            interpretation: { type: Type.STRING },
            symbolicKeys: { type: Type.ARRAY, items: { type: Type.STRING } },
            scriptureReference: { type: Type.STRING },
            dawnAction: { type: Type.STRING }
          },
          required: ["interpretation", "symbolicKeys", "scriptureReference", "dawnAction"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (e) { return null; }
};

export const getPropheticDiagnosis = async (burdenType: 'Physical' | 'Mental' | 'Spiritual', details: string, context: { tribe: Tribe, gender: Gender, lifeStage: LifeStage }) => {
  try {
    const ai = getAI();
    const prompt = `Urim & Thummim Diagnosis for ${burdenType}: "${details}". ${context.tribe} ${context.gender}.`;
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: { 
        systemInstruction: ALTAR_PERSONA,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            rootCause: { type: Type.STRING },
            violationLink: { type: Type.STRING },
            remedyPath: { type: Type.STRING },
            prayer: { type: Type.STRING }
          },
          required: ["rootCause", "violationLink", "remedyPath", "prayer"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (e) { return null; }
};

export const generateFormulaInsight = async (herbs: Herb[], context: { tribe: Tribe, gender: Gender }) => {
  try {
    const ai = getAI();
    const herbsList = herbs.map(h => `${h.name} (${h.hebrewName})`).join(', ');
    const prompt = `INQUIRY: Synergy of these herbs: ${herbsList}. For ${context.gender} of ${context.tribe}.`;
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { systemInstruction: ALTAR_PERSONA, temperature: 0.8 },
    });
    return response.text || "The formula remains a mystery.";
  } catch (e) { return "The Altar is silent."; }
};

export const explainMitzvah = async (law: Mitzvah, context: { tribe: Tribe, gender: Gender }) => {
  try {
    const ai = getAI();
    const prompt = `EXPLAIN LAW #${law.id}: ${law.title}. For ${context.gender} of ${context.tribe}.`;
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { systemInstruction: ALTAR_PERSONA },
    });
    return response.text || "Revelation pending...";
  } catch (e) { return "Scrolls are sealed."; }
};

export const generateMannaInsight = async (slot: MannaSlot, context: { tribe: Tribe, gender: Gender }) => {
  try {
    const ai = getAI();
    const prompt = `Generate Manna for ${slot} for ${context.tribe}. Return JSON.`;
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { 
        systemInstruction: ALTAR_PERSONA,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            scripture: { type: Type.STRING },
            prayer: { type: Type.STRING }
          },
          required: ["scripture", "prayer"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (e) { return null; }
};
