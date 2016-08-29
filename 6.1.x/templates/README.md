# gulp Template management
==========================


Configuration

Currently this Gulp script requires a JSON config file with credentials for a Liferay server in the following format:

Filename: config.json

<pre>{
    "server": "liferay server url",
    "user": "email adress of liferay user",
    "base64auth": "base64 encoded email:password for authentication, obtained e.g. by calling btoa(email:pass)"
}
</pre>


The file [template.json](template.json) contains an array of the currently wired template files that gulp can administer. It is important to include all fields here as e.g. the name is used when updating the template. 


<pre>
{
        "groupId": "67510365",
        "templateId": "71756485",
        "filename": "events2016/ddl-agenda-recap-template.vm",
        "name": "DDL Agenda Recap Template"
}

</pre>
 
# To copy template files (e.g. freemarker or velocity) from the Liferay server to your filesystem (currently always all configured templates are fetched):

<pre>gulp get-templates </pre>

If the version on prod is different from what is checked into git, then the differences will show up here. 

# To update a template file on the Liferay server from your filesystem: 

<pre> gulp update-template --templateFilename <templatefilename></pre>

Calling the update-template function without any argument will cause it to spit out a list of update commands for the currently configured list of templates:

<pre> gulp update-template</pre>

***NOTE: This will directly update templates on prod so be careful.***

Structure XML
=====================

Currently the structure XML will be returned and stored multiple times if there are templates that use the same structure. Maybe come up with a better way of handling that?



