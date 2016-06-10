# Case Studies
> Adding new case studies to Liferay.com 

Please note, before adding a Case Study to the site, consider whether to have DESIGN create an svg (scalable vector graphic) logo for the Case Study. Case Studies that are Highlighted include the company’s logo. If the Case Study is going to be a Highlighted study, please create that ticket first and then link it to the LRIS ticket.

```
Code sample
function sampleCode() {
    alert('do something');
}
```

Important information about the logo request made to design: 
Please try to provide Design with an svg. This may require hunting online through google image search.
Request logo be: size of 226x64 - or view box size of 0 0 226 64

If you have retrieved the svg logo from Design, carry on with the following instructions.

Uploading Case Studies
In Control Panel, go to > Web Content > RESOURCES > CASE STUDIES
Create new case study article by clicking Add > Case Study
*If your Case Study is in a language other than English, select “Change” beside the default language. Choose a new default language. 
If the language is not one of the options, just leave it in English.

Title article as Company Name.
Note that the title will be used to create the url (ie “Autozone” url will be “/resources/case-studies/autozone”)
Fill in all applicable fields (if applicable, copy content from current case studies https://www.liferay.com/products/liferay-portal/stories)
Use the repeatable fields of Subheading and Summary Paragraph to add all content from case study to page
Note, html code must be used for any bullet points. They may be made in the following markup: 
<ul>
<li>Listed item</li>
<li>Listed item 2</li>
<li>Listed item 3</li>
</ul>
For more information about creating list items, check out this page.


Upload PDF of case study by going to the Asset Field and clicking Select
Click on RESOURCES > CASE STUDIES
If a folder for your current case study does not exist (ie. AUTOZONE), create it.
Click Add > Subfolder
Name the subfolder Company Name in ALL CAPS (ie. AUTOZONE) and Save
Click on folder for your current case study (ie. AUTOZONE)
Click Add > Case Study
Title resource as Company Name.
Fill in all applicable fields
Do not add any categories (this will be done back on the article level...see step “5. g.”)
Click Publish
Upload any assets available for the case study (ie. company logo, screenshots)
Click on the Select button on the field you want to add the asset to
Click on RESOURCES > CASE STUDIES
If a folder for your current case study does not exist (ie. AUTOZONE), create it.
Click Add > Subfolder
Name the subfolder Company Name in ALL CAPS (ie. AUTOZONE) and Save
Click on folder for your current case study (ie. AUTOZONE)
Click Add > Basic Document
Title resource to include Company Name (ie. Autozone Logo).
Do not add any categories
Click Publish
If the case study has a video, add the YouTube link to the field “Case Study Video URL ID”, rather than uploading the file directly
Back on the article edit screen, in the Content section (in the right navigation) if there are multiple assets associated with the Case Study, provide the Button Text for each Asset:
Case Study EN, Case Study FR, etc.
Presentation
Back on the article edit screen, click Categorization (in the right navigation) and categorize as follows:
Category List Filter = Resources
Industries
Locations
Resource Types = Case Studies
Solutions
Add Preview copy to the Abstract section (found in the navigation on the right, above the Publish/Drafts/Cancel Buttons).
Abstract must be 140 characters or less.
Click Publish
On the associated JIRA ticket, set the Workflow status to “Waiting for Approval” and assign it to “LR Information Services”. Someone on the Webteam will double-check your work!
