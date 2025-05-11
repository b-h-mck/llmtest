<script lang="ts">
    import { map } from "zod";
import DeductionDetails from "./DeductionDetails.svelte";
    import { ChangeSchema, type Change, type DocumentInfo, type EmployeeHours, type LLMOutput, type UnfinishedWork } from "./Models";

    interface Props {
        llmOutput: LLMOutput,
        documents: DocumentInfo[],
        employeeHours: EmployeeHours[],
        deductionIndex: number
    }

    const { llmOutput, employeeHours, documents, deductionIndex } : Props = $props();
    const {deductionText, assumptions, sourceDocuments, sourceDeductionIndexes, derivedDeductionIndexes, derivedChanges, derivedUnfinishedWork} = $derived.by(() => {
        const deduction = llmOutput.deductions[deductionIndex];
        const sourceDocuments = deduction.sourceDocumentIndexes.map((index) => documents[index]);

        const derivedDeductionIndexes : number[] = [];
        const derivedChanges : Change[] = [];
        const derivedUnfinishedWork : UnfinishedWork[] = [];
        llmOutput.deductions.forEach((element, index) => {
            if (element.sourceDeductionIndexes.includes(deductionIndex)) {
                derivedDeductionIndexes.push(index);
            }
        });
        llmOutput.changes.forEach(element => {
            if (element.deductionIndex === deductionIndex) {
                derivedChanges.push(element);
            }
        });
        llmOutput.unfinishedWork.forEach(element => {
            if (element.deductionIndex === deductionIndex) {
                derivedUnfinishedWork.push(element);
            }
        });

        


        return {
            deductionText: deduction.description,
            assumptions: deduction.assumptions,
            sourceDocuments,
            sourceDeductionIndexes: deduction.sourceDeductionIndexes,
            derivedDeductionIndexes,
            derivedChanges,
            derivedUnfinishedWork
        };
    });


    function getChangeText(change: Change) {
        const { employeeIndex, dayIndex, newWorkHours, newLeaveHours } = change;
        const employee = employeeHours[employeeIndex];
        const day = employee.days[dayIndex];

        const dayName = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ][dayIndex] || "";

        return `${employee.employee} (${dayName}): ${day.workHours} → ${newWorkHours}, ${day.leaveHours} → ${newLeaveHours}`;
    }

    let isExpanded = $state(false)
    function handleToggle(event: Event) {
        isExpanded = (event.target as HTMLDetailsElement).open;
    }

</script>

{#snippet collapsedTree(title: string, itemStrings: string[] | null, itemDeductionIndexes: number[] | null)}
    {@const length = (itemStrings ?? itemDeductionIndexes ?? []).length}
    {#if length > 0}
        <li>
            <details>
                <summary>{title} ({length})</summary>
                <ul class={itemStrings ? "strings-only" : ""}>
                    {#if itemStrings}
                        {#each itemStrings as itemString, index}
                            <li>{itemString}</li>
                        {/each}
                    {:else if itemDeductionIndexes}
                        {#each itemDeductionIndexes as index}
                            <li>
                                <DeductionDetails
                                    {llmOutput} {employeeHours} {documents} deductionIndex={index} />
                            </li>
                        {/each}
                    {/if}
                </ul>
            </details>
        </li>
    {/if}
{/snippet}

<details ontoggle={handleToggle}>
    <summary>{deductionText}</summary>
    {#if isExpanded}
        <ul>
            {@render collapsedTree("Assumptions", assumptions, null)}
            {@render collapsedTree("Source Documents", sourceDocuments.map(doc => doc.name), null)}
            {@render collapsedTree("Source Deductions", null, sourceDeductionIndexes)}
            {@render collapsedTree("Derived Deductions", null, derivedDeductionIndexes)}
            {@render collapsedTree("Derived Changes", llmOutput.changes.map(change => getChangeText(change)), null)}
            {@render collapsedTree("Derived Unfinished Work", derivedUnfinishedWork.map(work => work.description), null)}
        </ul>
    {/if}

 </details>


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