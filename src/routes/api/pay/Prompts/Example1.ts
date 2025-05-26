import { createInputs, type CalculatedHours, type DocumentInfo, type LLMInput, type LLMOutput } from "../../../pay/Models"


const employeeNames = [
    'Roger Vincent',
    'Wayne Bruce',
    'Gerry Geraldson',
    'Rebecca Janson'
];

const documents : DocumentInfo[] = [
    {
        name: 'TS_GG.txt',
        content: '8 8 6 0 0 0 0'
    },
    {
        name: 'note1',
        content: 'Roger worked full days Wednesday and Friday, and will be finishing up with us in 3 weeks'
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
        content: 'Jim worked a half day Monday'
    }

];

export const exampleInputs1 = createInputs(employeeNames, documents);

const gerrysTimesheet = { 
    employeeId: 2,
    employeeJustification: "'GG' appears in the document name",
    hoursType: 'workHours' as 'workHours',
    hours: 8,
    hoursJustification: "'8' is in the timesheet",
}

const rogersHours = {
    employeeId: 0,
    employeeJustification: "'Roger' appears in the document",
    hoursType: 'workHours' as 'workHours',
    hours: 8,
    hoursJustification: "Document states that Roger worked full days"
}

const waynesHours = {
    employeeId: 1,
    employeeJustification: "'Wayne' appears in the document",
    hoursType: 'workHours' as 'workHours',
    hours: 5,
    hoursJustification: "'5 hours' is in the document",
    dayOfWeek: null,
    dayOfWeekJustification: "Document doesn't specify which day Wayne worked"

}

const rebeccasLeave = {
    employeeId: 3,
    employeeJustification: "'Becky' appears in the document",
    hoursType: 'leaveHours' as 'leaveHours',
    hours: 8,
    hoursJustification: "Document states that Becky took leave all week",
    dayOfWeekJustification: "Document states that Becky took leave all week"
}

const jimsHours = {
    documentId: 'note3',
    employeeId: null,
    employeeJustification: "'Jim' appears in the document, but it is not clear who this refers to",
    hoursType: 'workHours' as 'workHours',
    hours: 4,
    hoursJustification: "'4' is in the document",    
    dayOfWeek: 0,
    dayOfWeekJustification: "Document states that Jim worked a half day Monday"
}

export const exampleOutputs1 : LLMOutput[] = [
    { 
        calculatedHours : [
            { ...gerrysTimesheet, dayOfWeek: 0, dayOfWeekJustification: "First column in the timesheet" },
            { ...gerrysTimesheet, dayOfWeek: 1, dayOfWeekJustification: "Second column in the timesheet" },
            { ...gerrysTimesheet, dayOfWeek: 2, dayOfWeekJustification: "Third column in the timesheet", hours: 6, hoursJustification: "'6' appears in the document" }
        ]
    },
    { 
        calculatedHours : [
            { ...rogersHours, dayOfWeek: 2, dayOfWeekJustification: "Document states that Roger worked Wednesday" },
            { ...rogersHours, dayOfWeek: 4, dayOfWeekJustification: "Document states that Roger worked Friday" },
        ]
    },
    { 
        calculatedHours : [
            { ...waynesHours, dayOfWeek: null, dayOfWeekJustification: "Document doesn't specify which day Wayne worked" }
        ]
    },
    { 
        calculatedHours : [
            { ...rebeccasLeave, dayOfWeek: 0 },
            { ...rebeccasLeave, dayOfWeek: 1 },
            { ...rebeccasLeave, dayOfWeek: 2 },
            { ...rebeccasLeave, dayOfWeek: 3 },
            { ...rebeccasLeave, dayOfWeek: 4 }
        ]
    },
    { 
        calculatedHours : [
            jimsHours
        ]
    }
]

