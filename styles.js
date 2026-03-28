@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Share Tech Mono', monospace;
    background: radial-gradient(circle at center, #0a0a2a 0%, #000000 100%);
    min-height: 100vh;
    overflow: hidden;
    color: #0ff;
    position: relative;
}

/* Шум и сканирование */
.noise {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-radial-gradient(circle at 20% 30%, rgba(0,255,255,0.05) 0px, rgba(0,255,255,0.05) 2px, transparent 2px, transparent 4px);
    pointer-events: none;
    z-index: 1;
    animation: noise 0.3s infinite;
}

@keyframes noise {
    0% { opacity: 0.3; }
    100% { opacity: 0.6; }
}

.scan-line {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, transparent, #0ff, #0ff, transparent);
    animation: scan 4s linear infinite;
    pointer-events: none;
    z-index: 2;
    box-shadow: 0 0 20px #0ff;
}

@keyframes scan {
    0% { top: 0; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { top: 100%; opacity: 0; }
}

.container {
    position: relative;
    z-index: 10;
    height: 100vh;
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(2px);
}

/* Header */
.header {
    padding: 20px 30px;
    border-bottom: 1px solid rgba(0, 255, 255, 0.3);
    background: rgba(0, 0, 0, 0.6);
}

.glow-text h1 {
    font-size: 2em;
    letter-spacing: 4px;
    text-shadow: 0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { text-shadow: 0 0 10px #0ff, 0 0 20px #0ff; opacity: 1; }
    50% { text-shadow: 0 0 20px #0ff, 0 0 40px #0ff; opacity: 0.9; }
}

.subtitle {
    font-size: 0.7em;
    color: #0ff;
    opacity: 0.7;
    letter-spacing: 2px;
}

.status-panel {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 15px;
    font-size: 0.8em;
}

.status-led {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #0ff;
    box-shadow: 0 0 8px #0ff;
    animation: blink 1.5s infinite;
}

.status-led.listening {
    background-color: #f0f;
    box-shadow: 0 0 15px #f0f;
    animation: pulse-fast 0.5s infinite;
}

.status-led.speaking {
    background-color: #0f0;
    box-shadow: 0 0 15px #0f0;
}

.status-led.searching {
    background-color: #ff0;
    box-shadow: 0 0 15px #ff0;
    animation: pulse 0.8s infinite;
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
}

@keyframes pulse-fast {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.3); opacity: 0.7; }
}

.status-text {
    text-transform: uppercase;
    letter-spacing: 2px;
}

.system-time {
    margin-left: auto;
    font-family: monospace;
}

/* Hologram */
.hologram-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    height: 280px;
}

.hologram-ring {
    position: absolute;
    width: 220px;
    height: 220px;
    border: 2px solid rgba(0, 255, 255, 0.6);
    border-radius: 50%;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
    animation: rotate 8s linear infinite;
}

.ring-2 {
    width: 280px;
    height: 280px;
    border-color: rgba(255, 0, 255, 0.4);
    animation: rotate-reverse 12s linear infinite;
}

@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

@keyframes rotate-reverse {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
}

.voice-visualizer {
    position: absolute;
    width: 180px;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.wave {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,255,255,0.2) 0%, transparent 70%);
    animation: wave-pulse 2s ease-out infinite;
}

@keyframes wave-pulse {
    0% { transform: scale(0.8); opacity: 0.5; }
    100% { transform: scale(1.2); opacity: 0; }
}

.core-button {
    position: relative;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0ff, #f0f);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
}

.core-button:active {
    transform: scale(0.95);
}

.core-button.listening {
    animation: button-pulse 0.8s infinite;
    box-shadow: 0 0 50px #f0f;
}

@keyframes button-pulse {
    0%, 100% { transform: scale(1); box-shadow: 0 0 30px #f0f; }
    50% { transform: scale(1.05); box-shadow: 0 0 60px #f0f; }
}

.button-glow {
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,255,255,0.3), transparent);
    animation: glow 2s infinite;
}

@keyframes glow {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
}

.mic-icon {
    font-size: 3em;
    position: relative;
    z-index: 2;
}

/* Command hints */
.command-hint {
    text-align: center;
    margin: 10px 20px;
}

.hint-text {
    font-size: 0.7em;
    color: #0ff;
    opacity: 0.8;
    letter-spacing: 2px;
    margin-bottom: 12px;
}

.command-grid {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
}

.command-chip {
    padding: 6px 14px;
    background: rgba(0, 255, 255, 0.1);
    border: 1px solid rgba(0, 255, 255, 0.3);
    border-radius: 20px;
    font-size: 0.7em;
    cursor: pointer;
    transition: all 0.3s;
    backdrop-filter: blur(5px);
}

.command-chip:hover {
    background: rgba(0, 255, 255, 0.3);
    box-shadow: 0 0 10px #0ff;
    transform: scale(1.05);
}

/* Conversation */
.conversation {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    margin: 0 20px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 15px;
    border: 1px solid rgba(0, 255, 255, 0.2);
    backdrop-filter: blur(10px);
}

.message {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.message.user {
    flex-direction: row-reverse;
}

.message-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 255, 255, 0.2);
    border: 1px solid #0ff;
    font-size: 1.2em;
}

.message.user .message-icon {
    border-color: #f0f;
    background: rgba(255, 0, 255, 0.2);
}

.message-content {
    max-width: 70%;
    padding: 12px 16px;
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(0, 255, 255, 0.3);
    border-radius: 12px;
    line-height: 1.4;
    font-size: 0.9em;
}

.message.user .message-content {
    border-color: #f0f;
    background: rgba(255, 0, 255, 0.1);
}

/* Terminal input */
.input-terminal {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 20px;
    padding: 12px 20px;
    background: rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(0, 255, 255, 0.3);
    border-radius: 50px;
    backdrop-filter: blur(10px);
}

.terminal-prefix {
    color: #0ff;
    font-size: 0.9em;
    font-weight: bold;
}

.input-terminal input {
    flex: 1;
    background: transparent;
    border: none;
    color: #0ff;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.9em;
    outline: none;
}

.input-terminal input::placeholder {
    color: rgba(0, 255, 255, 0.4);
}

.input-terminal button {
    padding: 6px 18px;
    background: linear-gradient(135deg, #0ff, #f0f);
    border: none;
    color: #000;
    font-family: monospace;
    font-weight: bold;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s;
}

.input-terminal button:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px #0ff;
}

/* Footer */
.footer-stats {
    display: flex;
    justify-content: space-between;
    padding: 12px 30px;
    background: rgba(0, 0, 0, 0.5);
    border-top: 1px solid rgba(0, 255, 255, 0.2);
    font-size: 0.7em;
}

.stat {
    color: rgba(0, 255, 255, 0.7);
}

/* Scrollbar */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: rgba(0, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
    background: #0ff;
    border-radius: 3px;
}

/* Responsive */
@media (max-width: 768px) {
    .command-grid {
        gap: 8px;
    }
    
    .command-chip {
        padding: 4px 10px;
        font-size: 0.6em;
    }
    
    .message-content {
        max-width: 85%;
        font-size: 0.85em;
    }
    
    .core-button {
        width: 100px;
        height: 100px;
    }
    
    .mic-icon {
        font-size: 2em;
    }
}
