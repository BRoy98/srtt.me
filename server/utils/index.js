exports.generateUrl = (count) => {
    if (!count)
        count = 6;
    var date = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        date += performance.now(); //use high-precision timer if available
    }

    var url = '';
    for (var i = 0; i < count; i++) {
        url += 'x';
    }
    return url.replace(/[xy]/g, function (c) {
        var r = (date + Math.random() * 16) % 16 | 0;
        date = Math.floor(date / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
};

exports.preservedUrls = [
    '/signin',
    '/contact',
    '/404',
    '/verify',
    '/terms',
    '/privacy',
    '/dashboard',
];