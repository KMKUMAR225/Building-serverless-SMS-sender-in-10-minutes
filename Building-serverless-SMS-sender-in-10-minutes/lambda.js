let AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = function (event, context, callback) {

    let receiver = event['receiver'];
    let sender = event['sender'];
    let message = event['message'];

    console.log("sending message", message, "to receiver", receiver);
    sns.publish({
        Message: message,
        MessageAttributes: {
            'AWS.SNS.SMS.SMSType': {
                DataType: 'String',
                StringValue: 'Promotional'
            },
            'AWS.SNS.SMS.SenderID': {
                DataType: 'String',
                StringValue: sender
            }
        },
        PhoneNumber: '+91728816344'
    }).promise()
        .then(data => {
            // your code goes here
            console.log("sent message to", receiver);
            callback(null, data);

        })
        .catch(err => {
            // error handling goes here
            console.log("sending failed", err);
            callback(err);
        });

    callback(null, 'Successfully executed');
}