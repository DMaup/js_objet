const $ = require("jquery-slim");

class Note {

    constructor( title, content, date ){

        this.$dom = null;
        this.$title = null;
        this.$content = null;
        this.$date = null;

        this.title = title;
        this.content = content;
        this.date = date;

    }

    render( $parent ){

        // let html = "<div class='note'>";
        //         html += "<div class='edit'>📝</div>";
        //         html += "<div class='remove'>X</div>";
        //         html += "<h4>" + this.title + "</h4>";
        //         html += "<p>" + this.content + "</p>";
        //         html += "<i>Créé le " + this.date.toLocaleString("fr") + "</i>";
        //     html += "</div>";

        let html = "<div class='note'>";
            html += "<div class='edit'>📝</div>";
            html += "<div class='remove'>X</div>";
        html += "</div>";

        //Créer un élément (dom) dynamiquement
        this.$dom = $( html );

        //Créer des références direct au jquery dans l'objet
        this.$title = $("<h4>" + this.title + "</h4>");
        this.$content = $("<p>" + this.content + "</p>");
        this.$date = $("<i>Créé le " + this.date.toLocaleString("fr") + "</i>");

        this.$dom.append( this.$title );
        this.$dom.append( this.$content );
        this.$dom.append( this.$date );

        //On ajoute l'élement dans le dom parent
        $parent.append( this.$dom );

    }

    remove(){
        this.$dom.remove();
    }

    update(){
        // this.$dom.find("h4").html( this.title );
        // this.$dom.find("p").html( this.content );
        // this.$dom.find("i").html( "Créé le " + this.date.toLocaleString("fr") );
        this.$title.html( this.title );
        this.$content.html( this.content );
        this.$date.html( "Créé le " + this.date.toLocaleString("fr") );
    }

    // Méthode magique pour JSON.stringify !
    toJSON(){
        return {
            title: this.title,
            content: this.content,
            date: this.date
        };
    }

}

module.exports = Note;