const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");
const $updateBtn = $("#updateMe");

// activeNote to keep track of the note 
let activeNote = {};

// function for getting all notes from the database
const getNotes = () => {
    return $.ajax({
        url: "/api/notes",
        method: "GET",
    });
};

// function for saving note to the database
const saveNote = (note) => {
    return $.ajax({
        url: "/api/notes",
        data: note,
        method: "POST",
    });
};

//  function for deleting note from the database
const deleteNote = (id) => {
    return $.ajax({
        url: "api/notes/" + id,
        method: "DELETE",
    });
};

// If there is an activeNote  display it  otherwise show empty 
const renderActiveNote = () => {
    $saveNoteBtn.hide();

    if (activeNote.id) {
        $noteTitle.attr("readonly", true);
        $noteTitle.val(activeNote.title);
        $noteText.val(activeNote.text);
    } else {
        $noteTitle.attr("readonly", false);
        $noteTitle.val("");
        $noteText.val("");
    }
};
// Gets note data from the inputs save it to database and update view
const handleNoteSave = function () {
    const newNote = {
        title: $noteTitle.val(),
        text: $noteText.val(),
    };

    saveNote(newNote).then(() => {
        getAndRenderNotes();
        renderActiveNote();
    });
};
