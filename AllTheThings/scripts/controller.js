// 1 starting
//console.log( 'hello', document );
//var wait = 1000; // timer so we can watch the dom change in the console.

// 2 create head elements
//function createHead() {
    // check that the head element is not already there
    //if ( !document.head ) {
        //console.log( 'create head' );
        //var head = document.createElement( 'head' );
        //document.appendChild( head );
    //} else {
        //var head = document.head;
    //}
    // for fun, let's set an id on the header
    //head.setAttribute( 'id' , 'the_main_head' );
    //return true;
//}

// 4 create head elements
//function createBody() {
    // check to see if we have the body element
    //if ( !document.body ) {
        // create body element
        //var body = document.createElement( 'body' );
        // add to dom
        //document.childNodes[ 0 ].appendChild( body );
    //} else {
        //var body = document.body;
    //}
    // change the id now that we have a body
    //body.setAttribute( "id", "the_body" );
//}

// 6
//function createScript( scriptLocation ) {
    // create the script element
    //var script = document.createElement('script');
    // set source
    //script.src = scriptLocation;
    // 8 add listener after showing append
    // add listener for when script is loaded
    //script.onload = script.onreadystatechange = function() {
        // check the state to see if script is loaded
        //if ((!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
            // 9 first do console then add this
            // now that the script is loaded, let's load the rest in one function
            // define scripts to load
            //var scripts = [
                //"scripts/body_controller.js",
                //"scripts/listeners.js",
                //"scripts/ajax.js",
                //"scripts/bindings.js",
                //"scripts/hoppy_people.js",
            //];
            // call function to load scripts
            //loadScripts( scripts, 0 );
        //}
    //}
    // now append to head
    //document.head.appendChild( script );
//}

// 10 write this out
//function loadScripts(scripts, position) {
    //console.log('scripts', scripts);
    // create the script element
    //var script = document.createElement('script');
    // set source
    //script.src = scripts[position];
    // add listener for when script is loaded
    //script.onload = script.onreadystatechange = function() {
        // check the state to see if script is loaded
        //if ((!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
            // increment position
            //position++;
            // on success check to see if we are at the end of the scripts to load
            //if (scripts.length === position) {
                //return false;
            //}
            // if not call function to load next script
            //loadScripts( scripts, position );
        //}
    //}
    // now append to head
    //document.head.appendChild( script );
//}

// 11 for future use
// Before showing body, write this
//function getWait() {
    //return wait = wait + 200;
//}

// 5 create body elements
//setTimeout(createBody, wait + 200 );
// 3 outside the if create head
// 7 move into an if statement
//if ( setTimeout( createHead, wait ) ) {
    //setTimeout( createScript, wait + 200, 'scripts/body.js' );
//}
