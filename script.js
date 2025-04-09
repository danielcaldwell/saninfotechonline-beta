document.addEventListener('DOMContentLoaded', () => {
    const settingsButton = document.getElementById('settingsButton');
    const settingsMenu = document.getElementById('settingsMenu');
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Check system preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    
    // Set initial theme
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        darkModeToggle.checked = savedTheme === 'dark';
    } else {
        document.documentElement.setAttribute('data-theme', prefersDarkMode ? 'dark' : 'light');
        darkModeToggle.checked = prefersDarkMode;
    }
    
    // Toggle settings menu
    settingsButton.addEventListener('click', () => {
        settingsMenu.classList.toggle('hidden');
    });
    
    // Close settings menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!settingsButton.contains(event.target) && !settingsMenu.contains(event.target)) {
            settingsMenu.classList.add('hidden');
        }
    });
    
    // Handle dark mode toggle
    darkModeToggle.addEventListener('change', () => {
        const newTheme = darkModeToggle.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            darkModeToggle.checked = e.matches;
        }
    });
}); 