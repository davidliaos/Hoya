import express from "express";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { validateRequest } from "zod-express-middleware";
import { z } from "zod";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { Calculator } from "langchain/tools/calculator";
import { WebBrowser } from "langchain/tools/webbrowser";
import { SerpAPI } from "@langchain/community/tools/serpapi";
import {
  OpenAIClient,
  OpenAIKeyCredential,
  AzureKeyCredential,
} from "@azure/openai";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const app = express();
const PORT = 8080;

app.use(express.json());

app.post("/api/admission-requirements", async (req, res) => {
  /**
   * req: {
   *  text: text
   * }
   */
  // ask the llm
  // ask the vector db
  // retreive
  const body = req.body;

  if (body.text === undefined) {
    return res.send("Error");
  }

  const llm = new ChatOpenAI({
    openAIApiKey: process.env.OPEN_AI_KEY,
    temperature: 0.7,
  });

  // const llm = new OpenAIClient(
  //   new OpenAIKeyCredential("b0847eddecf740c18286f0a421d09d10")
  // );
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPEN_AI_KEY,
  });

  const tools = [
    new SerpAPI(process.env.SERPAPI_API_KEY, {
      location: "Austin,Texas,United States",
      hl: "en",
      gl: "us",
    }),
    new Calculator(),
    new WebBrowser({ model: llm, embeddings }),
  ];

  const executor = await initializeAgentExecutorWithOptions(tools, llm, {
    agentType: "zero-shot-react-description",
    verbose: true,
  });

  const admissions_template = `You are an expert on undergraduate admissions for colleges and universities across the United States.
You have 100 years of experience advising high school students on application strategies, understanding university-specific requirements, and navigating the complexities of the admissions process.
Your goal is to provide clear, concise, and personalized advice to high school students seeking your guidance on getting into their dream schools.
Here is the student response:
{studentResponse}
`;

  // const admission_prompt = PromptTemplate.fromTemplate(admissions_template);

  const response = await executor.invoke({ input: admissions_template });

  return res.send(response);
});

app.listen(PORT, () => console.log("listening on port " + PORT));
