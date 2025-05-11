import { z } from "zod";

export const DayHoursSchema = z.object({
    workHours: z.number(),
    leaveHours: z.number()
});

export const EmployeeHoursSchema = z.object({
    employee: z.string(),
    days: z.array(DayHoursSchema),
});

export const DocumentInfoSchema = z.object({
    name: z.string(),
    content: z.string()
})

export const LLMInputSchema = z.object({
    employeeHours: z.array(EmployeeHoursSchema),
    documents: z.array(DocumentInfoSchema)
});

export const DeductionSchema = z.object({
    sourceDocumentIndexes: z.array(z.number()),
    sourceDeductionIndexes: z.array(z.number()),
    assumptions: z.array(z.string()),
    description: z.string(),
});

export const ChangeSchema = z.object({
    employeeIndex: z.number(),
    dayIndex: z.number(),
    newWorkHours: z.number().nullable().optional(),
    newLeaveHours: z.number().nullable().optional(),
    deductionIndex : z.number()
});

export const UnfinishedWorkSchema = z.object({
    employeeIndex: z.number().nullable().optional(),
    dayIndex: z.number().nullable().optional(),
    deductionIndex: z.number(),
    description: z.string()
});

export const LLMOutputSchema = z.object({
    deductions: z.array(DeductionSchema),
    changes: z.array(ChangeSchema),
    unfinishedWork: z.array(UnfinishedWorkSchema),
})



export type EmployeeHours = z.infer<typeof EmployeeHoursSchema>;
export type DocumentInfo = z.infer<typeof DocumentInfoSchema>;
export type LLMInput = z.infer<typeof LLMInputSchema>;

export type Deduction = z.infer<typeof DeductionSchema>;
export type Change = z.infer<typeof ChangeSchema>;
export type UnfinishedWork = z.infer<typeof UnfinishedWorkSchema>;
export type LLMOutput = z.infer<typeof LLMOutputSchema>;


export function createEmployeeHours(employee: string, dayHours: number[]): EmployeeHours {
    // Ensure the array has 7 elements, padding with 0 or truncating as necessary
    dayHours = dayHours.slice(0, 7).concat(new Array(7 - dayHours.length).fill(0));
    return {
        employee,
        days: dayHours.map((hours, index) => ({
            workHours: hours,
            leaveHours: 0
        }))
    };
}

export function createDocumentInfo(name: string, content: string): DocumentInfo {
    return {
        name,
        content
    };
}