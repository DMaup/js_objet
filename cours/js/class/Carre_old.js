//Déclaration de classes en js avant ES6 (2015)
//La déclaration fait office de constructeur !
function Carre ( size, color, top, left ){

    //Pas de notion de private / protected... tout public
    this.dom = "";
    this.size = size;
    this.color = color;
    this.top = top;
    this.left = left;

    this.init();
    this.render();

}

Carre.prototype.init = function(){

    //Generate dom element
    this.dom = document.createElement("div");
    this.dom.classList = "carre";
    document.body.appendChild( this.dom );

}

Carre.prototype.render = function(){

    this.dom.style.height = this.size + "px";
    this.dom.style.width = this.size + "px";
    this.dom.style.backgroundColor = this.color;
    this.dom.style.top = this.top + "px";
    this.dom.style.left = this.left + "px";

}

Carre.prototype.setSize = function( size ){
    this.size = size;
    this.render();
}

Carre.prototype.setColor = function( color ){
    this.color = color;
    this.render();
}

Carre.prototype.setTop = function( top ){
    this.top = top;
    this.render();
}

Carre.prototype.setLeft = function( left ){
    this.left = left;
    this.render();
}

//static
Carre.classname = function(){
    console.log("Je suis la classe Carre");
}