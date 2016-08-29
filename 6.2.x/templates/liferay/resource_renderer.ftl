<#assign dl_file_entry_local_service_util = staticUtil["com.liferay.portlet.documentlibrary.service.DLFileEntryLocalServiceUtil"]>
<#assign dl_file_util = staticUtil["com.liferay.portlet.documentlibrary.util.DLUtil"]>
<#assign journal_article_local_service_util = staticUtil["com.liferay.portlet.journal.service.JournalArticleLocalServiceUtil"] />

<#assign service_context = objectUtil("com.liferay.portal.service.ServiceContextThreadLocal").getServiceContext() />
<#assign http_servlet_request = service_context.getRequest() />

<#assign theme_display = request["theme-display"] />
<#assign plid = theme_display["plid"]?number />
<#assign layout_service = serviceLocator.findService("com.liferay.portal.service.LayoutLocalService") />
<#assign layout = layout_service.getLayout(plid)! />

<#assign folder_id = paramUtil.getLong(http_servlet_request, "folderId") />
<#assign resource_id = paramUtil.getLong(http_servlet_request, "resourceId") />
<#assign title = paramUtil.getString(http_servlet_request, "title") />

<#assign hubspot_form_article_id = "691288" />

<#include "${templatesPath}/1561886" />

<p class="standard-padding">
	<a class="cta" href="/resources">${languageUtil.format(locale, "back-to-x", languageUtil.get(locale, "resources"))}</a>
</p>

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
			${journalContentUtil.getContent(groupId, article.getArticleId()?string, "", locale, xmlRequest)}

			<#if layoutPermission.contains(permissionChecker, layout, "UPDATE")>
				<#assign current_url = request.attributes.CURRENT_COMPLETE_URL! />

				<#assign edit_url = portletURLFactory.create(http_servlet_request, "15", plid, "0") />
				<#assign VOID = edit_url.setParameter("p_p_state", "maximized") />
				<#assign VOID = edit_url.setParameter("p_p_lifecycle", "0") />
				<#assign VOID = edit_url.setParameter("groupId", "${groupId}") />
				<#assign VOID = edit_url.setParameter("struts_action", "/journal/edit_article") />
				<#assign VOID = edit_url.setParameter("redirect", "${current_url}") />
				<#assign VOID = edit_url.setParameter("articleId", "${article.getArticleId()?string}") />

				<span class="lfr-icon-action lfr-icon-action-edit lfr-meta-actions pull-right">
					<a href="${edit_url}" class="taglib-icon">
						<img src="/osb-community-theme/images/spacer.png" alt="Edit" style="background-image: url('/osb-community-theme/sprite/images/common/_sprite.png'); background-position: 50% -608px; background-repeat: no-repeat; height: 16px; width: 16px;">
						<span class="taglib-text ">Edit</span>
					</a>
				</span>
			</#if>
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
						<use xlink:href="#liferayLogo-liferay"></use>
						<use class="logo-border" xlink:href="#liferayLogo-logoBorder"></use>
						<use class="light-fill" xlink:href="#liferayLogo-gradientLightest"></use>
						<use class="logo-gradient-light" xlink:href="#liferayLogo-gradientLight"></use>
						<use class="logo-gradient-dark" xlink:href="#liferayLogo-gradientDark"></use>
						<use class="logo-gradient-darkest" xlink:href="#liferayLogo-gradientDarkest"></use>
					</svg>
				</svg>
			</div>

			<div class="block right-block w70">
				<#assign fieldsMap = dl_file_entry.getFieldsMap(dl_file_entry.getFileVersion().getFileVersionId()) />

				<#list fieldsMap.values() as field>
					<#assign title = dl_file_entry.getTitle() />
					<#assign display_title = field.get("display_title")! />

					<#if display_title?has_content && display_title.getValue()?has_content>
						<#assign title = display_title.getValue() />
					</#if>
				</#list>

				<h1 class="title">${title}</h1>

				<p class="description">${dl_file_entry.getDescription()}</p>

				<#assign embed_asset_id = dl_file_entry.getFileEntryId() />

				<runtime-portlet name="56" instance="${hubspot_form_article_id}" queryString="assetId=${embed_asset_id}" />
			</div>

			<#if layoutPermission.contains(permissionChecker, layout, "UPDATE")>
				<#assign current_url = request.attributes.CURRENT_COMPLETE_URL! />

				<#assign edit_url = portletURLFactory.create(http_servlet_request, "20", plid, "0") />
				<#assign VOID = edit_url.setParameter("p_p_state", "maximized") />
				<#assign VOID = edit_url.setParameter("p_p_lifecycle", "0") />
				<#assign VOID = edit_url.setParameter("groupId", "${groupId}") />
				<#assign VOID = edit_url.setParameter("struts_action", "/document_library/edit_file_entry") />
				<#assign VOID = edit_url.setParameter("redirect", "${current_url}") />
				<#assign VOID = edit_url.setParameter("folderId", "${dl_file_entry.getFolderId()?string}") />
				<#assign VOID = edit_url.setParameter("fileEntryId", "${dl_file_entry.getFileEntryId()?string}") />

				<span class="lfr-icon-action lfr-icon-action-edit lfr-meta-actions pull-right">
					<a href="${edit_url}" class="taglib-icon">
						<img src="/osb-community-theme/images/spacer.png" alt="Edit" style="background-image: url('/osb-community-theme/sprite/images/common/_sprite.png'); background-position: 50% -608px; background-repeat: no-repeat; height: 16px; width: 16px;">
						<span class="taglib-text ">Edit</span>
					</a>
				</span>
			</#if>
		</div>
	<#else>
		<p class="standard-padding">
			Resource not found.
		</p>
	</#if>
</div>