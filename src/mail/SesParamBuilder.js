module.exports = class SesParamBuilder{

	constructor(fromEmail, toEmail) {
		this.baseParam = {
			Destination: { /* required */
				CcAddresses: [
					// 'EMAIL_ADDRESS',
					/* more items */
				],
				ToAddresses: [
					// 'EMAIL_ADDRESS',
					/* more items */
				]
			},
			Message: { /* required */
				Body: { /* required */
					Html: {
						Charset: "UTF-8",
						Data: "No body set"
					},
					Text: {
						Charset: "UTF-8",
						Data: "No body set"
					}
				},
				Subject: {
					Charset: 'UTF-8',
					Data: 'Email subject is not set'
				}
			},
			Source: 'dummy@eagle3dstreaming.com', /* required */
			ReplyToAddresses: [
				// 'EMAIL_ADDRESS',
				/* more items */
			],
		};


		this.baseParam.Destination.ToAddresses.push(toEmail);
		this.baseParam.Source = fromEmail;
	}

	build(){
		return this.baseParam;
	}

	setMessage(message){
		this.baseParam.Message.Body.Html.Data = message;
		this.baseParam.Message.Body.Text.Data = message;
		return this;
	}

	setTextMessage(message){
		this.baseParam.Message.Body.Text.Data = message;
		return this;
	}

	setHtmlMessage(message){
		this.baseParam.Message.Body.Html.Data = message;
		return this;
	}

	setSubject(subject){
		this.baseParam.Message.Subject.Data = subject;
		return this;
	}

	addDestinationEmail(email){
		this.baseParam.Destination.ToAddresses.push(email);
		return this;
	}

	addCcAddress(email){
		this.baseParam.Destination.CcAddresses.push(email);
		return this;
	}

	setReplyToAddress(email){
		this.baseParam.ReplyToAddresses.push(email);
		return this;
	}
}
