
// Tab navigation
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    const buttons = document.querySelectorAll('.tab-button');
    
    pages.forEach(page => {
        page.classList.remove('active');
        if (page.id === pageId) {
            page.classList.add('active');
        }
    });
    
    buttons.forEach(button => {
        button.classList.remove('active');
        if (button.textContent.trim() === pageId.replace('-', ' ')) {
            button.classList.add('active');
        }
    });
}
