<#if dxp_curves.curve_background_color??>
	<#if dxp_curves.curve_background_color.data != "none">
		<#assign fill_value = stringUtil.replace(dxp_curves.curve_background_color.data, "#", "%23") />
	<#else>
		<#assign fill_value = dxp_curves.curve_background_color.data />
	</#if>
</#if>

<#if dxp_curves.curve_border_color??>
	<#if dxp_curves.curve_border_color.data != "none">
		<#assign stroke_value = stringUtil.replace(dxp_curves.curve_border_color.data, "#", "%23") />
	<#else>
		<#assign stroke_value = dxp_curves.curve_border_color.data />
	</#if>
</#if>

<#if dxp_curves.top_curve??>
	<#if dxp_curves.top_curve.data == "quote_top_curve">
		<#assign top_curve_url = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 96'%3E%3Ctitle%3Ecurve-bottom%3C/title%3E%3Cpath d='M1440 0v19.14C458.73 152.68 0 31.64 0 31.64V0z' fill='${fill_value}' stroke='${stroke_value}'/%3E%3C/svg%3E" />
	</#if>
</#if>

<#if dxp_curves.bottom_curve??>
	<#if dxp_curves.bottom_curve.data == "quote_bottom_curve">
		<#assign bottom_curve_url = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 96'%3E%3Ctitle%3Ecurve-top%3C/title%3E%3Cpath d='M1440 96V54.35C1061.41-26.22 518.58 34.78 0 73.81V96z' fill='${fill_value}' stroke='${stroke_value}'/%3E%3C/svg%3E" />
	</#if>
</#if>

<style>
.svg-curve:after, .svg-curve:before {
	height: 96px;
	min-width: 1440px;
	position: absolute;
	width: 100%;
}

.svg-curve:after {
	content: url("${top_curve_url}");
	top: 100%;
}

.svg-curve:before {
	bottom: 100%;
	content: url("${bottom_curve_url}");
}
</style>