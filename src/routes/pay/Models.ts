import { z } from "zod";

// export const DayHoursSchema = z.object({
//     workHours: z.number(),
//     leaveHours: z.number()
// });

// export const EmployeeHoursSchema = z.object({
//     employeeId: z.string(),
//     name: z.string(),
//     days: z.array(DayHoursSchema),
// });

export const DocumentInfoSchema = z.object({
    name: z.string(),
    content: z.string()
})

export const EmployeeSchema = z.object({
    employeeId: z.number(),
    name: z.string(),
});

export const LLMInputSchema = z.object({
    employees: z.array(EmployeeSchema),
    document : DocumentInfoSchema
});

export function createEmployees(employeeNames: string[]) : Employee[] {
    return employeeNames.map((employeeName, index) => ({employeeId: index, name: employeeName}));
}

export function createInputs(employeeNames: string[], documents: DocumentInfo[]) : LLMInput[] {
    return documents.map(document => {
        return {
            employees: createEmployees(employeeNames),
            document: {
                name: document.name,
                content: document.content
            }
        }
    });
}

export const CalculatedHoursSchema = z.object({
    employeeId: z.number(),
    employeeJustification: z.string(),
    dayOfWeek: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'unknown']),
    dayOfWeekJustification: z.string(),
    hoursType: z.enum(['workHours', 'leaveHours', 'unknown']),
    hours: z.number(),
    hoursJustification: z.string(),
});




// export const ChangeSchema = z.object({
//     assumptions: z.array(z.string()),
//     sourceDocumentIndex : z.number(),
//     employeeIndex: z.number(),
//     dayIndex: z.number(),
//     newWorkHours: z.number().nullable().optional(),
//     newLeaveHours: z.number().nullable().optional(),
// });

// export const UnfinishedWorkSchema = z.object({
//     assumptions: z.array(z.string()),
//     sourceDocumentIndex : z.number(),
//     employeeIndex: z.number().nullable().optional(),
//     dayIndex: z.number().nullable().optional(),
//     description: z.string()
// });

export const LLMOutputSchema = z.object({
    calculatedHours: z.array(CalculatedHoursSchema),
    llmFeedback: z.string(),
})


export type Employee = z.infer<typeof EmployeeSchema>;
export type DocumentInfo = z.infer<typeof DocumentInfoSchema>;
export type LLMInput = z.infer<typeof LLMInputSchema>;

export type CalculatedHours = z.infer<typeof CalculatedHoursSchema>;
export type LLMOutput = z.infer<typeof LLMOutputSchema>;



// export function createEmployeeHours(employeeId: string, name: string, dayHours: number[]): EmployeeHours {
//     // Ensure the array has 7 elements, padding with 0 or truncating as necessary
//     dayHours = dayHours.slice(0, 7).concat(new Array(7 - dayHours.length).fill(0));
//     return {
//         employeeId,
//         name,
//         days: dayHours.map((hours, index) => ({
//             workHours: hours,
//             leaveHours: 0
//         }))
//     };
// }
