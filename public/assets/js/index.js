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

// Delete the selected note
const handleNoteDelete = function (event) {
    // prevents click listener 
    event.stopPropagation();

    const note = $(this).parent(".list-group-item").data();

    if (activeNote.id === note.id) {
        activeNote = {};
    }

    deleteNote(note.id).then(() => {
        getAndRenderNotes();
        renderActiveNote();
    });
};

// Set activeNote and display it
const handleNoteView = function () {
    activeNote = $(this).data();
    renderActiveNote();
};

// Set activenote to an empty object and allow the user to enter a note.
const handleNewNoteView = function () {
    activeNote = {};
    renderActiveNote();
};

// If notes title or text are empty hide save button
//otherwise show it.
const handleRenderSaveBtn = function () {
    if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
        $saveNoteBtn.hide();
    } else {
        $saveNoteBtn.show();
    }
};

//Render the list of note titles
const renderNoteList = (notes) => {
    $noteList.empty();

    const noteListItems = [];

    //returns jquery object.
    const create$li = (text, withDeleteButton = true) => {
        const $li = $("<li class='list-group-item'>");
        const $span = $("<span>").text(text);
        $li.append($span);

        if (withDeleteButton) {
            const $delBtn = $(
                "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
            );
            $li.append($delBtn);
        }
        return $li;
    };

    if (notes.length === 0) {
        noteListItems.push(create$li("No saved Notes", false));
    }

    notes.forEach((note) => {
        const $li = create$li(note.title).data(note);
        noteListItems.push($li);
    });

    $noteList.append(noteListItems);
};

// Gets notes from  database and renders them to sidebar.
const getAndRenderNotes = () => {
    return getNotes().then(renderNoteList);
};

// update!
function renderSaveUpdatebtn() {
    $updateBtn.removeClass('hide')
}

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteTitle.on("click", renderSaveUpdatebtn);
$noteText.on("keyup", handleRenderSaveBtn);

// gets initial list of notes
getAndRenderNotes();
