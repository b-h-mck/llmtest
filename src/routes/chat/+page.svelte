<script lang="ts">
    let messages: { role: 'user' | 'assistant' | 'error'; content: string }[] = [];
    let userInput = '';

    async function sendMessage() {
        if (!userInput.trim()) return;

        // Add user message to the chat
        messages = [...messages, { role: 'user', content: userInput }];
        const userMessage = userInput;
        userInput = '';

        try {
            // Send the message to the LLM backend
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Use the error message from the server response
                throw new Error(data.error || `Error: ${response.status} ${response.statusText}`);
            }

            // Add the assistant's reply to the chat
            messages = [...messages, { role: 'assistant', content: data.reply }];
        } catch (error: any) {
            // Add the error message to the chat
            messages = [...messages, { role: 'error', content: error.message || 'An unknown error occurred' }];
        }
    }
</script>

<section>
    <h1>Chat with LLM</h1>
    <div class="chat-box">
        {#each messages as { role, content }}
            <div class="{role}">
                <strong>{role === 'user' ? 'You' : role === 'assistant' ? 'Assistant' : 'Error'}:</strong> {content}
            </div>
        {/each}
    </div>
    <form on:submit|preventDefault={sendMessage}>
        <input
            type="text"
            bind:value={userInput}
            placeholder="Type your message..."
            required
        />
        <button type="submit">Send</button>
    </form>
</section>

<style>
    .chat-box {
        border: 1px solid #ccc;
        padding: 1rem;
        margin-bottom: 1rem;
        max-height: 300px;
        overflow-y: auto;
    }
    .user {
        text-align: right;
    }
    .assistant {
        text-align: left;
    }
    .error {
        text-align: left;
        color: red;
        font-style: italic;
    }
</style>