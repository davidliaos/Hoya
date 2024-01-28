import axios from "axios";
import * as cheerio from "cheerio";
import { MongoDBAtlasVectorSearch } from "@langchain/community/vectorstores/mongodb_atlas";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { vector } from "./connection";
import "dotenv/config";

const urls = [
  "https://www.csi.cuny.edu/admissions",
  "https://www.csi.cuny.edu/admissions/request-information",
  "https://www.csi.cuny.edu/admissions/explore-csi",
  "https://www.csi.cuny.edu/admissions/visit-csi",
  "https://www.csi.cuny.edu/admissions/applying-csi",
  "https://www.csi.cuny.edu/admissions/graduate-admissions",
  "https://www.csi.cuny.edu/admissions/applying-csi/international",
  "https://www.csi.cuny.edu/admissions/applying-csi/adult-learners",
  "https://www.csi.cuny.edu/admissions/applying-csi/veterans",
  "https://www.csi.cuny.edu/admissions/applying-csi/visiting-students",
  "https://www.csi.cuny.edu/admissions/paying-college",
  "https://www.csi.cuny.edu/admissions/guidance-counselors",
  "https://www.csi.cuny.edu/admissions/new-student-guide",
];

async function fetchTextFromUrl(url: string): Promise<string> {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    return $("body").text(); // Extracts text from the body tag
  } catch (error) {
    console.log(error);
    return "";
  }
}

async function main() {
  let main_text = "";
  for (const url of urls) {
    console.log("getting " + url);
    const text = await fetchTextFromUrl(url);
    main_text += text;
  }

  console.log("done parsing all the text");

  const splitter = RecursiveCharacterTextSplitter.fromLanguage("html", {
    chunkSize: 500,
    chunkOverlap: 0,
  });
  const output = await splitter.createDocuments([main_text]);

  MongoDBAtlasVectorSearch.fromDocuments(
    output,
    new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_KEY }),
    {
      collection: vector,
      indexName: "default",
    }
  );
}

main();
