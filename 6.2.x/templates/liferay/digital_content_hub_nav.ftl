<#assign portalUtil = staticUtil["com.liferay.portal.util.PortalUtil"] />

<#assign service_context = objectUtil("com.liferay.portal.service.ServiceContextThreadLocal").getServiceContext() />
<#assign http_servlet_request = service_context.getRequest() />

<#assign current_url = htmlUtil.escapeURL(portalUtil.getCurrentCompleteURL(http_servlet_request)) />
<div class="side-nav">
	<nav class="nav-wrapper standard-padding">

		<#assign summary_text = "" />

		<div class="nav-bar-mobile">
			<div class="social-icons">
				<a aria-label="Share on Facebook" class="share-facebook social-icon" href="https://facebook.com/sharer/sharer.php?u=${current_url}" target="_blank"><span class="icon icon-facebook"></span></a>
				<a aria-label="Share on LinkedIn" class="share-linkedin social-icon" href="https://www.linkedin.com/shareArticle?mini=true&url=${current_url}&title=${htmlUtil.escapeURL(summary_text)}&summary=${htmlUtil.escapeURL(summary_text)}&source=${current_url}" target="_blank"><span class="icon icon-linkedin"></span></a>
				<a aria-label="Share on Twitter" class="share-twitter social-icon" href="https://twitter.com/intent/tweet/?text=${current_url}&url=${current_url}" target="_blank"><span class="icon icon-twitter"></span></a>
			</div>
			<div class="mobile-nav-button">
				<svg height="44" width="40"><use xlink:href="#moreIcon"></use></svg>
			</div>
		</div>

		<div class="nav-content">
			<#if categories.data?has_content>
				<h4 class="nav-heading small-padding-vertical">Defining Digital</h4>

				<#list categories.siblings as category>
					<div class="nav-section small-padding-vertical">
						<h5 class="alt-font-color small-caps"><small>${category.data}</small></h5>

						<#if category.articles.data?has_content>
							<ul class="unstyled">
								<#list category.articles.siblings as article>
									<#assign url_title = stringUtil.replace(article.data?lower_case, " ", "-") />
									<#assign article_href = "/resources/l/" + url_title />

									<li class="small-padding-vertical">
										<a href="${article_href}">${article.data}</a>
									</li>
								</#list>
							</ul>
						</#if>
					</div>
				</#list>
			</#if>

			<div class="nav-section share small-padding-vertical">
				<h5 class="alt-font-color small-caps"><small>Share This Article</small></h5>

				<div class="small-padding-vertical social-icons">
					<a aria-label="Share on Facebook" class="share-facebook social-icon" href="https://facebook.com/sharer/sharer.php?u=${current_url}" target="_blank"><span class="icon icon-facebook"></span></a>
					<a aria-label="Share on LinkedIn" class="share-linkedin social-icon" href="https://www.linkedin.com/shareArticle?mini=true&url=${current_url}&title=${htmlUtil.escapeURL(summary_text)}&summary=${htmlUtil.escapeURL(summary_text)}&source=${current_url}" target="_blank"><span class="icon icon-linkedin"></span></a>
					<a aria-label="Share on Twitter" class="share-twitter social-icon" href="https://twitter.com/intent/tweet/?text=${htmlUtil.escapeURL(summary_text)}&url=${current_url}" target="_blank"><span class="icon icon-twitter"></span></a>
				</div>
			</div>

			<#if nav_ad.data?has_content>
				<div class="nav-section small-padding-vertical">
					<h5 class="alt-font-color small-caps"><small>Upcoming Webinar</small></h5>

					<a class="cta cta-light" href="${nav_ad.url.data}">
						<div class="block-container micro-banner" style="background-image: url(${nav_ad.data?string})">
							<div class="text">
								${nav_ad.text.data}
							</div>

							<span href="${nav_ad.url.data}">
								${nav_ad.cta.data} <svg class="cta-icon" height="10" width="8"><use xlink:href="#caret"></use></svg>
							</span>
						</div>
					</a>
				</div>
			</#if>
		</div>
	</nav>
</div>

<style type="text/css">
	.content-hub {
		overflow-x: hidden;
	}

	.content-hub .article-wrapper.max-med,
	.content-hub .content-wrapper .max-med:not(.quote) {
		max-width: 1200px;
		padding-left: 192px;
		padding-right: 336px;
	}

	.content-hub .content-wrapper {
		position: relative;
	}

	.content-hub .micro-banner {
		background-size: cover;
		height: 136px;
		width: 272px;
	}

	.content-hub .nav-bar-mobile {
		display: none;
		height: 32px;
		margin-bottom: 1em;
	}

	.content-hub .nav-bar-mobile .mobile-nav-button {
		position: absolute;
		right: 10px;
		top: 10px;
		transition: transform 0.25s;
	}

	.content-hub .nav-bar-mobile .mobile-nav-button:hover {
		color: #1C75B9;
	}

	.content-hub .nav-wrapper.affix {
		position: fixed;
	}

	.content-hub .nav-wrapper.transition {
		opacity: 0.2;
		transition: opacity 0.25s, top 0.35s, transform 0.25s;
	}

	.content-hub .nav-wrapper {
		background: #FFF;
		box-sizing: border-box;
		position: absolute;
		top: 4em;
		width: 304px;
		z-index: 99;
	}

	.content-hub .nav-wrapper:hover {
		opacity: 1;
	}

	.content-hub .side-nav {
		bottom: 0;
		position: absolute !important;
		right: 0;
		top: 0;
		width: 304px;
	}

	.content-hub .social-icons .social-icon {
		background: #E3E4E5;
		border-radius: 32px;
		color: #FFF;
		display: inline-block;
		font-size: 1.1em;
		height: 32px;
		line-height: 32px;
		margin-right: 0.5em;
		text-align: center;
		text-decoration: none;
		width: 32px;
	}

	.content-hub .social-icons .social-icon:hover {
		color: #FFF;
	}

	.content-hub .social-icons .social-icon.share-facebook:hover {
		background: #3B5998;
	}

	.content-hub .social-icons .social-icon.share-linkedin:hover {
		background: #0077B5;
	}

	.content-hub .social-icons .social-icon.share-twitter:hover {
		background: #55ACEE;
	}

	.content-hub .quote-section {
		margin-left: -196px;
	}

	@media all and (max-width: 979px) {
		.article-wrapper.max-med {
			padding: 1em;
		}

		.content-hub .content-wrapper .max-med:not(.quote) {
			max-width: 720px;
			padding-left: 1em;
			padding-right: 1em;
		}

		.content-hub .nav-wrapper.transition {
			opacity: 1;
		}

		.content-hub .nav-wrapper {
			background: rgba(255, 255, 255, 0.9);
			max-width: 320px;
			opacity: 1;
			position: fixed;
			right: 0;
			top: 100% !important;
			transform: translateY(-64px);
			transition: top 0.25s, transform 0.25s;
			width: 100%;
		}

		.content-hub .nav-wrapper .nav-bar-mobile {
			display: block;
		}

		.content-hub .nav-wrapper .nav-heading, .content-hub .nav-wrapper .share {
			display: none;
		}

		.content-hub .nav-wrapper.nav-open {
			height: 100%;
			top: 62px !important;
			transform: translateY(0);
			transition: top 0.25s, transform 0s;
		}

		.content-hub .nav-wrapper.nav-open .nav-bar-mobile .mobile-nav-button {
			transform: scale(1.25);
		}

		.content-hub .nav-wrapper.nav-open .nav-content {
			box-sizing: border-box;
			height: 100%;
			overflow-y: auto;
			padding: 1em 0;
		}

		.content-hub .side-nav {
			width: 100%;
		}

		.content-hub .quote-section {
			margin-left: 0;
		}

		.hide-banner .nav-wrapper:not(.nav-open) {
			transform: translateY(0);
		}

		.hide-banner .nav-wrapper.nav-open {
			top: 0 !important;
		}
	}
</style>

<script type="text/javascript">
	AUI().ready(
		'node',
		function(A) {
			var CSS_AFFIX = 'affix';

			var CSS_NAV_BOTTOM = 'nav-bottom';

			var CSS_NAV_OFFSET = 'nav-offset';

			var CSS_TRANSITION = 'transition';

			var INT_3EM = 48;

			var INT_4EM = 64;

			var INT_SCROLL_DIRECTION_BUFFER = 200;

			var STR_CLIENT_HEIGHT = 'clientHeight';

			var headerHeight = 768;
			var previousWinScrollPos = headerHeight;
			var windowHeight = window.innerHeight;
			var winPosStart = 0;

			var content = A.one('.content-wrapper');
			var mobileNavButton = A.one('.mobile-nav-button');
			var sideNav = A.one('.nav-wrapper');
			var WIN = A.getWin();

			var contentEndPos;
			var contentHeight;
			var navBottom;
			var navHeight;
			var navOffset;
			var navOffsetAbs;
			var style;
			var windowBottom;

			function createStyleTag() {
				var css = '.content-hub .nav-wrapper.nav-offset {top: ' + navOffset + 'px;} .content-hub .nav-wrapper.nav-bottom {top: ' + navBottom + 'px;}';
				var head = document.head || document.getElementsByTagName('head')[0];

				style = document.createElement('style');

				style.type = 'text/css';
				style.appendChild(document.createTextNode(css));
				head.appendChild(style);
			}

			function getUpdatedContentDimensions() {
				if (content) {
					headerHeight = content.getY();
					contentHeight = content.get(STR_CLIENT_HEIGHT);
					contentEndPos = contentHeight + headerHeight;
				}

				if (sideNav) {
					navHeight = sideNav.get(STR_CLIENT_HEIGHT);
				}

				navOffset = windowHeight - navHeight - INT_3EM;
				navBottom = contentHeight - navHeight - INT_4EM;

				navOffsetAbs = Math.abs(navOffset);

				windowBottom = contentEndPos - navHeight - INT_4EM;
			}

			function getScrollDirection(winScrollPos) {
				var scrollDirection = 0;

				if (winScrollPos >= winPosStart) {
					scrollDirection = 1;
				}

				winPosStart = winScrollPos;

				return scrollDirection;
			}

			function init() {
				createStyleTag();
				setDimensions();

				if (mobileNavButton) {
					mobileNavButton.on(
						'click',
						toggleMobileNav
					);
				}

				if (!A.UA.mobile) {
					WIN.on(
						['mousewheel', 'scroll'],
						A.throttle(
							setNavbarScrollController,
							100
						)
					);

					WIN.on(
						'resize',
						A.debounce(
							setDimensions,
							100
						)
					);
				}
			}

			function setNavbarScroll(winScrollPos) {
				var sideNav = A.one('.nav-wrapper');

				if (sideNav) {
					var scrollDirection = getScrollDirection(winScrollPos);

					if (scrollDirection) {
						var bottom = contentEndPos - windowHeight - INT_4EM;

						if (navOffset > 0) {
							bottom += navOffset;
						}

						if (winScrollPos > bottom) {
							sideNav.removeClass(CSS_AFFIX);
							sideNav.addClass(CSS_NAV_BOTTOM);
						}
						else if (winScrollPos >= headerHeight) {
							sideNav.addClass(CSS_AFFIX);
							sideNav.removeClass(CSS_NAV_BOTTOM);

							if (navOffset < 0 && winScrollPos > headerHeight - navOffset) {
								sideNav.addClass(CSS_NAV_OFFSET);
							}
						}
						else {
							sideNav.removeClass(CSS_AFFIX);
							sideNav.removeClass(CSS_NAV_OFFSET);
						}
					}
					else {
						if (winScrollPos < headerHeight) {
							sideNav.removeClass(CSS_AFFIX);
							sideNav.removeClass(CSS_NAV_OFFSET);
						}
						else if (winScrollPos < windowBottom) {
							sideNav.addClass(CSS_AFFIX);
							sideNav.removeClass(CSS_NAV_OFFSET);
							sideNav.removeClass(CSS_NAV_BOTTOM);
						}
						else {
							sideNav.removeClass(CSS_AFFIX);
							sideNav.addClass(CSS_NAV_BOTTOM);
							sideNav.removeClass(CSS_NAV_OFFSET);
						}
					}

					if (winScrollPos > headerHeight + navOffsetAbs && winScrollPos < windowBottom - INT_3EM) {
						sideNav.addClass(CSS_TRANSITION);
					}
					else {
						sideNav.removeClass(CSS_TRANSITION);
					}
				}
			}

			function setDimensions(event) {
				windowHeight = window.innerHeight;

				getUpdatedContentDimensions();

				style.innerHTML = '.content-hub .nav-wrapper.nav-offset {top: ' + navOffset + 'px;} .content-hub .nav-wrapper.nav-bottom {top: ' + navBottom + 'px;}';

				var winScrollPos = WIN.get('scrollY') || WIN.get('docScrollY');

				setNavbarScroll(winScrollPos);
			}

			function setNavbarScrollController(event) {
				var winScrollPos = WIN.get('scrollY') || WIN.get('docScrollY');

				if (winScrollPos <= headerHeight + navOffsetAbs || winScrollPos >= windowBottom - INT_3EM) {
					setNavbarScroll(winScrollPos);
				}
				else if (winScrollPos < windowBottom && winScrollPos > headerHeight + navOffsetAbs && Math.abs(winScrollPos - previousWinScrollPos) > INT_SCROLL_DIRECTION_BUFFER) {
					previousWinScrollPos = winScrollPos;
					setNavbarScroll(winScrollPos);
				}
			}

			function toggleMobileNav(event) {
				sideNav.toggleClass('nav-open');
			}

			init();
		}
	);
</script>