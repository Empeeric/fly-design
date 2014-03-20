/*
 scrll -- animated scroll to an element
 version 0.6

 like scrollTo, but smaller.

 usage examples:
 $.scrll('#about'[, 1000], callback);
 */

(function($) {
    var doc = $(document.body);
    $.scrll = function(to, speed, cb) {
        if (!cb && 'function' == typeof speed)
            cb = speed, speed = $.scrll.speed;

        if ('number' != typeof to)
            to = $(to).offset().top;

        doc.animate({
            scrollTop: to + $.scrll.offset
        }, speed, cb);
    };
    $.scrll.speed = 500;
    $.scrll.offset = 0;
})(jQuery);
