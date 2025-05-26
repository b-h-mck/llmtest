import { type DocumentInfo, type Employee } from "./Models";

// export const initialEmployeeHours : EmployeeHours[] = [
//         createEmployeeHours('browna', 'Alice Brown', [8,8,8,8,8]),
//         createEmployeeHours('smithr', 'Robert Smith', [8,8,8,8,8]),
//         createEmployeeHours('princed', 'Diana Prince', [8,8,8,8,8]),
//         createEmployeeHours('hunte', 'Eleanor Hunt', [8,8,8,8,8]),
//         createEmployeeHours('applef', 'Fiona Apple', [4,4,4]),
//         createEmployeeHours('clooneyg', 'George Clooney', [4,4,4]),
//         createEmployeeHours('montanah', 'Hannah Montana', []),
//         createEmployeeHours('curtisi', 'Ian Curtis', []),
//         createEmployeeHours('danielsj', 'Jack Daniels', []),
//         createEmployeeHours('somerhalderi', 'Ian Somerhalder', [8,8,8,8,8]),
//         createEmployeeHours('sparrowj', 'Jack Sparrow', []),
//         createEmployeeHours('winsletk', 'Kate Winslet', []),
//         createEmployeeHours('neesonl', 'Liam Neeson', []),
//         createEmployeeHours('foxm', 'Megan Fox', []),
//         createEmployeeHours('martinn', 'Noah Martin', []),
//         createEmployeeHours('thompsono', 'Olivia Thompson', []),
//         createEmployeeHours('garciap', 'Paul Garcia', []),
//         createEmployeeHours('martinezq', 'Quinn Martinez', []),
//         createEmployeeHours('robinsonr', 'Rita Robinson', []),
//         createEmployeeHours('southl', 'Laura South', [4,4,4]),
//     ];

export const initialEmployees : string[] = [
    'Alice Brown',
    'Robert Smith',
    'Diana Prince',
    'Eleanor Hunt',
    'Fiona Apple',
    'George Clooney',
    'Hannah Montana',
    'Ian Curtis',
    'Jack Daniels',
    'Ian Somerhalder',
    'Jack Sparrow',
    'Kate Winslet',
    'Liam Neeson',
    'Noah Martin',
    'Olivia Thompson',
    'Paul Garcia',
    'Quinn Martinez',
    'Rita Robinson',
    'Laura South'
];

export const initialDocuments : DocumentInfo[] = [
    { 
        name: 'TimeAssist_WINSLET_K.csv',
        content: '6,4,0,0,0,0,0'
    },
    { 
        name: 'TIMESHEET_046.txt',
        content: `NEESON Liam 6.0 4.0 0.0 0.0 5.5 0.0 0.0
MARTIN Noah 6.0 8.0 8.0 0.0 5.0 0.0 0.0`
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

