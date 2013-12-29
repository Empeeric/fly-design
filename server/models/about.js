var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Types = Schema.Types;

var schema = new Schema({
    navigation: { type: Types.ObjectId, ref: 'navigation' },
    picture: {
        title: String,
        picture: {type: Types.Filepicker, widget: 'FilepickerPictureWidget'}
    },
    text: {
        title: String,
        text: { type: Types.Html }
    },
    list: {
        title: String,
        list: [Types.Text]
    },
    order: { type: Number, editable: false },
    show: { type: Boolean, 'default': true }
});

schema.methods.toString = function(){
    return this.title;
};

schema.statics.byNavigationId = function(){
    var about = this;
    return function(res, cb){
        var page = res.locals.page;

        about
            .find()
            .where('navigation', page._id)
            .where('show', 1)
            .sort({'order': 1})
            .lean()
            .exec(function(err, results){
                if(results.length) res.locals.page.about = {items :results};
                cb(err);
            })
    }
};

schema.formage = {
    list: ['navigation', 'title', 'text', 'show'],
    list_populate: ['navigation'],
    order_by: ['order'],
    sortable: 'order'
};

module.exports = schema;

