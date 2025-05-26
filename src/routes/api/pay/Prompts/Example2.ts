import { type CalculatedHours, type DocumentInfo, type LLMInput, type LLMOutput } from "../../../pay/Models"

const employeeNames = [
    "Timothy Greig",
    "Peter Franklin",
    "Amanda Paul",
    "Renee Hartwig",
    "Peter Matterly"
];

const documents: DocumentInfo[] = [
    { 
        name: 'TIMESHEETS_048.txt',
        content: `PAUL Amanda 8 8 0 0 0 0 0
FRANKLIN Peter 6 4 0 0 5.5 0 0`
    },
    {
        name: 'note.txt',
        content: 'Public holiday on Thursday - everyone on leave'
    },
    { 
        name: 'From: T. Greig. Subject: Leave',
        content: `Hi Renee, Peter and I both took half a day of leave on Tuesday`
    },
    {
        name: 'note2.txt',
        content: 'Don`t forget my leave!'
    }
];

export const exampleInputs2 = documents.map(document => ({
    employees: employeeNames.map((name, index) => ({ employeeId: index, name })),
    document
}));

const amandasTimesheet = { 
    employeeId: 2,
    employeeJustification: "'PAUL Amanda' appears in the timesheet",
    hoursType: 'workHours' as 'workHours',
    hours: 8,
    hoursJustification: "'8' is in the timesheet",
}

const peterFsTimesheet = {
    employeeId: 1,
    employeeJustification: "'FRANKLIN Peter' appears in the timesheet",
    hoursType: 'workHours' as 'workHours',
    hours: null,
    hoursJustification: null
}

const publicHoliday = {
    hoursType: 'leaveHours' as 'leaveHours',
    hours: 8,
    hoursJustification: "Document implies that the leave is for the whole day",
    dayOfWeek: 3,
    dayOfWeekJustification: "Document states that leave is on Thursday",
}

const timothysLeave = {
    employeeId: 0,
    employeeJustification: "'T. Greig' appears in the document name",
    hoursType: 'leaveHours' as 'leaveHours',
    hours: 4,
    hoursJustification: "Document states that employee took half a day of leave",
    dayOfWeek: 1,
    dayOfWeekJustification: "Document states that employee took leave on Tuesday"
}

const petersLeave = {
    employeeId: null,
    employeeJustification: "'Peter' appears in the document, but it is not clear whether it refers to Peter Franklin or Peter Matterly",
    hoursType: 'leaveHours' as 'leaveHours',
    hours: 4,
    hoursJustification: "Document states that Peter took half a day of leave",
    dayOfWeek: 1,
    dayOfWeekJustification: "Document states that Peter took leave on Tuesday"
}

const unknownLeave = {
    employeeId: null,
    employeeJustification: "It is not clear who's taking leave",
    hoursType: 'leaveHours' as 'leaveHours',
    hours: null,
    hoursJustification: "It is not clear how long this person is taking leave",
    dayOfWeek: null,
    dayOfWeekJustification: "It is not clear which day this person is taking leave"
}

export const exampleOutputs2: LLMOutput[] = [
    { 
        calculatedHours: [
            { ...amandasTimesheet, dayOfWeek: 0, dayOfWeekJustification: "First column in the timesheet" },
            { ...amandasTimesheet, dayOfWeek: 1, dayOfWeekJustification: "Second column in the timesheet" },
            { ...peterFsTimesheet, hours: 6, hoursJustification: "'6' is in the timesheet", dayOfWeek: 0, dayOfWeekJustification: "First column in the timesheet" },
            { ...peterFsTimesheet, hours: 4, hoursJustification: "'4' is in the timesheet", dayOfWeek: 1, dayOfWeekJustification: "Second column in the timesheet" },
            { ...peterFsTimesheet, hours: 5.5, hoursJustification: "'5.5' is in the timesheet", dayOfWeek: 4, dayOfWeekJustification: "Fifth column in the timesheet" },
        ]
    },
    {
        calculatedHours: [
            { ...publicHoliday, employeeId: 0, employeeJustification: "Document states that all employees are on leave" },
            { ...publicHoliday, employeeId: 1, employeeJustification: "Document states that all employees are on leave" },
            { ...publicHoliday, employeeId: 2, employeeJustification: "Document states that all employees are on leave" },
            { ...publicHoliday, employeeId: 3, employeeJustification: "Document states that all employees are on leave" },
            { ...publicHoliday, employeeId: 4, employeeJustification: "Document states that all employees are on leave" }
        ]
    },
    {
        calculatedHours: [
            timothysLeave,
            petersLeave
        ]
    },
    {
        calculatedHours: [
            unknownLeave
        ]
    }
]