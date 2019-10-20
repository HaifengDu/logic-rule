# logic-rule
`logic-rule` Typescript logical rule library(Include polyfill of the ES6 promise)

[![npm package](https://img.shields.io/npm/v/logic-rule.svg?style=flat-square)](https://www.npmjs.org/package/logic-rule) [![Build Status](https://travis-ci.org/HaifengDu/logic-rule.svg?branch=master)](https://travis-ci.org/HaifengDu/logic-rule) [![codecov](https://codecov.io/gh/HaifengDu/logic-rule/branch/master/graph/badge.svg)](https://codecov.io/gh/HaifengDu/logic-rule)

# Quick Start

## Install

### 1.Use NPM ( Recommend )

``
npm install logic-rule --save
``

### 2.Import in Browser

Use the script tags in the browser to directly import the file and use the global variable LogicRule. We provide files such as logic-rule/logic-rule.min.js in the `logic-rule/dist` directory in the npm package, or via [unpkg](https://unpkg.com/logic-rule/) Download it.


``` html
<script src="https://unpkg.com/logic-rule/dist/logic-rule.min.js"></script>

```

## Import
``` js
import { Rule, OnlyRule } from 'logic-rule';

const onlyRule = Rule.only(() => true);
const otherOnlyRule = new OnlyRule(() => false);

onlyRule.execute(); // true
otherOnlyRule.execute(); // false

Rule.and(onlyRule, otherOnlyRule).execute(); // false
Rule.or(onlyRule, otherOnlyRule).execute(); // true
Rule.not(onlyRule).execute(); // false
```

## Api

### class
#### *Rule*
##### static only(cb: boolean|Promise\<boolean\>|() => boolean|Promise\<boolean\>): NotRule
```
Rule.only(() => true);
Rule.only(false);

const checkResult = {key:false};
Rule.only(() => !checkResult.key);
checkResult.key = true;

const promiseOnlyRule1 = Rule.only(Promise.resolve(true));
const promiseOnlyRule2 = Rule.only(() => Promise.resolve(false));

```
##### static and(rule1, rule2): AndRule
```
const rule1 = Rule.only(() => true);
const rule2 = Rule.only(false);
const andRule = Rule.and(rule1, rule2);
andRule.execute(); // false
```
##### static or(rule1, rule2): OrRule
```
const rule1 = Rule.only(() => true);
const rule2 = Rule.only(false);
const orRule = Rule.or(rule1, rule2);
orRule.execute(); // true
```

##### static not(rule1, rule2): NotRule
```
const rule = Rule.only(() => true);
const notRule = Rule.not(rule);
notRule.execute(); // false
```

##### and(rule): AndRule
```
const rule1 = Rule.only(() => true);
const rule2 = Rule.only(false);
rule1.and(rule2).execute(); // false
```

##### or(rule): OrRule
```
const rule1 = Rule.only(() => true);
const rule2 = Rule.only(false);
rule1.or(rule2).execute(); // true
```

##### not(): NotRule
```
const rule = Rule.only(() => true);
rule.not().execute(); // false
```

##### execute(): boolean|Promise<boolean>
```
const rule = Rule.only(() => true);
const promiseRule = Rule.only(() => Promise.resolve(false));

rule.execute(); // true
promiseRule.execute().then(result => console.log(result)); // false
rule.and(promiseRule).execute().then(result => console.log(result)); // false
promiseRule.and(rule).execute().then(result => console.log(result)); // false
rule.or(promiseRule).execute().then(result => console.log(result)); // true
promiseRule.or(rule).execute().then(result => console.log(result)); // true
promiseRule.not().execute().then(result => console.log(result)); // true
```
#### OnlyRule ***(extend Rule)***
#### AndRule ***(extend Rule)***
#### OrRule ***(extend Rule)***
#### NotRule ***(extend Rule)***

## Run:

```sh
$ git@github.com:HaifengDu/logic-rule.git
$ cd logic-rule
$ npm install
```

This will setup the library dependencies for you.

To run tests, run

```sh
$ npm run test
```

To lint your code, run

```sh
$ npm run lint
```

To generate test coverage, run

```sh
$ npm run ci
```

To compile typescript, run
```sh
$ npm run tsc
```

To only build, run
```sh
$ npm run build:dist
```

To compile and build, run

```sh
$ npm run build
```