var AWS = require('aws-sdk')
var fs = require('fs')
const { getSystemErrorName } = require('util')

AWS.config.update({
    region: "us-east-2"
})

console.log("Writing data into GalleryImages table:\n\n")

var dynamodb = new AWS.DynamoDB.DocumentClient()
var accessabilitiesData = JSON.parse(fs.readFileSync('../components/data/gallery_images.json', 'utf-8'))

accessabilitiesData.forEach(element => {
    // className could be empty string
    var name = element.className
    if(name.trim() === "") name = "no_class" // Make sure we don't pass in empty string

    var params = {
        TableName: "GalleryImages",
        Item: {
            "imgSrc": element.imgSrc,
            "altTxt": element.altTxt,
            "className": name
        }
    }

    dynamodb.put(params, (err, data) => {
        if(err)
            console.error(`Unable to put ${element.altTxt} into GalleryImages table: `, JSON.stringify(err, null, 2))
        else
            console.log(`Added ${element.altTxt} to table.`)
    })
});

