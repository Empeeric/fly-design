var dust = require('dustjs-helpers');

dust.optimizers.format = function(ctx, node) { return node };

/*
    Helpers
 */
dust.helpers.cloudinary = function (chunk, context, bodies, params) {
    context = params && params.path ? context.get(params.path) : context.current();

    if (!(context && context.public_id)) return chunk;

    params.format = params.format || context.format;

    return chunk.write(
        require('cloudinary').url(
            context.public_id, params
        )
    );
};

/*
    Filters
 */
dust.filters.st = function(value) {
    return value.stripTags();
};
dust.filters.br = function(value) {
    return value.replace(/\r\n/ig, '<br />');
};
dust.filters.comma = function(value) {
    return value.replace(/\,/g, '<br>');
};
dust.filters.dasherize = function(value){
    return value.dasherize();
};
dust.filters.lc = function(value){
    return value.toLowerCase();
};