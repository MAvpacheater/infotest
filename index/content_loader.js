// Завантажувач HTML контенту
document.addEventListener('DOMContentLoaded', function() {
    loadContent();
});

async function loadContent() {
    try {
        const response = await fetch('content.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById('app-content').innerHTML = html;
        
        // Викликаємо функцію ініціалізації після завантаження контенту
        if (typeof initializeApp === 'function') {
            initializeApp();
        }
    } catch (error) {
        console.error('Помилка завантаження контенту:', error);
        // Fallback - показуємо повідомлення про помилку
        document.getElementById('app-content').innerHTML = `
            <div style="text-align: center; padding: 50px; color: red;">
                <h2>Помилка завантаження</h2>
                <p>Не вдалося завантажити контент додатка. Перевірте підключення до інтернету.</p>
            </div>
        `;
    }
}
