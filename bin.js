const express = require('express')
const PrepareForm = require('./src/mail/PrepareForm');
const app = express()
const mail = require('./src/mail/mail.js');
const SesParamBuilder = require("./src/mail/SesParamBuilder");
const port = 1010

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
	res.send('Email notifier is running');
});

app.post('/api/mail/', (req, res) => {
	const source = req.query.source;
	console.log("BODY", req.body);
	let mailParam = new SesParamBuilder('website@eagle3dstreaming.com', 'business@eagle3dstreaming.com')
		.addDestinationEmail('robinsajin@gmail.com')
		.addDestinationEmail('valerie@eagle3dstreaming.com')
		.addDestinationEmail('quintin@eagle3dstreaming.com')
		.addDestinationEmail('jay@seagullcompany.com')
		.setMessage(PrepareForm(req.body))
		.setSubject("New form submitted in our main website")
		.build();
	const result = mail.sendPromise(mailParam);
	result.then(
		res => {
			console.log("Delivery id", res);
		}
	).catch(
		err => {
			console.log("error", err);
		}
	)
	res.send("okay");
});

app.listen(port, "0.0.0.0", () => {
	console.log(`Mail server app listening at http://0.0.0.0:${port}`)
})
