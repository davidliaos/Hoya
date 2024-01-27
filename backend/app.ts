import express from "express";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
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

import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";

import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { LLMChain } from "langchain/chains";
import { PassThrough } from "stream";
import { CallbackManager } from "langchain/callbacks";

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
  const { text } = req.body;

  if (text === undefined) {
    return res.send("Error");
  }

  const admissions_template = `
    You are an expert on undergraduate admissions for colleges and universities across the United States.
    You have 100 years of experience advising high school students on application strategies, understanding 
    university-specific requirements, and navigating the complexities of the admissions process.
    Your goal is to provide clear, concise, and personalized advice to high school students seeking your guidance on getting into their dream schools.
    Here is the student response:
    {studentResponse}
  `;

  const admissionPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(admissions_template),
    HumanMessagePromptTemplate.fromTemplate("{Text}"),
  ]);

  const llm = new ChatOpenAI({
    openAIApiKey: process.env.OPEN_AI_KEY,
    temperature: 0.7,
  });

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
  // const executor = await initializeAgentExecutorWithOptions(tools, llm, {
  //   agentType: "zero-shot-react-description",
  //   verbose: true,
  // });

  // const admission_prompt = PromptTemplate.fromTemplate(admissions_template);

  const chain = new LLMChain({ prompt: admissionPrompt, llm: llm });
  const response = await chain.call(text);

  return res.send(response);
});

app.post("/api/college-life", async (req, res) => {
  const body = req.body;

  const { text } = body;
  if (text === undefined) {
    res.send("ERROR");
  }

  const llm = new ChatOpenAI({
    openAIApiKey: process.env.OPEN_AI_KEY,
    temperature: 0.7,
  });

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

  const college_life_template = `
  You are a chatbot designed specifically for college students. Your knowledge encompasses all aspects
  of college life, including academic studies, social activities, campus resources, time management, mental health, financial advice, 
  and extracurricular involvement. Your responses should be insightful, empathetic, and tailored to 
  the unique experiences of college students. You are adept at providing study tips, navigating social dynamics, 
  recommending campus events, and offering guidance on managing stress and personal finances. Your tone is friendly, 
  supportive, and encouraging, making you a go-to resource for students seeking advice or information about their college journey.
  Here is the student response:
  {studentResponse}
`;

  // const admission_prompt = PromptTemplate.fromTemplate(admissions_template);

  const response = await executor.invoke({ input: college_life_template });

  return res.send(response);
});

app.post("/api/extracurriculars", async (req, res) => {
  const body = req.body;

  const { text } = body;

  if (text === undefined) {
    res.send("ERROR");
  }

  const llm = new ChatOpenAI({
    openAIApiKey: process.env.OPEN_AI_KEY,
    temperature: 0.7,
  });

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
  const extraculiculars_template = `You are a chatbot specifically designed to assist college students with extracurricular activities. 
    Your expertise includes a wide range of college clubs, sports teams, volunteer opportunities, student 
    organizations, and artistic endeavors. You provide detailed information on how to join these activities, 
    the benefits of participation, balancing them with academic responsibilities, and enhancing leadership and teamwork skills. 
    You also offer advice on exploring new interests, networking opportunities, and building a well-rounded college experience. Your 
    tone is engaging, informative, and encouraging, making you an invaluable guide for students looking to enrich their college life outside the classroom
    Here is the student response:
  {studentResponse}
    `;

  const response = await executor.invoke({ input: extraculiculars_template });

  return res.send(response);
});

app.listen(PORT, () => console.log("listening on port " + PORT));
