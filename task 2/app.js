document.addEventListener('DOMContentLoaded', function() {
    const notesContainer = document.getElementById('notes-container');

    function createNoteBox() {
        const noteBox = document.createElement('div');
        noteBox.className = 'note-box';
        const textarea = document.createElement('textarea');
        textarea.placeholder = 'Write your note here...';
        noteBox.appendChild(textarea);

        // Add + button inside the note box
        const addBtn = document.createElement('button');
        addBtn.className = 'add-note-inside';
        addBtn.textContent = '+';
        addBtn.title = 'Add new note';
        addBtn.onclick = createNoteBox;
        noteBox.appendChild(addBtn);

        // Remove note on double click
        noteBox.ondblclick = function(e) {
            // Prevent removing when double clicking the + button
            if (e.target === addBtn) return;
            noteBox.remove();
        };

        notesContainer.appendChild(noteBox);
    }

    // Create the first note box by default
    createNoteBox();
});