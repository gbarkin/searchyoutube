const Youtube_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_WATCH_URL = "https://www.youtube.com/watch?v=";


function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: Youtube_SEARCH_URL,
    data: {
      'maxResults': '5',
      'part': 'snippet',
      'key': 'AIzaSyABkh-9aed8ARl7i57TSLwn0CUYu7fvfi4',
      'q': `${searchTerm}`,
      'type': 'video'
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}



function displayGitHubSearchData(data) {
  
  const displayVids = $('.js-results')
  
  data.items.forEach(function(item) {
    let elem = $('.js-result-template').children().clone();
    let watchUrl = YOUTUBE_WATCH_URL + item.id.videoId;
    let imageUrl = item.snippet.thumbnails.default.url;
    elem.find('a').attr('href', watchUrl);
    elem.find('img').attr('src', imageUrl);
    displayVids.append(elem);
    // console.log(elem, watchUrl, imageUrl);
  });
  
}
  

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    $('.js-results').html('');
    getDataFromApi(query, displayGitHubSearchData);
  });
}
$(document).ready(function () {
$(watchSubmit);
});
