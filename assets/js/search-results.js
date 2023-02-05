$(function () {
    // elements
    var searchFormEl = $('#search-form');
    var searchInputEl = $('#search-input');
    var formatEl = $('#format');
    var searchTermEl = $('#search-term');
    var searchResultsEl = $('#search-results');
    var backBtnEl = $('#back-btn');

    // functions
    function init() {
        populateFormValues();
        updateSearchDisplay();
        getSearchResults();
    }

    function getSearchResults() {
        var url = 'https://www.loc.gov';
        var format = formatEl.val();
        var q = searchInputEl.val();

        if(!q) {
            return;
        }

        if (format) {
            url += "/" + format;
        } else {
            url += "/search"
        }

        url += "?q=" + q + "&fo=json";

        fetch(url).then(function (response) {
            return response.json();
        }).then(function (data) {
            renderResults(data);
        })
    }

    function renderResults(data) {
        if(data.results && data.results.length) {
            data.results.forEach(function(result) {
                // build card
                var card = $('<div>');
                card.addClass('card mb-3')
                
                var cardBody = $('<div>')
                cardBody.addClass('card-body');
                card.append(cardBody);

                var cardTitle = $('<h5>')
                cardTitle.text(result.title);
                cardBody.append(cardTitle);

                var date = $('<p>');
                date.addClass('mb-1');
                var dateText = "No date for this entry.";
                if(result.date) {
                    dateText = result.date;
                }
                date.text('Date: ' + dateText);
                cardBody.append(date);

                var subjects = $('<p>');
                subjects.addClass('mb-1');
                var subjectsText = 'No subject for this entry.'
                if(result.subject && result.subject.length){
                    subjectsText = result.subject.join(', ');
                }
                subjects.text('Subjects: ' + subjectsText);
                cardBody.append(subjects);

                var description = $('<p>');
                var descriptionText = 'No description for this entry.';
                if(result.description && result.description.length) {
                    descriptionText = result.description[0];
                }
                description.text('Description: ' + descriptionText);
                cardBody.append(description);

                var link = $('<a>');
                link.addClass('btn btn-primary btn-small');
                link.attr('href', result.url);
                link.attr('target', '_blank');
                link.text('Read More');
                cardBody.append(link);

                searchResultsEl.append(card);
            })
        }
    }

    function updateSearchDisplay() {
        searchTermEl.text(searchInputEl.val());
    }

    function populateFormValues() {
        var url = new URL(window.location);
        var q = url.searchParams.get('q');
        var format = url.searchParams.get('format');


        searchInputEl.val(q);
        formatEl.val(format);
    }

    function handleSearchFormSubmit(event) {
        event.preventDefault();

        searchResultsEl.empty();

        console.log(event.target);
        getSearchResults();
    }

    function handleBackButtonClick(event) {
        event.preventDefault();
        event.stopPropagation();
        
        location.assign('index.html');
    }

    // event listeners
    backBtnEl.on('click', handleBackButtonClick);
    searchFormEl.on('submit', handleSearchFormSubmit);

    // initialize
    init();
});