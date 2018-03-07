//Nouvelle écriture de classe
class Carre {
    
    static classname(){
        console.log("Je suis la classe Carre");
    }

    //Attention, on ne peut peut déclarer de propriété directement dans la classe
    //On le fait dans le constructeur !

    constructor( size, color, top, left ){

        this.dom = null;
        this.size = size;
        this.color = color;
        this.top = top;
        this.left = left;

        this.init();
        this.render();

    }

    init(){

        //Generate dom element
        this.dom = document.createElement("div");
        this.dom.classList = "carre";
        document.body.appendChild( this.dom );

    }

    render(){

        this.dom.style.height = this.size + "px";
        this.dom.style.width = this.size + "px";
        this.dom.style.backgroundColor = this.color;
        this.dom.style.top = this.top + "px";
        this.dom.style.left = this.left + "px";

    }

    setSize( size ){
        this.size = size;
        this.render();
    }
    
    setColor( color ){
        this.color = color;
        this.render();
    }
    
    setTop( top ){
        this.top = top;
        this.render();
    }
    
    setLeft( left ){
        this.left = left;
        this.render();
    }

}

//Exporte la classe à l'exterieur
module.exports = Carre;