var gulp = require('gulp');
var fs = require("fs");
const path = require("path");
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

gulp.task("get-templates", function (cb) {
    var templateConfig = JSON.parse(fs.readFileSync('./template.json'));

    var foundTemplates = 0;
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
            foundTemplates++;
            if (foundTemplates == templateConfig.length) {
                cb();
            }
        });
    });
});

gulp.task("update-template", function (cb) {
    var templateConfig = JSON.parse(fs.readFileSync('./template.json'));

    var minimist = require('minimist');
    var options = minimist(process.argv.slice(2));

    if (options && options.templateFilename) {
        logger.info("Using templateFilename " + options.templateFilename);

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
                //logger.info(body);
                cb();
            });
        });
    } else {
            logger.info ("Please specify a template file name, e.g.:");
             templateConfig.forEach(function (template) {
                 logger.info("gulp update-template --templateFilename " + template.filename);
             });
    }
});



gulp.task("get-structures", function (cb) {
    var structureConfig = JSON.parse(fs.readFileSync('./structures.json'));

    var foundStructures = 0;
    var structuresWithFilename = structureConfig.filter(function(searchstructure) { return searchstructure.filename; });
    
    structuresWithFilename.forEach(function (structure) {
        var cmd = {
            '/journalstructure/get-structure': {
                "groupId": structure.groupId,
                "structureId": structure.structureId
            }
        };
        liferay.invoke_liferay(config, cmd, function (body) {
            logger.info("Writing structure XML for structure " + body.nameCurrentValue + " to " + structure.filename);
            fs.writeFile(structure.filename, body.xsd);
            foundStructures++;
            if (foundStructures == structuresWithFilename.length) {
                    cb();
            }
        });
    });
});

gulp.task("update-structure", function (cb) {
    var structureConfig = JSON.parse(fs.readFileSync('./structures.json'));
    
    structureConfig = structureConfig.filter(function(structureCandidate)  {return structureCandidate.filename; });

    var minimist = require('minimist');
    var options = minimist(process.argv.slice(2));

    if (options && options.structureFilename) {
        logger.info("Using structureFilename " + options.structureFilename);

        structureConfig.filter(function(searchtemplate) { return searchtemplate.filename === options.structureFilename; }).forEach(function (structure) {
            var fileContent = fs.readFileSync(structure.filename).toString();
            var cmd = {
                "$structure = /journalstructure/get-structure": {
                    "groupId": structure.groupId,
                    "structureId": structure.structureId,
                    "$update = /journalstructure/update-structure": {
                        "groupId": structure.groupId,
                        "structureId": structure.structureId,
                        "@parentStructureId": "$structure.parentStructureId",
                        "nameMap": { "en_US": structure.name },
                        "descriptionMap": null,
                        "xsd": fileContent
                    }
                }
            };
            logger.info("Updating structure " + structure.name + " from " + structure.filename);
            liferay.invoke_liferay(config, cmd, function (body) {
                logger.info("Updated finished for structure " + body.currentName);
                cb();
            });
        });
    } else {
            logger.info ("Please specify a structure file name, e.g.:");
             structureConfig.forEach(function (structure) {
                 logger.info("gulp update-structure --structureFilename " + structure.filename);
             });
    }
});





gulp.task("get-structure-config", function () {
    var minimist = require('minimist');
    var options = minimist(process.argv.slice(2));

    if (options && options.groupId && options.configFileName) {
        logger.info("Using groupId " + options.groupId);
        logger.info("Using config file name: " + options.configFileName);

        var cmd = {
            '/journalstructure/get-structures': {
                "groupId": options.groupId
            }
        };
        liferay.invoke_liferay(config, cmd, function (body) {

            var structureConfigArray = body.map(function(currentValue) {
                var structureConfig = {};
                structureConfig.groupId = currentValue.groupId;
                structureConfig.structureId = currentValue.structureId;
                structureConfig.name = currentValue.nameCurrentValue;
                structureConfig.description = currentValue.descriptionCurrentValue;
                structureConfig.filename = "";
                return structureConfig;
            });

            fs.writeFile(options.configFileName, JSON.stringify(structureConfigArray));
        });
    } else {
            logger.info("Syntax: gulp get-structure-config --groupId ####### --configFileName filename");
    }
});





gulp.task("search-template", function () {
  
        var cmd = {
            '/journalarticle/search': {
                "companyId":  0,
                "groupId": 67510365,
                "classNameId": 0,
                "keywords": "",
                "version": 0,
                "type": "",
                "structureId": "",
                "templateId": "78236355",
                "displayDateGT": "",
                "displayDateLT": "",
                "status": 0,
                "reviewDate": "",
                "start": 1,
                "end": 100,
                "obc": "com.liferay.portal.kernel.util.OrderByComparator"
            }
        };
        liferay.invoke_liferay(config, cmd, function (body) {

            logger.info(body);
        });

});