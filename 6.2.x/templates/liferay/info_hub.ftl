<div class="info-hub">
	<#list article_ids.siblings as article_id>
		<#if article_id.data?has_content>
			<runtime-portlet name="56" instance="${article_id.data}" />
		</#if>
	</#list>

	<#if related_resource.siblings?has_content || sources.siblings?has_content>
		<div class="related-resources-sources max-med large-padding-horizontal">
			<#if related_resource.siblings?has_content>
				<div class="related-resources">
					<#assign resources_title = '${languageUtil.get(locale, "related-resources", "Related Resources")}' />

					<h2>${resources_title}</h2>

					<ul class="resource-list unstyled">
						<#list related_resource.siblings as cur_related_resource>
							<li><a href="${cur_related_resource.resource_url.data}">${cur_related_resource.data}</a></li>
						</#list>
					</ul>
				</div>
			</#if>

			<#if sources.siblings?has_content>
				<div class="sources">
					<#assign sources_title = '${languageUtil.get(locale, "sources", "Sources")}' />

					<h5>${sources_title?upper_case}</h5>

					<ul class="source-list unstyled">
						<#list sources.siblings as cur_source>
							<li>[${cur_source_index + 1}] ${cur_source.data}</li>
						</#list>
					</ul>
				</div>
			</#if>
		</div>
	</#if>
</div>