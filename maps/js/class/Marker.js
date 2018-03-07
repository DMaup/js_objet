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