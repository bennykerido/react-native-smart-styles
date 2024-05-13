#!/usr/bin/env node
const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('Usage: smart-styles update');
    process.exit(1);
}

const command = args[0];
switch (command) {
    case 'update':
        console.log('Updating config file');
        require('./lib/initialization');
        console.log('Config file successfully updated');
        break;
    default:
        console.log('Unknown Command');
        process.exit(1);
}
