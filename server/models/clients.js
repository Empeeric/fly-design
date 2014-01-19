var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Types = Schema.Types;

var schema = new Schema({
    name: String,
    picture: { type: Types.Filepicker, widget: 'FilepickerPictureWidget' },
    order: { type: Number, editable: false },
    show: { type: Boolean, 'default': true }
});

schema.methods.toString = function() {
    return this.name;
};

schema.statics.findAll = function() {
    var clients = this;
    return function(res, cb) {
        var page = res.locals.page;

        clients
            .find()
            .where('show', 1)
            .sort({'order': 1})
            .lean()
            .exec(function(err, results){
                res.locals.clients = results;
                cb(err);
            });
    }
};

schema.formage = {
    list: ['picture', 'name'],
    order_by: ['order'],
    sortable: 'order'
};

module.exports = schema;

