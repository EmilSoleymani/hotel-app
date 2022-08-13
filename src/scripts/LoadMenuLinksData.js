var AWS = require('aws-sdk')
var fs = require('fs')

AWS.config.update({
    region: "us-east-2"
})

console.log("Writing data into MenuLinks table:\n\n")

var dynamodb = new AWS.DynamoDB.DocumentClient()
var accessabilitiesData = JSON.parse(fs.readFileSync('../components/data/menu_links.json', 'utf-8'))

accessabilitiesData.forEach(element => {
    var params = {
        TableName: "MenuLinks",
        Item: {
            "class": element.class,
            "href": element.href,
            "text": element.text
        }
    }

    dynamodb.put(params, (err, data) => {
        if(err)
            console.error(`Unable to put ${element.text} into MenuLinks table: `, JSON.stringify(err, null, 2))
        else
            console.log(`Added ${element.text} to table.`)
    })
});

