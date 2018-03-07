const Marker = require("./Marker");

class App {

    constructor(){

        this.$form        = document.getElementById("form-map");
        this.$label       = document.getElementById("label");
        this.$description = document.getElementById("description");
        this.$latitude    = document.getElementById("latitude");
        this.$longitude   = document.getElementById("longitude");

        this.$filters     = document.querySelectorAll("input[type='checkbox']");

        this.position = {
            lat: 0,
            lng: 0
        };
        this.map = null;

        this.appMarker = null;

        //marker list
        this.markers = {
            hotel: [],
            restaurant: [],
            bar: []
        };

    }

    initMap( idElement ){

        this.map = new google.maps.Map(document.getElementById( idElement ), {
            center: {
                lat: this.position.lat, 
                lng: this.position.lng
            },
            zoom: 18
        });

    }

    setPosition( lat, lng ){
        this.position.lat = lat;
        this.position.lng = lng;

        this.centerOnAppPosition();
        this.setAppMarker();
    }

    centerOnAppPosition(){
        this.map.setCenter({
            lat: this.position.lat,
            lng: this.position.lng
        });
    }

    setAppMarker(){

        const infowindow = new google.maps.InfoWindow({
            content: "<h3> Vous êtes ici ! </h3>"
        });

        this.appMarker = new google.maps.Marker({
            position: this.position,
            map: this.map,
            title: "Ma position"
        });

        //Syntaxe ES6 (2015) pour ne pas perdre le contexte

        //function(){}
        // () => {  }

        //function( a, b ){  }
        // (a, b) => {  }

        this.appMarker.addListener("click", () => {
            infowindow.open( this.map, this.appMarker );
        });

    }

    addMarker(){

        const position = {
            lat: parseFloat( this.$latitude.value ),
            lng: parseFloat( this.$longitude.value )
        };

        const marker = new Marker(
            this.map,
            position,
            this.$label.value,
            this.$description.value,
            this.$form.elements["structure"].value
        );

        //On push dans la categorie correspondante
        this.markers[ marker.structure ].push( marker );

        //Vider le formulaire
        this.clearForm();

    }

    clearForm(){

        this.$form.reset();

    }

    filterMarkers( structure, checked ){

        const map = checked ? this.map : null;

        for( let marker of this.markers[structure] ){

            //setMap(null) cache le marqueur
            //setMap(map) affiche le marqueur
            marker.g_marker.setMap( map );
            marker.g_infowindow.close();

        }

    }

}

//J'exporte la classe ( je veux pouvoir l'instancier dans les fichiers exterrieur)
module.exports = App;