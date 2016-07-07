<#assign layout_service = serviceLocator.findService("com.liferay.portal.service.LayoutLocalService") />
<#assign theme_display = request["theme-display"] />
<#assign plid = theme_display["plid"] />
<#assign layout = layout_service.getLayout(plid?number) />
<#assign hasUpdatePermissons = layoutPermission.contains(permissionChecker, layout, "UPDATE")/>

<div class="quote-section ${text_color.data}">
	<#if quote.data?has_content>
		<#assign quote_css_class = "" />
		<#assign quote_attrs = "" />

		<#if hasUpdatePermissons>
			<#assign quote_css_class = quote_css_class + " live-edit" />
			<#assign quote_attrs = quote_attrs + "
				data-article-id='${.vars[\"reserved-article-id\"].data}'
				data-level-path='${quote.name}::0'
			" />
		</#if>

		<div class="large-padding max-med quote">
			<p class="${quote_css_class}" ${quote_attrs}>${quote.data}</p>
		</div>
	</#if>

	<div class="max-sm quote-source">
		<#if author.data?has_content>
			<#assign author_css_class = "quote-author" />
			<#assign author_attrs = "" />

			<#if hasUpdatePermissons>
				<#assign author_css_class = author_css_class + " live-edit" />
				<#assign author_attrs = author_attrs + "
					data-article-id='${.vars[\"reserved-article-id\"].data}'
					data-level-path='${author.name}::0'
				" />
			</#if>

			<div class="${author_css_class}" ${author_attrs}>
				${author.data}
			</div>
		</#if>

		<#if author.author_title.data?has_content || author.author_company?has_content>
			<div class="author-info">
				<#if author.author_title.data?has_content>
					<#assign author_title_css_class = "author-title" />
					<#assign author_title_attrs = "" />

					<#if hasUpdatePermissons>
						<#assign author_title_css_class = author_title_css_class + " live-edit" />
						<#assign author_title_attrs = author_title_attrs + "
							data-article-id='${.vars[\"reserved-article-id\"].data}'
							data-level-path='${author.author_title.name}::0'
						" />
					</#if>

					<div class="${author_title_css_class}" ${author_title_attrs}>
						${author.author_title.data}
					</div>
				</#if>

				<#if author.author_company.data?has_content>
					<#assign author_company_css_class = "author-company" />
					<#assign author_company_attrs = "" />

					<#if hasUpdatePermissons>
						<#assign author_company_css_class = author_company_css_class + " live-edit" />
						<#assign author_company_attrs = author_company_attrs + "
							data-article-id='${.vars[\"reserved-article-id\"].data}'
							data-level-path='${author.author_company.name}::0'
						" />
					</#if>

					<div class="${author_company_css_class}" ${author_company_attrs}>
						${author.author_company.data}
					</div>
				</#if>
			</div>
		</#if>
	</div>
</div>

<#if source?? && source.data?has_content>
	<div class="source-text">
		${source.data}
	</div>
</#if>