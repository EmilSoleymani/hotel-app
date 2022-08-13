var AWS = require('aws-sdk')

AWS.config.update({
    region: "us-east-2"
})

var dynamodb = new AWS.DynamoDB()

var params = {
    TableName: "GalleryImages",
    KeySchema: [
        // Partition Key
        { AttributeName: "imgSrc", KeyType: "HASH" },
        // Sort Keys
        { AttributeName: "altTxt", KeyType: "RANGE" }
    ],
    AttributeDefinitions: [
        { AttributeName: "imgSrc", AttributeType: "S" },
        { AttributeName: "altTxt", AttributeType: "S" },
        { AttributeName: "className", AttributeType: "S" }
    ],
    LocalSecondaryIndexes: [
        {
            IndexName: "ClassIndex",
            KeySchema: [
                { AttributeName: "imgSrc", KeyType: "HASH" },
                { AttributeName: "className", KeyType: "RANGE" }
            ],
            Projection: {
                ProjectionType: "KEYS_ONLY"
            }
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
}

dynamodb.createTable(params, (err, data) => {
    if (err)
        console.error("Unable to create table: ", JSON.stringify(err, null, 2))
    else 
        console.log("Created table with description: ", JSON.stringify(data, null, 2))
})