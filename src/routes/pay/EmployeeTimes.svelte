<script lang="ts">
    import type { Action, EmployeeHours } from "./Models";
    

    interface Props {
        employeeHours: EmployeeHours[];
        actions: Action[] | null;
        onSelect: (employeeIndex: number, dayOfWeek: number) => void;
        onEdit: (employeeIndex: number, employeeHours: EmployeeHours) => void;
    }

    let { employeeHours, actions, onEdit, onSelect } : Props = $props();

    let updatedEmployeeHours = $derived.by(() => {
        const result = employeeHours.map((employee) => ({
                ...employee,
                days: employee.days.map((day) => ({
                    ...day,
                    changed: false,
                })),
            }));
        if (actions) {
            actions.forEach((action) => {
                const { employeeId, dayOfWeek, workHours, leaveHours } = action;
                const employeeIndex = employeeHours.findIndex((emp) => emp.employeeId === employeeId);

                if (employeeIndex >= 0 && employeeIndex < result.length) {
                    if (dayOfWeek && dayOfWeek >= 0 && dayOfWeek < result[employeeIndex].days.length) {
                        result[employeeIndex].days[dayOfWeek].changed = true;
                        if (workHours !== null && workHours !== undefined) {
                            result[employeeIndex].days[dayOfWeek].workHours = workHours;
                        }
                        if (leaveHours !== null && leaveHours !== undefined) {
                            result[employeeIndex].days[dayOfWeek].leaveHours = leaveHours;
                        }
                    }
                }
            });
        }
        return result;
    });

    
    function handleEditName(index: number, event: Event) {
        const input = event.target as HTMLInputElement;
        const value = input.value.trim();
        if (value) {
            onEdit(index, { ...updatedEmployeeHours[index], name: value });
        }
    }

    function handleEditWorkHours(employeeIndex: number, dayIndex: number, event: Event) {
        const input = event.target as HTMLInputElement;
        const value = parseFloat(input.value);
        if (!isNaN(value)) {
            const updatedEmployee = { ...updatedEmployeeHours[employeeIndex] };
            updatedEmployee.days[dayIndex].workHours = value;
            onEdit(employeeIndex, updatedEmployee);
        }
    }

    function handleEditLeaveHours(employeeIndex: number, dayIndex: number, event: Event) {
        const input = event.target as HTMLInputElement;
        const value = parseFloat(input.value);
        if (!isNaN(value)) {
            const updatedEmployee = { ...updatedEmployeeHours[employeeIndex] };
            updatedEmployee.days[dayIndex].leaveHours = value;
            onEdit(employeeIndex, updatedEmployee);
        }
    }

    function handleClick(employeeIndex: number, dayIndex: number) {
        console.log("Clicked on cell", employeeIndex, dayIndex);
        onSelect(employeeIndex, dayIndex);
    }


</script>

<table>
    <thead>
        <tr>
            <th>Employee</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
        </tr>
    </thead>
    <tbody>
        {#each updatedEmployeeHours as employeeHours, employeeIndex}
            <tr>
                <th>
                    <input
                        type="text"
                        class="employee-name"
                        value={employeeHours.name}
                        oninput={(event) => handleEditName(employeeIndex, event)}
                    />
                </th>
                {#each employeeHours.days as {workHours, leaveHours, changed}, dayIndex}
                    <td onclick={() => handleClick(employeeIndex, dayIndex)} class={{changed}}>
                        <label>
                            <span>W</span>
                            <input
                                type="text"
                                class="hours"
                                value={workHours === 0 ? "" : workHours}
                                oninput={(event) => handleEditWorkHours(employeeIndex, dayIndex, event)}
                            />
                        </label>
                        <label>
                            <span>L</span>
                            <input
                                type="text"
                                class="hours"
                                value={leaveHours === 0 ? "" : leaveHours}
                                oninput={(event) => handleEditLeaveHours(employeeIndex, dayIndex, event)}
                            />
                        </label>
                    </td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }

    th,
    td {
        border: 1px solid #ccc;
        padding: 8px;
        text-align: center;
    }

    td {
        max-width: 4em;
        /*display: flex;
        flex-direction: column;*/
    }

    label span {
        display: block;
        font-size: 0.8em;
        color: #666;
        width: 1em;
    }

    input.hours {
        width: 2em;
    }
    input.employee-name {
        width: 100%;
    }

    label {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .changed {
        background-color: #ffeb3b;
    }

</style>
