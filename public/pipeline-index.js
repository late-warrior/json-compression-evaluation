/**
 * Created by sriram on 23/04/16.
 */
superagent.Request.prototype.promise = function() {
    var req = this;
    var error;

    return new Promise((resolve, reject) => {
        req.end((err, res) => {
            if (typeof res !== "undefined" && res.status >= 400) {
                var msg = 'cannot ' + req.method + ' ' + req.url + ' (' + res.status + ')';
                error = new Error(msg);
                error.status = res.status;
                error.body = res.body;
                error.res = res;
                reject(error);
            } else if (err) {
                reject(new Error('Bad request'));
            } else {
                resolve(res);
            }
        });
    });
};

$(function() {
    $('#fetch-data').click(() => {
        // Perform 10 requests and get an average figure of the stats
        var numberOfRows = [10,100,1000,10000,100000];
        var queryObjArray = [];
        var resourceArray = new Set();
        var extra = $('#extra').is(':checked');
        // Number of times you want to run this experiment
        _.times(20, () => {
            numberOfRows.forEach((i) => {
                var queryObj = {
                    rows: i,
                    extra: extra
                };
                var p$ = superagent.get('/get-data')
                    .query(queryObj);
                resourceArray.add('http://localhost:3000/get-data?rows=' + queryObj.rows + '&extra=' + queryObj.extra);
                queryObjArray.push(p$);
            });
        });

        function runThroughPromises(queryObjArray) {
            return Promise.each(queryObjArray, (value, index, length) => {
                console.log('In the ' + index + ' promise');
                return value.promise();
            });
        }

        var finalPromise = runThroughPromises(queryObjArray);

        finalPromise.then(() => {
            console.log('Final promise resolved');
            performCalculations()
        });

        function performCalculations() {
            var stats = [];
            resourceArray.forEach((resource) => {
                var entries = window.performance.getEntriesByName(resource);
                var numberOfTrials = entries.length;
                var perfObjs = _.map(entries, (entry, index, coll) =>  _.pick(entry, ['duration', 'responseStart', 'responseEnd']));
                stats.push({
                    rows : resource.substring(resource.indexOf('rows=') + 5, resource.indexOf('&extra')),
                    avgDownloadTime : _.sum(_.map(perfObjs, (obj) => obj.responseEnd - obj.responseStart)) / numberOfTrials,
                    avgDuration : _.sumBy(perfObjs, 'duration')/ numberOfTrials
                });
            });
            $('#stats').text(JSON.stringify(stats));
        }
    });
});
