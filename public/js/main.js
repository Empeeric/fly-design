var stop = function(e) {
    e.preventDefault();
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
 Navigation
 */
var nav = $('.nav');
nav.find('a').on('touchstart', function(e) {
    stop(e);
    nav.addClass('open');
});