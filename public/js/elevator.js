/*
    elevator.js 0.1
    -- scrolling animations and parallaxes

    maria <maria@empeeric.com>
    eyy <etai@empeeric.com>

    usage:
    $('h1').elevator('opacity',
        { top: 0, val: 0 },
        { top: 500, val: 1 }
    );

    $(selector).elevator(property, start, end);
    0 pixels from top,   opacity: 0
    500 pixels from top, opacity: 1
 */

(function() {
    var listeners = [],
        w = $(window).scroll(function() {
            var scroll_top = w.scrollTop(),
                window_height = w.height();
            listeners.forEach(function(l) {
                l[1].call(l[0], scroll_top, window_height);
            });
        });

    $.fn.elevator = function(fn) {
        if (!this.length) return this;

        if ('string' == typeof fn )
            fn = animation.apply(this, arguments);

        listeners.push([this, fn]);
        return this;
    };

    var animation = function(prop, start, end) {
        if (start.top > end.top || start.bottom < end.bottom) {
            var temp = start;
            start = end;
            end = temp;
        }

        return function(scroll_top, window_height) {
            var offset = this.offset().top,
                distance = offset - scroll_top,
                c;

            if (start.top == undefined)
                start.top = window_height - start.bottom;
            if (end.top == undefined)
                end.top = window_height - end.bottom;

            if (distance < start.top)
                c = start.val;
            else if (distance > end.top)
                c = end.val;
            else
                c = (distance - start.top)
                    / (end.top - start.top)
                    * (end.val - start.val)
                    +  start.val;

            this.css(prop, c);
        }
    };
})();