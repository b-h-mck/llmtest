<script lang="ts">
    import { map } from "zod";
    import { type DocumentInfo, type EmployeeHours, type LLMInput, type LLMOutput } from "./Models";

    interface Props {
        llmInput: LLMInput,
        llmOutput: LLMOutput,
        actionIndex: number
    }

    const { llmInput, llmOutput, actionIndex } : Props = $props();
    
    let { documentId, dayOfWeek, dayOfWeekJustification, employeeId, employeeIdJustification,  
        workHours, workHoursJustification, leaveHours, leaveHoursJustification} = llmOutput.actions[actionIndex];

    const document = llmInput.documents.find((doc) => doc.documentId === documentId)!;

    const employee = employeeId === null ? null : llmInput.employeeHours.find((emp) => emp.employeeId === employeeId) ?? null;
    const day = dayOfWeek === null ? null : employee?.days[dayOfWeek] ?? null;

    const dayName = dayOfWeek === null ? null : [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ][dayOfWeek];

    const hasEnoughInfoForChange = dayOfWeek !== null && employee !== null && (workHours !== null || leaveHours !== null);

    const changeText = hasEnoughInfoForChange ? `${employee.name} (${dayName}): Work: ${day?.workHours ?? 0} → ${workHours}, Leave: ${day?.leaveHours ?? 0} → ${leaveHours}` : null;



</script>


<details>
    <summary>{#if changeText}{changeText}{:else}<span class="error">Unknown Change</span>{/if}</summary>
        <ul>
            <li>
                <details>
                    <summary>Document: {document.name}</summary>
                    <p class="document-content">{document.content}</p>
                </details>
            </li>
            <li>
                <details>
                    <summary>Employee: {#if employee}{employee.name}{:else}<span class="error">Unknown</span>{/if}</summary>
                    <p>{employeeIdJustification}</p>
                </details>
            </li>
            <li>
                <details>
                    <summary>Day: {#if dayName}{dayName}{:else}<span class="error">Unknown</span>{/if}</summary>
                    <p>{dayOfWeekJustification}</p>
                </details>
            </li>
            <li>
                <details>
                    <summary>Work Hours: {#if workHours !== null}{workHours}{:else}<span class="error">Unknown</span>{/if}</summary>
                    <p>{workHoursJustification}</p>
                </details>
            </li>
            <li>
                <details>
                    <summary>Leave Hours: {#if leaveHours !== null}{leaveHours}{:else}<span class="error">Unknown</span>{/if}</summary>
                    <p>{leaveHoursJustification}</p>
                </details>
            </li>
        </ul>
 </details>


 <style>
    ul {
        list-style-type: none;
        padding-left: 1em;
    }

    .error {
        color: red;
    }

    .document-content {
        white-space: pre-wrap;
        max-width: 500px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        line-clamp: 3;
    }
 </style>