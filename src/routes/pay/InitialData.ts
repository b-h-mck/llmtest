import { createEmployeeHours, type DocumentInfo, type EmployeeHours } from "./Models";

export const initialEmployeeHours : EmployeeHours[] = [
        createEmployeeHours('Alice Brown', [8,8,8,8,8]),
        createEmployeeHours('Robert Smith', [8,8,8,8,8]),
        createEmployeeHours('Diana Prince', [8,8,8,8,8]),
        createEmployeeHours('Eleanor Hunt', [8,8,8,8,8]),
        createEmployeeHours('Fiona Apple', [4,4,4]),
        createEmployeeHours('George Clooney', [4,4,4]),
        createEmployeeHours('Hannah Montana', []),
        createEmployeeHours('Ian Curtis', []),
        createEmployeeHours('Jack Daniels', []),
        createEmployeeHours('Ian Somerhalder', [8,8,8,8,8]),
        createEmployeeHours('Jack Sparrow', []),
        createEmployeeHours('Kate Winslet', []),
        createEmployeeHours('Liam Neeson', []),
        createEmployeeHours('Megan Fox', []),
        createEmployeeHours('Noah Martin', []),
        createEmployeeHours('Olivia Thompson', []),
        createEmployeeHours('Paul Garcia', []),
        createEmployeeHours('Quinn Martinez', []),
        createEmployeeHours('Rita Robinson', []),
        createEmployeeHours('Laura South', [4,4,4]),
    ];

export const initialDocuments : DocumentInfo[] = [
    { 
        name: 'TIMESHEET_045.txt',
        content: 'WINSLET Kate 6 4 0 0 0 0 0'
    },
    { 
        name: 'TIMESHEET_046.txt',
        content: `NEESON Liam 6 4 0 0 5.5 0 0
MARTIN Noah 6 8 8 0 5 0 0`
    },
    { 
        name: 'ts048039812.txt',
        content: `
Name: Martinez Q.
MO 2.5
TU 2.5
FR 6`
    },
    {
        name: 'From: G. Clooney. Subject: Work hours',
        content: `
Hey Laura,
I worked 4 hours on Friday on top of my normal hours, and don't forget Paul's 3 days!
Cheers,
George`
    },
    {
        name: 'From: D. Prince; Subject: heeey',
        content: `hey l, hows it going? i never get to see you anymore after my move :( we should go downstairs for some wines on friday! just letting you know i did a half day on tuesday, and don't forget old ferret boy was on leave all week. luv ya <3`
    },
    {
        name: 'From: E. Hunt; Subject: My team\'s hours',
        content: `Laura,
Olivia and Rita both worked full days on Monday and Tuesday. Also, I was on leave for half of Tuesday and all of Friday.
Regards,
Eleanor`
    },
    {
        name: 'Laura\'s notes.txt',
        content: `
- Alice on leave all week
- Did payroll on Friday so I worked 5 minutes
- Bob on leave wed
- Ian C did 8 hours on Monday
- Public holiday Thursday - everyone on leave`
    }
];

