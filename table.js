var $TABLE = $('#table');
var index = 0

function getNotes() {
    var notes = localStorage.getItem("notes")
    index = parseInt(localStorage.getItem("index"))
    if ( isNaN(index) ) {
        index = 0
    }
    if ( !notes ) {
        notes = []
    }
    else {
        notes = JSON.parse(notes)
    }
    return notes
}

function storeNotes( notes, index ) {
    localStorage.setItem( "notes", JSON.stringify(notes) )
    localStorage.setItem("index", index.toString())
}

function removeNote( id ) {
    var notes = getNotes()
    var noteId = parseInt(id)
    for ( var inx = 0; inx < notes.length; inx++ ) {
        if ( notes[inx].id == noteId ) {
            notes.splice(inx, 1)
            break;
        }
    }
    storeNotes(notes,index)
}

function updateNote( id, newText ) {
    var notes = getNotes()
    var noteId = parseInt(id)
    for ( var inx = 0; inx < notes.length; inx++ ) {
        if ( notes[inx].id == noteId ) {
            notes[inx].note = newText
            break;
        }
    }
    storeNotes(notes,index)
}

$(document).ready( function() {
    var notes = getNotes()

    for ( var inx=0; inx < notes.length; inx++ ) {
        var $clone = $TABLE.find('tr.hide').clone(true).removeClass('hide table-line');
        $clone[0].id = notes[inx].id
        $clone.find(".note-text").text(notes[inx].note)
        $TABLE.find('table').append($clone);
    }
});

$(".note-text").blur( function() {
    updateNote( $(this).parents('tr')[0].id, $(this).text())
});


$('.table-add').click(function () {
    var notes = getNotes()
    var note = { id: index, note: "New Note"}
    notes.push(note)
    var $clone = $TABLE.find('tr.hide').clone(true).removeClass('hide table-line');
    $clone[0].id = index
    storeNotes(notes, ++index)
    $TABLE.find('table').append($clone);

});

$('.table-remove').click(function () {
    removeNote( $(this).parents('tr')[0].id )
    $(this).parents('tr').detach();
});

$('.clear-all').click(function () {
    var notes = getNotes()
    for ( var inx = 0; inx < index; inx++ ) {
        removeNote( notes[inx].id )

    }
});
