# 487P Project
## Will Schmid

This project will revolve around benchmarking different database management systems using the [Wisconsin Benchmark](http://jimgray.azurewebsites.net/benchmarkhandbook/chapter4.pdf).

Currently, `Part1` consists of code used to generate test data in the `.csv` format, which will then be loaded into the BigQuery service on Google's Cloud Platform.

The data generation code is a Node app written in JavaScript, so Node will need to be installed to run it as well as using `npm` or `yarn` to install the `fs` package the code uses.

Once setup with Node and `npm`, the name of the file intended to hold the data and the # of tuples desired must be entered as command line arguments when running the app. For example:
`FILENAME=data MAXTUPLES=10000 node generate-data`