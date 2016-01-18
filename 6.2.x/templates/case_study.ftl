<#include "${templatesPath}/43374" />

<style>
	figcaption {
		padding: .5em 0 1em;
	}

	figure {
		margin: 0;
		text-align: center;
		width: 100%;
	}

	sup {
		font-size: 0.3em;
		top: -1.5em;
	}

	.btn-wrapper {
		margin-top: 1.5em;
	}

	.carousel menu {
		background: none;
		bottom: 0;
		right: 50%;
	}

	.carousel-banner img {
		bottom: 0;
		left: 0;
		margin: auto;
		max-height: 450px;
		right: 0;
	}

	.carousel-banner .carousel-menu-item, .carousel-menu-next, .carousel-menu-pause, .carousel-menu-prev {
		display: none;
	}

	.carousel-item {
		visibility: hidden;
	}

	.carousel-item.carousel-item-active {
		visibility: visible;
	}

	.fact-panel .carousel-content a {
		background: none;
		border: 1px solid #1C75B9;
	}

	.fact-panel .carousel-content a.carousel-menu-active {
		background-color: #1C75B9;
	}

	.no-menu menu {
		display: none;
	}

	.quote {
		font-size: 1.5em;
		font-weight: bolder;
		padding: .5em 0;
	}

	.quote-left, .quote-right {
		display: inline-block;
	}

	.quote-left {
		border-bottom: 10px solid transparent;
		border-left: 10px solid currentColor;
		border-right: 10px solid transparent;
		border-top: 10px solid currentColor;
	}

	.quote-right {
		border-bottom: 10px solid currentColor;
		border-left: 10px solid transparent;
		border-right: 10px solid currentColor;
		border-top: 10px solid transparent;
		float: right;
	}

	.quotee {
		font-size: 1.25em;
	}

	.quotee-info {
		font-size: 1.1em;
	}

	.quote-source {
		padding-top: 2em;
	}

	.stat {
		border-bottom: 1px solid #1C75B9;
		font-size: 2.5em;
	}

	.story-heading {
		border-bottom: 1px solid #909295;
		margin-bottom: 1em;
	}

	.story-heading .user-story-video {
		border: 1px solid #909295;
		border-bottom-width: 0;
		-ms-border-radius: 2em 2em 0 0;
		-moz-border-radius: 2em 2em 0 0;
		-webkit-border-radius: 2em 2em 0 0;
		border-radius: 2em 2em 0 0;
		padding: 2em 2em 0 2em;
	}

	.user-story-video {
		cursor: pointer;
		display: inline-block;
		-webkit-transition: opacity .3s ease;
		-moz-transition: opacity .3s ease;
		-ms-transition: opacity .3s ease;
		opacity: 0.6;
		position: relative;
		transition: opacity .3s ease;
	}

	.user-story-video:after {
		background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MSA1MSI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTTQ5LjggMjUuNGMwIDEzLjMtMTAuOCAyNC4xLTI0LjEgMjQuMVMxLjUgMzguNyAxLjUgMjUuNCAxMi4zIDEuMiAyNS42IDEuMiA0OS44IDEyIDQ5LjggMjUuNHoiLz48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMTkuMSAxNGwxOS43IDExLjQtMTkuNyAxMS40VjE0eiIvPjwvc3ZnPgo=") no-repeat center center;
		bottom: 0;
		content: "";
		height: 51px;
		left: 0;
		margin: auto;
		position: absolute;
		right: 0;
		top: 0;
		width: 51px;
	}

	.user-story-video:hover {
		opacity: 1;
	}
</style>

<div class="max-full user-story">
	<#if video_id.data?has_content || company_name.logo.data?has_content || additional_img.data?has_content>
		<div class="story-heading text-center w100">
			<#if video_id.data?has_content>
				<div class="pop-up">
					<div class="pop-up-trigger user-story-video">
						<img alt="User Story Video" src="//img.youtube.com/vi/${video_id.data}/0.jpg" />
					</div>

					<div class="pop-up-content"></div>
				</div>
			<#elseif additional_img.data?has_content>
				<div class="carousel-banner" id="carouselBanner">
					<#list additional_img.siblings as image>
						<img alt="User Story Image" src="${image.data}" />
					</#list>
				</div>
			<#elseif company_name.logo.data?has_content>
				<img alt="Company Logo" class="company-logo" src="${company_name.logo.data}" />
			</#if>
		</div>
	</#if>

	<div class="block-container story-body">
		<#if !quick_fact.data?has_content && !quote.data?has_content>
			<#assign body_css_class = "w100">
		<#elseif !quick_fact.data?has_content>
			<#assign body_css_class = "w70">
		<#elseif !quote.data?has_content>
			<#assign body_css_class = "w80">
		<#else>
			<#assign body_css_class = "w50">
		</#if>

		<#if quick_fact.data?has_content>
			<div class="block fact-panel large-padding-vertical left-block w20">
				<#assign css_class = "">

				<#if quick_fact.siblings?size == 0>
					<#assign css_class = "no-menu">
				</#if>

				<div class="${css_class}" id="quickFacts">
					<#list quick_fact.siblings as fact>
						<figure class="accent-color">
							<div class="stat">
								${fact.data}
								<sup>${fact.unit.data}</sup>
							</div>

							<figcaption class="primary-color">${fact.description.data}</figcaption>
						</figure>
					</#list>
				</div>
			</div>
		</#if>

		<div class="block middle-block ${body_css_class}">
			<h1 class="primary-color small-padding-vertical">
				${company_name.data}
			</h1>

			<#list subheading.siblings as cur_subheading>
				<#if cur_subheading.data?has_content>
					<h2>${cur_subheading.data}</h2>
				</#if>

				<#list cur_subheading.summary_paragraph.siblings as paragraph>
					<#if paragraph.data?has_content>
						<p>${paragraph.data}</p>
					</#if>
				</#list>
			</#list>

			<div class="btn-wrapper">
				<#list asset.siblings as asset_url>
					<#if asset_url?has_content>
						<a class="btn" href="${asset_url.data}" target="_blank">${localize("case-study")}</a>
					</#if>
				</#list>
			</div>
		</div>

		<#if quote.data?has_content>
			<div class="block large-padding-vertical right-block quote-panel w30">
				<div class="quote-section">
					<span class="accent-color quote-left"></span><span class="accent-color quote-left"></span>

					<div class="primary-color quote">
						${quote.data}
					</div>

					<span class="accent-color quote-right"></span><span class="accent-color quote-right"></span>

					<div class="alt-font-color quote-source">
						<div class="quotee">
							${quote.quotee.data}
						</div>

						<#if quote.quotee_info.data?has_content>
							<div class="quotee-info">
								${quote.quotee_info.data}
							</div>
						</#if>
					</div>
				</div>
			</div>
		</#if>
	</div>
</div>

<script type="text/javascript">
	AUI().ready(
	'aui-carousel',
	'pop-up',
	function(A) {
		var activateCallback = function(classToggleInstance, node, targetNodes, targetClass) {
			var nodeContent = '<iframe allowfullscreen="true" frameborder="0" height="450" src="//www.youtube.com/embed/' + '${video_id.data}' + '?wmode=transparent&autoplay=1&controls=0&showinfo=0&rel=0" width="100%"></iframe>';

			var targetNodesContent = targetNodes.one('.' + classToggleInstance.get('baseClassName') + '-content');

			if (targetNodesContent) {
				targetNodesContent.setContent(nodeContent);
			}
		};

		var deactivateCallback = function(classToggleInstance, node, targetNodes, targetClass) {
				var targetNodesContent = targetNodes.one('.' + classToggleInstance.get('baseClassName') + '-content');

				if (targetNodesContent) {
					targetNodesContent.empty();
				}
		}

		new A.PopUp(
			{
				activateCallback: activateCallback,
				deactivateCallback: deactivateCallback,
				defaultCallbacks: false,
				overlayCssClass: ' video-overlay'
			}
		).render();

		if (A.one('#quickFacts')) {
			new A.Carousel(
				{
					activeIndex: 'rand',
					animationTime: 1.5,
					contentBox: '#quickFacts',
					intervalTime: 5,
					height: A.one('#quickFacts figure').outerHeight(true)
				}
			).render();
		}

		if (A.one('#carouselBanner')) {
			new A.Carousel(
				{
					animationTime: 1.5,
					contentBox: '#carouselBanner',
					intervalTime: 5,
					height: A.one('#carouselBanner img').outerHeight(true)
				}
			).render();
		}
	}
);
</script>