/**
 * This class is the user data model and is bound to the html elements
 * through our dataBinder class
 * 
 * @param {String} uid User id
 */
function User( uid ) {

    // create an instance of our binder
    var binder = new dataBinder( uid ),

    // now build the actual user with properties
    user = {
        // the list of attributes for the user model
        attributes: {},

        // The attribute setter publish changes using the dataBinder PubSub
        set: function( attr_name, val ) {
            // setter for defining attribute and value
            this.attributes[ attr_name ] = val;
            // Use the publish method to force an update
            binder.trigger( uid + ":change", attr_name, val, this );
        }

        // Getter for returning the attribute
        get: function( attr_name ) {
            return this.attributes[ attr_name ];
        },

        _binder: binder
    };

    // Subscribe to the PubSub for the data update
    binder.on( uid + ":change", function( evt, attr_name, new_val, initiator ) {
        // so if the value being set is not in the user model, set it
        if ( initiator !== user ) {
            user.set( attr_name, new_val );
        }
    });

    return user;
}
