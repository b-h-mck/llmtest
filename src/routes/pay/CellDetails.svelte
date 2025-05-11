<script lang="ts">
    import { ChangeSchema, type Change, type Deduction, type EmployeeHours, type LLMOutput } from "./Models";

    interface Props {
        selectedCell: { employeeIndex: number; dayIndex: number }
        employeeHours: EmployeeHours[];
        llmOutput: LLMOutput | null;
    }

    const {selectedCell, employeeHours, llmOutput} : Props = $props();

    const {employeeName, dayName, oldWorkHours, oldLeaveHours, newWorkHours, newLeaveHours} = $derived.by(() => {
        const { employeeIndex, dayIndex } = selectedCell;
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

        let change = llmOutput?.changes.find((change) => change.employeeIndex === employeeIndex && change.dayIndex === dayIndex) ?? null;
        let deduction = llmOutput && change ? llmOutput.deductions[change.deductionIndex] ?? null : null;

        return { 
            employeeName : employee.employee, 
            dayName, 
            oldWorkHours : day.workHours, 
            oldLeaveHours: day.leaveHours, 
            newWorkHours: change?.newWorkHours ?? day.workHours, 
            newLeaveHours : change?.newLeaveHours ?? day.leaveHours,
            deduction
        };
    });

</script>

<section>
    <h2>{employeeName}</h2>
    <h3>{dayName}</h3>
    <p>Work hours: {oldWorkHours} {#if oldWorkHours !== newWorkHours}<strong>→  {newWorkHours}</strong>{/if}</p>
    <p>Leave hours: {oldLeaveHours} {#if oldLeaveHours !== newLeaveHours}<strong>→  {newLeaveHours}</strong>{/if}</p>
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