var gulp = require('gulp');
var fs = require("fs");
var liferay = require("liferay-json");
var winston = require("winston");
var logger = new winston.Logger({
    level: 'debug',
    transports: [
        new (winston.transports.Console)()
    ]
});

var config = {};
var configDummy = {
    server: "liferay server url",
    user: "email adress of liferay user",
    "base64auth": "base64 encoded email:password for authentication"
};
var configFile = "./config.json";
try {
    config = JSON.parse(fs.readFileSync(configFile));
} catch (error) {
    logger.error("Please create config file " + configFile + " with the following syntax in the current directory");
    logger.error(JSON.stringify(configDummy) + "\n");
    throw new Error("Could not find config file: " + configFile);
}


gulp.task("get-templates", function () {
    var templateConfig = JSON.parse(fs.readFileSync('./template.json'));

    templateConfig.forEach(function (template) {

        var cmd = {
            '/journaltemplate/get-template': {
                "groupId": template.groupId,
                "templateId": template.templateId
            }
        };
        liferay.invoke_liferay(config, cmd, function (body) {
            logger.info("Writing template " + body.nameCurrentValue + " to " + template.filename);
            fs.writeFile(template.filename, body.xsl);
        });
    });
});

gulp.task("update-template", function () {
    var templateConfig = JSON.parse(fs.readFileSync('./template.json'));

    var minimist = require('minimist');
    var options = minimist(process.argv.slice(2));

    if (options && options.templateFilename) {
        logger.info("Using templateFilename " + options.templateFilemame);

        templateConfig.filter(function(searchtemplate) { return searchtemplate.filename === options.templateFilename; }).forEach(function (template) {
            var templateFileContent = fs.readFileSync(template.filename).toString();
            var cmd = {
                "$template = /journaltemplate/get-template": {
                    "groupId": template.groupId,
                    "templateId": template.templateId,
                    "$update = /journaltemplate/update-template": {
                        "groupId": template.groupId,
                        "templateId": template.templateId,
                        "@structureId": "$template.structureId",
                        "nameMap": { "en_US": template.name },
                        "descriptionMap": null,
                        "xsl": templateFileContent,
                        "formatXsl": false,
                        "@langType": "$template.langType",
                        "@cacheable": "$template.cacheable"
                    }
                }
            };
            logger.info("Updating template " + template.name + " from " + template.filename);
            liferay.invoke_liferay(config, cmd, function (body) {
                logger.info(body);
            });
        });
    } else {
            logger.info ("Please specify a template file name, e.g.:");
             templateConfig.forEach(function (template) {
                 logger.info("gulp update-template --templateFilename " + template.filename);
             });
    }
});
