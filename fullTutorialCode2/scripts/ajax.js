// ajax.js is here
function ajax() {

    // build request object
    var request = new XMLHttpRequest();
    var requestType = 'GET';

    // create make a request method
    this.makeRequest = function( path ) {
        request.open( requestType, path, false);
        request.send(null);
        return request.responseText;
    }
}
