function domManipulator() {

    var body = document.body;

    this.createElement = function( type, id, tar ) {
        // create element on the body using the traditional method
        var newElement = document.createElement( type );
        // check to see if there is a target and if so append it
        if ( tar ) {
            document.getElementById( tar ).appendChild( newElement );
        } else {
            body.appendChild( newElement );
        }
        // now change the id to desired value
        newElement.setAttribute( 'id', id );
        // return true so conditionals will work
        return true;
    }

    this.updateElement = function( tar, properties, value) {
        // 9 expand method to take array of properties
        if ( typeof properties === 'string') {
            document.getElementById( tar )[properties] = value;
        } else {
            // set target as base for changing property
            var baseTarget = document.getElementById( tar );
            // loop through properties to build path to property to change
            for ( var p = 0; p < properties.length; p++ ) {
                // check to see if we've reached the end, if so
                // that the full path and set value
                if ( p === ( properties.length - 1 )) {
                    // set value
                    baseTarget[ properties [ p ] ] = value;
                } else {
                    // if not keep building path
                    baseTarget = baseTarget[ properties[ p ] ];
                }
            }
        }
    }

    this.moveElement = function( mover, moveTo ) {
        // get the mover
        var moverObj = document.getElementById( mover );
        // remove mover
        this.deleteElement( mover );
        // append to moveTo target
        document.getElementById( moveTo ).appendChild( moverObj );
    }

    this.setAttr = function( target, attribute, value) {
        document.getElementById( target ).setAttribute( attribute, value );
    }

    this.addOption = function( tar, value ) {
        var select = document.getElementById( tar );
        var option = document.createElement( "option" );
        option.text = value;
        select.add(option);
    }

    this.deleteElement = function( target ) {
        // get element to delete
        var deleteElement = document.getElementById( target );
        if ( deleteElement ) {
            deleteElement.parentNode.removeChild( deleteElement );
        }
    }

    this.getTemplate = function( template, options ) {
        var requestor = new ajax();
        // make request for template
        var html = requestor.makeRequest( template );
        // replace all the options in the template with their values
        for ( var pos in options ) {
            var tempPatt = new RegExp( '{{' + pos + '}}', 'g' );
            html = html.replace(tempPatt, options[ pos ] );
        }
        return html;
    }

    this.findOne = function( tar ) {
        var found = document.querySelector( tar );
        if ( found ) {
            return found;
        }
    }

    this.findAll = function( tar ) {
        var found = document.querySelectorAll( tar );
        if ( found ) {
            return found;
        }
    }

}
