// Disable right-click
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Disable keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Disable F12
    if(e.key === 'F12') {
        e.preventDefault();
    }
    
    // Disable Ctrl+Shift+I and Ctrl+Shift+J
    if(e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
    }
    
    // Disable Ctrl+U (view source)
    if(e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
    }
});

// Disable developer tools
setInterval(function() {
    const devtools = /./;
    devtools.toString = function() {
        this.opened = true;
    }
    console.log('%c', devtools);
}, 1000);

// Clear console
setInterval(function() {
    console.clear();
}, 1000);

// Disable text selection
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
}); 