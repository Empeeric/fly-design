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
        $('html, body').animate({
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

$('article .title').on('click touchstart', function(e) {
    if (win.width() <= 500 && 'SECTION' == e.target.tagName)
        return;
    stop(e);
    var parent = $(this).parent();

    parent.toggleClass('expand');
    if(parent.hasClass('expand')){
        window.location.hash = $(parent).attr('id');
        var siblings = parent.siblings('.expand').first(),
            siblings_height = siblings.length > 0 ? siblings.height() : 0,
            sibling_offset = siblings.length > 0 ? siblings.offset().top : 0,
            parent_offset = parent.offset().top;
        $('html, body').animate({
            scrollTop: parent_offset - 200 - (siblings_height && (parent_offset > sibling_offset) ? (siblings_height - 130) : 0)
        }, 400, 'linear', function(){
            parent.siblings().removeClass('expand');
        });
    }
});