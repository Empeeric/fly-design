/*
 Slider
 */
$('.slider').responsiveSlides({
    prev: $('#slider .prev'),
    next: $('#slider .next')
});

/*
 Contact links
 */
if (!mobile)
    $('a[href$="#mail"]').on('click touched', function(e) {
        stop(e);
        $.scrll('#mail');
    });


/*
 Scrolling effects
 */
$('#we header.we').elevator('top',
    { bottom: 50, val: 100 },
    { bottom: 200, val: 0 }
);
$('#steps li').each(function(i) {
    if (!mobile)
        i *= 40;
    $(this)
        .css({ opacity: 0, top: -100 })
        .elevator('opacity',
            { bottom: i + 160, val: 0 },
            { bottom: i + 210, val: 1 }
        ).elevator('top',
            { bottom: i + 160, val: -100 },
            { bottom: i + 210, val: 0 }
        );
});
$('#how').elevator('height',
    { bottom: 50, val: 20 },
    { bottom: 300, val: 123 }
);
//$('.line').elevator('right',
//    { bottom: 0, val: '-150%' },
//    { bottom: 100, val: '0%' }
//);

/*
 Shuffle pictures
 */
//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [rev. #1]
var shuffle = function(v){
    for (var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
};
var pics = [],
    i;

var putPic = function(i) {
    $(this).attr('href', files[i].url || '#pictures')
        .find('img').attr('src', files[i].src);
};
$(function() {
    $('#pictures a').each(putPic);

    setInterval(function() {
        if (!pics.length)
            pics = shuffle($('#pictures a').get());

        if (!i)
            i = files.length;

        putPic.call(pics.pop(), --i);
    }, 1000);
});
