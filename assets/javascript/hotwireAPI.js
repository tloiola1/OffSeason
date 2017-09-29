var startDate = '';
var endDate = '';


$(document).on('click', '#submit-button', hotwireApi);
$(document).on('click', '#submit-button', parseHotwire);

startDate = $('#start-date').val();
endDate = $('#end-date').val();

function hotwireAPI () {
    var hotwireURL = 'http://api.hotwire.com/v1/tripstarter/hotel?apikey=krhcyf9u4tptfayz7zq26r4k&&startdate=' + startDate + '&enddate=' + endDate +
        '&travelseason=low&format=JSON&limit=4'
    var hotwireURL = $.ajax({url: hotwireURL, method: 'GET'})
    hotwireURL.done(init);
};

function init (response) {
    var cities = response.data;
}

function parseHotwire (){

}