var AWS = require('aws-sdk')
var fs = require('fs')

AWS.config.update({
    region: "us-east-2"
})

console.log("Writing data into Services table:\n\n")

var dynamodb = new AWS.DynamoDB.DocumentClient()
var accessabilitiesData = JSON.parse(fs.readFileSync('../components/data/services.json', 'utf-8'))

accessabilitiesData.forEach(element => {
    var params = {
        TableName: "Services",
        Item: {
            "name": element.name
        }
    }

    dynamodb.put(params, (err, data) => {
        if(err)
            console.error("Unable to put data into Services table: ", JSON.stringify(err, null, 2))
        else
            console.log(`Added ${element.name} to table.`)
    })
});

