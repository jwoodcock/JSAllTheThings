/**
 * This class controls our bindings between the dom and user model
 * and has our listener for changes between the two
 * 
 * @param {String} objectId Id of the object to bind to
 */
function dataBinder( objectId ) {

    // Create the actual publish and subscription object
    var pubSub = {
        // define an array to hold all the callbacks
        callbacks: {},

        // setup the subscriber method
        on: function( target, callbackFunction ) {
            // check to see if the target already has a callback
            // if not, create one and set it as an object
            if ( !this.callbacks[ target ] ) {
                this.callbacks[ target ] = [];
            }
            this.callbacks[ target ].push( callbackFunction );
        },

        // setup the trigger method, calling the actuall subscribed functions
        trigger: function(target) {
            // check to see if the target already has a callback
            // if not, create one and set it as an object
            if ( !this.callbacks[ target ] ) {
                this.callbacks[ target ] = [];
            }
            // loop through callbacks for the target and fire the functions
            var len = this.callbacks[ target ].length;
            for ( var i = 0; i < len; i++) {
                this.callbacks[ target ][ i ].apply( this, arguments );
            }
        }
    }

    // setup a couple properties we'll need
    data_attr = "data-bind-" + object_id,
    message = object_id + ":change",

    // define a proxy method to be called on actual change
    changeHandler = function( evt ) {
        var target = evt.target,
        prop_name = target.getAttribute( data_attr );

        if ( prop_name && prop_name !== "" ) {
            pubSub.trigger( message, prop_name, target.value );
        }
    };

    // Listen to change events and proxy to PubSub
    if ( document.addEventListener ) {
        document.addEventListener( "change", changeHandler, false );
    }

    // PubSub propagates changes to all bound elements
    pubSub.on( message, function( evt, prop_name, new_val ) {
        var elements = document.querySelectorAll(
            "[" + data_attr + "=" + prop_name + "]"
        ),
        tag_name;

        for ( var i = 0, len = elements.length; i < len; i++ ) {
            tag_name = elements[ i ].tagName.toLowerCase();

            if ( tag_name === "input" || tag_name === "textarea" || tag_name === "select" ) {
                elements[ i ].value = new_val;
            } else {
                elements[ i ].innerHTML = new_val;
            }
        }
    });

    return pubSub;
}
