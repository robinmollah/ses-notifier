const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-1'});
const SES = new AWS.SES({apiVersion: '2010-12-01'});

module.exports.sendPromise = function(mailParam){
	return SES.sendEmail(mailParam).promise();
}


