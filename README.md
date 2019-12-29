## 1upHealth Coding Challenge 
This nodeJS project returns values of how many allergies the patient Marshall526 Zboncak558 have. 

## Setup
### 1. Download nodeJS from this website: https://nodejs.org/en/download/
### 2. Create a nodeJS project:
```npm init```
### 3. Install presto-client
* Option 1: ```npm install -g presto-client```
* Option 2: add `presto-client` to `dependencies` in `package.json`.

## Solution
1. Create a file named `app.js`. The main logic is implemented in that file.
2. Presto SQL logic:
* Table `patient` has info about patients (keyed by the field `id` in the json object).
* Table `allergyintolerance` has info about all alergies (also keyed by `id`). It also has a reverse mapping from allergy to patient stored in `$.patient.reference` field in the json object.
* We will join the two tables to get the allergies a patient has. The `JOIN` condition is: 
```
JSON_EXTRACT_SCALAR(p.json, '$.id') = SUBSTR(JSON_EXTRACT_SCALAR(a.json, '$.patient.reference'), 10) -- use substr to remove the urn:uuid: prefix.
```
* Finally, we will use `WHERE` to select a patient given the first and last name.
* Note that even though the field `$.substance.coding` in `allergyintolerance` is a list, I've verified that this list only has length of `1` for every allergy in the table.
```
var query = "SELECT JSON_ARRAY_LENGTH(JSON_EXTRACT(json, '$.substance.coding')), COUNT(1) from allergyintolerance group by 1";

Return value:
[ [ 1, 589067 ] ]
```
Thus, it's safe to get the `code` and `display` values from the first element in the list.
## Execute
### Run `node app.js`
