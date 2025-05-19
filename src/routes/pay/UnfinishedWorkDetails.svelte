<script lang="ts">
    import { map } from "zod";
    import {  type DocumentInfo, type EmployeeHours, type LLMInput, type LLMOutput, } from "./Models";

    interface Props {
        llmInput: LLMInput,
        llmOutput: LLMOutput,
        unfinishedWorkIndex: number
    }

    // const { llmInput, llmOutput, unfinishedWorkIndex } : Props = $props();

    // const {description, employeeName, dayName, sourceDocumentName, sourceDocumentContent, assumptions} = $derived.by(() => {
    //     const { employeeIndex, dayIndex, sourceDocumentIndex, assumptions, description } = llmOutput.unfinishedWork[unfinishedWorkIndex];
    //     let employeeName : string | null = null;
    //     let dayName : string | null = null;
    //     if (employeeIndex !== null && employeeIndex !== undefined) {
    //         const employee = llmInput.employeeHours[employeeIndex];
    //         employeeName = employee.employee;
    //     }
    //     if (dayIndex !== null && dayIndex !== undefined) {
    //         dayName = [
    //             "Monday",
    //             "Tuesday",
    //             "Wednesday",
    //             "Thursday",
    //             "Friday",
    //             "Saturday",
    //             "Sunday"
    //         ][dayIndex]
    //     }

    //     const sourceDocument = llmInput.documents[sourceDocumentIndex];

    //     return {
    //         description,
    //         employeeName,
    //         dayName,
    //         sourceDocumentName: sourceDocument.name,
    //         sourceDocumentContent: sourceDocument.content,
    //         assumptions
    //     };
    // });

</script>


<!-- <details>
    <summary>{description}</summary>
        <ul>
            {#if employeeName}
                <li>
                    Employee: {employeeName}
                </li>
            {/if}
            {#if dayName}
                <li>
                    Day: {dayName}
                </li>
            {/if}
            <li>
                <details>
                    <summary>Source Document</summary>
                    <p><strong>{sourceDocumentName}</strong></p>
                    <p>{sourceDocumentContent}</p>
                </details>
            </li>
            {#if assumptions.length > 0}
                <li>
                    <details>
                        <summary>Assumptions ({assumptions.length})</summary>
                        <ul class="strings-only">
                            {#each assumptions as assumption}
                                <li>{assumption}</li>
                            {/each}
                        </ul>
                    </details>
                </li>
            {/if}
        </ul>
 </details> -->


 <style>
    ul {
        list-style-type: none;
        padding-left: 1em;
    }

    ul.strings-only {
        list-style-type: disc;
        padding-left: 2em;
    }
 </style>