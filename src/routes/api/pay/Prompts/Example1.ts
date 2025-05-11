import { createEmployeeHours, type EmployeeHours, type LLMInput, type LLMOutput } from "../../../pay/Models"

export const exampleInput1 : LLMInput = {
    employeeHours: [
        createEmployeeHours("Roger Vincent", [8, 8, 4]),
        createEmployeeHours("Wayne Bruce", []),
        createEmployeeHours("Gerry Geraldson", []),
        createEmployeeHours("Rebecca Janson", [8, 8, 8, 8, 8])
    ],
    documents: [
        { 
            name: 'TS_GG.txt',
            content: '8 8 6 0 0 0 0'
        },
        {
            name: 'note1',
            content: 'Roger worked full days Wednesday and Friday'
        },
        { 
            name: 'note2',
            content: 'Wayne worked 5 hours'
        },
        {
            name: 'LEAVE.txt',
            content: 'Becky took leave all week'
        },
        {
            name: 'note3',
            content: 'Jim worked 4 hours on Monday'
        }
    ]
}


export const exampleOutput1 : LLMOutput = {
    deductions: [
        {
            sourceDocumentIndexes: [0],
            sourceDeductionIndexes: [],
            assumptions: ["This is a timesheet document", "The 'GG' in the document name refers to Gerry Geraldson", "The 'TS' in the document name refers to a timesheet"],
            description: "Gerry Geraldson worked the hours specified in this timesheet document",
        },
        {
            sourceDocumentIndexes: [1],
            sourceDeductionIndexes: [],
            assumptions: ["'Roger' refers to Roger Vincent"],
            description: "Roger Vincent worked 8 hours on Wednesday and Friday"
        },
        {
            sourceDocumentIndexes: [2],
            sourceDeductionIndexes: [],
            assumptions: ["'Wayne' refers to Wayne Bruce"],
            description: "Wayne Bruce worked 5 hours, but it is unclear which day(s) this refers to"
        },
        {
            sourceDocumentIndexes: [3],
            sourceDeductionIndexes: [],
            assumptions: ["'Becky' refers to Rebecca Janson"],
            description: "Rebecca Janson took 8 hours of leave on every weekday"
        },
        {
            sourceDocumentIndexes: [4],
            sourceDeductionIndexes: [],
            assumptions: [],
            description: "'Jim' worked 4 hours on Monday, but it is unclear who this refers to"
        }
    ],
    changes: [
        {
            employeeIndex: 2, // Gerry Geraldson
            dayIndex: 0, // Monday
            newWorkHours: 8,
            deductionIndex: 0,
        },
        {
            employeeIndex: 2, // Gerry Geraldson
            dayIndex: 1, // Tuesday
            newWorkHours: 8,
            deductionIndex: 0,
        },
        {
            employeeIndex: 2, // Gerry Geraldson
            dayIndex: 2, // Wednesday
            newWorkHours: 6,
            deductionIndex: 0,
        },


        {
            employeeIndex: 0, // Roger Vincent
            dayIndex: 2, // Wednesday
            newWorkHours: 8,
            deductionIndex: 1,
        },
        {
            employeeIndex: 0, // Roger Vincent
            dayIndex: 4, // Friday
            newWorkHours: 8,
            deductionIndex: 1,
        },


        {
            employeeIndex: 3, // Rebecca Janson
            dayIndex: 0, // Monday
            newLeaveHours: 8,
            deductionIndex: 3,
        },
        {
            employeeIndex: 3, // Rebecca Janson
            dayIndex: 1, // Tuesday
            newLeaveHours: 8,
            deductionIndex: 3,
        },
        {
            employeeIndex: 3, // Rebecca Janson
            dayIndex: 2, // Wednesday
            newLeaveHours: 8,
            deductionIndex: 3,
        },
        {
            employeeIndex: 3, // Rebecca Janson
            dayIndex: 3, // Thursday
            newLeaveHours: 8,
            deductionIndex: 3,
        },
        {
            employeeIndex: 3, // Rebecca Janson
            dayIndex: 4, // Friday
            newLeaveHours: 8,
            deductionIndex: 3,
        }
    ],
    unfinishedWork: [
        {
            employeeIndex: 1, // Wayne Bruce
            dayIndex: 0,
            deductionIndex: 2,
            description: "Find out which day(s) Wayne Bruce worked 5 hours, and enter the hours"
        },
        {
            employeeIndex: 2, // Gerry Geraldson
            dayIndex: 0,
            deductionIndex: 4,
            description: "Find out who 'Jim' refers to, and enter 4 hours for them on Monday"
        }
    ]
}
