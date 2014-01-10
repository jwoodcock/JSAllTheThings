console.log( 'hello', document );
var wait = 1000;

function createHead() {
    // check that the head element is not already there
    if ( !document.head ) {
        console.log( 'create head' );
        var head = document.createElement( 'head' );
        document.appendChild( head );
    } else {
        var head = document.head;
    }
    // for fun, let's set an id on the header
    head.setAttribute( 'id' , 'the_main_head' );
    return true;
}

function createBody() {
    // check to see if we have the body element
    if ( !document.body ) {
        // create body element
        var body = document.createElement( 'body' );
        // add to dom
        document.childNodes[ 0 ].appendChild( body );
    } else {
        var body = document.body;
    }
    // change the id now that we have a body
    body.setAttribute( "id", "the_body" );
}

function createScript( scriptLocation ) {
    // create the script element
    var script = document.createElement('script');
    // set source
    script.src = scriptLocation;
    // add listener for when script is loaded
    script.onload = script.onreadystatechange = function() {
        if ((!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
            console.log( 'loaded' );
        }
    }
    // now append to head
    document.head.appendChild( script );
}

setTimeout(createBody, wait + 200 );
if ( setTimeout( createHead, wait ) ) {
    setTimeout( createScript, wait + 400, 'scripts/body.js' );
}

