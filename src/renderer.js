// UI logic and event handlers for recap generation.
document.getElementById('generate').addEventListener('click', () => {
    const input = document.getElementById('user-input').value;
    window.ipc.send('message-from-renderer', input);
});

window.ipc.receive('message-from-main', (response) => {
    document.getElementById('recap-output').innerText = response;
});
