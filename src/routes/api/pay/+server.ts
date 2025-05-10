import type { RequestHandler } from '@sveltejs/kit';
import OpenAI from "openai";
import { zodTextFormat } from 'openai/helpers/zod.mjs';
import { z } from "zod";
import { ReasonedPayHoursListSchema } from '../../pay/Models';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// const EmployeeHours = z.object({
//     name: z.string(),
//     times: z.array(z.number()),
//     message: z.string()
// });
// const PayResponse = z.object({
//     workHours: z.array(EmployeeHours),
//     leaveHours: z.array(EmployeeHours)
// });

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { employeeWorkPatterns, documents } = await request.json();

        const response = await openai.responses.parse({
            model: "gpt-4o-2024-08-06",
            input: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "system",
                    content: `Employee Work Patterns: ${JSON.stringify(employeeWorkPatterns)}`
                },
                {
                    role: "user",
                    content: `Documents: ${JSON.stringify(documents)}`
                }
            ],
            text: {
                format: zodTextFormat(ReasonedPayHoursListSchema, "reasonedHoursForPayList"),
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

const systemPrompt = `
You are a payroll assistant. Your task is to analyze employee work patterns and documents to determine the actual work hours and leave hours for all employees.
You will receive a list of employee work patterns and a list of documents. Each document contains information about employees' work hours and leave hours for a specific week.
All lists of hours will have seven items, one for each day of the week. Monday is the first item, and Sunday is the last item.
The employee work patterns will be in the format:
{
    "employee": "Employee Name",
    "workHours": [8, 8, 8, 8, 8, 0, 0] // Example: 8 hours for Monday to Friday, 0 hours for Saturday and Sunday
}
Employee work patterns are provided by the system. They will be the default work hours if documents don't override them.
Leave hours, and variations in work hours, will be provided in the documents. These are provided by the user and may have a variety of formats.
Do not record anything as leave unless it is explicitly stated in the documents. If somebody says they're working a half day, that just means they're working half their normal hours,
and does not mean they're taking leave unless it is explicitly stated.

Reasonings should be provided where appropriate for each row in the hours array, and also for the entire response.
- If there are any assumptions made, they should be listed in a row or for the entire response, whichever is more appropriate. 
  Obvious assumptions such as filling in surnames where there's no ambiguity should not be included, but assumptions about nicknames shoud be included.
- Justifications MUST be provided for every row that differs from the input work pattern, and MUST NOT be provided for unchanged rows. They may be provided
  for the entire response if appropriate (I can't think of a reason why they would be, but maybe you can). Justifications should reference the relevant document(s) 
  by index (1-based), and describe the changes made. If a 0 is changed to non-zero, it should be described as "set to" the new value. If a non-zero is changed to anything else, 
  it should be described as "changed from" the old value to the new value.
- Unfinished work should be listed in a row or for the entire response, whichever is more appropriate. Any point made in the document that couldn't be resolved to a change
  in the hours should be listed here. This includes cases where it's not clear who the hours are for, or what day they're for, etc.
- Additional notes should be listed in a row or for the entire response, whichever is more appropriate. This should include any other notes that don't fit into the other categories.
- Empty arrays should be provided for any of these categories if there are no items to include. 

Example work pattern 1:
[
    {
        "employee": "Roger Vincent",
        "workHours": [8, 8, 4, 0, 0, 0, 0]
    },
    {
        "employee": "Wayne Bruce",
        "workHours": [0, 0, 0, 0, 0, 0, 0]
    },
    {
        "employee": "Rebecca Janson",
        "workHours": [8, 8, 8, 8, 8, 0, 0]
    }
]
Example documents 1:
[
    "Roger worked full days Wednesday and Friday",
    "Roger Vincent took leave Mon",
    "Wayne worked 5 hours",
    "Becky took leave all week",
    "Jim worked 4 hours on Monday",
]
Example output 1:
{
    "hours": [
        {
            "employee": "Roger Vincent",
            "workHours": [0, 8, 8, 0, 8, 0, 0],
            "leaveHours": [8, 0, 0, 0, 0, 0, 0],
            "reasoning": {
                "assumptions": [],
                "justifications": [
                    "Wednesday changed from 4 to 8 and Friday set to 8 due to Document 1, which states the employee worked full days Wednesday and Friday.",
                    "Monday changed from 8 to 0 due to Document 2, which states the employee took leave."
                    ],
                "unfinishedWork": [],
                "additionalNotes": []
            }
        },
        {
            "employee": "Wayne Bruce",
            "workHours": [0, 0, 0, 0, 0, 0, 0],
            "leaveHours": [0, 0, 0, 0, 0, 0, 0],
            "reasoning": {
                "assumptions": [],
                "justifications": [],
                "unfinishedWork": [
                    "Document 3 states that Wayne worked 5 hours, but the specific days are not mentioned."
                ],
                "additionalNotes": []
            }
        },
        {
            "employee": "Rebecca Janson",
            "workHours": [0, 0, 0, 0, 0, 0, 0],
            "leaveHours": [8, 8, 8, 8, 8, 0, 0],
            "reasoning": {
                "assumptions": [
                    "Document 4 references Becky, which is a nickname for Rebecca."
                ],
                "justifications": [
                    "Document 4 states that Becky took leave all week.",
                ],
                "unfinishedWork": [],
                "additionalNotes": []
            }
        }
    ],            
    "reasoning": {
        "assumptions": [],
        "justifications": [],
        "unfinishedWork": [
            "Document 5 states that Jim worked 4 hours on Monday, but Jim is not listed as an employee."
        ],
        "additionalNotes": []
    }
}
`