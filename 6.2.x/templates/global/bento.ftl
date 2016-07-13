<#assign journal_article_local_service = serviceLocator.findService("com.liferay.portlet.journal.service.JournalArticleLocalService") />

<#assign service_context = staticUtil["com.liferay.portal.service.ServiceContextThreadLocal"].getServiceContext() />
<#assign http_servlet_request = service_context.getRequest() />

<#assign theme_display = request["theme-display"] />
<#assign plid = theme_display["plid"]?number />
<#assign layout_service = serviceLocator.findService("com.liferay.portal.service.LayoutLocalService") />
<#assign layout = layout_service.getLayout(plid)! />

<#assign dxp_curve_css_class = "" />

<#if dxp_curves?? && dxp_curves.data == "true">
	<#include "${templatesPath}/14421443"! />

	<div style="overflow:hidden;">
		<div class="svg-curve">
</#if>

			<div class="bento block-container no-padding ${(article_class.data)!}" id="article-${.vars['reserved-article-id'].data}">
				<#list block.siblings as block>
					<#assign image_info = "" />
					<#assign video_image_info = "" />
					<#assign video_info = "" />

					<#list block.media.siblings?reverse as cur_media>
						<#if cur_media.video_type.data?has_content>
							<#assign video_info = video_info + "<source src='" + cur_media.data + "' type='" + cur_media.video_type.data + "'>" />
						<#elseif cur_media.data?has_content>
							<#assign image_info = image_info + "background-image: url(" + cur_media.data + ");" />
							<#assign video_image_info = video_image_info + "<img src='" + cur_media.data + "' >" />
						</#if>
					</#list>

					<#assign bento_section_css = "bento-section bento-section-${block_index + 1} block ${block.background_color.data} ${block.width.data} ${block.block_class.data}" />
					<#assign bento_section_style = "" />

					<#if video_info?has_content && !browserSniffer.isMobile(http_servlet_request) && !browserSniffer.isIe(http_servlet_request)>
						<#assign bento_section_css = bento_section_css + " video-banner" />
					<#else>
						<#assign bento_section_style = "style='${image_info}'" />
					</#if>

					<div class="${bento_section_css}" ${bento_section_style} ${block.data}>
						<#if video_info?has_content && !browserSniffer.isMobile(http_servlet_request) && !browserSniffer.isIe(http_servlet_request)>
							<video autoplay class="background-video" height="100%" loop muted width="100%">
								${video_info}
								${video_image_info}
							</video>
						</#if>

						<#list block.article_id.siblings as article_id>
							<#if article_id.data?has_content && journal_article_local_service.hasArticle(groupId, article_id.data)>
								${journalContentUtil.getContent(groupId, article_id.data, "", locale, xmlRequest)!}

								<#if layoutPermission.contains(permissionChecker, layout, "UPDATE")>
									<#assign current_url = request.attributes.CURRENT_COMPLETE_URL! />

									<#assign edit_url = portletURLFactory.create(http_servlet_request, "15", plid, "0") />
									<#assign VOID = edit_url.setParameter("p_p_state", "maximized") />
									<#assign VOID = edit_url.setParameter("p_p_lifecycle", "0") />
									<#assign VOID = edit_url.setParameter("groupId", "${groupId}") />
									<#assign VOID = edit_url.setParameter("struts_action", "/journal/edit_article") />
									<#assign VOID = edit_url.setParameter("redirect", "${current_url}") />
									<#assign VOID = edit_url.setParameter("articleId", "${article_id.data}") />

									<span class="lfr-icon-action lfr-icon-action-edit lfr-meta-actions pull-right">
										<a href="${edit_url}" class="taglib-icon">
											<img src="/osb-community-theme/images/spacer.png" alt="Edit" style="background-image: url('/osb-community-theme/sprite/images/common/_sprite.png'); background-position: 50% -608px; background-repeat: no-repeat; height: 16px; width: 16px;">
											<span class="taglib-text ">Edit</span>
										</a>
									</span>
								</#if>
							</#if>
						</#list>
					</div>
				</#list>
			</div>

<#if dxp_curves?? && dxp_curves.data == "true">
		</div>
	</div>
</#if>

<#if css.data?has_content>
	<style type="text/css">
		${css.data}
	</style>
</#if>