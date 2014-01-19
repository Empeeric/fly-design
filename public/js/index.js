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
//if (!mobile) {
//    var s = skrollr.init({
//        smoothScrolling: false,
//        forceHeight: false
//    });
//}


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