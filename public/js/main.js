var mobile = (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);

var stop = function(e) {
    e.preventDefault();
    e.stopPropagation();
};

/*
 Animated jump upward
 */
if (!mobile)
    $('a.up').on('click', function(e) {
        stop(e);
        $(document.documentElement).animate({
            scrollTop: 0
        });
    });

/*
 Mobile navigation
 */
var nav = $('.navs');
nav.on('click touchstart', function(e) {
    if (!$(e.target).is('.active'))
        return;

    stop(e);
    nav.toggleClass('open');
});
$(document).on('click touchstart', function(e) {
    if (!nav.find(e.target).length)
        nav.removeClass('open');
});