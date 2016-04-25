var express = require('express');
var app = express();
var compress = require('compression');
var _ = require('lodash');

app.use(compress());
app.use(express.static('public'));

var sampleData = {"marketVal":10000 , "mtd": 10000, "ytd": 20000, "ltd": 10000};
var extraProps = {
  e1 : 100,
  e2 : 100,
  e3 : 100,
  e4 : 100,
  e5 : 100,
  e6 : 100,
};

function blocker() {
  var arr  = [];
  for (var i=0; i < 100000; i++) {
    var clonedCopy = _.clone(sampleData);
    arr.push(clonedCopy);
  }
}

app.get('/get-data', function (req, res) {
  // Simply block for some time for testing
  //var arr = blocker();
  var numberOfRows = req.query.rows || 3;
  var addExtraColumns = req.query.extra;
  var retArray = [];
  var respData = sampleData;
  if (addExtraColumns === 'true') {
    var clonedCopy = _.clone(sampleData);
    respData = Object.assign(clonedCopy, extraProps);
  }
  for (var i = 0; i < numberOfRows; i++) {
    retArray.push(respData);
  }
  res.json(retArray);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});