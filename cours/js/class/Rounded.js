const Carre = require("./Carre");

class Rounded extends Carre {

    constructor( size, color, top, left, border ){

        //Appel du constructeur parent (doit être appelé en premier)
        super( size, color, top, left );

        this.setBorder( border );

    }

    render(){
        //Appel de la méthode du parent
        super.render();
        this.dom.style.borderRadius = this.border + "px";
    }

    setBorder( border ){
        this.border = border;
        this.render();
    }

}

//Exporte la classe à l'exterieur
module.exports = Rounded;