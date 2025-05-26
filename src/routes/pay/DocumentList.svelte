<script lang="ts">
    import { systemPrompt } from "../api/pay/Prompts/Prompt";
    import ActionDetails from "./ActionDetails.svelte";
    import ChangeDetails from "./ActionDetails.svelte";
    import type { CalculatedHours, DocumentInfo, Employee, LLMInput, LLMOutput } from "./Models";
    import UnfinishedWorkDetails from "./UnfinishedWorkDetails.svelte";

     interface Props {
        employees: Employee[];
        documents: DocumentInfo[];
        onAIMagicOutput: (documentIndex: number, output: LLMOutput) => void;
    }

    let { employees, documents = $bindable([]), onAIMagicOutput}: Props = $props();
    let processingItems : boolean[] = $state(Array(documents.length).fill(false));
    let aiMagicOutput: (LLMOutput | null)[] = $state(Array(documents.length).fill(null));
    let errorMessages: (string | null)[] = $state(Array(documents.length).fill(null));

    async function handleDoAIMagic(document: DocumentInfo, index: number) {
        processingItems[index] = true; // Set processing state to true

        const input : LLMInput = {
            employees,
            document
        };
        try {
            const response = await fetch('/api/pay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `Error: ${response.status} ${response.statusText}`);
            }

            const replyObject = JSON.parse(data.reply);

            console.log('prompt:', systemPrompt);            
            console.log('input:', JSON.parse(JSON.stringify(input)));
            console.log('output:', replyObject);
            aiMagicOutput[index] = replyObject;
            errorMessages[index] = null;

        } catch (error: any) {
            // Add the error message to the chat
            errorMessages[index] = error.message || 'An unknown error occurred';
        } finally {
            processingItems[index] = false; // Reset processing state
        }
    }

    function getSummaryString(calculation: CalculatedHours): {summary: string, isIncomplete: boolean} {
        let nameString, hoursTypeString, hoursString, dayOfWeekString : string;
        let isIncomplete : boolean = false;

        const employee = employees.find(e => e.employeeId === calculation.employeeId);
        if (employee) {
            nameString = employee.name;
        } else {
            nameString = 'Someone';
            isIncomplete = true;
        }

        if (calculation.hoursType === 'workHours') {
            hoursTypeString = 'worked';
        } else if (calculation.hoursType === 'leaveHours') {
            hoursTypeString = 'took leave';
        } else {
            hoursTypeString = 'did something';
            isIncomplete = true;
        }

        hoursString = '';
        if (calculation.hours === -1) {
            hoursString = 'an unknown number of hours';
            isIncomplete = true;
        } else if (calculation.hours === 0) {
            hoursString = 'no hours';
            isIncomplete = true;
        } else if (calculation.hours === 1) {
            hoursString = '1 hour';
        } else {
            hoursString = `${calculation.hours} hours`;
        } 

        if (calculation.dayOfWeek === 'unknown') {
            dayOfWeekString = 'on an unknown day';
            isIncomplete = true;
        } else {
            dayOfWeekString = `on ${calculation.dayOfWeek.charAt(0).toUpperCase() + calculation.dayOfWeek.slice(1)}`;
        }

        return {
            summary: `${nameString} ${hoursTypeString} for ${hoursString} on ${dayOfWeekString}`,
            isIncomplete
        };
    }


</script>
<ul>
    {#each documents as document, documentIndex}
        <li>
            <input type="text"
                value={document.name}
                oninput={(event) => {document.name = (event.target as HTMLInputElement).value}}
            />
            <textarea
                rows="5"
                cols="50"
                value={document.content}
                oninput={(event) => {document.content = (event.target as HTMLTextAreaElement).value}}
            ></textarea>
            <section>
                <button onclick={() => handleDoAIMagic(document, documentIndex)} class="do-ai-magic" class:psychedelic={processingItems[documentIndex]}>
                    {processingItems[documentIndex] ? 'Processing...' : 'Do AI Magic!'}
                </button>
                {#if errorMessages[documentIndex]}
                    <p class="error">{errorMessages[documentIndex]}</p>
                {/if}
            </section>
            {#if aiMagicOutput[documentIndex]}
                {@const aiOutput = aiMagicOutput[documentIndex]}
                <h3>AI Output</h3>
                <ul>
                    {#each aiOutput.calculatedHours as calculation}
                        {@const {summary, isIncomplete} = getSummaryString(calculation)}
                        {@const employee = employees.find(e => e.employeeId === calculation.employeeId)}
                        <li>
                            <details>
                                <summary class={{isIncomplete}}>{summary}</summary>
                                <table>
                                    <tbody>
                                    <tr>
                                        <th class={{unknown: !employee}}>Employee:</th>
                                        <td>{employee?.name || 'Unknown'}</td>
                                        <td class="justification">{calculation.employeeJustification}</td>
                                    </tr>
                                    <tr>
                                        <th class={{unknown: calculation.dayOfWeek === 'unknown'}}>Day of Week:</th>
                                        <td>{calculation.dayOfWeek.charAt(0).toUpperCase() + calculation.dayOfWeek.slice(1)}</td>
                                        <td class="justification">{calculation.dayOfWeekJustification}</td>
                                    </tr>
                                    <tr>
                                        <th class={{unknown: calculation.hours === -1 || calculation.hoursType === 'unknown'}}>Hours:</th>
                                        <td>{calculation.hours !== -1 ? calculation.hours : '(unknown number)'}
                                            {calculation.hoursType === 'workHours' ? ' work hours' : calculation.hoursType === 'leaveHours' ? ' leave hours' : 'unknown hours'}
                                        </td>
                                        <td class="justification">{calculation.hoursJustification}</td>
                                    </tr>
                                    </tbody>
                            </details>
                        </li>
                    {/each}
                    <li>
                        <details>
                            <summary>Feedback from AI</summary>
                            <p>{aiMagicOutput[documentIndex].llmFeedback}</p>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary>Raw AI Output</summary>
                            <pre>{JSON.stringify(aiMagicOutput[documentIndex], null, 2)}</pre>
                        </details>
                    </li>
                </ul>
            {/if}


            <!-- {#if llmOutput?.changes.some(change => change.sourceDocumentIndex === documentIndex)}
                <h3>Changes:</h3>
                {#each llmOutput.changes as change, changeIndex}
                    {#if change.sourceDocumentIndex === documentIndex}
                        <ChangeDetails
                            {llmOutput}
                            {llmInput}
                            {changeIndex} />
                    {/if}
                {/each}
            {/if}
            {#if llmOutput?.unfinishedWork.some(unfinishedWork => unfinishedWork.sourceDocumentIndex === documentIndex)}
                <h3>Unfinished:</h3>
                {#each llmOutput.unfinishedWork as unfinishedWork, unfinishedWorkIndex}
                    {#if unfinishedWork.sourceDocumentIndex === documentIndex}
                        <UnfinishedWorkDetails
                            {llmOutput}
                            {llmInput}
                            {unfinishedWorkIndex} />
                    {/if}
                {/each}
            {/if} -->
        </li>
    {/each}
</ul>

<style>
    
    .do-ai-magic {
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .psychedelic {
        animation: psychedelic-animation 1s infinite;
        background: linear-gradient(45deg, #ff0000, #ff7300, #ffeb00, #47ff00, #00ffee, #2b65ff, #8000ff, #ff0080);
        background-size: 300% 300%;
        color: black;
    }

    @keyframes psychedelic-animation {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    .error {
        color: red;
        font-weight: bold;
        margin-top: 1em;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
        border: 1px solid var(--gray-light, #999);
        padding: 0.5rem;
    }

    textarea {
        width: 90%;
        margin-bottom: 0.5rem;
    }

    input[type="text"] {
        width: 90%;
        margin-right: 1rem;
    }

    h3 {
        margin: 0.5rem 0;
    }

    .isIncomplete {
        color: red;
        font-weight: bold;
    }

    .unknown {
        color: red;
    }

    .justification {
        font-style: italic;
        color: gray;
    }


</style>