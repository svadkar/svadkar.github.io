/* http://www.santsys.com/s2blog/a-simple-reddit-feed/
	
	Used to help build this
*/

(function ($) {
  $.redditfeed = function (userOptions, parent) {
 
    if (parent == "") { return; }
    if ($(parent).length < 1) { return; }
 
    var options = {
      sub: 'marijuana',
      feed: 'hot',
      items: 5
    };
 
    $.extend(options, userOptions);
 
    if (options.items > 100) options.items = 100; // max number of items that can be returned
 
    var rUrl = "http://www.reddit.com/r/" + encodeURIComponent(options.sub) + "/" + options.feed + ".json?limit=" + options.limit + "&jsonp=?";
    var html = "";
 
    function postTime(cTime) {
      var now = new Date();
      var elapsed = ((now.getTime() / 1000) - cTime);
      var time = '';
      var days = Math.floor(elapsed / (60 * 60 * 24));
      var hours = Math.floor(elapsed / (60 * 60));
      var min = Math.floor(elapsed / 60);
      var sec = Math.ceil(elapsed);
 
      if (days > 0) { time = days + ' day' + (days > 1 ? 's' : ''); }
      else if (hours > 0) { time = hours + ' hour' + (hours > 1 ? 's' : ''); }
      else if (min > 0) { time = min + ' minute' + (min > 1 ? 's' : ''); }
      else if (sec > 0) { time = sec + ' second' + (sec > 1 ? 's' : ''); }
 
      return time;
    }
 
    // add title
    html = '<h1><a href="http://www.reddit.com/r/' + encodeURIComponent(options.sub) + '">' + options.sub + '</a></h1>';
 
    $.getJSON(rUrl, function (rawData) {
      $.each(
      rawData.data.children.slice(0, options.items),
      function (i, post) {
        html += '<div class="ritem">';
        html += '<div class="rthumb"><img src="' + post.data.thumbnail + '" /></div>';
        html += '<div class="rcontent"><div class="rtitle"><a href="' + post.data.url + '" target="_blank">' + post.data.title + '</a></div>'
        html += '<div class="rinfo">';
        html += '<a href="http://www.reddit.com' + post.data.permalink + '" target="_blank">View Comments (' + post.data.num_comments + ')</a> | ';
        html += 'Posted ';
 
        var time = postTime(post.data.created_utc);
        if(time != '') {
          html += time + ' ago';
        }
 
        html += ' by <a href="http://www.reddit.com/u/' + encodeURIComponent(post.data.author) + '" target="_blank">' + post.data.author + '</a>';
        html += '</div></div>'
        html += '<div class="rclear"></div></div>';
      });
      $(parent).html(html);
    });
  };
})(jQuery);