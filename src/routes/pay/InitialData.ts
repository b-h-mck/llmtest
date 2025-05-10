import type { WorkPattern } from "./Models";

export const initialWorkPatterns : WorkPattern[] = [
        { employee: 'Alice Brown', workHours: [8, 8, 8, 8, 8, 0, 0] },
        { employee: 'Robert Smith', workHours: [8, 8, 8, 8, 8, 0, 0] },
        { employee: 'Diana Prince', workHours: [8, 8, 8, 8, 8, 0, 0] },
        { employee: 'Ethan Hunt', workHours: [8, 8, 8, 8, 8, 0, 0] },
        { employee: 'Fiona Apple', workHours: [4, 4, 4, 0, 0, 0, 0] },
        { employee: 'George Clooney', workHours: [4, 4, 4, 0, 0, 0, 0] },
        { employee: 'Hannah Montana', workHours: [0, 0, 0, 0, 0, 0, 0] },
        { employee: 'Ian Curtis', workHours: [0, 0, 0, 0, 0, 0, 0] },
        { employee: 'Jack Daniels', workHours: [0, 0, 0, 0, 0, 0, 0] },
        { employee: 'Ian Somerhalder', workHours: [0, 0, 0, 0, 0, 0, 0] },
        { employee: 'Jack Sparrow', workHours: [0, 0, 0, 0, 0, 0, 0] },
        { employee: 'Kate Winslet', workHours: [0, 0, 0, 0, 0, 0, 0] },
        { employee: 'Liam Neeson', workHours: [0, 0, 0, 0, 0, 0, 0] },
        { employee: 'Megan Fox', workHours: [0, 0, 0, 0, 0, 0, 0] },
        { employee: 'Noah Martin', workHours: [0, 0, 0, 0, 0, 0, 0] },
        { employee: 'Olivia Thompson', workHours: [0, 0, 0, 0, 0, 0, 0] },
        { employee: 'Paul Garcia', workHours: [0, 0, 0, 0, 0, 0, 0] },
        { employee: 'Quinn Martinez', workHours: [0, 0, 0, 0, 0, 0, 0] },
        { employee: 'Rita Robinson', workHours: [0, 0, 0, 0, 0, 0, 0] },
        { employee: 'Laura South', workHours: [0, 0, 0, 0, 0, 0, 0] },
    ];

export const initialDocuments : string[] = [
'WINSLET Kate 6 4 0 0 0 0 0'
,
`NEESON Liam 6 4 0 0 5.5 0 0
MARTIN Noah 6 8 8 8 5 0 0`
,
`Hey Laura,
I worked 4 hours on Friday on top of my normal hours, and don't forget Paul's 3 days!
Cheers,
George`
,
`Laura, don't forget I did a half day on Tuesday, and old ferret boy was on leave all week, cheers Diana`
,
`Laura,
Olivia and Rita both worked full days on Monday and Tuesday. Also, I was on leave for half of Thursday and all of Friday.
Ethan
`
,
`Laura's notes:
- Alice on leave all week
- I only needed to work 5 mins on Friday
- Bob on leave wed thurs
- Ian C did 8 hours on Monday
`];