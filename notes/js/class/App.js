const $ = require("jquery-slim"),
    Note = require("./Note"),
    STORAGE_KEY = "notes";

class App {

    static toString( key, value ){
       
        if( value instanceof $ )
            return;
         
        return value;
    }

    constructor(){

        this.$form = $("#add-note");
        this.$title = $("#title");
        this.$content = $("#content");
        this.$note_container = $("#notes");
        this.$submit = this.$form.find("input[type='submit']");

        this.notes = [];

        this.editedNote = false;

    }

    resetForm(){

        this.$title.val("");
        this.$content.val("");
        this.$submit.val("Ajouter");

        //Coupe le mode édition
        this.editedNote = false;

    }

    addNote(){

        const title = this.$title.val();
        const content = this.$content.val();

        //Quitte si vide
        if( !title || !content ) return false;

        const note = new Note( title, content, new Date() );
        this.notes.push( note );
        
        note.render( this.$note_container );

        return true;
    }

    removeNoteAtIndex( position ){

        const note = this.notes[ position ];
        note.remove();
        this.notes.splice( position, 1 );

    }

    editNoteAtIndex( position ){

        this.editedNote = this.notes[position];

        this.$submit.val( "Editer" );
        this.$title.val( this.editedNote.title );
        this.$content.val( this.editedNote.content );

    }

    updateNote(){

        const title = this.$title.val();
        const content = this.$content.val();

        //Quitte si vide
        if( !title || !content ) return false;

        this.editedNote.title = title;
        this.editedNote.content = content;
        this.editedNote.date = new Date();
        this.editedNote.update();

        return true;

    }

    registerInLocalStorage(){

        const stringified = JSON.stringify( this.notes );
        localStorage.setItem( STORAGE_KEY , stringified );

    }
    
    loadNotesFromLocalStorage(){

        const stringified = localStorage.getItem( STORAGE_KEY );

        if( !stringified ) return;

        const parsed_notes = JSON.parse( stringified );

        for( let parsed_note of parsed_notes ){

            const date = new Date( parsed_note.date );
            const note = new Note( parsed_note.title, parsed_note.content, date );
            note.render( this.$note_container );
            this.notes.push( note );

        }

    }

}

module.exports = new App();