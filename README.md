## 1upHealth Coding Challenge 
This nodeJS project returns values of how many allergies the patient Marshall526 Zboncak558 has. 

## Setup
1. Download nodeJS from this website: https://nodejs.org/en/download/ 
2. Create a nodeJS project:
```npm init```
3. Install presto-client package:
* Option 1: ```npm install -g presto-client```
* Option 2: add `presto-client` version `0.6.0` to `dependencies` in `package.json`.
4. Install console.table package:
```npm install console.table --save```

## Solution
1. Create file `app.js`. Connection to bulk data system, SQL statement and result are implemented in this file. 
 
2. SQL logic:
* Table `patient` has information about patients (identified by `$.id` field in the json object).
* Table `allergyintolerance` has information about all alergies (each object is also identified by `$.id` field). This table includes mapping from allergies to patient through `$.patient.reference` field in the json object.
* We will join the two tables to get the allergies each patient has. The `JOIN` is on `$.id` field on `patient` table (p) and `$.patient.reference` field on `allergyintolerance` table (a).
```
JSON_EXTRACT_SCALAR(p.json, '$.id') = SUBSTR(JSON_EXTRACT_SCALAR(a.json, '$.patient.reference'), 10) -- use substr function to remove the urn:uuid: prefix from the $.patient.reference field.
```
* Finally, we will use `WHERE` to select a specific patient based on first and last name.
* We select `$.substance.coding[0].code` and `$.substance.coding[0].display` fields from `allergyintolerance` table as output.
* Note 1: the field `$.substance.coding` in `allergyintolerance` is a list. The following query is used to verify that this list only has length of `1` for every allergy in the table and, therefore, we can take both `code` and `display` values from the first element `$.substance.coding[0]` (also the only element) in the list.
```
var query = "SELECT JSON_ARRAY_LENGTH(JSON_EXTRACT(json, '$.substance.coding')), COUNT(1) from allergyintolerance group by 1";

Return value:
[ [ 1, 589067 ] ]
```
* Note 2: we use `console.table` package to show tabular result. Result is sorted in alphabetical order by Description field.
## Execute
* Run `node app.js`

