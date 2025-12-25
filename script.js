const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    const icon = item.querySelector('.nav-icon');
    const dropdown = item.querySelector('.dropdown');
    
    icon.addEventListener('click', (e) => {
        e.stopPropagation();
        
        document.querySelectorAll('.dropdown').forEach(d => {
            if (d !== dropdown) d.classList.remove('active');
        });
        
        dropdown.classList.toggle('active');
    });
});

document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown').forEach(d => {
        d.classList.remove('active');
    });
});
