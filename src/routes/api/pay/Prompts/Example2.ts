import { createEmployeeHours, type Action, type EmployeeHours, type LLMInput, type LLMOutput } from "../../../pay/Models"

export const exampleInput2 : LLMInput = {
    employeeHours: [
        createEmployeeHours('griegt', "Timothy Greig", [8, 8, 4, 4, 4]),
        createEmployeeHours('franklinp', "Peter Franklin", []),
        createEmployeeHours('paula', "Amanda Paul", []),
        createEmployeeHours('hartwigr', "Renee Hartwig", [8, 8, 8, 8, 8]),
        createEmployeeHours('matterlyp', "Peter Matterly", []),
    ],
    documents: [
        { 
            documentId: '0',
            name: 'TIMESHEETS_048.txt',
            content: `PAUL Amanda 8 8 0 0 0 0 0
FRANKLIN Peter 6 4 0 0 5.5 0 0`
        },
        {
            documentId: '1',
            name: 'note.txt',
            content: 'Public holiday on Thursday - everyone on leave'
        },
        { 
            documentId: '2',
            name: 'From: T. Greig. Subject: Leave',
            content: `Hi Renee, Peter and I both took half a day of leave on Tuesday`
        },
        {
            documentId: '3',
            name: 'note2.txt',
            content: 'Don`t forget my leave!'
        }
    ]
}

const amandasTimesheet = {
    documentId: '0',
    employeeId: 'paula',
    employeeIdJustification: "'PAUL Amanda' appears in the timesheet",
    workHours: 8,
    workHoursJustification: "'8' is in the timesheet",
    leaveHours: 0,
    leaveHoursJustification: null
}
const peterFsTimesheet = {
    documentId: '0',
    employeeId: 'franklinp',
    employeeIdJustification: "'FRANKLIN Peter' appears in the timesheet",
    leaveHours: 0,
    leaveHoursJustification: null
}
const publicHoliday = {
    documentId: '1',
    workHours: 0,
    workHoursJustification: "Document implies that the leave is for the whole day",
    leaveHours: 8,
    leaveHoursJustification: "Document implies that the leave is for the whole day",
    dayOfWeek: 3,
    dayOfWeekJustification: "Document states that leave is on Thursday",
}
const timothysLeave = {
    documentId: '2',
    employeeId: 'griegt',
    employeeIdJustification: "'T. Greig' appears in the document name",
    workHours: 4,
    workHoursJustification: "Document states that employee took half a day of leave",
    leaveHours: 4,
    leaveHoursJustification: "Document states that employee took half a day of leave",
    dayOfWeek: 1,
    dayOfWeekJustification: "Document states that employee took leave on Tuesday"
}
const petersLeave = {
    documentId: '2',
    employeeId: null,
    employeeIdJustification: "'Peter' appears in the document, but it is not clear whether it refers to Peter Franklin or Peter Matterly",
    workHours: 4,
    workHoursJustification: "Document states that Peter took half a day of leave",
    leaveHours: 4,
    leaveHoursJustification: "Document states that Peter took half a day of leave",
    dayOfWeek: 1,
    dayOfWeekJustification: "Document states that Peter took leave on Tuesday"
}
const unknownLeave = {
    documentId: '3',
    employeeId: null,
    employeeIdJustification: "It is not clear who's taking leave",
    workHours: null,
    workHoursJustification: "It is not clear how long this person is taking leave",
    leaveHours: null,
    leaveHoursJustification: "It is not clear how long this person is taking leave",
    dayOfWeek: null,
    dayOfWeekJustification: "It is not clear which day this person is taking leave"
}

const actions : Action[] = [
    { ...amandasTimesheet, dayOfWeek: 0, dayOfWeekJustification: "First column in the timesheet" },
    { ...amandasTimesheet, dayOfWeek: 1, dayOfWeekJustification: "Second column in the timesheet" },
    { ...peterFsTimesheet, dayOfWeek: 0, dayOfWeekJustification: "First column in the timesheet", workHours: 6, workHoursJustification: "'6' is in the timesheet" },
    { ...peterFsTimesheet, dayOfWeek: 1, dayOfWeekJustification: "Second column in the timesheet", workHours: 4, workHoursJustification: "'4' is in the timesheet" },
    { ...peterFsTimesheet, dayOfWeek: 4, dayOfWeekJustification: "Fifth column in the timesheet", workHours: 5.5, workHoursJustification: "'5.5' is in the timesheet" },
    { ...publicHoliday, employeeId: 'griegt', employeeIdJustification: "Document states that all employees are on leave"},
    { ...publicHoliday, employeeId: 'franklinp', employeeIdJustification: "Document states that all employees are on leave"},
    { ...publicHoliday, employeeId: 'paula', employeeIdJustification: "Document states that all employees are on leave"},
    { ...publicHoliday, employeeId: 'hartwigr', employeeIdJustification: "Document states that all employees are on leave"},
    { ...publicHoliday, employeeId: 'matterlyp', employeeIdJustification: "Document states that all employees are on leave"},
    timothysLeave,
    petersLeave,
    unknownLeave
]



export const exampleOutput2 : LLMOutput = {
    actions
}
