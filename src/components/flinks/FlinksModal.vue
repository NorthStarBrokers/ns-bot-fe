<template>
    <div class="modal-bg" @click="$emit('closemodal')">
        <div class="modal-container" @click.stop>
            <div class="modal-header">
                <h1>{{ title }}</h1>
                <button type="button" class="close text-white" @click="$emit('closemodal')">&times;</button>
            </div>
            <div class="modal-body" ref="modalBody">
                <Flinks />
            </div>
            <div class="modal-footer">
            </div>
        </div>
    </div>
</template>

<script>
import Flinks from './Flinks.vue';

export default {
    components: { Flinks },
    props: ["modal", "title"],
    emits: ["closemodal"],
    data() {
        return {
        };
    },
    mounted() {
    },
    methods: {
       
    },
};
</script>

<style scoped>
.modal-bg {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    background-color: rgba(0, 0, 0, .514);
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    padding: 1.6rem;
}

.modal-container {
    display: flex;
    flex-direction: column;
    background-color: #172627;
    color: white;
    border-radius: 8px;
    padding: 24px 23px;
    margin: 10px;
    width: 100%;
    max-width: 563.5px;
    height: 100%;
    max-height: 800px;
}

@media (max-width: 1366px) {
    .modal-content {
        max-width: 450px;
    }
}

@media (max-width: 575px) {
    .modal-content {
        margin-top: 10px;
    }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
}

.modal-title {
    margin: 0;
}

.close {
    cursor: pointer;
    font-size: 30px;
    font-weight: bold;
    color: #888;
    border: none;
    background-color: transparent;
    align-items: center;
}

.modal-body {
    overflow-y: scroll;
    text-align: start;
    flex-grow: 1;
    margin-bottom: 16px;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    scrollbar-color: #DEE2E6 transparent;
    padding-right: 5px;
}

.p-content {
    margin-top: 10px;
    margin-bottom: 10px;
}

.modal-footer {
    display: flex;
    justify-content: center;
}

.button {
    background-color: #28a745;
    border: none;
    border-radius: 5px;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
}


.input-disabled {
    opacity: 0.7;
    cursor: not-allowed;
    filter: blur(1px);
}
</style>