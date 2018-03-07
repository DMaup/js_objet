const GoogleMapsLoader = require('google-maps'),
    App = require("./class/App");

GoogleMapsLoader.KEY = "AIzaSyDBLr8IjMfO2Y3sRZKQGXGxpsLU8uP-90c";
GoogleMapsLoader.load(function() {

    const app = new App();
    app.initMap( "map" );

    navigator.geolocation.getCurrentPosition( 
        function( position ){ //success
            
            app.setPosition(
                position.coords.latitude,
                position.coords.longitude
            );

        },
        function( error ){ //error
            
            app.setPosition( 
                42.6991559, 
                2.8344615 
            );

        }
    );

    app.$form.onsubmit = function( event ){

        event.preventDefault();

        app.addMarker();

    }

    app.map.addListener("click", function(event){

        app.$latitude.value = event.latLng.lat();
        app.$longitude.value = event.latLng.lng();

    });

    for( let $filter of app.$filters ) {

        $filter.onclick = function(){

            const structure = $filter.value;
            const checked = $filter.checked;
            app.filterMarkers( structure, checked  );

        }

    }

});