var scrollToTop;
var scrollTimer;
var headings = [];
var winHeight = $(window).height();
var currentlyScrolling = false;
var currentLinkHash = "";
var wrapper = $("div.docs section.content .wrapper");
var mobile = false;
var apiMobile = false;
var mobileScrollNavigationOpen = false;
var mobileScrollNavigationButton = $(".mobile-navigation-content");
var mobileScrollNavigation = $("div.docs.scrollpage section.content .wrapper aside");
var apiMobileNavigation = $("div.docs section.content .wrapper aside");
var resizeSamplerInterval;

function currentPage(name) {
	if ($("body").hasClass(name)) {
		return true;
	}
	return false;
}

function currentSection(name) {
	if ($("div").hasClass(name)) {
		return true;
	}
	return false;
}

function onResize() {
	winHeight = $(window).height();
	winWidth = $(window).width();
	if (winWidth < 800) {
		mobile = true;
	}
	else {
		mobile = false;
	}
	if (winWidth < 720) {
		apiMobile = true;
	}
	else {
		apiMobile = false;
	}
}
onResize();

$(".back-to-top-text").on("mouseup", function () {
	$("html, body").animate({ scrollTop: "0px" });
});

$(document).scroll(function () {
	currentlyScrolling = true;
	scrollToTop = $(this).scrollTop();
	handleHeadings();
	prepScrollTriggeredAnimations(scrollToTop);
});

function reloadHeadings() {
	$("article h1, article h2").each(function (index) {
		headings[index] = {
			position: $(this).offset().top,
			linkhash: $(this).text().replace(/\s+/g, '-').toLowerCase()
		};
		$(this).attr("id", headings[index].linkhash);
	});
}
reloadHeadings();
function handleHeadings() {
	var scrolled = scrollToTop + winHeight / 3 * 0.8 - 20;
	var lastHeader = 0;
	for (var i = headings.length - 1; i >= 0; i--) {
		if (scrolled > headings[i].position) {
			if (i > lastHeader) {
				lastHeader = i;
			}
		}
	}
	if (currentPage("docs")) {
		if (lastHeader != previousActiveHeader) {
			if (true && headings[lastHeader]) {
				history.replaceState(undefined, undefined, '#' + headings[lastHeader].linkhash);
			}
			previousActiveHeader = lastHeader;
		}
	}
}
currentLinkHash = window.location.hash;
$(document).ready(function () {
	reloadHeadings();
	if (currentLinkHash && !currentLinkHash.match(/id_token|error/)) {
		scroll(0, 0);
		setTimeout(function () {
			var hashloc = $(currentLinkHash);
			$("html, body").animate({ scrollTop: hashloc.offset().top - $(window).height() / 3 * 0.8 + 70 + 'px' }, function () {
				hashloc.addClass("highlighted");
				setTimeout(function () { hashloc.removeClass("highlighted"); }, 300);
			});
		}, 50);
	}
});



function prepScrollTriggeredAnimations(scrollToTop) {
	clearTimeout(scrollTimer);
	scrollTimer = setTimeout(function () {
		currentlyScrolling = false;
		$(".animated").removeClass("animated");
		$(".green-background,.blue-background,.navy-background").each(function () {
			var divStart = $(this).position().top;
			var divEnd = $(this).position().top + $(this).height();
			if (scrollToTop <= divEnd && (scrollToTop + $(window).height()) >= divStart) {
				$(this).addClass("animated");
			}
		});
	}, 150)
}
prepScrollTriggeredAnimations(0);


if (currentSection("scrollpage")) {
	var linksToHeadings = [];
	var linksToMobileHeadings = [];
	var navFollow = false;
	var lastSection;
	var previousActiveHeader;
	var navigationPosition;


	function checkMobileScrollStickyButton() {
		if (scrollToTop > $('footer').offset().top - winHeight) {
			if (!mobileScrollNavigationButton.hasClass("sticky")) {
				if (mobileScrollNavigationOpen == false) {
					mobileScrollNavigationButton.addClass("sticky");
					mobileScrollNavigationButton.css("top", $('footer').offset().top - mobileScrollNavigationButton.height());
				}
			}
		}
		else {
			if (mobileScrollNavigationButton.hasClass("sticky")) {
				mobileScrollNavigationButton.removeClass("sticky");
				mobileScrollNavigationButton.css("top", "auto");
			}
		}
	}

	function scrollMobileNavigationClose() {
		if (mobileScrollNavigationOpen) {
			mobileScrollNavigation.removeClass("active");
			mobileScrollNavigationOpen = false;
			setTimeout(function () {
				mobileScrollNavigation.removeClass("onscreen");
			}, 300);
			checkMobileScrollStickyButton();
		}
	}

	function scrollMobileNavigationOpen() {
		if (mobileScrollNavigationButton.hasClass("sticky")) {
			mobileScrollNavigationButton.removeClass("sticky");
			mobileScrollNavigationButton.css("top", "auto");
		}
		mobileScrollNavigation.addClass("onscreen");
		mobileScrollNavigationOpen = true;
		setTimeout(function () {
			mobileScrollNavigation.addClass("active");
		}, 50);
	}

	$(".mobile-navigation-content").on("click", function (e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		if (mobileScrollNavigationOpen) {
			scrollMobileNavigationClose();
		}
		else {
			scrollMobileNavigationOpen();
		}
	});
	function updateNavigation() {
		var HTML = "";
		$("article h1, article h2").each(function (index) {
			headings[index] = {
				position: $(this).offset().top,
				linkhash: $(this).text().replace(/\s+/g, '-').toLowerCase()
			};
			$(this).attr("id", headings[index].linkhash);
			html_element = $(this).prop("nodeName").toLowerCase()

			HTML += "<li><a class=\"" + html_element + "\" href=\"#" + headings[index].linkhash + "\">" + $(this).text() + "</a></li>";
		});
		$(".content-navigation-content").html(HTML);
		$(".mobile-navigation-content").html(HTML);

		$(".content-navigation-content li").each(function (index) {
			linksToHeadings[index] = $(this);
		});
		$(".mobile-navigation-content li").each(function (index) {
			linksToMobileHeadings[index] = $(this);
		});

		navigationPosition = {
			left: $(".content-navigation").offset().left,
			top: $(".content-navigation").offset().top,
			initialTop: $(".content-navigation").offset().top,
			scrollStart: $(".content-navigation").offset().left,
			scrollEnd: $("div.docs.scrollpage article").offset().top + $("div.docs.scrollpage article").height() - $(".content-navigation").height() - 200
		}
	}
	updateNavigation();

	function resizeSampler() {
		onResize();
		if (scrollToTop > navigationPosition.top) {
			if (scrollToTop > navigationPosition.scrollEnd) {
				$(".content-navigation").css("top", navigationPosition.scrollEnd - navigationPosition.initialTop);
				$(".content-navigation").css("position", "absolute");
				$(".content-navigation").css("right", 0);
				$(".content-navigation").css("left", "auto");
				navFollow = false;
			}
			else { // Inside the scrolling
				$(".content-navigation").css("position", "fixed");
				$(".content-navigation").css("right", 0);
				$(".content-navigation").css("left", "auto");
				if ($(document).width() > wrapper.outerWidth()) {
					$(".content-navigation").css("right", wrapper.offset().left + 30);
				}
				else {
					$(".content-navigation").css("right", "30px");
				}
				$(".content-navigation").css("top", 0);
				navFollow = true;
			}
		}
		else {
			$(".content-navigation").css("position", "absolute");
			$(".content-navigation").css("right", 0);
			$(".content-navigation").css("left", "auto");
			navFollow = false;
		}
		reloadHeadings();
	}

	function handleScrollNavigationPosition() {
		if (scrollToTop > navigationPosition.top) {
			if (scrollToTop > navigationPosition.scrollEnd) {
				if (navFollow == true) { // Passed the scrolling point
					$(".content-navigation").css("top", navigationPosition.scrollEnd - navigationPosition.initialTop);
					$(".content-navigation").css("position", "absolute");
					$(".content-navigation").css("right", 0);
					$(".content-navigation").css("left", "auto");
					navFollow = false;
				}
			}
			else {
				if (navFollow == false) { // Inside the scrolling
					$(".content-navigation").css("position", "fixed");
					$(".content-navigation").css("right", 0);
					$(".content-navigation").css("left", "auto");
					if ($(document).width() > wrapper.outerWidth()) {
						$(".content-navigation").css("right", wrapper.offset().left + 30);
					}
					else {
						$(".content-navigation").css("right", "30px");
					}
					$(".content-navigation").css("top", 0);
					navFollow = true;
				}
			}
		}
		else {
			if (navFollow == true) { // Before..
				$(".content-navigation").css("position", "absolute");
				$(".content-navigation").css("right", 0);
				$(".content-navigation").css("left", "auto");
				navFollow = false;
			}
		}
	}

	$(window).resize(function () {
		clearTimeout(resizeSamplerInterval);
		resizeSamplerInterval = setTimeout(resizeSampler, 100);
	});

	$(document).on('click', '.content-navigation-content li', function (e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		$("html, body").animate({ scrollTop: (headings[$(this).index()].position - $(window).height() / 3 * 0.8 + 60) + "px" });
		scrollMobileNavigationClose();
	});

	$(document).unbind("scroll");
	$(document).scroll(function () {
		currentlyScrolling = true;
		scrollToTop = $(this).scrollTop();
		handleAnchors(scrollToTop);
		prepScrollTriggeredAnimations(scrollToTop);
	});

	function scrollToActiveNavigationItem() {
		var $activeItem = $(".content-navigation-content li.active");
		var $navigationContainer = $(".content-navigation");

		if ($activeItem.length && $navigationContainer.length) {
			// Get the item's position relative to the scrollable container
			var itemPosition = $activeItem.position();
			var itemTop = itemPosition.top;
			var itemHeight = $activeItem.outerHeight();

			// Get container dimensions
			var containerHeight = $navigationContainer.height();
			var containerScrollTop = $navigationContainer.scrollTop();

			// Calculate if item is visible
			var itemVisibleTop = itemTop;
			var itemVisibleBottom = itemTop + itemHeight;

			// If item is above visible area, scroll up
			if (itemVisibleTop < 0) {
				$navigationContainer.animate({
					scrollTop: containerScrollTop + itemVisibleTop - 20
				}, 200);
			}
			// If item is below visible area, scroll down
			else if (itemVisibleBottom > containerHeight) {
				$navigationContainer.animate({
					scrollTop: containerScrollTop + (itemVisibleBottom - containerHeight) + 20
				}, 200);
			}
		}
	}

	function handleAnchors(scrollToTop) {
		handleScrollNavigationPosition();
		checkMobileScrollStickyButton();
		var scrolled = scrollToTop + winHeight / 3 * 0.8 - 40;
		var lastHeader = 0;
		for (var i = headings.length - 1; i >= 0; i--) {
			if (scrolled > headings[i].position) {
				if (i > lastHeader) {
					lastHeader = i;
				}
			}
		}
		if (lastHeader != previousActiveHeader) {
			$(".content-navigation-content li.active").removeClass("active");
			if (mobile) {
				$(".mobile-navigation-content li.active").removeClass("active");
			}

			linksToHeadings[lastHeader].addClass("active");
			if (mobile) {
				linksToMobileHeadings[lastHeader].addClass("active");
			}

			// Scroll table of contents to show active item
			scrollToActiveNavigationItem();

			history.replaceState(undefined, undefined, '#' + headings[lastHeader].linkhash);
			previousActiveHeader = lastHeader;
		}
	}
	linksToHeadings[0].addClass("active");
	if (mobile) {
		linksToMobileHeadings[0].addClass("active");
	}

}
if (currentPage("home")) {
	$(function () {
		$(".typed-text").typed({
			strings: [
				"POST https://gateway.clearhaus.com/authorizations",
				"POST https://gateway.clearhaus.com/authorizations/:id/captures",
				"POST https://gateway.clearhaus.com/authorizations/:id/refunds",
				"POST https://gateway.clearhaus.com/credits"
			],
			typeSpeed: 0,
			backSpeed: 0,
			loop: true,
			backDelay: 2000
		});
	});
}
