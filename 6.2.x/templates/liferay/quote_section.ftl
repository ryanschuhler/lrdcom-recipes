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

<style>
.quote-section .quote:after, .quote-section .quote:before {
	color: rgba(128,128,128,0.2);
	font-size: 4em;
	font-weight: 600;
	position: absolute;
}

.quote-section .quote:after {
	bottom: -.5em;
	content:"\201D";
	right: 0;
}

.quote-section .quote:before {
	content:"\201C";
	left: 0;
	top: -.25em;
}

.quote-section .quote.single-quote:after {
	display: none;
}

.quote-section .quote.single-quote:before {
	display: block;
	line-height: .75em;
	position: relative;
	text-align: center;
	top: 0;
}

@media (max-width: 760px) {
	.quote-section .quote:after {
		display: none;
	}

	.quote-section .quote:before {
		display: block;
		position: relative;
		text-align: center;
		top: 0;
	}
}
</style>