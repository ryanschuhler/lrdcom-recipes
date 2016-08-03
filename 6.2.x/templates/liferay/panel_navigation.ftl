<#assign article_namespace = "article${.vars['reserved-article-id'].data}" />

<#assign container_css_class = "" />

<#if css_class.data?has_content>
	<#assign container_css_class = css_class.data />
</#if>

<div class="align-center block-container justify-center ${container_css_class}" id="${article_namespace}">
	<#list panel_url.siblings as panel>
		<#assign panel_href = "javascript:;" />

		<#if panel.data?has_content>
			<#assign panel_href = panel.data />
		</#if>

		<#assign panel_css = "" />

		<#if panel.panel_css_class.data?has_content>
			<#assign panel_css = panel.panel_css_class.data />
		</#if>

		<div class="block preview-block tablet-w50">
			<a class="panel panel-${panel_index + 1} standard-padding-horizontal text-center ${panel_css}" href="${panel_href}">
				<#if panel.svg_icon.data?has_content>
					<div class="large-padding-vertical">
						${panel.svg_icon.data}
					</div>
				</#if>
				<#if panel.heading.data?has_content>
					<h2>${panel.heading.data}</h2>
				</#if>

				<#if panel.description.data?has_content>
					<p class="font-color panel-description">${panel.description.data}</p>
				</#if>

				<#if panel.cta_text.data?has_content>
					<#assign cta_css_class = "cta standard-padding-vertical text-center" />

					<#if panel.cta_text.cta_css_class.data?has_content>
						<#assign cta_css_class = cta_css_class + " panel.cta_text.cta_css_class.data" />
					</#if>

					<div class="${cta_css_class}">
						${panel.cta_text.data}
						<svg class="cta-icon" height="10" width="8"><use xlink:href="#caret" /></svg>
					</div>
				</#if>
			</a>
		</div>
	</#list>
</div>

<style>
#${article_namespace} .panel {
	border-color: transparent;
}

#${article_namespace} .panel {
	padding-bottom: 3em;
	-webkit-transition: all .5s;
	transition: all .5s;
}

<#list panel_url.siblings as panel>
	<#assign hover_color = panel.panel_hover_color.data />

	#${article_namespace} .panel-${panel_index + 1}:hover {
		border-color: ${hover_color};
	}

	#${article_namespace} .panel-${panel_index + 1}:hover h2 {
		color: ${hover_color};
	}

	#${article_namespace} .panel-${panel_index + 1} h2 {
		color: ${panel.heading.heading_color.data};
	}
</#list>
</style>