'use strict';
/*globals _,$,document,window,dust */
var mobile = (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);

$(document).ready(function(){
    var projects = window.projects.items,
        width = $(document).width(),
        parts = _(projects).map(function(obj, i){
            obj.picture.url = obj.picture.url.replace('https', 'http').replace('www.filepicker.io', 'cdn.empeeric.com');
            $.each(obj.slides, function (i, slide) {
              if (!slide || !slide.picture || !slide.picture.url) return;
              slide.picture.url = slide.picture.url.replace('https', 'http').replace('www.filepicker.io', 'cdn.empeeric.com');
            });
            obj.index = i;
            if((i + 1) % 2 === 0) {
                obj.left = true;
            }
            return obj;
        });

    //one column
    if(width <= 690) {
        parts = _(parts).chunkAll(1);
    } else if (width < 980 && width > 690) {   // two columns
        parts = _(parts).chunkAll(2);

    } else {    //three columns
        parts = _(parts).chunkAll(3);
        _.each(parts, function(item){
            item[2].last = true;
        });
    }
    $.each(parts, function(i, part){
        dust.render('thumb', {items: part}, function(err, html){
            if(err) return;
            $('#items').append(html);

            dust.render('article',  {items: part},function(err, html){
                if(err) return;
                $('#items').append(html);
                $('.slider ul').responsiveSlides({
                    nav: true,
                    pager: true,
                    nextText: '<i class="icon-left" />',
                    prevText: '<i class="icon-right" />'
                });
            });
        });
    });

});
