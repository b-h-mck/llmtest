<script lang="ts">
    import type { Change, EmployeeHours } from "./Models";
    

    interface Props {
        employeeHours: EmployeeHours[];
        changes?: Change[];
        onSelect: (employeeIndex: number, dayIndex: number) => void;
        onEdit: (employeeIndex: number, employeeHours: EmployeeHours) => void;
    }

    let { employeeHours, changes, onEdit, onSelect } : Props = $props();

    let updatedEmployeeHours = $derived.by(() => {
        const result = employeeHours.map((employee) => ({
                ...employee,
                days: employee.days.map((day) => ({
                    ...day,
                    changed: false,
                })),
            }));
        if (changes) {
            changes.forEach((change) => {
                const { employeeIndex, dayIndex, newWorkHours, newLeaveHours } = change;

                if (employeeIndex >= 0 && employeeIndex < result.length) {
                    if (dayIndex >= 0 && dayIndex < result[employeeIndex].days.length) {
                        result[employeeIndex].days[dayIndex].changed = true;
                        if (newWorkHours !== null && newWorkHours !== undefined) {
                            result[employeeIndex].days[dayIndex].workHours = newWorkHours;
                        }
                        if (newLeaveHours !== null && newLeaveHours !== undefined) {
                            result[employeeIndex].days[dayIndex].leaveHours = newLeaveHours;
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
            onEdit(index, { ...updatedEmployeeHours[index], employee: value });
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
                        value={employeeHours.employee}
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
