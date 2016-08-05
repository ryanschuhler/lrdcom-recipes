<#assign article_namespace = "article${.vars['reserved-article-id'].data}" />
<div class="align-center block-container justify-center" id="${article_namespace}">
	<#list cta_url.siblings as cta>
		<#assign cta_href = "javascript:;" />

		<#if cta.data?has_content>
			<#assign cta_href = cta.data />
		</#if>

		<div class="block card-block preview-block">
			<a class="large-padding-vertical cta-${cta_index + 1} cta-block standard-padding-horizontal text-center" href="${cta_href}">
				<#if cta.svg_icon.data?has_content>
					<div>${cta.svg_icon.data}</div>
				</#if>

				<#if cta.heading.data?has_content>
					<h2>${cta.heading.data}</h2>
				</#if>

				<#if cta.description.data?has_content>
					<p class="font-color">${cta.description.data}</p>
				</#if>

				<#if cta.cta_text.data?has_content>
					<div class="cta standard-padding-vertical text-center">
						${cta.cta_text.data}
						<svg class="cta-icon" height="10" width="8"><use xlink:href="#caret" /></svg>
					</div>
				</#if>
			</a>
		</div>
	</#list>
</div>

<style>
#${article_namespace} .cta-block {
	border-color: transparent;

	-webkit-transition: all .5s;
	transition: all .5s;
}

<#list cta_url.siblings as cta>
	<#assign hover_color = cta.hover_color.data />

	#${article_namespace} .cta-${cta_index + 1}:hover {
		border-color: ${hover_color};
	}

	#${article_namespace} .cta-${cta_index + 1}:hover h2 {
		color: ${hover_color};
	}

	#${article_namespace} .cta-${cta_index + 1} h2 {
		color: ${cta.heading.heading_color.data};
	}
</#list>

@media (min-width: 768px) and (max-width: 1199px) {
	<#assign count = cta_url.siblings?size />

	<#if count % 2 = 0>
		#${article_namespace} .preview-block {
			width: 50%;
		}
	<#else>
		#${article_namespace} .preview-block {
			width: 33.33%;
		}
	</#if>
}
</style>