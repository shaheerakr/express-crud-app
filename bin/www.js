var app = require('../app'),
    config = require('../config/config.json'),
    {infoLog,errorLog} = require('../services/loggerService');



app.set('port',config.port);
app.listen(app.get('port'),() =>{
    let url = config.url+config.host+":"+config.port;
    infoLog.info("Application is running: "+url);
})