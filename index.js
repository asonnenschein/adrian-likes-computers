'use strict';


require('./server')(function (server) {
    server.listen(server.get('port'), function () {
        console.log(`Listening at http://localhost:${this.address().port}/`);
    });
});