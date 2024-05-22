var fs = require('fs');
var path = require('path');
var configFileName = 'smart-styles.config.json';
function findRootDir(startDir) {
    var currentDir = startDir;
    while (currentDir !== path.parse(currentDir).root) {
        if (fs.existsSync(path.join(currentDir, configFileName))) {
            return currentDir;
        }
        currentDir = path.dirname(currentDir); // Move one directory up
    }
    return undefined;
}
function readConfigFile(rootDir, configFile) {
    if (configFile === void 0) { configFile = configFileName; }
    var configPath = path.join(rootDir, configFile);
    if (fs.existsSync(configPath)) {
        return fs.readFileSync(configPath, 'utf-8');
    }
    else {
        return {};
    }
}
function writeToConfigFile(content) {
    var outputPath = path.join(process.cwd(), 'config.js');
    fs.writeFileSync(outputPath, "export default ".concat(content, ";"));
}
var rootDir = findRootDir(process.cwd());
if (rootDir) {
    var config = readConfigFile(rootDir);
    writeToConfigFile(config);
}
else {
    writeToConfigFile('{}');
}
