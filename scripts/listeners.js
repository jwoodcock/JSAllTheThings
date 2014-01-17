/**
 * Document to hold all the evnet listeners
 */

// 1 Add listener to all elements
document.addEventListener( 'mouseover', function( e ) {
    // find out what was hovered
    var tar = e.target;
    // create a new element to act as a tag
    var tag = document.createElement( 'div' );
    // append to target
    tar.appendChild( tag );
    // now let's say what element we are over
    var html = '<h3 style="color: read;">' + tar.id + '</h3>';
    // update hightlight box
    document.getElementById( 'highlight' ).innerHTML = html;
    // now let's add a listener to see when we leave the div
    tar.addEventListener( 'mouseout', function( e) {
        document.getElementById( 'highlight' ).innerHTML = '';
    });
});

// define what we need to observe
var observerObj = document.body;

// setup an observer
var observer = new MutationObserver( function( mutations ) {
    mutations.forEach( function( mutation ) {
        console.log( mutation );
        console.log( document.body.innerHTML );
    });
});

// define configuration for observer
var observerConfig = {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
};

// connection observer to observee
observer.observe( observerObj, observerConfig );

