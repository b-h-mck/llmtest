import { z } from "zod";

export const WorkPatternSchema = z.object({
    employee: z.string(),
    workHours: z.array(z.number()),
});

export const ReasoningSchema = z.object({
    assumptions: z.array(z.string()),
    justifications: z.array(z.string()),
    unfinishedWork: z.array(z.string()),
    additionalNotes: z.array(z.string()),
});


export const ReasonedPayHoursSchema = z.object({
    employee: z.string(),
    workHours: z.array(z.number()),
    leaveHours: z.array(z.number()),
    reasoning: ReasoningSchema,
});

export const ReasonedPayHoursListSchema = z.object({
        hours: z.array(ReasonedPayHoursSchema),
        reasoning: ReasoningSchema,
    }
);

export type WorkPattern = z.infer<typeof WorkPatternSchema>;
export type Reasoning = z.infer<typeof ReasoningSchema>;
export type ReasonedPayHours = z.infer<typeof ReasonedPayHoursSchema>;
export type ReasonedPayHoursList = z.infer<typeof ReasonedPayHoursListSchema>;


