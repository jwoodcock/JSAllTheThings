// 1
// body.js is here
// 2 write class
function bodyView() {
    // 4 define body tar
    var body = document.body;
    // console out so we can see it got the body
    // and with the id we set on it
    console.log( body );
    // 5 build function for building dom elements
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
    // 7 write function for changing dom
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
}

setTimeout( function() {
    // 3 define object so we can call methods on it
    var body = new bodyView();

    // 6 show creating an element
    body.createElement( 'h1', 'first_header', '');

    // 8 now add some value to the header
    body.updateElement( 'first_header', 'innerHTML', 'gitHub Issues' );

    // 9 create div and set background color
    body.createElement( 'div', 'first_div', '');
    body.updateElement( 'first_div', [ 'style', 'backgroundColor' ], '#CCCCCC' );
    body.updateElement( 'first_div', [ 'style', 'width' ], '500px' );
    body.updateElement( 'first_div', [ 'style', 'height' ], '500px' );
    // 10 create image and attach a source
    body.createElement( 'img', 'WAT', 'first_div');
    setTimeout( function() {
    body.updateElement( 'WAT', 'src', 'http://i.imgur.com/CXpK6Rg.jpg' );
    }, getWait() );
    // 11 now let's center it
    body.updateElement( 'first_div', [ 'style', 'textAlign' ], 'center' );
    // 12 Let's grab the image and put it inside a link
    var ourImage = document.getElementById( 'WAT' );
    body.createElement( 'a', 'my_link', 'first_div' );
    

}, getWait() );
