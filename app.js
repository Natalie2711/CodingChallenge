////////////////////////////////////////////////////////////////////
//
// LEAP Analytics Engine  - Node.js Connection
//
// - Get Patient with LastName = Schuppe920 and FirstName = Jean712
//
// Author: Natalie Nguyen
// Date: 12/28/2019
//
/////////////////////////////////////////////////////////////////////

// Set up JDBC connection
var presto = require('presto-client');
var client = new presto.Client({user: 'presto', host: '34.74.56.14', catalog: 'hive', schema: 'leap'});

// Construct SQL query
var query = 
    "SELECT JSON_EXTRACT_SCALAR(a.json, '$.substance.coding[0].code'), " + 
    "JSON_EXTRACT_SCALAR(a.json, '$.substance.coding[0].display') "+
    "FROM patient AS p LEFT JOIN allergyintolerance AS a "+
    "ON JSON_EXTRACT_SCALAR(p.json, '$.id') = SUBSTR(JSON_EXTRACT_SCALAR(a.json, '$.patient.reference'), 10) " +
    "WHERE JSON_EXTRACT_SCALAR(p.json, '$.name[0].family[0]') = 'Zboncak558' and " + 
    "JSON_EXTRACT_SCALAR(p.json,'$.name[0].given[0]') = 'Marshall526' " ;

// To verify that every list in '$.substance.coding' only has length of 1.
// var query = "select JSON_ARRAY_LENGTH(JSON_EXTRACT(json, '$.substance.coding')), count(*) from allergyintolerance group by 1";

// Query the Analytics Engine
client.execute({
    query:   query,
    catalog: 'hive',
    schema:  'leap',
    state:   function(error, query_id, stats){},
    columns: function(error, data){},
    data:    function(error, data, columns, stats){ console.log(data); },
    success: function(error, stats){},
    error:   function(error,){console.log(error)}
});
