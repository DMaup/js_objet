const Carre = require("./class/Carre");
const Rounded = require("./class/Rounded");

var carre = new Carre( 200, "purple", 100, 150 );
var carre2 = new Carre( 100, "blue", 200, 300 );
var rounded = new Rounded( 300, "red", 250, 250, 50 );

console.log( carre );
Carre.classname();