//var mobile = (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);

/*
 Slider
 */
$('.slider').responsiveSlides({
    prev: $('#slider .prev'),
    next: $('#slider .next')
});


/*
 Scrolling effects
 */
$('#we h2').elevator('top',
    { bottom: 50, val: 100 },
    { bottom: 200, val: 0 }
);
var i = 1;
$('span.number').each(function() {
    var j = i++ * 40;
    $(this).elevator('opacity',
        { bottom: j + 100, val: 0 },
        { bottom: j + 200, val: 1 }
    ).elevator('top',
        { bottom: j + 100, val: -100 },
        { bottom: j + 200, val: 0 }
    );
});
$('#how').elevator('height',
    { bottom: 50, val: 20 },
    { bottom: 300, val: 123 }
);


/*
 Shuffle pictures
 */
//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [rev. #1]
var shuffle = function(v){
    for (var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
};
var files = [],
    pics = [],
    i;
$('#pictures ul li img').each(function(){
    files.push($(this).attr('src'));
});
setInterval(function() {
    if (!pics.length)
        pics = shuffle($('#pictures img').get());

    if (!i)
        i = files.length;

    pics.pop().src = files[--i];
}, 1000);