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
        text_col_1: { type: Types.Html },
        text_col_2: { type: Types.Html }
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
            .findOne()
            .where('navigation', page._id)
            .where('show', 1)
            .sort({'order': 1})
            .lean()
            .exec(function(err, result){
                if(result) res.locals.page.about = result;
                cb(err);
            })
    }
};

schema.formage = {
    list: ['navigation', 'show'],
    list_populate: ['navigation'],
    order_by: ['order'],
    sortable: 'order'
};

module.exports = schema;

