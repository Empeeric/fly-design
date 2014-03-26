'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Types = Schema.Types;

var schema = new Schema({
    site: {
        logo: {type: Types.Filepicker, widget: 'FilepickerPictureWidget'},
        icon: {type: Types.Filepicker, widget: 'FilepickerPictureWidget'},
        name: String,
        homepage: String
    },
    contact: {
        email: String,
        phone: String,
        subject: String
    },
    snippets: [Types.Text],
    _404: {
        title: String,
        content: Types.Html
    }
});

/*
    Return site config and some other:
        res.locals.config
        res.locals.http_params
 */
schema.statics.middleware = function() {
    var config = this;
    var homepage = this.base.models.homepage;
    return function(req, res, next) {
        config.findOne().lean().exec().then(function(config) {

            res.locals.http_params = {
                query: req.query,
                headers: req.headers,
                body: req.body,
                url: req.url,
                debug: req.app.get('env') == 'development'
            };

            res.locals.config = config;

            return homepage.findOne().lean().exec();
        }).then(function (homepageDoc) {
            res.locals.contact = homepageDoc.contact;
            next();
        }).end();
    };
};

schema.formage = {
    section: 'Configuration',
    is_single: true
};

module.exports = schema;

