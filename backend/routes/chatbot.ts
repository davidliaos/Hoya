import { Router } from "websocket-express";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { MongoDBAtlasVectorSearch } from "@langchain/community/vectorstores/mongodb_atlas";
import { vector } from "../connection";

const router = new Router();
const outputParser = new StringOutputParser();

router.ws("/admission-requirements", async (req, res) => {
  const ws = await res.accept();

  ws.on("message", async (msg: Buffer) => {
    const llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_KEY,
    });

    // const vectorStore = new MongoDBAtlasVectorSearch(
    //   new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_KEY }),
    //   {
    //     collection: vector,
    //     indexName: "default",
    //     textKey: "text",
    //     embeddingKey: "embedding",
    //   }
    // );

    // const resultOne = await vectorStore.similaritySearch(msg.toString(), 1);
    // console.log("here");
    // console.log(resultOne);

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are an expert on undergraduate admissions for colleges and universities across the United States.
    You have 100 years of experience advising high school students on application strategies, understanding 
    university-specific requirements, and navigating the complexities of the admissions process.
    Your goal is to provide clear, concise, and personalized advice to high school students seeking your guidance on getting into their dream schools.`,
      ],
      // ["system", "This document might contain relevent information: {doc}"],
      ["user", "{input}"],
    ]);

    const chain = prompt.pipe(llm).pipe(outputParser);

    const message = await chain.invoke({
      input: msg.toString(),
      // doc: resultOne[0].pageContent
    });

    ws.send(message);
  });
});

router.ws("/application-process", async (req, res) => {
  const ws = await res.accept();

  ws.on("message", async (msg: Buffer) => {
    const llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_KEY,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are an expert on college application process for colleges and universities across the United States.
    You have 100 years of experience advising high school students on application strategies, understanding 
    university-specific application processes.
    Your goal is to provide clear, concise, and personalized advice to high school students seeking your guidance on getting into their dream schools.`,
      ],
      ["user", "{input}"],
    ]);

    const chain = prompt.pipe(llm).pipe(outputParser);

    const message = await chain.invoke({
      input: msg.toString(),
    });

    ws.send(message);
  });
});

router.ws("/financial-aid", async (req, res) => {
  const ws = await res.accept();

  ws.on("message", async (msg: Buffer) => {
    const llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_KEY,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are an expert on college financial aid for colleges and universities across the United States.
    You have 100 years of experience advising high school students on application strategies, understanding 
    university-specific financial aid.
    Your goal is to provide clear, concise, and personalized advice to high school students seeking your guidance on getting into their dream schools.`,
      ],
      ["user", "{input}"],
    ]);

    const chain = prompt.pipe(llm).pipe(outputParser);

    const message = await chain.invoke({
      input: msg.toString(),
    });

    ws.send(message);
  });
});

router.ws("/choosing-college", async (req, res) => {
  const ws = await res.accept();

  ws.on("message", async (msg: Buffer) => {
    const llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_KEY,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are an expert on choosing colleges for colleges and universities across the United States.
    You have 100 years of experience advising high school students on application strategies, understanding how to choose a college.
    Your goal is to provide clear, concise, and personalized advice to high school students seeking your guidance on getting into their dream schools.`,
      ],
      ["user", "{input}"],
    ]);

    const chain = prompt.pipe(llm).pipe(outputParser);

    const message = await chain.invoke({
      input: msg.toString(),
    });

    ws.send(message);
  });
});

router.ws("/career-preparation", async (req, res) => {
  const ws = await res.accept();

  ws.on("message", async (msg: Buffer) => {
    const llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_KEY,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are an expert on college career preparation for colleges and universities across the United States.
    You have 100 years of experience advising high school students on application strategies, understanding career preparation.
    Your goal is to provide clear, concise, and personalized advice to high school students seeking your guidance on getting into their dream schools.`,
      ],
      ["user", "{input}"],
    ]);

    const chain = prompt.pipe(llm).pipe(outputParser);

    const message = await chain.invoke({
      input: msg.toString(),
    });

    ws.send(message);
  });
});

export default router;
