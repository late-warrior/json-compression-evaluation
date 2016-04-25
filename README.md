## Impact of extra columns

This project is to test the hypothesis that the effort needed to remove *extra* columns from the results
is more than the overhead imposed by network transfer of unwanted data

### Compressed data

This is not an argument at all - compression enables the most savings - all data must be compressed.


### Experiment setup

 * The size of returned data is varied - between 10 to 10000 rows.
 * For each return size, the experiment is performed 20 times and the average time is taken
 * window.performance API is used for measurement
 *

### Test results

* These tests were run on a 2014 Macbook Air with 4 GB 1600 MHz DDR3 and a 1.4 GHz Intel Core i5.  Your
results will vary, but hopefully you should be able to see this trend.

#### Without extra columns

```
[{"rows":"10","avgDownloadTime":0.8737500000010187,"avgDuration":11.243749999999363},
{"rows":"100","avgDownloadTime":1.163000000000011,"avgDuration":8.705249999999342},
{"rows":"1000","avgDownloadTime":1.0667500000000474,"avgDuration":27.29674999999952},
{"rows":"10000","avgDownloadTime":2.679750000000058,"avgDuration":194.27525000000088},
{"rows":"100000","avgDownloadTime":26.070999999999913,"avgDuration":1346.0622499999997}]
```

#### With extra columns

```
[{"rows":"10","avgDownloadTime":0.7702500000006693,"avgDuration":7.6630000000001015},
 {"rows":"100","avgDownloadTime":0.7749999999989086,"avgDuration":9.271750000000248},
 {"rows":"1000","avgDownloadTime":1.119000000001688,"avgDuration":34.6347500000018},
 {"rows":"10000","avgDownloadTime":7.8487499999992,"avgDuration":229.06449999999785},
 {"rows":"100000","avgDownloadTime":72.372749999999,"avgDuration":2202.2869999999994}]
```
