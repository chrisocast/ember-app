var path = require('path');

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
};

module.exports = {

    livereload: {
        options: {
            port: 9001,
            hostname: undefined,
            middleware: function (connect, options) {
                return [lrSnippet, folderMount(connect, '.')];
            }
        }
    },
    acceptanceTest: {
        "options": { port: 9002 }
    }

};
