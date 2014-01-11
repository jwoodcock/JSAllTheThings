console.log( 'hello', document );
var wait = 1000; // timer so we can watch the dom change in the console.

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
        // check the state to see if script is loaded
        if ((!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
            // now that the script is loaded, let's load the rest in one function
            // define scripts to load
            var scripts = [
                "scripts/listeners.js",
                "scripts/ajax.js",
            ];
            // call function to load scripts
            setTimeout(loadScripts, wait + 400, scripts, 0);
        }
    }
    // now append to head
    document.head.appendChild( script );
}

function loadScripts(scripts, position) {
    // create the script element
    var script = document.createElement('script');
    // set source
    script.src = scripts[position];
    // add listener for when script is loaded
    script.onload = script.onreadystatechange = function() {
        // check the state to see if script is loaded
        if ((!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
            // increment position
            position++;
            // on success check to see if we are at the end of the scripts to load
            if (scripts.length === position) {
                return false;
            }
            // if not call function to load next script
            setTimeout(loadScripts, wait + 400, scripts, position);
        }
    }
    // now append to head
    document.head.appendChild( script );
}

setTimeout(createBody, wait + 200 );
if ( setTimeout( createHead, wait ) ) {
    setTimeout( createScript, wait + 400, 'scripts/body.js' );
}

