/**
 * This class controls our bindings between the dom and user model
 * and has our listener for changes between the two
 * 
 * @param {String} objectId Id of the object to bind to
 */
// explain how this class is different that our prior classes
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
    // when instantiating multiple objets these properties don't work
    data_attr = "data-bind-" + objectId,
    message = objectId + ":change",

    // define a proxy method to be called on actual change
    changeHandler = function( evt ) {
        var target = evt.target,
        dataAttr = getAttrFromTarget( evt.target.id ),
        prop_name = target.getAttribute( data_attr ); // should be able to remove

        data_attr = dataAttr[0];
        message = dataAttr[1] + ':change';

        if ( dataAttr && dataAttr !== "" ) {
            pubSub.trigger( dataAttr[1] + ':change', dataAttr[0], target.value );
        }
    };

    // get the target data-bind attribute
    getAttrFromTarget = function( tar ) {
        var attributes = document.getElementById( tar ).attributes;
        for ( var p = 0; p < attributes.length; p++ ) {
            // current attribute
            var curAttr = attributes[ p ].name;
            // build a substring to do check against
            if ( typeof curAttr === 'string' ) {
                var subStr = curAttr.substring( 0, 9 );
                var user = curAttr.substring(10);
                if ( subStr === 'data-bind' ) {
                    return [ attributes[ p ].value, user ];
                }
            }
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
