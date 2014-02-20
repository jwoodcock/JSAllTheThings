setTimeout( function() {

    var body = new domManipulator();
    var people = new hoppyPeople( body, 'the_body' );
    var listeners = new listenerHandler();

    body.updateElement( 'the_body', [ 'style', 'padding' ], '0px' );
    body.updateElement( 'the_body', [ 'style', 'margin' ], '0px' );
    body.updateElement(
        'the_body',
        [ 'style', 'backgroundImage' ],
        'url("resources/blue_sky_green_grass-wide.jpg")'
    );

    // create status bar
    body.createElement( 'div', 'status_bar' );
    body.updateElement( 'status_bar', [ 'style', 'background' ], '#cccccc' );
    body.updateElement( 'status_bar', [ 'style', 'padding' ], '5px' );
    body.updateElement( 'status_bar', [ 'style', 'height' ], '50px' );

    // add a title
    body.createElement( 'h4', 'page_header', 'status_bar' );
    body.updateElement( 'page_header', 'innerHTML', 'The hoppy people.' );
    body.updateElement( 'page_header', [ 'style', 'fontFamily' ], '"Ariel"' );
    body.updateElement( 'page_header', [ 'style', 'fontWeight' ], 'lighter' );
    body.updateElement( 'page_header', [ 'style', 'cssFloat' ], 'left' );
    body.updateElement( 'page_header', [ 'style', 'marginRight' ], '40px' );

    // add a button
    body.createElement( 'button', 'add_people', 'status_bar' );
    body.setAttr( 'add_people', 'data-bind-people', 'add' );
    body.updateElement( 'add_people', 'innerHTML', 'Add People' );
    body.updateElement( 'add_people', [ 'style', 'width' ], '100px' );
    body.updateElement( 'add_people', [ 'style', 'height' ], '50px' );
    body.updateElement( 'add_people', [ 'style', 'cssFloat' ], 'left' );
    body.updateElement( 'add_people', [ 'style', 'marginRight' ], '40px' );

    // add a select
    body.createElement( 'select', 'active_person', 'status_bar' );
    body.setAttr( 'active_person', 'data-bind-people', 'active' );
    body.updateElement( 'active_person', [ 'style', 'width' ], '140px' );
    body.updateElement( 'active_person', [ 'style', 'cssFloat' ], 'left' );
    body.updateElement( 'active_person', [ 'style', 'marginRight' ], '20px' );
    body.addOption( 'active_person', 'Select Person' );

    // add a input
    body.createElement( 'input', 'multiplier', 'status_bar' );
    body.setAttr( 'multiplier', 'data-bind-people', 'multiplier' );
    body.updateElement( 'multiplier', [ 'style', 'width' ], '40px' );
    body.updateElement( 'multiplier', [ 'style', 'height' ], '50px' );
    body.updateElement( 'multiplier', [ 'style', 'cssFloat' ], 'left' );
    body.updateElement( 'multiplier', [ 'style', 'marginRight' ], '20px' );

    // add a select
    body.createElement( 'select', 'person_type', 'status_bar' );
    body.setAttr( 'person_type', 'data-bind-people', 'type' );
    body.updateElement( 'person_type', [ 'style', 'cssFloat' ], 'left' );
    body.updateElement( 'person_type', [ 'style', 'marginRight' ], '40px' );
    // add the values
    body.addOption( 'person_type', 'totoro' );
    body.addOption( 'person_type', 'sadam' );
    body.addOption( 'person_type', 'wookie' );

    listeners.create( 'add_people', 'mousedown', function( e ) {
        people.create();
    });

    var match = body.findOne( '#status_bar' );
    console.log( 'match',  match );
    match.style.backgroundColor = 'red';

    var inputs = body.findAll( 'select' );
    for ( var pos in inputs ) {
        if ( inputs[ pos ].style ) {
            inputs[ pos ].style.border = '4px solid yellow';
            console.log( 'input ' + pos, inputs[ pos ] );
        }
    }

}, getWait() + 200 );
