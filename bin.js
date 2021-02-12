const express = require('express')
const app = express()
const mail = require('./mail.js');
const port = 1010

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
	res.send('Hello World!')
});

app.post('/api/mail/', (req, res) => {
	const source = req.query.source;
	console.log("BODY", req.body);
	mail.sendPromise.then(
	function(data) {
		console.log(data.MessageId);
	}).catch(
	function(err) {
		console.error(err, err.stack);
	});
	res.send("okay");
});

app.listen(port, "0.0.0.0", () => {
	console.log(`Mail server app listening at http://0.0.0.0:${port}`)
})
