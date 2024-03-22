import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
// New (i.e., OpenAI NodeJS SDK v4)
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const Instruction = {
  role: "system",
  content:
    "You are a code generator, you only give answers in code in markdows and also give explanations of the code",
};
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1 } = body;

    if (!userId) {
      return new NextResponse("Unauthorized User", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 500 });
    }

    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "256x256",
      quality: "standard",
    });
    return NextResponse.json(response.data[0].url);
  } catch (error) {
    console.log("[Image Error]", error);
    return new NextResponse("check here Error", { status: 500 });
  }
}
