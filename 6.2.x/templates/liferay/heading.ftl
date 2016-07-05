<#assign layout_service = serviceLocator.findService("com.liferay.portal.service.LayoutLocalService") />
<#assign theme_display = request["theme-display"] />
<#assign plid = theme_display["plid"] />
<#assign layout = layout_service.getLayout(plid?number) />
<#assign hasUpdatePermissons = layoutPermission.contains(permissionChecker, layout, "UPDATE")/>

<#assign css_class = ""/>

<#if heading.heading_type.data == "page-heading">
	<#assign css_class = "block-container no-padding standard-padding-vertical page-heading" />
	<#assign tag = "h1"/>
<#elseif heading.heading_type.data == "section-heading">
	<#assign css_class = "section-heading" />
	<#assign tag = "h2" />
<#else>
	<#assign tag = heading.heading_type.data />
</#if>

<#if heading.data?has_content || subheading.data?has_content>
	<div class="${css_class} ${heading.heading_alignment.data}" id="heading-${.vars['reserved-article-id'].data}">
		<#if preheading?? && preheading.data?has_content>
			<#assign preheading_css_class = preheading.preheading_color.data + " preheading w100 " + preheading.preheading_alignment.data />
			<#assign preheading_attrs = "" />

			<#if hasUpdatePermissons>
				<#assign preheading_css_class = preheading_css_class + " live-edit" />
				<#assign preheading_attrs = preheading_attrs + "
					data-article-id='${.vars[\"reserved-article-id\"].data}'
					data-level-path='${preheading.name}::0'
				" />
			</#if>

			<p class="${preheading_css_class}" ${preheading_attrs}>
				${preheading.data?upper_case}
			</p>

		</#if>

		<#if heading.data?has_content>
			<#assign heading_css_class = heading.heading_color.data + " w100 " + heading.heading_alignment.data/>
			<#assign heading_attrs = "" />

			<#if hasUpdatePermissons>
				<#assign heading_css_class = heading_css_class + " live-edit" />
				<#assign heading_attrs = heading_attrs + "
					data-article-id='${.vars[\"reserved-article-id\"].data}'
					data-level-path='${heading.name}::0'
				" />
			</#if>

			<${tag} class="${heading_css_class}" ${heading_attrs}>
				${heading.data}
			</${tag}>
		</#if>

		<#if subheading.data?has_content>
			<#assign subheading_css_class = subheading.subheading_color.data + " w100 " + subheading.subheading_alignment.data />
			<#assign subheading_attrs = "" />

			<#if hasUpdatePermissons>
				<#assign subheading_css_class = subheading_css_class + " live-edit" />
				<#assign subheading_attrs = subheading_attrs + "
					data-article-id='${.vars[\"reserved-article-id\"].data}'
					data-level-path='${subheading.name}::0'
				" />
			</#if>

			<p
				class="${subheading_css_class}"
				${subheading_attrs}
			>
				${subheading.data}
			</p>
		</#if>
	</div>
</#if>