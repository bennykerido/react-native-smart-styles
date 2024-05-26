#!/usr/bin/env node
const args = process.argv.slice(2);
const cliPath = require('path');

if (args.length === 0) {
    console.log('Usage: smart-styles update');
    process.exit(1);
}

const command = args[0];
switch (command) {
    case 'update':
        try {
            console.log(process.cwd());
            process.chdir(cliPath.dirname(__filename));
            console.log(cliPath.dirname(__filename));
            console.log('Updating config file...');
            require('./dist/lib/initialization');
            console.log('Config file successfully updated');
        } catch (e) {
            console.error(`Failed to change directory: ${e}`);
            process.exit(1);
        }
        break;
    default:
        console.log('Unknown Command');
        process.exit(1);
}
