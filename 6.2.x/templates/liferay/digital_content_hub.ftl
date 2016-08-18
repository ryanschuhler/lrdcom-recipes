<#assign journal_article_local_service = serviceLocator.findService("com.liferay.portlet.journal.service.JournalArticleLocalService") />

<#assign service_context = objectUtil("com.liferay.portal.service.ServiceContextThreadLocal").getServiceContext() />
<#assign http_servlet_request = service_context.getRequest() />

<#assign theme_display = request["theme-display"] />
<#assign plid = theme_display["plid"]?number />
<#assign layout_local_service = serviceLocator.findService("com.liferay.portal.service.LayoutLocalService") />
<#assign layout = layout_local_service.getLayout(plid)! />

<div class="content-hub">
	<#list article_ids.siblings as article_id>
		<#assign content_wrapper_created = "" />
		<#assign end_content = article_ids.siblings?size - 2 />

		<#if article_id.data?has_content>
			<#assign css_class = "article-wrapper" />

			<#if article_id_index == 1>
				<#if article_id.no_copy.data?string == "true">
					<#assign css_class = css_class + " max-med" />
				<#else>
					<div class="content-wrapper large-padding-vertical">
					<#assign content_wrapper_created = "true" />
				</#if>
			</#if>

			<#if article_id_index == 2 && content_wrapper_created != "true">
				<div class="content-wrapper large-padding-vertical">
			</#if>

			<div class="${css_class}">
				${journalContentUtil.getContent(groupId, article_id.data, "", locale, xmlRequest)}

				<#assign article = journal_article_local_service.fetchLatestArticle(groupId, article_id.data, 0)! />

				<#if layoutPermission.contains(permissionChecker, layout, "UPDATE") && article??>
					<#assign edit_url = get_edit_url(article, request.attributes.CURRENT_COMPLETE_URL!, http_servlet_request) />

					<div class="icons-container lfr-meta-actions">
						<div class="lfr-icon-actions">
							<span class="lfr-icon-action lfr-icon-action-edit lfr-meta-actions">
								<div class="edit-wrapper">
									<a class="taglib-icon" href="${edit_url}">
										<img alt="Edit" src="/osb-community-theme/images/spacer.png" style="background-image: url('/osb-community-theme/sprite/images/common/_sprite.png'); background-position: 50% -608px; background-repeat: no-repeat; height: 16px; width: 16px;">
										<span class="taglib-text">Edit</span>
									</a>
								</div>
							</span>
						</div>
					</div>
				</#if>
			</div>

			<#if article_id_index == end_content>
				</div>
			</#if>
		</#if>
	</#list>

	<#if related_resource.siblings?has_content || sources.siblings?has_content>
		<div class="max-med related-resources-sources standard-padding">
			<#if related_resource.data?has_content>
				<div class="related-resources standard-padding">
					<#assign resources_title = '${languageUtil.get(locale, "related-resources", "Related Resources")}' />

					<h2>${resources_title}</h2>

					<ul class="resource-list unstyled">
						<#list related_resource.siblings as cur_related_resource>
							<li><a href="${cur_related_resource.resource_url.data}">${cur_related_resource.data}</a></li>
						</#list>
					</ul>
				</div>
			</#if>

			<#if sources.data?has_content>
				<div class="alt-font-color sources standard-padding">
					<#assign sources_title = '${languageUtil.get(locale, "sources", "Sources")}' />

					<h5>${sources_title?upper_case}</h5>

					<ul class="source-list unstyled">
						<#list sources.siblings as cur_source>
							<li>${cur_source_index + 1}. ${cur_source.data}</li>
						</#list>
					</ul>
				</div>
			</#if>
		</div>
	</#if>
</div>

<#function get_edit_url article current_url http_servlet_request>
	<#assign edit_url = portletURLFactory.create(http_servlet_request, "15", plid, "0") />

	<#assign VOID = edit_url.setParameter("p_p_state", "maximized") />
	<#assign VOID = edit_url.setParameter("p_p_lifecycle", "0") />
	<#assign VOID = edit_url.setParameter("groupId", "${groupId}") />
	<#assign VOID = edit_url.setParameter("struts_action", "/journal/edit_article") />
	<#assign VOID = edit_url.setParameter("redirect", "${current_url}") />
	<#assign VOID = edit_url.setParameter("articleId", "${article.getArticleId()?string}") />

	<#return edit_url>
</#function>

<style type="text/css">
	.article-wrapper {
		position: relative;
	}

	.aui .quote-section .source-text {
		font-size: 0.8em;
		margin: 0;
		padding: 1em 0;
	}

	.content-hub .content-wrapper .introduction {
		font-size: 1.5em;
	}

	.content-hub .content-wrapper .quote-section p {
		font-size: 1em;
	}

	.content-hub .content-wrapper table p {
		font-size: 1em;
		line-height: 20px;
	}

	.content-hub .content-wrapper p, .content-hub .content-wrapper li {
		font-size: 1.3em;
		line-height: 1.6;
	}
</style>