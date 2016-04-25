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

* Test results indicate  a 1 ms savings for transfer of 10000 rows
*
