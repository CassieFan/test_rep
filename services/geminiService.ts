
import { GoogleGenAI, Type } from "@google/genai";
import { InspectionRecord } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIInspectionAdvice = async (record: InspectionRecord): Promise<string> => {
  const prompt = `
    作为一名资深的质量管理与安全专家，请分析以下巡查考评结果并给出专业建议。
    
    考评目标：${record.target}
    考评得分：${record.totalScore}
    考评状态：${record.status}
    
    详细考评项：
    ${record.items.map(item => `- [${item.category}] ${item.title}: ${item.status} (得分: ${item.score}/${item.maxScore}) - 备注: ${item.comment || '无'}`).join('\n')}
    
    请提供：
    1. 本次考评的整体评价。
    2. 针对失分项的具体整改建议。
    3. 长期的预防性改进措施。
    
    请使用 Markdown 格式回复，语言简洁专业。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "无法生成建议，请稍后再试。";
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return "分析过程中出现错误，建议检查网络或 API 配置。";
  }
};
