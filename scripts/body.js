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
    // 13 create function to move dom elements to inside another
    this.moveElement = function( mover, moveTo ) {
        // get the mover
        var moverObj = document.getElementById( mover );
        // remove mover
        //moverObj.parentNode.removeChild( moverObj );
        // 18 replace the above with the new call
        this.deleteElement( mover ); 
        // append to moveTo target
        document.getElementById( moveTo ).appendChild( moverObj );
    }
    // 17 function to delete dom elements
    this.deleteElement = function( target ) {
        // get element to delete
        var deleteElement = document.getElementById( target );
        if ( deleteElement ) {
            deleteElement.parentNode.removeChild( deleteElement );
        }
    }
    // 22 Create method for setting attribute
    this.setAttr = function( target, attribute, value) {
        document.getElementById( target ).setAttribute( attribute, value );
    }
    // 27 Create template loader and renderor
    this.getTemplate = function( template, options, appendee, requestor ) {
        // make request for template
        var html = requestor.makeRequest( template );
        // replace all the options in the template with their values
        for ( var pos in options ) {
            var tempPatt = new RegExp( '{{' + pos + '}}', 'g' );
            html = html.replace(tempPatt, options[ pos ] );
        }
        // now that we have the updated html we need to get the current html
        // of the appendee and combine then replace
        // show the easy way and explain why it's bad
        var oldHtml = document.getElementById( appendee ).innerHTML;
        document.getElementById( appendee ).innerHTML = oldHtml + html;
        // now that we have all the final html and in the dom
        // let's tigger an event on each input so the model is created
        var items = document.querySelectorAll( '[data-bind-' + options.userId + ']' );
        // create an event so we can populate the model
        var myEvent = document.createEvent('Event');
        // define it to match our listener
        myEvent.initEvent('change', true, true);
        // loop through each input and trigger the event
        for ( var i in items ) {
            var dispatchOn = document.getElementById( items[ i ].id );
            if (dispatchOn) {
                dispatchOn.dispatchEvent( myEvent );
            }
        }
    }
}

// move all this to the controller
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
        body.updateElement( 'WAT', 'src', 'resources/CXpK6Rg.jpg' );
        // 14 now let's move the image to inside the link
        body.moveElement( 'WAT', 'my_link' );
        // 16 let's delete it here so you can see it created then deleted
        body.deleteElement( 'delete_header' );
    }, getWait() );
    // 11 now let's center it
    body.updateElement( 'first_div', [ 'style', 'textAlign' ], 'center' );
    // 12 create link element with properties
    body.createElement( 'a', 'my_link', 'first_div' );
    body.updateElement( 'my_link', 'target', '_blank' );
    body.updateElement( 'my_link', 'href', 'http://pytennessee.org' );
    // 15 let's create some things to delete
    body.createElement( 'div', 'second_div', '');
    body.updateElement( 'second_div', [ 'style', 'border' ], '1px solid' );
    body.updateElement( 'second_div', [ 'style', 'padding' ], '10px' );
    body.createElement( 'h2', 'delete_header', 'second_div');
    body.updateElement( 'delete_header', 'innerHTML', 'Just something to delete' );
    // 16 setup an element to highlight actions later
    body.createElement( 'div', 'highlight', '');
    body.updateElement( 'highlight', [ 'style', 'position' ], 'absolute' );
    body.updateElement( 'highlight', [ 'style', 'top' ], '0px' );
    body.updateElement( 'highlight', [ 'style', 'right' ], '0px' );
    body.updateElement( 'highlight', [ 'style', 'background' ], '#cccccc' );
    body.updateElement( 'highlight', [ 'style', 'padding' ], '10px' );
    // 17 Do Listeners
    // 18 Delete all elements
    setTimeout( function() {
        var toDelete =  [
            'first_header',
            'first_div',
            'WAT',
            'my_link',
            'second_div',
            'highlight',
        ];
        // loop through and delete all elements
        for ( item in toDelete ) {
            body.deleteElement( toDelete[ item ] );
        }
        // 19 now to remove the listener
        // we do this to make sure all listeners are gone
        document.body.removeEventListener( 'mouseover', function() { console.log('removed listener'); }, false );
        document.body.removeEventListener( 'mouseout', function() { console.log('removed listener'); }, false );
    }, getWait() + 200 );
    // 23 Create input
    body.createElement( 'input', 'user_name', '');
    body.setAttr( 'user_name', 'data-bind-user1', 'name' );
    // 24 create user model
    // going to attach it to the document in the case we need it else where
    userModel = new user( 'user1' );
    // 25 Now that we showed it works, let's move the name into 
    // a user holding div and create a few more properties
    body.createElement( 'div', 'user_holder', '');
    body.updateElement( 'user_holder', [ 'style', 'padding' ], '10px' );
    // create header for users
    body.createElement( 'h2', 'user_header', 'user_holder');
    body.updateElement( 'user_header', 'innerHTML', 'User Record' );
    // move our first input into div holder
    body.moveElement( 'user_name', 'user_holder' );
    // create input for phone number
    body.createElement( 'input', 'user_phone', 'user_holder');
    body.setAttr( 'user_phone', 'data-bind-user1', 'phone' );
    // 26 explain this takes a while and we can do better
    // so let's setup a templating method to body
    // build options
    setTimeout( function() {
        // create the requestor
        // we do it here as part of DI, makes it easier to test
        var requestor = new ajax();
        // create the new user model
        //var userModel2 = new user( 'user2' );
        // define what options and values are for inside the template
        var templateOptions = {
            'userId': 'user2',
            'name': 'Jacques',
            'phone': '615-293-0328',
        }
        // make request to add the tempalte
        body.getTemplate(
            'templates/user.html',
            templateOptions,
            'user_holder',
            requestor,
            userModel2
        );
    setTimeout( function() {
        // create the requestor
        // we do it here as part of DI, makes it easier to test
        var requestor = new ajax();
        // create the new user model
        userModel3 = new user( 'user3' );
        // define what options and values are for inside the template
        var templateOptions = {
            'userId': 'user3',
            'name': 'Angela',
            'phone': '615-293-0248',
        }
        // make request to add the tempalte
        body.getTemplate(
            'templates/user.html',
            templateOptions,
            'user_holder',
            requestor,
            userModel3
        );
    }, getWait() + 200 );
    }, getWait() + 200 );


}, getWait() );
