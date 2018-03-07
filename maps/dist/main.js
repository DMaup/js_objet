(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./Marker":2}],2:[function(require,module,exports){
class Marker {

    constructor( map, position, title, description, structure ){

        this.structure = structure;

        this.g_marker = null;
        this.g_infowindow = null;

        this.createG_marker( map, position, title );
        this.createG_infowindow( title, description );
        this.linkMarkerWindow();
 
    }

    createG_marker( map, position, title ){

        this.g_marker = new google.maps.Marker({
            position: position,
            title: title,
            map: map
        });

    }

    createG_infowindow( title, description ){

        let content = "<h3>" + this.structure + " " + title + "</h3>";
            content += "<p>" + description + "</p>";

        this.g_infowindow = new google.maps.InfoWindow({
            content: content
        });

    }

    linkMarkerWindow(){
        
        this.g_marker.addListener("click", () => {
            this.g_infowindow.open( this.g_marker.getMap(), this.g_marker  );
        });

    }

}

module.exports = Marker;
},{}],3:[function(require,module,exports){
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
},{"./class/App":1,"google-maps":4}],4:[function(require,module,exports){
(function(root, factory) {

	if (root === null) {
		throw new Error('Google-maps package can be used only in browser');
	}

	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.GoogleMapsLoader = factory();
	}

})(typeof window !== 'undefined' ? window : null, function() {


	'use strict';


	var googleVersion = '3.18';

	var script = null;

	var google = null;

	var loading = false;

	var callbacks = [];

	var onLoadEvents = [];

	var originalCreateLoaderMethod = null;


	var GoogleMapsLoader = {};


	GoogleMapsLoader.URL = 'https://maps.googleapis.com/maps/api/js';

	GoogleMapsLoader.KEY = null;

	GoogleMapsLoader.LIBRARIES = [];

	GoogleMapsLoader.CLIENT = null;

	GoogleMapsLoader.CHANNEL = null;

	GoogleMapsLoader.LANGUAGE = null;

	GoogleMapsLoader.REGION = null;

	GoogleMapsLoader.VERSION = googleVersion;

	GoogleMapsLoader.WINDOW_CALLBACK_NAME = '__google_maps_api_provider_initializator__';


	GoogleMapsLoader._googleMockApiObject = {};


	GoogleMapsLoader.load = function(fn) {
		if (google === null) {
			if (loading === true) {
				if (fn) {
					callbacks.push(fn);
				}
			} else {
				loading = true;

				window[GoogleMapsLoader.WINDOW_CALLBACK_NAME] = function() {
					ready(fn);
				};

				GoogleMapsLoader.createLoader();
			}
		} else if (fn) {
			fn(google);
		}
	};


	GoogleMapsLoader.createLoader = function() {
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = GoogleMapsLoader.createUrl();

		document.body.appendChild(script);
	};


	GoogleMapsLoader.isLoaded = function() {
		return google !== null;
	};


	GoogleMapsLoader.createUrl = function() {
		var url = GoogleMapsLoader.URL;

		url += '?callback=' + GoogleMapsLoader.WINDOW_CALLBACK_NAME;

		if (GoogleMapsLoader.KEY) {
			url += '&key=' + GoogleMapsLoader.KEY;
		}

		if (GoogleMapsLoader.LIBRARIES.length > 0) {
			url += '&libraries=' + GoogleMapsLoader.LIBRARIES.join(',');
		}

		if (GoogleMapsLoader.CLIENT) {
			url += '&client=' + GoogleMapsLoader.CLIENT + '&v=' + GoogleMapsLoader.VERSION;
		}

		if (GoogleMapsLoader.CHANNEL) {
			url += '&channel=' + GoogleMapsLoader.CHANNEL;
		}

		if (GoogleMapsLoader.LANGUAGE) {
			url += '&language=' + GoogleMapsLoader.LANGUAGE;
		}

		if (GoogleMapsLoader.REGION) {
			url += '&region=' + GoogleMapsLoader.REGION;
		}

		return url;
	};


	GoogleMapsLoader.release = function(fn) {
		var release = function() {
			GoogleMapsLoader.KEY = null;
			GoogleMapsLoader.LIBRARIES = [];
			GoogleMapsLoader.CLIENT = null;
			GoogleMapsLoader.CHANNEL = null;
			GoogleMapsLoader.LANGUAGE = null;
			GoogleMapsLoader.REGION = null;
			GoogleMapsLoader.VERSION = googleVersion;

			google = null;
			loading = false;
			callbacks = [];
			onLoadEvents = [];

			if (typeof window.google !== 'undefined') {
				delete window.google;
			}

			if (typeof window[GoogleMapsLoader.WINDOW_CALLBACK_NAME] !== 'undefined') {
				delete window[GoogleMapsLoader.WINDOW_CALLBACK_NAME];
			}

			if (originalCreateLoaderMethod !== null) {
				GoogleMapsLoader.createLoader = originalCreateLoaderMethod;
				originalCreateLoaderMethod = null;
			}

			if (script !== null) {
				script.parentElement.removeChild(script);
				script = null;
			}

			if (fn) {
				fn();
			}
		};

		if (loading) {
			GoogleMapsLoader.load(function() {
				release();
			});
		} else {
			release();
		}
	};


	GoogleMapsLoader.onLoad = function(fn) {
		onLoadEvents.push(fn);
	};


	GoogleMapsLoader.makeMock = function() {
		originalCreateLoaderMethod = GoogleMapsLoader.createLoader;

		GoogleMapsLoader.createLoader = function() {
			window.google = GoogleMapsLoader._googleMockApiObject;
			window[GoogleMapsLoader.WINDOW_CALLBACK_NAME]();
		};
	};


	var ready = function(fn) {
		var i;

		loading = false;

		if (google === null) {
			google = window.google;
		}

		for (i = 0; i < onLoadEvents.length; i++) {
			onLoadEvents[i](google);
		}

		if (fn) {
			fn(google);
		}

		for (i = 0; i < callbacks.length; i++) {
			callbacks[i](google);
		}

		callbacks = [];
	};


	return GoogleMapsLoader;

});

},{}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxfX05FIFBBUyBTVVBQUklNRVIgLSBTQVVWRUdBUkRFXFxVd0FtcFxcd3d3XFxfX1BSUV9XRUJfX1xcSlNfT2JqZXRcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkQ6L19fTkUgUEFTIFNVUFBSSU1FUiAtIFNBVVZFR0FSREUvVXdBbXAvd3d3L19fUFJRX1dFQl9fL0pTX09iamV0L21hcHMvanMvY2xhc3MvQXBwLmpzIiwiRDovX19ORSBQQVMgU1VQUFJJTUVSIC0gU0FVVkVHQVJERS9Vd0FtcC93d3cvX19QUlFfV0VCX18vSlNfT2JqZXQvbWFwcy9qcy9jbGFzcy9NYXJrZXIuanMiLCJEOi9fX05FIFBBUyBTVVBQUklNRVIgLSBTQVVWRUdBUkRFL1V3QW1wL3d3dy9fX1BSUV9XRUJfXy9KU19PYmpldC9tYXBzL2pzL21haW4uanMiLCJEOi9fX05FIFBBUyBTVVBQUklNRVIgLSBTQVVWRUdBUkRFL1V3QW1wL3d3dy9fX1BSUV9XRUJfXy9KU19PYmpldC9ub2RlX21vZHVsZXMvZ29vZ2xlLW1hcHMvbGliL0dvb2dsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgTWFya2VyID0gcmVxdWlyZShcIi4vTWFya2VyXCIpO1xyXG5cclxuY2xhc3MgQXBwIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG5cclxuICAgICAgICB0aGlzLiRmb3JtICAgICAgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybS1tYXBcIik7XHJcbiAgICAgICAgdGhpcy4kbGFiZWwgICAgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhYmVsXCIpO1xyXG4gICAgICAgIHRoaXMuJGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNjcmlwdGlvblwiKTtcclxuICAgICAgICB0aGlzLiRsYXRpdHVkZSAgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGF0aXR1ZGVcIik7XHJcbiAgICAgICAgdGhpcy4kbG9uZ2l0dWRlICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvbmdpdHVkZVwiKTtcclxuXHJcbiAgICAgICAgdGhpcy4kZmlsdGVycyAgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbdHlwZT0nY2hlY2tib3gnXVwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHtcclxuICAgICAgICAgICAgbGF0OiAwLFxyXG4gICAgICAgICAgICBsbmc6IDBcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMubWFwID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5hcHBNYXJrZXIgPSBudWxsO1xyXG5cclxuICAgICAgICAvL21hcmtlciBsaXN0XHJcbiAgICAgICAgdGhpcy5tYXJrZXJzID0ge1xyXG4gICAgICAgICAgICBob3RlbDogW10sXHJcbiAgICAgICAgICAgIHJlc3RhdXJhbnQ6IFtdLFxyXG4gICAgICAgICAgICBiYXI6IFtdXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdE1hcCggaWRFbGVtZW50ICl7XHJcblxyXG4gICAgICAgIHRoaXMubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggaWRFbGVtZW50ICksIHtcclxuICAgICAgICAgICAgY2VudGVyOiB7XHJcbiAgICAgICAgICAgICAgICBsYXQ6IHRoaXMucG9zaXRpb24ubGF0LCBcclxuICAgICAgICAgICAgICAgIGxuZzogdGhpcy5wb3NpdGlvbi5sbmdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgem9vbTogMThcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2V0UG9zaXRpb24oIGxhdCwgbG5nICl7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5sYXQgPSBsYXQ7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5sbmcgPSBsbmc7XHJcblxyXG4gICAgICAgIHRoaXMuY2VudGVyT25BcHBQb3NpdGlvbigpO1xyXG4gICAgICAgIHRoaXMuc2V0QXBwTWFya2VyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2VudGVyT25BcHBQb3NpdGlvbigpe1xyXG4gICAgICAgIHRoaXMubWFwLnNldENlbnRlcih7XHJcbiAgICAgICAgICAgIGxhdDogdGhpcy5wb3NpdGlvbi5sYXQsXHJcbiAgICAgICAgICAgIGxuZzogdGhpcy5wb3NpdGlvbi5sbmdcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRBcHBNYXJrZXIoKXtcclxuXHJcbiAgICAgICAgY29uc3QgaW5mb3dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KHtcclxuICAgICAgICAgICAgY29udGVudDogXCI8aDM+IFZvdXMgw6p0ZXMgaWNpICEgPC9oMz5cIlxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmFwcE1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5wb3NpdGlvbixcclxuICAgICAgICAgICAgbWFwOiB0aGlzLm1hcCxcclxuICAgICAgICAgICAgdGl0bGU6IFwiTWEgcG9zaXRpb25cIlxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL1N5bnRheGUgRVM2ICgyMDE1KSBwb3VyIG5lIHBhcyBwZXJkcmUgbGUgY29udGV4dGVcclxuXHJcbiAgICAgICAgLy9mdW5jdGlvbigpe31cclxuICAgICAgICAvLyAoKSA9PiB7ICB9XHJcblxyXG4gICAgICAgIC8vZnVuY3Rpb24oIGEsIGIgKXsgIH1cclxuICAgICAgICAvLyAoYSwgYikgPT4geyAgfVxyXG5cclxuICAgICAgICB0aGlzLmFwcE1hcmtlci5hZGRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaW5mb3dpbmRvdy5vcGVuKCB0aGlzLm1hcCwgdGhpcy5hcHBNYXJrZXIgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYWRkTWFya2VyKCl7XHJcblxyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0ge1xyXG4gICAgICAgICAgICBsYXQ6IHBhcnNlRmxvYXQoIHRoaXMuJGxhdGl0dWRlLnZhbHVlICksXHJcbiAgICAgICAgICAgIGxuZzogcGFyc2VGbG9hdCggdGhpcy4kbG9uZ2l0dWRlLnZhbHVlIClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBtYXJrZXIgPSBuZXcgTWFya2VyKFxyXG4gICAgICAgICAgICB0aGlzLm1hcCxcclxuICAgICAgICAgICAgcG9zaXRpb24sXHJcbiAgICAgICAgICAgIHRoaXMuJGxhYmVsLnZhbHVlLFxyXG4gICAgICAgICAgICB0aGlzLiRkZXNjcmlwdGlvbi52YWx1ZSxcclxuICAgICAgICAgICAgdGhpcy4kZm9ybS5lbGVtZW50c1tcInN0cnVjdHVyZVwiXS52YWx1ZVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vT24gcHVzaCBkYW5zIGxhIGNhdGVnb3JpZSBjb3JyZXNwb25kYW50ZVxyXG4gICAgICAgIHRoaXMubWFya2Vyc1sgbWFya2VyLnN0cnVjdHVyZSBdLnB1c2goIG1hcmtlciApO1xyXG5cclxuICAgICAgICAvL1ZpZGVyIGxlIGZvcm11bGFpcmVcclxuICAgICAgICB0aGlzLmNsZWFyRm9ybSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjbGVhckZvcm0oKXtcclxuXHJcbiAgICAgICAgdGhpcy4kZm9ybS5yZXNldCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmaWx0ZXJNYXJrZXJzKCBzdHJ1Y3R1cmUsIGNoZWNrZWQgKXtcclxuXHJcbiAgICAgICAgY29uc3QgbWFwID0gY2hlY2tlZCA/IHRoaXMubWFwIDogbnVsbDtcclxuXHJcbiAgICAgICAgZm9yKCBsZXQgbWFya2VyIG9mIHRoaXMubWFya2Vyc1tzdHJ1Y3R1cmVdICl7XHJcblxyXG4gICAgICAgICAgICAvL3NldE1hcChudWxsKSBjYWNoZSBsZSBtYXJxdWV1clxyXG4gICAgICAgICAgICAvL3NldE1hcChtYXApIGFmZmljaGUgbGUgbWFycXVldXJcclxuICAgICAgICAgICAgbWFya2VyLmdfbWFya2VyLnNldE1hcCggbWFwICk7XHJcbiAgICAgICAgICAgIG1hcmtlci5nX2luZm93aW5kb3cuY2xvc2UoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8vSidleHBvcnRlIGxhIGNsYXNzZSAoIGplIHZldXggcG91dm9pciBsJ2luc3RhbmNpZXIgZGFucyBsZXMgZmljaGllcnMgZXh0ZXJyaWV1cilcclxubW9kdWxlLmV4cG9ydHMgPSBBcHA7IiwiY2xhc3MgTWFya2VyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggbWFwLCBwb3NpdGlvbiwgdGl0bGUsIGRlc2NyaXB0aW9uLCBzdHJ1Y3R1cmUgKXtcclxuXHJcbiAgICAgICAgdGhpcy5zdHJ1Y3R1cmUgPSBzdHJ1Y3R1cmU7XHJcblxyXG4gICAgICAgIHRoaXMuZ19tYXJrZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZ19pbmZvd2luZG93ID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5jcmVhdGVHX21hcmtlciggbWFwLCBwb3NpdGlvbiwgdGl0bGUgKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUdfaW5mb3dpbmRvdyggdGl0bGUsIGRlc2NyaXB0aW9uICk7XHJcbiAgICAgICAgdGhpcy5saW5rTWFya2VyV2luZG93KCk7XHJcbiBcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVHX21hcmtlciggbWFwLCBwb3NpdGlvbiwgdGl0bGUgKXtcclxuXHJcbiAgICAgICAgdGhpcy5nX21hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgbWFwOiBtYXBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlR19pbmZvd2luZG93KCB0aXRsZSwgZGVzY3JpcHRpb24gKXtcclxuXHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBcIjxoMz5cIiArIHRoaXMuc3RydWN0dXJlICsgXCIgXCIgKyB0aXRsZSArIFwiPC9oMz5cIjtcclxuICAgICAgICAgICAgY29udGVudCArPSBcIjxwPlwiICsgZGVzY3JpcHRpb24gKyBcIjwvcD5cIjtcclxuXHJcbiAgICAgICAgdGhpcy5nX2luZm93aW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdyh7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbGlua01hcmtlcldpbmRvdygpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZ19tYXJrZXIuYWRkTGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ19pbmZvd2luZG93Lm9wZW4oIHRoaXMuZ19tYXJrZXIuZ2V0TWFwKCksIHRoaXMuZ19tYXJrZXIgICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNYXJrZXI7IiwiY29uc3QgR29vZ2xlTWFwc0xvYWRlciA9IHJlcXVpcmUoJ2dvb2dsZS1tYXBzJyksXHJcbiAgICBBcHAgPSByZXF1aXJlKFwiLi9jbGFzcy9BcHBcIik7XHJcblxyXG5Hb29nbGVNYXBzTG9hZGVyLktFWSA9IFwiQUl6YVN5REJMcjhJak1mTzJZM3NSWktRR1hHeHBzTFU4dVAtOTBjXCI7XHJcbkdvb2dsZU1hcHNMb2FkZXIubG9hZChmdW5jdGlvbigpIHtcclxuXHJcbiAgICBjb25zdCBhcHAgPSBuZXcgQXBwKCk7XHJcbiAgICBhcHAuaW5pdE1hcCggXCJtYXBcIiApO1xyXG5cclxuICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oIFxyXG4gICAgICAgIGZ1bmN0aW9uKCBwb3NpdGlvbiApeyAvL3N1Y2Nlc3NcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGFwcC5zZXRQb3NpdGlvbihcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGVcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmdW5jdGlvbiggZXJyb3IgKXsgLy9lcnJvclxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgYXBwLnNldFBvc2l0aW9uKCBcclxuICAgICAgICAgICAgICAgIDQyLjY5OTE1NTksIFxyXG4gICAgICAgICAgICAgICAgMi44MzQ0NjE1IFxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIGFwcC4kZm9ybS5vbnN1Ym1pdCA9IGZ1bmN0aW9uKCBldmVudCApe1xyXG5cclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBhcHAuYWRkTWFya2VyKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFwcC5tYXAuYWRkTGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCl7XHJcblxyXG4gICAgICAgIGFwcC4kbGF0aXR1ZGUudmFsdWUgPSBldmVudC5sYXRMbmcubGF0KCk7XHJcbiAgICAgICAgYXBwLiRsb25naXR1ZGUudmFsdWUgPSBldmVudC5sYXRMbmcubG5nKCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgZm9yKCBsZXQgJGZpbHRlciBvZiBhcHAuJGZpbHRlcnMgKSB7XHJcblxyXG4gICAgICAgICRmaWx0ZXIub25jbGljayA9IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdHJ1Y3R1cmUgPSAkZmlsdGVyLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBjaGVja2VkID0gJGZpbHRlci5jaGVja2VkO1xyXG4gICAgICAgICAgICBhcHAuZmlsdGVyTWFya2Vycyggc3RydWN0dXJlLCBjaGVja2VkICApO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSk7IiwiKGZ1bmN0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblxuXHRpZiAocm9vdCA9PT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignR29vZ2xlLW1hcHMgcGFja2FnZSBjYW4gYmUgdXNlZCBvbmx5IGluIGJyb3dzZXInKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoZmFjdG9yeSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdH0gZWxzZSB7XG5cdFx0cm9vdC5Hb29nbGVNYXBzTG9hZGVyID0gZmFjdG9yeSgpO1xuXHR9XG5cbn0pKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogbnVsbCwgZnVuY3Rpb24oKSB7XG5cblxuXHQndXNlIHN0cmljdCc7XG5cblxuXHR2YXIgZ29vZ2xlVmVyc2lvbiA9ICczLjE4JztcblxuXHR2YXIgc2NyaXB0ID0gbnVsbDtcblxuXHR2YXIgZ29vZ2xlID0gbnVsbDtcblxuXHR2YXIgbG9hZGluZyA9IGZhbHNlO1xuXG5cdHZhciBjYWxsYmFja3MgPSBbXTtcblxuXHR2YXIgb25Mb2FkRXZlbnRzID0gW107XG5cblx0dmFyIG9yaWdpbmFsQ3JlYXRlTG9hZGVyTWV0aG9kID0gbnVsbDtcblxuXG5cdHZhciBHb29nbGVNYXBzTG9hZGVyID0ge307XG5cblxuXHRHb29nbGVNYXBzTG9hZGVyLlVSTCA9ICdodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvanMnO1xuXG5cdEdvb2dsZU1hcHNMb2FkZXIuS0VZID0gbnVsbDtcblxuXHRHb29nbGVNYXBzTG9hZGVyLkxJQlJBUklFUyA9IFtdO1xuXG5cdEdvb2dsZU1hcHNMb2FkZXIuQ0xJRU5UID0gbnVsbDtcblxuXHRHb29nbGVNYXBzTG9hZGVyLkNIQU5ORUwgPSBudWxsO1xuXG5cdEdvb2dsZU1hcHNMb2FkZXIuTEFOR1VBR0UgPSBudWxsO1xuXG5cdEdvb2dsZU1hcHNMb2FkZXIuUkVHSU9OID0gbnVsbDtcblxuXHRHb29nbGVNYXBzTG9hZGVyLlZFUlNJT04gPSBnb29nbGVWZXJzaW9uO1xuXG5cdEdvb2dsZU1hcHNMb2FkZXIuV0lORE9XX0NBTExCQUNLX05BTUUgPSAnX19nb29nbGVfbWFwc19hcGlfcHJvdmlkZXJfaW5pdGlhbGl6YXRvcl9fJztcblxuXG5cdEdvb2dsZU1hcHNMb2FkZXIuX2dvb2dsZU1vY2tBcGlPYmplY3QgPSB7fTtcblxuXG5cdEdvb2dsZU1hcHNMb2FkZXIubG9hZCA9IGZ1bmN0aW9uKGZuKSB7XG5cdFx0aWYgKGdvb2dsZSA9PT0gbnVsbCkge1xuXHRcdFx0aWYgKGxvYWRpbmcgPT09IHRydWUpIHtcblx0XHRcdFx0aWYgKGZuKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goZm4pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsb2FkaW5nID0gdHJ1ZTtcblxuXHRcdFx0XHR3aW5kb3dbR29vZ2xlTWFwc0xvYWRlci5XSU5ET1dfQ0FMTEJBQ0tfTkFNRV0gPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRyZWFkeShmbik7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0R29vZ2xlTWFwc0xvYWRlci5jcmVhdGVMb2FkZXIoKTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKGZuKSB7XG5cdFx0XHRmbihnb29nbGUpO1xuXHRcdH1cblx0fTtcblxuXG5cdEdvb2dsZU1hcHNMb2FkZXIuY3JlYXRlTG9hZGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cdFx0c2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0Jztcblx0XHRzY3JpcHQuc3JjID0gR29vZ2xlTWFwc0xvYWRlci5jcmVhdGVVcmwoKTtcblxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcblx0fTtcblxuXG5cdEdvb2dsZU1hcHNMb2FkZXIuaXNMb2FkZWQgPSBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gZ29vZ2xlICE9PSBudWxsO1xuXHR9O1xuXG5cblx0R29vZ2xlTWFwc0xvYWRlci5jcmVhdGVVcmwgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgdXJsID0gR29vZ2xlTWFwc0xvYWRlci5VUkw7XG5cblx0XHR1cmwgKz0gJz9jYWxsYmFjaz0nICsgR29vZ2xlTWFwc0xvYWRlci5XSU5ET1dfQ0FMTEJBQ0tfTkFNRTtcblxuXHRcdGlmIChHb29nbGVNYXBzTG9hZGVyLktFWSkge1xuXHRcdFx0dXJsICs9ICcma2V5PScgKyBHb29nbGVNYXBzTG9hZGVyLktFWTtcblx0XHR9XG5cblx0XHRpZiAoR29vZ2xlTWFwc0xvYWRlci5MSUJSQVJJRVMubGVuZ3RoID4gMCkge1xuXHRcdFx0dXJsICs9ICcmbGlicmFyaWVzPScgKyBHb29nbGVNYXBzTG9hZGVyLkxJQlJBUklFUy5qb2luKCcsJyk7XG5cdFx0fVxuXG5cdFx0aWYgKEdvb2dsZU1hcHNMb2FkZXIuQ0xJRU5UKSB7XG5cdFx0XHR1cmwgKz0gJyZjbGllbnQ9JyArIEdvb2dsZU1hcHNMb2FkZXIuQ0xJRU5UICsgJyZ2PScgKyBHb29nbGVNYXBzTG9hZGVyLlZFUlNJT047XG5cdFx0fVxuXG5cdFx0aWYgKEdvb2dsZU1hcHNMb2FkZXIuQ0hBTk5FTCkge1xuXHRcdFx0dXJsICs9ICcmY2hhbm5lbD0nICsgR29vZ2xlTWFwc0xvYWRlci5DSEFOTkVMO1xuXHRcdH1cblxuXHRcdGlmIChHb29nbGVNYXBzTG9hZGVyLkxBTkdVQUdFKSB7XG5cdFx0XHR1cmwgKz0gJyZsYW5ndWFnZT0nICsgR29vZ2xlTWFwc0xvYWRlci5MQU5HVUFHRTtcblx0XHR9XG5cblx0XHRpZiAoR29vZ2xlTWFwc0xvYWRlci5SRUdJT04pIHtcblx0XHRcdHVybCArPSAnJnJlZ2lvbj0nICsgR29vZ2xlTWFwc0xvYWRlci5SRUdJT047XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHVybDtcblx0fTtcblxuXG5cdEdvb2dsZU1hcHNMb2FkZXIucmVsZWFzZSA9IGZ1bmN0aW9uKGZuKSB7XG5cdFx0dmFyIHJlbGVhc2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdEdvb2dsZU1hcHNMb2FkZXIuS0VZID0gbnVsbDtcblx0XHRcdEdvb2dsZU1hcHNMb2FkZXIuTElCUkFSSUVTID0gW107XG5cdFx0XHRHb29nbGVNYXBzTG9hZGVyLkNMSUVOVCA9IG51bGw7XG5cdFx0XHRHb29nbGVNYXBzTG9hZGVyLkNIQU5ORUwgPSBudWxsO1xuXHRcdFx0R29vZ2xlTWFwc0xvYWRlci5MQU5HVUFHRSA9IG51bGw7XG5cdFx0XHRHb29nbGVNYXBzTG9hZGVyLlJFR0lPTiA9IG51bGw7XG5cdFx0XHRHb29nbGVNYXBzTG9hZGVyLlZFUlNJT04gPSBnb29nbGVWZXJzaW9uO1xuXG5cdFx0XHRnb29nbGUgPSBudWxsO1xuXHRcdFx0bG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0Y2FsbGJhY2tzID0gW107XG5cdFx0XHRvbkxvYWRFdmVudHMgPSBbXTtcblxuXHRcdFx0aWYgKHR5cGVvZiB3aW5kb3cuZ29vZ2xlICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRkZWxldGUgd2luZG93Lmdvb2dsZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHR5cGVvZiB3aW5kb3dbR29vZ2xlTWFwc0xvYWRlci5XSU5ET1dfQ0FMTEJBQ0tfTkFNRV0gIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdGRlbGV0ZSB3aW5kb3dbR29vZ2xlTWFwc0xvYWRlci5XSU5ET1dfQ0FMTEJBQ0tfTkFNRV07XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvcmlnaW5hbENyZWF0ZUxvYWRlck1ldGhvZCAhPT0gbnVsbCkge1xuXHRcdFx0XHRHb29nbGVNYXBzTG9hZGVyLmNyZWF0ZUxvYWRlciA9IG9yaWdpbmFsQ3JlYXRlTG9hZGVyTWV0aG9kO1xuXHRcdFx0XHRvcmlnaW5hbENyZWF0ZUxvYWRlck1ldGhvZCA9IG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzY3JpcHQgIT09IG51bGwpIHtcblx0XHRcdFx0c2NyaXB0LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcblx0XHRcdFx0c2NyaXB0ID0gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGZuKSB7XG5cdFx0XHRcdGZuKCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGlmIChsb2FkaW5nKSB7XG5cdFx0XHRHb29nbGVNYXBzTG9hZGVyLmxvYWQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJlbGVhc2UoKTtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZWxlYXNlKCk7XG5cdFx0fVxuXHR9O1xuXG5cblx0R29vZ2xlTWFwc0xvYWRlci5vbkxvYWQgPSBmdW5jdGlvbihmbikge1xuXHRcdG9uTG9hZEV2ZW50cy5wdXNoKGZuKTtcblx0fTtcblxuXG5cdEdvb2dsZU1hcHNMb2FkZXIubWFrZU1vY2sgPSBmdW5jdGlvbigpIHtcblx0XHRvcmlnaW5hbENyZWF0ZUxvYWRlck1ldGhvZCA9IEdvb2dsZU1hcHNMb2FkZXIuY3JlYXRlTG9hZGVyO1xuXG5cdFx0R29vZ2xlTWFwc0xvYWRlci5jcmVhdGVMb2FkZXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdHdpbmRvdy5nb29nbGUgPSBHb29nbGVNYXBzTG9hZGVyLl9nb29nbGVNb2NrQXBpT2JqZWN0O1xuXHRcdFx0d2luZG93W0dvb2dsZU1hcHNMb2FkZXIuV0lORE9XX0NBTExCQUNLX05BTUVdKCk7XG5cdFx0fTtcblx0fTtcblxuXG5cdHZhciByZWFkeSA9IGZ1bmN0aW9uKGZuKSB7XG5cdFx0dmFyIGk7XG5cblx0XHRsb2FkaW5nID0gZmFsc2U7XG5cblx0XHRpZiAoZ29vZ2xlID09PSBudWxsKSB7XG5cdFx0XHRnb29nbGUgPSB3aW5kb3cuZ29vZ2xlO1xuXHRcdH1cblxuXHRcdGZvciAoaSA9IDA7IGkgPCBvbkxvYWRFdmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdG9uTG9hZEV2ZW50c1tpXShnb29nbGUpO1xuXHRcdH1cblxuXHRcdGlmIChmbikge1xuXHRcdFx0Zm4oZ29vZ2xlKTtcblx0XHR9XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjYWxsYmFja3NbaV0oZ29vZ2xlKTtcblx0XHR9XG5cblx0XHRjYWxsYmFja3MgPSBbXTtcblx0fTtcblxuXG5cdHJldHVybiBHb29nbGVNYXBzTG9hZGVyO1xuXG59KTtcbiJdfQ==
