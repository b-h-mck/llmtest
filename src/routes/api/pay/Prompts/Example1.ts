import { createEmployeeHours, type Action, type EmployeeHours, type LLMInput, type LLMOutput } from "../../../pay/Models"

export const exampleInput1 : LLMInput = {
    employeeHours: [
        createEmployeeHours('vincentr', "Roger Vincent", [8, 8, 4]),
        createEmployeeHours('brucew', "Wayne Bruce", []),
        createEmployeeHours('geraldsong', "Gerry Geraldson", []),
        createEmployeeHours('jansonr', "Rebecca Janson", [8, 8, 8, 8, 8])
    ],
    documents: [
        { 
            documentId: 'TS_GG.txt',
            name: 'TS_GG.txt',
            content: '8 8 6 0 0 0 0'
        },
        {
            documentId: 'note1',
            name: 'note1',
            content: 'Roger worked full days Wednesday and Friday, and will be finishing up with us in 3 weeks'
        },
        { 
            documentId: 'note2',
            name: 'note2',
            content: 'Wayne worked 5 hours'
        },
        {
            documentId: 'LEAVE.txt',
            name: 'LEAVE.txt',
            content: 'Becky took leave all week'
        },
        {
            documentId: 'note3',
            name: 'note3',
            content: 'Jim worked a half day Monday'
        }
    ]
}

const gerrysTimesheet = { 
    documentId: 'TS_GG.txt', 
    employeeId: 'geraldsong',
    employeeIdJustification: "'GG' appears in the document name",
    workHours: 8,
    workHoursJustification: "'8' is in the timesheet",
    leaveHours: 0,
    leaveHoursJustification: null
}

const rogersHours = {
    documentId: 'note1',
    employeeId: 'vincentr',
    employeeIdJustification: "'Roger' appears in the document",
    workHours: 8,
    workHoursJustification: "Document states that Roger worked full days",
    leaveHours: 0,
    leaveHoursJustification: null
}

const waynesHours = {
    documentId: 'note2',
    employeeId: 'brucew',
    employeeIdJustification: "'Wayne' appears in the document",
    workHours: 5,
    workHoursJustification: "'5 hours' is in the document",
    leaveHours: 0,
    leaveHoursJustification: null
}

const rebeccasLeave = {
    documentId: 'LEAVE.txt',
    employeeId: 'jansonr',
    employeeIdJustification: "'Becky' appears in the document",
    workHours: 0,
    workHoursJustification: null,
    leaveHours: 8,
    leaveHoursJustification: "Document states that Becky took leave all week",
    dayOfWeekJustification: "Document states that Becky took leave all week"
}

const jimsHours = {
    documentId: 'note3',
    employeeId: null,
    employeeIdJustification: "'Jim' appears in the document, but it is not clear who this refers to",
    workHours: 4,
    workHoursJustification: "'4 hours' is in the document",
    leaveHours: 0,
    leaveHoursJustification: null,
    dayOfWeek: 0,
    dayOfWeekJustification: "Document states that Jim worked a half day Monday"
}

const actions : Action[] = [
    { ...gerrysTimesheet, dayOfWeek: 0, dayOfWeekJustification: "First column in the timesheet" },
    { ...gerrysTimesheet, dayOfWeek: 1, dayOfWeekJustification: "Second column in the timesheet" },
    { ...gerrysTimesheet, dayOfWeek: 2, dayOfWeekJustification: "Third column in the timesheet", workHours: 6, workHoursJustification: "'6' appears in the document" },
    { ...rogersHours, dayOfWeek: 2, dayOfWeekJustification: "Document states that Roger worked Wednesday" },
    { ...rogersHours, dayOfWeek: 4, dayOfWeekJustification: "Document states that Roger worked Friday" },
    { ...waynesHours, dayOfWeek: null, dayOfWeekJustification: "Document doesn't specify which day Wayne worked" },
    { ...rebeccasLeave, dayOfWeek: 0 },
    { ...rebeccasLeave, dayOfWeek: 1 },
    { ...rebeccasLeave, dayOfWeek: 2 },
    { ...rebeccasLeave, dayOfWeek: 3 },
    { ...rebeccasLeave, dayOfWeek: 4 },
    jimsHours
];



export const exampleOutput1 : LLMOutput = {
    actions
}
