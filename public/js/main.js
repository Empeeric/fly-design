var stop = function(e) {
    e.preventDefault();
    e.stopPropagation();
};

/*
 Animated jump upward
 */
$('a.up').on('click touchstart', function(e) {
    stop(e);
    $.scrll(0);
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