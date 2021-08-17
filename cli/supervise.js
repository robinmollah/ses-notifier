require('https').globalAgent.options.ca = require('ssl-root-cas').create();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
const Observer = require('./observer');
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
	.describe("ping", "Pings a TCP port")
	.demandOption(['s'])
	.alias('i',"interval")
	.describe('i', "Interval of check in minutes")
	.default('i',"1")
	.help('h')
	.alias('h', 'help')
	.epilog('Written by Robin')
	.argv;

Observer.observe(argv);
