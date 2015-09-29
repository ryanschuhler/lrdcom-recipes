<#if validator.isNull(video.data) && image.data?has_content>
	<#assign style = "style='background-image: url(${image.data});'" />
<#else>
	<#assign style = "" />
</#if>

<#if validator.isNull(video.data) && opacity.data?has_content>
	<#assign opacity_color = opacity.data />
	<#assign opacity_overlay = "opacity-overlay" />
<#else>
	<#assign opacity_color = "" />
	<#assign opacity_overlay = "" />
</#if>

<#assign font_color = "light-color" />

<#if video.data?has_content || opacity_color == "#FFF">
	<#assign font_color = "font-color" />
</#if>

<div class="align-center block-container justify-center main-banner ${opacity_overlay} ${position.data}" id="article-${.vars['reserved-article-id'].data}" ${style}>
	<#if video?? && video.data?has_content>
		<video autoplay="" loop="" width="100%">
			<source src="${video.data}">

			<#if fallback_video.data?has_content>
				<source src="${fallback_video.data}">
			</#if>

			<#if image.data?has_content>
				<img alt="banner image" class="aui-w100" src="${image.data}">
			</#if>
		</video>
	</#if>

	<div class="block ${font_color} main-banner-content max-med">
		<#if heading.data?has_content>
			<div class="page-heading">
				<h1>${heading.data}</h1>

				<#if sub_heading.data?has_content>
					<p class="${font_color}">${sub_heading.data}</p>
				</#if>
			</div>
		</#if>
	</div>
</div>

<#assign min_height = "400px" />

<#if height?? && height.data?has_content>
	<#assign min_height = height.data />
</#if>

<style type="text/css">
	.aui .main-banner {
		background-position: center;
		background-size: cover;
		min-height: ${min_height};
		overflow: hidden;
		position: relative;
	}

	.aui .main-banner .main-banner-content {
		margin: 30px 10%;
		position: relative;
		z-index: 5;
	}

	.main-banner.opacity-overlay .main-banner-content:after {
		background-color: ${opacity_color};
		bottom: -200%;
		content: "";
		display: block;
		left: -200%;
		opacity: .75;
		position: absolute;
		right: -200%;
		top: -200%;
		z-index: -1;
		-ms-transform: skew(135deg);
		-webkit-transform: skew(135deg);
		-moz-transform: skew(135deg);
		-o-transform: skew(135deg);
		transform: skew(135deg);
		transform-origin: center;
	}

	.main-banner.lower-left, .main-banner.upper-left {
		justify-content: flex-start;
	}

	.main-banner.upper-left .main-banner-content:after {
		right: -25%;
	}

	.main-banner.lower-left .main-banner-content:after {
		right: -25%;
		-ms-transform: skew(45deg);
		-webkit-transform: skew(45deg);
		-moz-transform: skew(45deg);
		-o-transform: skew(45deg);
		transform: skew(45deg);
	}

	.main-banner.lower-right, .main-banner.upper-right {
		justify-content: flex-end;
	}

	.main-banner.upper-right .main-banner-content:after {
		left: -25%;
	}

	.main-banner.lower-right .main-banner-content:after {
		left: -25%;
		-ms-transform: skew(45deg);
		-webkit-transform: skew(45deg);
		-moz-transform: skew(45deg);
		-o-transform: skew(45deg);
		transform: skew(45deg);
	}

	@media (max-width: 720px) {
		.responsive .main-banner.opacity-overlay .main-banner-content:after {
			left: -200%;
			right: -200%;
		}
	}

	<#if video?? && video.data?has_content>
		.aui .main-banner {
			overflow: hidden;
			position: relative;
		}

		.aui .main-banner video {
			bottom: 0;
			left: 0;
			min-height: ${min_height};
			min-width: 100%;
			object-fit: cover !important;
			position: absolute;
		}

		@media (max-width: 720px)
			.top-banner .video {
				background: url(${image.data}) no-repeat center center;
				background-size: cover;
			}
	</#if>

	<#if css?? && css.data?has_content>
			${css.data}
	</#if>
</style>