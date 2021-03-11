require('https').globalAgent.options.ca = require('ssl-root-cas').create();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
const Monitor = require('ping-monitor');
const mail = require('../src/mail/mail');
const SesParamBuilder = require("../src/mail/SesParamBuilder");
const argv = require('yargs/yargs')(process.argv.slice(2))
	.usage('Usage: $0 <command> [options]')
	// .command('count', 'Count the lines in a file')
	// .example('$0 count -f foo.js', 'count the lines in the given file')
	.alias('s', 'server')
	.nargs('s', 1)
	.describe('s', "Server address")
	.alias('p', 'port')
	.describe('p', 'Port')
	.default('p', 80)
	.demandOption(['s'])
	.alias('i',"interval")
	.describe('i', "Interval of check in minutes")
	.default('i',"1")
	.help('h')
	.alias('h', 'help')
	.epilog('Written by Robin')
	.argv;

const myMonitor = new Monitor({
	website: argv.server,
	// address: argv.server,
	port: argv.port,
	interval: argv.interval
});

let shouldNotify = true;

const MailConfig = (state = "") => {
	return new SesParamBuilder('hawk@eagle3dstreaming.com', 'robin@eagle3dstreaming.com')
		.addDestinationEmail('robinsajin@gmail.com')
		.addDestinationEmail("business@eagle3dstreaming.com")
		.setMessage(`TEST<b>Hello Engineer,</b><br/>We have found the server (${argv.server}:${argv.port}) is down.` +
		`<br/>Regards,<br/>Hawk<br/>Server Supervisor<br/>Eagle3dStreaming Inc.<br/><br/>${JSON.stringify(state)}`)
		.setSubject(`SERVER DOWN | ${argv.server}:${argv.port}`)
		.build();
}

myMonitor.on('up', function (res, state) {
	console.log('+', res, state);
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
