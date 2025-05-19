import { z } from "zod";

export const DayHoursSchema = z.object({
    workHours: z.number(),
    leaveHours: z.number()
});

export const EmployeeHoursSchema = z.object({
    employeeId: z.string(),
    name: z.string(),
    days: z.array(DayHoursSchema),
});

export const DocumentInfoSchema = z.object({
    documentId: z.string(),
    name: z.string(),
    content: z.string()
})

export const LLMInputSchema = z.object({
    employeeHours: z.array(EmployeeHoursSchema),
    documents: z.array(DocumentInfoSchema)
});

export const ActionSchema = z.object({
    documentId: z.string(),
    employeeId: z.string().nullable(),
    employeeIdJustification: z.string(),
    dayOfWeek: z.number().nullable(),
    dayOfWeekJustification: z.string(),
    workHours: z.number().nullable(),
    workHoursJustification: z.string().nullable(),
    leaveHours: z.number().nullable(),
    leaveHoursJustification: z.string().nullable()
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
    actions: z.array(ActionSchema)
})


export type EmployeeHours = z.infer<typeof EmployeeHoursSchema>;
export type DocumentInfo = z.infer<typeof DocumentInfoSchema>;
export type LLMInput = z.infer<typeof LLMInputSchema>;

export type Action = z.infer<typeof ActionSchema>;
export type LLMOutput = z.infer<typeof LLMOutputSchema>;


export function createEmployeeHours(employeeId: string, name: string, dayHours: number[]): EmployeeHours {
    // Ensure the array has 7 elements, padding with 0 or truncating as necessary
    dayHours = dayHours.slice(0, 7).concat(new Array(7 - dayHours.length).fill(0));
    return {
        employeeId,
        name,
        days: dayHours.map((hours, index) => ({
            workHours: hours,
            leaveHours: 0
        }))
    };
}
