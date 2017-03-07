# OOF Coding Challenge
This application calculates the number of days between 2 dates.

## Getting Started
Make sure that you have [Node.js](https://nodejs.org) installed on your computer.

####There are 2 ways to pass the start and end dates to the application.

The input arguments **must** be the following format,
```
DD MM YYYY, DD MM YYYY
```
where the first date is the start date while the second date is the end date.

##### Method 1: Via the command line

```sh
npm start "31 01 2001, 01 01 2002"
```

The above command passes `31 01 2001` as the start date and `01 01 2002` as the end date to the application.

##### Method 2: Via the input file

The root directory of the project contains text file titled `input.txt`. If the file contains
```
01 02 2006, 21 02 2006
```

It will pass `01 02 2006` as the start date and `21 02 2006` as the end date to the application.

If the dates are passed via the input file, you can **MUST** run the application by,
```sh
npm start
```

## Testing
Execute the command below to fetch the test dependencies ([Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/)).

```sh
npm install
```

Once the dependencies fetched, run the test suite by executing the follwing command.
```sh
npm test
```