describe('SSL', function () {
    var _ = require('lodash'),
        testrun;

    before(function (done) {
        this.run({
            collection: {
                item: [{
                    request: {
                        url: 'https://expired.badssl.com',
                        method: 'GET'
                    }
                }]
            }
        }, function (err, results) {
            testrun = results;
            done(err);
        });
    });

    it('must handle server side SSL errors correctly correctly', function () {
        expect(testrun).be.ok();
        expect(_.get(testrun.request.getCall(0).args, '0.code')).to.be('CERT_HAS_EXPIRED');
    });

    it('must have completed the run', function () {
        expect(testrun).be.ok();
        expect(testrun.done.calledOnce).be.ok();
        expect(testrun.done.getCall(0).args[0]).to.be(null);
        expect(testrun.start.calledOnce).be.ok();
    });
});
