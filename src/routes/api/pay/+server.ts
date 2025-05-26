import type { RequestHandler } from '@sveltejs/kit';
import OpenAI from "openai";
import { zodTextFormat } from 'openai/helpers/zod.mjs';
import { z } from "zod";
import { systemPrompt } from './Prompts/Prompt';
import { LLMOutputSchema } from '../../pay/Models';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const POST: RequestHandler = async ({ request }) => {
    try {
        const requestJson = await request.json();

        const response = await openai.responses.parse({
            model: "gpt-4o-2024-08-06",
            input: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: JSON.stringify(requestJson)
                }
            ],
            text: {
                format: zodTextFormat(LLMOutputSchema, "llmOutput"),
            },
        });
        const reply = response.output_text;

        return new Response(JSON.stringify({ reply }), { headers: { 'Content-Type': 'application/json' } });
    } catch (error: any) {
        // Handle errors from the OpenAI SDK
        const errorMessage = error.response?.data?.error?.message || error.message || 'An unknown error occurred';
        return new Response(
            JSON.stringify({ error: errorMessage }),
            { status: error.response?.status || 500 }
        );
    }
};
