const Observer = require('ping-monitor');
const mail = require('../src/mail/mail');
const SesParamBuilder = require("../src/mail/SesParamBuilder");

module.exports.observe = function observer(argv) {
	const monitorOptions = () =>{
		let opts = {
			// website: argv.server,
			// address: argv.server,
			// port: argv.port,
			interval: argv.interval
		};
		if(argv.ping){
			opts.address = argv.server;
			opts.port = argv.port;
		} else {
			opts.website = argv.server;
			opts.port = argv.port;
		}
		console.log("Running monitor: ", opts);
		return opts;
	}

	const myMonitor = new Observer(monitorOptions());

	let shouldNotify = true;

	const MailConfig = (state = "") => {
		return new SesParamBuilder('hawk@eagle3dstreaming.com', 'robin@eagle3dstreaming.com')
			.addDestinationEmail('robinsajin@gmail.com')
			.addDestinationEmail('ahsan@eagle3dstreaming.com')
			.addDestinationEmail('robin@eagle3dstreaming.com')
			.addDestinationEmail('jay@seagullcompany.com')
			.addDestinationEmail('quintin@eagle3dstreaming.com')
			.addDestinationEmail('valerie@eagle3dstreaming.com')
			.setMessage(`<b>Hello Engineer,</b><br/>We have found the server (${argv.server}) is down.` +
				`<br/>Regards,<br/>Hawk<br/>Server Supervisor<br/>Eagle3dStreaming Inc.<br/><br/>${JSON.stringify(state)}`)
			.setSubject(`SERVER DOWN | ${argv.server}`)
			.build();
	}

	myMonitor.on('up', function (res, state) {
		console.log('+');
	});


	myMonitor.on('down', function (res, state) {
		console.log('_');
		attemptNotify(state);
	});


	myMonitor.on('stop', function (res, state) {
		console.log(res.address + ' monitor has stopped.');
	});


	myMonitor.on('error', function (error, res) {
		console.log("Got error" , error);
		attemptNotify(error);
	});


	myMonitor.on('timeout', function (error, res) {
		console.log(error);
	});

	function attemptNotify(state){
		if(shouldNotify){
			mail.sendPromise(MailConfig(state)).then(
				res => {
					// console.log("Delivered notification", res);
				}
			).catch((err) => {
				console.log("Failed to send email notification.");
			});
			shouldNotify = false;
			setTimeout(() => {
				shouldNotify = true;
			}, 60 * 1000 * 5);
		}
	}

}
