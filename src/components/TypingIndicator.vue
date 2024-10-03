<template>
    <div class="typing-indicator">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TypingIndicator',
  };
  </script>
  
  <style scoped>
  .typing-indicator {
    display: flex;
    gap: 10px;
    padding: 10px;
  }
  
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #28a745;
    animation: bounce 0.6s infinite ease-in-out;
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
  }
  
  .dot:nth-child(1) {
    animation-delay: 0s;
  }
  
  .dot:nth-child(2) {
    animation-delay: 0.1s;
  }
  
  .dot:nth-child(3) {
    animation-delay: 0.2s;
  }
  </style>