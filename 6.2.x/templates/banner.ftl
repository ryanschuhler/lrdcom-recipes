<#assign min_height = "400px" />

<#if height?? && height.data?has_content>
	<#assign min_height = height.data />
</#if>

<#if validator.isNull(media.video.data) && media.image.data?has_content>
	<#assign style = "style='background-image: url(${media.image.data}); min-height: ${min_height}'" />
<#else>
	<#assign style = "style='min-height: ${min_height};'" />
</#if>

<#if validator.isNull(media.video.data) && opacity.data?has_content>
	<#assign opacity_color = opacity.data />
	<#assign opacity_overlay = "opacity-overlay" />
<#else>
	<#assign opacity_color = "" />
	<#assign opacity_overlay = "" />
</#if>

<#assign font_color = "light-color" />

<#if media.video.data?has_content || opacity_color == "#FFF">
	<#assign font_color = "font-color" />
</#if>

<#if media.article_id.article_position?? && media.article_id.article_position.data?has_content>
	<#assign position_class = media.article_id.article_position.data>
<#else>
	<#assign position_class = position.data>
</#if>

<div class="align-center block-container justify-center main-banner ${opacity_overlay} ${position_class}" id="article-${.vars['reserved-article-id'].data}" ${style}>
	<#if media.video?? && media.video.data?has_content>
		<video autoplay="" loop="" width="100%" style="height: 100%; min-height: ${min_height}">
			<source src="${media.video.data}">

			<#if media.fallback_video.data?has_content>
				<source src="${media.fallback_video.data}">
			</#if>

			<#if media.image.data?has_content>
				<img alt="banner image" class="aui-w100" src="${media.image.data}">
			</#if>
		</video>
	</#if>

	<#if media.article_id?? && media.article_id.data?has_content>
		<#assign journal_content_util = staticUtil["com.liferay.portlet.journalcontent.util.JournalContentUtil"] />
		<#assign content_display = journal_content_util.getDisplay(groupId, media.article_id.data, "", locale, xmlRequest) />

		${content_display.getContent()}
	<#else>
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
	</#if>
</div>

<style type="text/css">
	.aui .main-banner {
		background-position: center;
		background-size: cover;
		overflow: hidden;
		position: relative;
	}

	.aui .main-banner .lego-article {
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

	<#if media.video?? && media.video.data?has_content>
		.aui .main-banner {
			overflow: hidden;
			position: relative;
		}

		.aui .main-banner video {
			bottom: 0;
			left: 0;
			min-width: 100%;
			object-fit: cover !important;
			position: absolute;
		}

		@media (max-width: 720px)
			.top-banner source {
				display: none;
			}
	</#if>

	<#if css?? && css.data?has_content>
		${css.data}
	</#if>
</style>