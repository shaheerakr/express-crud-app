var winston = require('winston'),
    fs = require('fs'),
    config = require('../config/config.json');

let logDir = config.logs.dir;
let infoLog = config.logs.info;
let errLog = config.logs.err;

if(!fs.existsSync(logDir)){
    fs.mkdir(logDir, (err) => {
        if (err) throw err;
    });
    
}

// ALL > TRACE > DEBUG > INFO > WARN > ERROR > FATAL > OFF

// Define levels to be like log4j in java
var customLevels = {
    // Ex: debug -> info -> warning -> error.
    // A transport that handles info will not log debug messages but will log info, warning and error.
    levels: {       
        error: 1,
        info: 2,
        warn: 3,
        verbose:3,
        trace: 4,
        debug: 5,
    },
    colors: {       
        error: 'red',
        info: 'green',
        warn: 'yellow',
        verbose:'red',
        trace: 'cyan',
        debug: 'magenta'
    }
};
module.exports = {
    errorLog: winston.createLogger({
        levels: customLevels.levels,
        //colors: customLevels.colors,
        exceptionHandlers: [
            new winston.transports.File({filename: logDir+'/'+errLog})
        ],
        transports: [
            new winston.transports.File({
                name: 'error-file',
                level: 'error',
                filename: logDir+'/'+errLog,
                json: true,
                maxsize: 5242880, //5MB
                maxFiles: 5,
                colorize: true
            }),
            new (winston.transports.Console)({
                level: 'error', // Only write logs of info level or higher
                levels: 1,
                colorize: true
            })
        ],
        exitOnError: false
    }),
    infoLog: winston.createLogger({
        levels: customLevels.levels,
        //colors: customLevels.colors,
        exceptionHandlers: [
            new winston.transports.File({filename: logDir+'/'+errLog})
        ],
        transports: [
            new winston.transports.File({
                name: 'info-file',
                level: 'info',
                filename: logDir+'/'+infoLog,
                json: true,
                maxsize: 5242880, //5MB
                maxFiles: 5,
                colorize: true
            }),
            new (winston.transports.Console)({
                level: 'info', // Only write logs of info level or higher
                levels: 2,
                colorize: true
            })
        ],
        exitOnError: false,

    }),
};