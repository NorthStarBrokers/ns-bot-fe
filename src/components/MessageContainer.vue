<template>
    <div class="message-container" ref="messageContainer" @scroll.passive="loadMoreMessages">
        <MessageBubble 
            v-for="(message, index) in conversation"
            :key="index"
            :sender="message.sender"
            :text="message.text"
        />
    </div>
</template>

<script>
import MessageBubble from './MessageBubble.vue';

export default {
    components: {
        MessageBubble,
    },
    props: {
        conversation: {
            type: Array,
            required: true,
        },
    },
    methods: {
        scrollToBottom() {
            this.$nextTick(() => {
                const messageContainer = this.$refs.messageContainer;
                messageContainer.scrollTop = messageContainer.scrollHeight;
            });
        },
        loadMoreMessages() {},
    }
};
</script>

<style scoped>
.message-container {
    flex-grow: 1;
    background-color: #121f1a;
    color: white;
    overflow-y: auto;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.1);
    justify-content: flex-end;
}
</style>