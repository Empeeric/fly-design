var stop = function(e) {
    e.preventDefault();
    e.stopPropagation();
};

/*
 Projects sub-menu
 */
var projects = $('nav.second');
if (projects.hasClass('hide'))
    $('header .projects').hover(projects.toggleClass.bind(projects, 'hide'));

/*
 Animated jump upward
 */
$('a.up').on('click touchstart', function(e) {
    stop(e);
    $.scrll(document.body);
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