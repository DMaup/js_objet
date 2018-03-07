(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
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
},{"./Carre":1}],3:[function(require,module,exports){
const Carre = require("./class/Carre");
const Rounded = require("./class/Rounded");

var carre = new Carre( 200, "purple", 100, 150 );
var carre2 = new Carre( 100, "blue", 200, 300 );
var rounded = new Rounded( 300, "red", 250, 250, 50 );

console.log( carre );
Carre.classname();
},{"./class/Carre":1,"./class/Rounded":2}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxfX05FIFBBUyBTVVBQUklNRVIgLSBTQVVWRUdBUkRFXFxVd0FtcFxcd3d3XFxfX1BSUV9XRUJfX1xcSlNfT2JqZXRcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkQ6L19fTkUgUEFTIFNVUFBSSU1FUiAtIFNBVVZFR0FSREUvVXdBbXAvd3d3L19fUFJRX1dFQl9fL0pTX09iamV0L2NvdXJzL2pzL2NsYXNzL0NhcnJlLmpzIiwiRDovX19ORSBQQVMgU1VQUFJJTUVSIC0gU0FVVkVHQVJERS9Vd0FtcC93d3cvX19QUlFfV0VCX18vSlNfT2JqZXQvY291cnMvanMvY2xhc3MvUm91bmRlZC5qcyIsIkQ6L19fTkUgUEFTIFNVUFBSSU1FUiAtIFNBVVZFR0FSREUvVXdBbXAvd3d3L19fUFJRX1dFQl9fL0pTX09iamV0L2NvdXJzL2pzL2NvdXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vTm91dmVsbGUgw6ljcml0dXJlIGRlIGNsYXNzZVxyXG5jbGFzcyBDYXJyZSB7XHJcbiAgICBcclxuICAgIHN0YXRpYyBjbGFzc25hbWUoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkplIHN1aXMgbGEgY2xhc3NlIENhcnJlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vQXR0ZW50aW9uLCBvbiBuZSBwZXV0IHBldXQgZMOpY2xhcmVyIGRlIHByb3ByacOpdMOpIGRpcmVjdGVtZW50IGRhbnMgbGEgY2xhc3NlXHJcbiAgICAvL09uIGxlIGZhaXQgZGFucyBsZSBjb25zdHJ1Y3RldXIgIVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBzaXplLCBjb2xvciwgdG9wLCBsZWZ0ICl7XHJcblxyXG4gICAgICAgIHRoaXMuZG9tID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLnRvcCA9IHRvcDtcclxuICAgICAgICB0aGlzLmxlZnQgPSBsZWZ0O1xyXG5cclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpbml0KCl7XHJcblxyXG4gICAgICAgIC8vR2VuZXJhdGUgZG9tIGVsZW1lbnRcclxuICAgICAgICB0aGlzLmRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgdGhpcy5kb20uY2xhc3NMaXN0ID0gXCJjYXJyZVwiO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoIHRoaXMuZG9tICk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpe1xyXG5cclxuICAgICAgICB0aGlzLmRvbS5zdHlsZS5oZWlnaHQgPSB0aGlzLnNpemUgKyBcInB4XCI7XHJcbiAgICAgICAgdGhpcy5kb20uc3R5bGUud2lkdGggPSB0aGlzLnNpemUgKyBcInB4XCI7XHJcbiAgICAgICAgdGhpcy5kb20uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcjtcclxuICAgICAgICB0aGlzLmRvbS5zdHlsZS50b3AgPSB0aGlzLnRvcCArIFwicHhcIjtcclxuICAgICAgICB0aGlzLmRvbS5zdHlsZS5sZWZ0ID0gdGhpcy5sZWZ0ICsgXCJweFwiO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZXRTaXplKCBzaXplICl7XHJcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZXRDb2xvciggY29sb3IgKXtcclxuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0VG9wKCB0b3AgKXtcclxuICAgICAgICB0aGlzLnRvcCA9IHRvcDtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZXRMZWZ0KCBsZWZ0ICl7XHJcbiAgICAgICAgdGhpcy5sZWZ0ID0gbGVmdDtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLy9FeHBvcnRlIGxhIGNsYXNzZSDDoCBsJ2V4dGVyaWV1clxyXG5tb2R1bGUuZXhwb3J0cyA9IENhcnJlOyIsImNvbnN0IENhcnJlID0gcmVxdWlyZShcIi4vQ2FycmVcIik7XHJcblxyXG5jbGFzcyBSb3VuZGVkIGV4dGVuZHMgQ2FycmUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBzaXplLCBjb2xvciwgdG9wLCBsZWZ0LCBib3JkZXIgKXtcclxuXHJcbiAgICAgICAgLy9BcHBlbCBkdSBjb25zdHJ1Y3RldXIgcGFyZW50IChkb2l0IMOqdHJlIGFwcGVsw6kgZW4gcHJlbWllcilcclxuICAgICAgICBzdXBlciggc2l6ZSwgY29sb3IsIHRvcCwgbGVmdCApO1xyXG5cclxuICAgICAgICB0aGlzLnNldEJvcmRlciggYm9yZGVyICk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIC8vQXBwZWwgZGUgbGEgbcOpdGhvZGUgZHUgcGFyZW50XHJcbiAgICAgICAgc3VwZXIucmVuZGVyKCk7XHJcbiAgICAgICAgdGhpcy5kb20uc3R5bGUuYm9yZGVyUmFkaXVzID0gdGhpcy5ib3JkZXIgKyBcInB4XCI7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Qm9yZGVyKCBib3JkZXIgKXtcclxuICAgICAgICB0aGlzLmJvcmRlciA9IGJvcmRlcjtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLy9FeHBvcnRlIGxhIGNsYXNzZSDDoCBsJ2V4dGVyaWV1clxyXG5tb2R1bGUuZXhwb3J0cyA9IFJvdW5kZWQ7IiwiY29uc3QgQ2FycmUgPSByZXF1aXJlKFwiLi9jbGFzcy9DYXJyZVwiKTtcclxuY29uc3QgUm91bmRlZCA9IHJlcXVpcmUoXCIuL2NsYXNzL1JvdW5kZWRcIik7XHJcblxyXG52YXIgY2FycmUgPSBuZXcgQ2FycmUoIDIwMCwgXCJwdXJwbGVcIiwgMTAwLCAxNTAgKTtcclxudmFyIGNhcnJlMiA9IG5ldyBDYXJyZSggMTAwLCBcImJsdWVcIiwgMjAwLCAzMDAgKTtcclxudmFyIHJvdW5kZWQgPSBuZXcgUm91bmRlZCggMzAwLCBcInJlZFwiLCAyNTAsIDI1MCwgNTAgKTtcclxuXHJcbmNvbnNvbGUubG9nKCBjYXJyZSApO1xyXG5DYXJyZS5jbGFzc25hbWUoKTsiXX0=
