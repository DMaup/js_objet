const app = require("./class/App"),
    $ = require("jquery-slim");

app.loadNotesFromLocalStorage();

app.$form.submit( function( event ){

    //Empeche le rechargement de la page au submit
    event.preventDefault();

    //Si on a mis une note en mémoire, on veut l'éditer
    if( app.editedNote ){

        if( app.updateNote() ){
            app.resetForm();
        }

    }
    else if( app.addNote() ){

        app.resetForm();
        
    }
    
} );

// On bind le click sur le parent
// Au moment du click, jquery vérifie que l'on a cliqué un élément .remove
// Evite la perte d'évennement sur la génération dynamique d'élément !

app.$note_container.on("click", ".remove, .edit", function(){

    const $this = $(this); //J'ai besoin à plusieur reprise de $(this), je le stocke dans une variable !
    const $parent = $this.parent();

    //const $notes = $(".note"); //Reparcours tout le dom pour trouver mes éléments
    const $notes = app.$note_container.find(".note"); //Va chercher les enfants .note (plus rapide)

    const position = $notes.index( $parent );

    if( $this.hasClass("remove") ) {

        app.removeNoteAtIndex( position );
        app.resetForm();

    }
    else {
        app.editNoteAtIndex( position );
    }

});

//Evennement lorsque l'on quitte la page
$( window ).on("beforeunload", function() {
    
    app.registerInLocalStorage();

});