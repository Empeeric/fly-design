/*
 scrll -- animated scroll to an element
 version 0.5

 like scrollTo, but smaller.

 usage examples:
 $.scrll('#about'[, 1000], callback);
 */

(function($) {
    $.scrll = function(selector, speed, cb) {
        if (!cb && $.isFunction(speed)) {
            cb = speed;
            speed = $.scrll.speed;
        }
        $(document.documentElement).animate({
            scrollTop: $(selector).offset().top + $.scrll.offset
        }, speed, cb);
    };
    $.scrll.speed = 500;
    $.scrll.offset = 0;
})(jQuery);