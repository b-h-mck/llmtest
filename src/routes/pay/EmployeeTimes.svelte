<script lang="ts">
    import type { ReasonedPayHours, WorkPattern } from "./Models";

    export let workPatterns: WorkPattern[] = [];
    export let payHours: ReasonedPayHours[] = [];
    export let onEdit: (index: number, day: number, value: number) => void;
    export let onEditName: (index: number, value: string) => void = () => {};
    export let editableNames: boolean = false;

    function handleEdit(index: number, day: number, event: Event) {
        const input = event.target as HTMLInputElement;
        const value = parseFloat(input.value);
        if (!isNaN(value)) {
            onEdit(index, day, value);
        }
    }

    function handleEditName(index: number, event: Event) {
        const input = event.target as HTMLInputElement;
        const value = input.value.trim();
        onEditName(index, value);
    }

    const rows : (ReasonedPayHours | WorkPattern)[] = workPatterns.length > 0 ? workPatterns : payHours;
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
            <th></th>
        </tr>
    </thead>
    <tbody>
        {#each rows as row, index}
            <tr>
                <th>
                    {#if editableNames}
                        <input
                            type="text"
                            value={row.employee}
                            on:input={(event) => handleEditName(index, event)}
                        />
                    {:else}
                        {row.employee}
                    {/if}
                </th>
                {#each row.workHours as time, day}
                    <td>
                        <div class="time-cell">
                            <input
                                type="number"
                                value={time === 0 ? "" : time}
                                on:input={(event) =>
                                    handleEdit(index, day, event)}
                            />
                        </div>
                    </td>
                {/each}
                <td>
                    {#if 'reasoning' in row && row.reasoning}
                        <button
                            class="message-icon"
                            on:click={() => {
                                // Handle message icon click
                                console.log(row.reasoning);
                            }}>
                            <span>ℹ️</span>
                        </button>
                    {/if}
                </td>
            </tr>
            {#if 'leaveHours' in row && row.leaveHours}
                <tr>
                    <th>Leave:</th>
                    {#each row.leaveHours as time, day}
                        <td>
                            <div class="time-cell">
                                <input
                                    type="number"
                                    value={time === 0 ? "" : time}
                                    on:input={(event) =>
                                        handleEdit(index, day, event)}
                                />
                            </div>
                        </td>
                    {/each}
                </tr>
            {/if}
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
        max-width: 2em;
    }

    input[type="number"],
    input[type="text"] {
        width: 100%;
    }

    .time-cell {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }

    .message-icon {
        cursor: pointer;
        font-size: 14px;
        color: #007bff;
    }

    .message-icon:hover {
        color: #0056b3;
    }
</style>
