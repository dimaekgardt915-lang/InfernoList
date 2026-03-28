chip.textContent.replace('🔍 ПОИСК', '').replace('📱 ПРИЛОЖЕНИЯ', '').replace('🌐 БРАУЗЕР', '').replace('🎵 МУЗЫКА', '');
                if (chip.textContent.includes('ПОИСК')) cmd = 'поиск информации';
                if (chip.textContent.includes('ПРИЛОЖЕНИЯ')) cmd = 'открой приложения';
                if (chip.textContent.includes('БРАУЗЕР')) cmd = 'открой браузер';
                if (chip.textContent.includes('МУЗЫКА')) cmd = 'включи музыку';
                
                this.textInput.value = `Атлас ${cmd}`;
                this.sendButton.click();
            });
        });
    }
}

// Инициализация
window.addEventListener('load', () => {
    new AtlasNeuralAssistant();
});
