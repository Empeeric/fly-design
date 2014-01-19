var registry = require('./global'),
    app = require.main.exports.app,
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
    var params = req.params[0];

    models.posts.findOne()
        .where('url', params)
        .where('show', true)
        .populate('navigation')
        .lean()
        .exec(function (err, post) {
            if (err) return next(err);

            if (post && post.navigation) {
                res.locals.page = post.navigation;
                res.locals.page.post = _.omit(post, 'navigation');
//                res.locals.page.title = res.locals.page.post.title;

                return next(err);
            }

            models.navigation
                .findOne()
                .where('url', params)
                .where('show', true)
                .lean()
                .exec(function (err, page) {
                    if (page && page.text) {
                        dust.loadSource(dust.compile(page.text, 'posts_template'));
                        dust.render('posts_template', req.config, function (err, text) {
                            page.text = text;
                        });
                    }
                    res.locals.page = page;
                    next(err);
                });
        });
};

var pageModels = function(req, res, next){
    var arr = [],
        page = res.locals.page;

    //for all pages
//    arr.push(models.videos.latest());
//    arr.push(models.instructions.latest());
//    arr.push(models.side_text.fetch());

    if (page) {
        switch (page.template){
            case 'index':
                arr.push(models.homepage.fetch());
                break;
            case 'posts':
                arr.push(models.posts.byNavigationId());
                break;
            case 'projects':
                arr.push(models.projects.byNavigationId());
                arr.push(models.content.byNavigationId());
                break;
            case 'customers':
                arr.push(models.customers.byNavigationId());
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

app.use(function (req, res) {
    res.locals.page || (res.locals.page = {});

    if(res.locals.config&&res.locals.config._404){
        res.locals.page.title = res.locals.config._404.title;
        res.locals.page.content = res.locals.config._404.content;
    }else{
        res.locals.page.title = 'Page not found';
        res.locals.page.content = 'The page you are looking for no longer exists.'
    }

    res.status(404).render('404');
});