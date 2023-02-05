$(function(){
    // elements
    var searchFormEl = $('#search-form');
    var searchInputEl = $('#search-input');
    var formatEl = $('#format');

    // functions
    function handleSearchFormSubmit(event){
        event.preventDefault();

        var q = searchInputEl.val();
        var format = formatEl.val();

        if(!q) {
            return;
        }

        window.location.replace("search-results.html?q=" + q + "&format=" + format);
    }

    // event listeners
    searchFormEl.on('submit', handleSearchFormSubmit);
});