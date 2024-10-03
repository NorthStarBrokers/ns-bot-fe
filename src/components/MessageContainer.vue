<template>
    <div class="message-container" ref="messageContainer">
        <MessageBubble
            v-for="(message, index) in conversation"
            :key="index"
            :message="message"
        />
        <TypingIndicator v-if="isBotTyping" />
    </div>
</template>

<script>
import MessageBubble from './MessageBubble.vue';
import TypingIndicator from './TypingIndicator.vue';

export default {
    components: {
        MessageBubble,
        TypingIndicator
    },
    props: {
        conversation: {
            type: Array,
            required: true,
        },
    },
    computed: {
        isBotTyping() {
            if (this.conversation) {
                return this.conversation.some(message => message.typing);
            } else {
                return false;
            }
        }
    },
    mounted() {
        this.scrollToBottom();
    },
    methods: {
        scrollToBottom() {
            this.$refs.messageContainer.scrollTop = this.$refs.messageContainer.scrollHeight;
        }
    },
    watch: {
        conversation: {
            handler() {
                this.$nextTick(() => {
                    this.scrollToBottom();
                })
            },
            deep: true,
        },  
    },
};
</script>

<style scoped>
.message-container {
    flex-grow: 1;
    background-color: #121f1a;
    color: white;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
}

.message-container > :first-child {
    margin-top: auto !important;
}
</style>