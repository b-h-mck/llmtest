<script lang="ts">
    import ActionDetails from "./ActionDetails.svelte";
import ChangeDetails from "./ActionDetails.svelte";
    import { type EmployeeHours, type LLMInput, type LLMOutput } from "./Models";
    import UnfinishedWorkDetails from "./UnfinishedWorkDetails.svelte";

    interface Props {
        selectedCell: { employeeIndex: number; dayOfWeek: number }
        llmInput: LLMInput;
        llmOutput: LLMOutput | null;
    }

    const {selectedCell, llmInput, llmOutput} : Props = $props();

    const employeeId = llmInput.employeeHours[selectedCell.employeeIndex].employeeId;
    const actions = llmOutput?.actions.filter((action) => action.employeeId === employeeId && action.dayOfWeek === selectedCell.dayOfWeek) ?? null;

    const {employeeName, dayName, oldWorkHours, oldLeaveHours, newWorkHours, newLeaveHours} = $derived.by(() => {
        const { employeeIndex, dayOfWeek } = selectedCell;
        const employee = llmInput.employeeHours[employeeIndex];
        const day = employee?.days[dayOfWeek] ?? null;
        const action = llmOutput?.actions.find((action) => action.employeeId === employeeId && action.dayOfWeek === dayOfWeek) ?? null;

        const dayName = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ][dayOfWeek] || "";

        //let change = llmOutput?.changes.find((change) => change.employeeIndex === employeeIndex && change.dayIndex === dayIndex) ?? null;

        return { 
            employeeName : employee?.name ?? null, 
            dayName, 
            oldWorkHours : day?.workHours ?? null, 
            oldLeaveHours: day?.leaveHours ?? null, 
            newWorkHours: action?.workHours ?? day?.workHours ?? null, 
            newLeaveHours : action?.leaveHours ?? day?.leaveHours ?? null
        };
    });

</script>

<section>
    <h2>{employeeName}</h2>
    <h3>{dayName}</h3>
    <p>Work hours: {oldWorkHours} {#if oldWorkHours !== newWorkHours}<strong>→  {newWorkHours}</strong>{/if}</p>
    <p>Leave hours: {oldLeaveHours} {#if oldLeaveHours !== newLeaveHours}<strong>→  {newLeaveHours}</strong>{/if}</p>
    {#if llmOutput && actions?.length}
        <h3>Actions:</h3>
        {#each actions as action, actionIndex}
            <ActionDetails
                {llmOutput}
                {llmInput}
                {actionIndex} />
        {/each}
    {/if}
    <!-- {#if llmOutput?.changes.some(change => change.dayIndex === selectedCell.dayIndex && change.employeeIndex === selectedCell.employeeIndex)}
        <h3>Changes:</h3>
        {#each llmOutput.changes as change, changeIndex}
            {#if change.dayIndex === selectedCell.dayIndex && change.employeeIndex === selectedCell.employeeIndex}
                <ChangeDetails
                    {llmOutput}
                    {llmInput}
                    {changeIndex} />
            {/if}
        {/each}
        {/if} -->
    <!-- {#if llmOutput?.unfinishedWork.some(unfinishedWork => unfinishedWork.dayIndex === selectedCell.dayIndex && unfinishedWork.employeeIndex === selectedCell.employeeIndex)}
        <h3>Unfinished:</h3>
        {#each llmOutput.unfinishedWork as unfinishedWork, unfinishedWorkIndex}
            {#if unfinishedWork.dayIndex === selectedCell.dayIndex && unfinishedWork.employeeIndex === selectedCell.employeeIndex}
                <UnfinishedWorkDetails
                    {llmOutput}
                    {llmInput}
                    {unfinishedWorkIndex} />
            {/if}
        {/each}
    {/if} -->
    
</section>

<style>
    section {
        padding: 1em;
        border: 1px solid var(--gray-light, #eee);
        margin-bottom: 1em;
    }

    h2 {
        margin: 0;
        font-size: 1.5em;
    }

    h3 {
        margin: 0;
        font-size: 1.2em;
    }
    p {
        margin: 0.5em 0;
    }
    strong {
        color: var(--red, #f00);
    }
</style>