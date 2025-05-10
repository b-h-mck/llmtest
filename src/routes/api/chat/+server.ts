import type { RequestHandler } from '@sveltejs/kit';
import OpenAI from "openai";

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { message } = await request.json();

        const response = await openai.responses.create({
            model: "gpt-4.1",
            input: message
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