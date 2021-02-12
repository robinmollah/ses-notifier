const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-1'});

let params = {
	Destination: {
		CcAddresses: [
			'robinsajin@gmail.com'
		],
		ToAddresses: [
			'business@eagle3dstreaming.com'
		]
	},
	Message: { /* required */
		Body: { /* required */
			Html: {
				Charset: "UTF-8",
				Data: "HTML_FORMAT_BODY"
			},
			Text: {
				Charset: "UTF-8",
				Data: "TEXT_FORMAT_BODY"
			}
		},
		Subject: {
			Charset: 'UTF-8',
			Data: 'Test email'
		}
	},
	Source: 'website@eagle3dstreaming.com', /* required */
	ReplyToAddresses: [
		'robinsajin@gmail.com',
	],
};

const SES = new AWS.SES({apiVersion: '2010-12-01'});

module.exports.sendPromise = SES.sendEmail(params).promise();


