'use strict';

var app = require.main.exports.app,
    models = require('./models'),
    dust = require('dustjs-linkedin'),
    async = require('async'),
    _ = require('lodash');

/*
 middle-wares
 */

var config = models.config.middleware(),
    crumbs = models.navigation.crumbs(),
    menu = models.navigation.menu();

/*
 Search for a post with current url:
     res.locals.post
     res.locals.page
 if not than a navigation item:
     res.locals.page
 */
var getByUrl = function(req, res, next) {
    var url = req.params[0];

    models.navigation.byURL(url, function(err, page) {
        if (err) return next(err);

        if (page) {
            res.locals.page = page;
            return next(err);
        }

        models.posts.byURL(url, function(err, post) {
            if (err) return next(err);

            if (post && post.navigation) {
                res.locals.page = post.navigation;
                res.locals.post = _.omit(post, 'navigation');
            }
            next(err);
        });
    });
};

var pageModels = function(req, res, next) {
    var arr = [],
        page = res.locals.page;

    if (page) {
        switch (page.template){
            case 'index':
                arr.push(models.homepage.fetch());
                break;
            case 'blog':
                page = req.query.page || 0;
                arr.push(models.posts.middleware(10, page));
                break;
            case 'projects':
                arr.push(models.projects.byNavigationId(false));
                arr.push(models.content.byNavigationId());
                break;
            case 'projects2':
                arr.push(models.projects.byNavigationId(true));
                arr.push(models.content.byNavigationId());
                break;
            case 'clients':
                arr.push(models.clients.findAll());
                break;
            case 'about':
                arr.push(models.about.byNavigationId());
            default:
                arr.push(models.content.byNavigationId());
        }
    }

    async.each(arr, function(item, cb){
        item(res, cb);
    }, function(err){
        next(err)
    });
};

// CMS rule
app.get('*', [ config, getByUrl, crumbs, menu, pageModels], function (req, res, next) {
    if (!res.locals.page)
        return next();

//    res.json({
//        page: res.locals.page
//    });

    res.locals.crumbs.forEach(function(crumb, i){
        crumb.last = i == res.locals.crumbs.length - 1;
    });

    res.render(res.locals.page.template || 'index');
});

app.use(function (err, req, res, next) {
    console.log(err);

    res.locals.page = res.locals.page || {};
    if(res.locals.config && res.locals.config._404) {
        res.locals.page.title = res.locals.config._404.title;
        res.locals.page.content = res.locals.config._404.content;
    } else {
        res.locals.page.title = 'Page not found';
        res.locals.page.content = 'The page you are looking for no longer exists.';
    }

    return res.status(404).render('404');
});
