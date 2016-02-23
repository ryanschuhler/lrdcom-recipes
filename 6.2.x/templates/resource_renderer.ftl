<#assign dl_file_entry_local_service_util = staticUtil["com.liferay.portlet.documentlibrary.service.DLFileEntryLocalServiceUtil"]>
<#assign dl_file_util = staticUtil["com.liferay.portlet.documentlibrary.util.DLUtil"]>
<#assign journal_article_local_service_util = staticUtil["com.liferay.portlet.journal.service.JournalArticleLocalServiceUtil"] />
<#assign journal_content_util = staticUtil["com.liferay.portlet.journalcontent.util.JournalContentUtil"] />

<#assign service_context = objectUtil("com.liferay.portal.service.ServiceContextThreadLocal").getServiceContext() />
<#assign http_servlet_request = service_context.getRequest() />

<#assign folder_id = paramUtil.getLong(http_servlet_request, "folderId") />
<#assign resource_id = paramUtil.getLong(http_servlet_request, "resourceId") />
<#assign title = paramUtil.getString(http_servlet_request, "title") />

<#assign hubspot_form_article_id = "691288" />

<a href="/resources">< Back</a>

<div class="resource-display">
	<#if dl_file_entry_local_service_util.fetchFileEntry(groupId, folder_id, title)??>
		<#assign dl_file_entry = dl_file_entry_local_service_util.fetchFileEntry(groupId, folder_id, title) />
	<#elseif dl_file_entry_local_service_util.fetchDLFileEntry(resource_id)??>
		<#assign dl_file_entry = dl_file_entry_local_service_util.fetchDLFileEntry(resource_id) />
	</#if>

	<#if journal_article_local_service_util.fetchArticleByUrlTitle(groupId, title)??>
		<#assign article = journal_article_local_service_util.fetchArticleByUrlTitle(groupId, title) />
	<#elseif journal_article_local_service_util.fetchArticle(groupId, resource_id?string)??>
		<#assign article = journal_article_local_service_util.fetchArticle(groupId, resource_id?string) />
	</#if>

	<#if article??>
		<div class="block-container">
		${journal_content_util.getContent(groupId, article.getArticleId()?string, "", locale, xmlRequest)}
		</div>
	<#elseif dl_file_entry??>
	<#-- <#assign dl_file_entry_url = dl_file_util.getImagePreviewURL(dl_file_entry, http_servlet_request.getAttribute("LIFERAY_SHARED_THEME_DISPLAY")) /> -->
	<#-- <#assign dl_file_entry_url = "/html/themes/control_panel/images/file_system/large/pdf.png" /> -->
		<#assign dl_file_entry_url = "/documents/" + groupId + "/" + dl_file_entry.getFolderId() + "/" + dl_file_entry.getTitle() />

		<div class="align-center block-container justify-center large-padding max-lg">
			<div class="block left-block text-center title-image w30">
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 145 188">
					<path class="secondary-fill" d="M144,118l-69,69h66.1c1.6,0,2.9-1.3,2.9-2.9V118z"/>
					<polygon class="alt-secondary-fill" points="75,187 135.3,187 105.1,156.9 "/>
					<path class="primary-fill" d="M83,1l61,61V4c0-1.7-1.3-3-3-3H83z"/>
					<polygon class="accent-fill" points="144,62 144,25.1 125.5,43.5 "/>
					<path class="element-stroke transparent-fill" d="M141.5,187.5H3.5c-1.6,0-3-1.4-3-3V3.5c0-1.6,1.4-3,3-3h138c1.6,0,3,1.4,3,3v181 C144.5,186.1,143.1,187.5,141.5,187.5z"/>

					<svg x="10%" viewBox="0 0 152 36" width="80%">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#liferayLogo-liferay"></use>
						<use class="logo-border" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#liferayLogo-logoBorder"></use>
						<use class="light-fill" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#liferayLogo-gradientLightest"></use>
						<use class="logo-gradient-light" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#liferayLogo-gradientLight"></use>
						<use class="logo-gradient-dark" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#liferayLogo-gradientDark"></use>
						<use class="logo-gradient-darkest" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#liferayLogo-gradientDarkest"></use>
					</svg>
				</svg>
			</div>

			<div class="block right-block w70">
				<h1 class="title">${dl_file_entry.getTitle()}</h1>
				<p class="description">${dl_file_entry.getDescription()}</p>

				<#assign embed_asset_id = dl_file_entry.getFileEntryId() />

				<#assign document = saxReaderUtil.read(xmlRequest) />
				<#assign root_element = document.getRootElement() />
				<#assign element = root_element.addElement("asset-id") />
				<#assign element = element.addText(embed_asset_id?string) />

				${journal_content_util.getContent(groupId, hubspot_form_article_id, "", locale, document.asXML())!}
			</div>
		</div>
	<#else>
		Thank you for playing. Unfortunately you have chosen poorly and this marks then end of your "Choose Your Own Adventure" journey.
	</#if>
</div>