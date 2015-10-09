<#assign journal_article_local_service = serviceLocator.findService("com.liferay.portlet.journal.service.JournalArticleLocalService") />
<#assign journal_content_util = staticUtil["com.liferay.portlet.journalcontent.util.JournalContentUtil"] />

<#assign themeDisplay = request["theme-display"] />
<#assign plid = themeDisplay["plid"]?number />
<#assign layoutService = serviceLocator.findService("com.liferay.portal.service.LayoutLocalService") />
<#assign layout = layoutService.getLayout(plid) />
<#assign userHasPermissions = layoutPermission.contains(permissionChecker, layout, "UPDATE") />

<div class="block-container no-padding" id="article${.vars['reserved-article-id'].data}">
	<#list block.siblings as block>
		<#if block.background_color.data?has_content>
			<#assign color_class = block.background_color.data />
		<#else>
			<#assign color_class = "" />
		</#if>

		<#if block.background_image.data?has_content>
			<#assign background_image_selector = "style='background-image: url(${block.background_image.data});'" />
		<#else>
			<#assign background_image_selector = "" />
		</#if>

		<div class="bento bento-section-${block_index + 1} block ${color_class} ${block.width.data} ${block.data} responsive-justify-center" ${background_image_selector}>
			<#if block.article_id.data?has_content && journal_article_local_service.hasArticle(groupId, block.article_id.data)>
				${journal_content_util.getContent(groupId, block.article_id.data, "", locale, xmlRequest)}

				<#if userHasPermissions>
					<#assign service_context = staticUtil["com.liferay.portal.service.ServiceContextThreadLocal"].getServiceContext() />
					<#assign http_servlet_request = service_context.getRequest() />

					<#assign currentURL = request.attributes.CURRENT_COMPLETE_URL />

					<#assign editURL = portletURLFactory.create(http_servlet_request, "15", plid, "0") />
					<#assign VOID = editURL.setParameter("p_p_state", "maximized") />
					<#assign VOID = editURL.setParameter("p_p_lifecycle", "0") />
					<#assign VOID = editURL.setParameter("groupId", "${groupId}") />
					<#assign VOID = editURL.setParameter("struts_action", "/journal/edit_article") />
					<#assign VOID = editURL.setParameter("redirect", "${currentURL}") />
					<#assign VOID = editURL.setParameter("articleId", "${block.article_id.data}") />

					<span class="lfr-icon-action lfr-icon-action-edit lfr-meta-actions pull-right">
						<a href="${editURL}" class="taglib-icon">
							<img src="/osb-community-theme/images/spacer.png" alt="Edit" style="background-image: url('/osb-community-theme/sprite/images/common/_sprite.png'); background-position: 50% -608px; background-repeat: no-repeat; height: 16px; width: 16px;">
							<span class="taglib-text ">Edit</span>
						</a>
					</span>
				</#if>
			<#else>
				<#if userHasPermissions>
					<span class="lfr-configurator-visibility">
						Please input an article id.
					</span>
				</#if>
			</#if>
		</div>
	</#list>
</div>

<style type="text/css">
	.aui .bento {
		background-position: center;
		background-size: cover;
		min-height: 400px;
	}

	<#if css?? && css.data?has_content>
		${css.data}
	</#if>
</style>