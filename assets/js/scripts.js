/*!
 * fastshell
 * Fiercely quick and opinionated front-ends
 * https://HosseinKarami.github.io/fastshell
 * @author Hossein Karami
 * @version 1.0.5
 * Copyright 2016. MIT licensed.
 */
(function ($, window, document, undefined) {

	'use strict';

	$(function () {

		// Elements
		var heroWrapper = $('.hero-wrapper'),
			demoWrapper = $('.demo-wrapper'),
			demoAd = $('#demo-ad'),
			demoAdContents = $('#demo-ad-contents'),
			demoAdMocksite = $("#demo-ad-mocksite"),
			demoAdDevice = $('#demo-ad-device'),
			heroAd = $('.hero-wrapper-ad'),
			heroHeadline = $('.headline'),
			demoWidthSlider = $("#demoWidthSlider"),
			demoWidthValue = $("#demoWidthValue"),
			demoHeightSlider = $("#demoHeightSlider"),
			demoHeightValue = $("#demoHeightValue"),
			demoBackground = $("#demo-background"),
			demoHeadline = $("#demo-headline"),
			richMediaSection = $("#section-rich-media"),
			richMediaCreative = $("#rich-media-creative"),
			richMediaIcon = $("#rich-media-icon"),
			richMediaIconImage = $("#rich-media-icon-image"),
			richMediaCreativeContent = $("#rich-media-creative-content"),
			richMediaSpecs = $("#rich-media-specs"),
			richMediaFeatures = $("#rich-media-features"),
			valueProp = $("section.value-prop"),
			header = $("header.header");


		var site = {
			setupHeroDemo : function() {
				var deg = 0;
				var degWrapper = 5;
				var translate = -8.2;

				heroWrapper.css("transform", "translateX(-50%) rotateX(" + degWrapper + "deg)");
				demoAd.css("transform", "translateX(-50%) rotateX(-" + deg + "deg)");
				$(document).scroll(function() {
					var winHeight = $(window).height();
					var scrollHeight = $(document).scrollTop();
					var percent = scrollHeight / winHeight;
					deg = 4.5 * percent;
					degWrapper = 5 + (percent * 4);
					var top = 590 - (200 * percent);

					if (percent <= 1) {
						heroAd.css("opacity", 1 - percent);
						heroWrapper.css("transform", "translateX(-50%) rotateX(" + degWrapper + "deg)");
						demoAd.css("transform", "translateX(-50%) rotateX(-" + deg + "deg) translateZ(" + percent * translate + "px)");
						demoAd.css("opacity", 1);
						demoAd.css("top", (top/16) + "rem");
						demoAdContents.css("opacity", percent);
						demoHeadline.css("opacity", percent);
						demoHeadline.css("transform", "translateY(" + (1 - percent) * 100 + "%)");

						heroHeadline.css("display", "block");
						demoAdDevice.css("opacity", percent);
						heroWrapper.removeClass("scroll-completed");
						demoWrapper.removeClass("scroll-completed");
						heroHeadline.css("transform", "translate(-50%," + (scrollHeight/20) + "px)");
						heroHeadline.css("opacity", 1 - (percent + 0.2));
						demoBackground.css("transform", "translate(-50%," + ((1 - percent) * 25) + "%)");
						demoBackground.css("opacity", percent - 0.25);
						header.removeClass("scroll-completed");
					} 

					if (percent > 1) {
						heroWrapper.addClass("scroll-completed");
						heroWrapper.css("transform", "translateX(-50%) translateY(" + ((1 - percent) * 400) + "px)");
						demoAd.css("transform", "translateX(-50%)");
						demoWrapper.addClass("scroll-completed");
						heroHeadline.css("display", "none");
						heroHeadline.css("opacity", 0);
						demoAdContents.css("opacity", 1);
						demoAdDevice.css("opacity", 1);
						demoHeadline.css("transform", "translateY(" + ((1 - percent) * 400) + "px)");
						header.addClass("scroll-completed");
						//demoBackground.css("transform", "translate(-50%," + ((1 - percent) * 25) + "%)");
						//$(".hero").css("transform", "scale(" + (2 - percent * 0.2) + ")");
					}
				});
			},
			setupAdDemo : function() {
				var currentW, 
					currentH, 
					minW, 
					minH, 
					widthRange, 
					heightRange, 
					tabletWidth, 
					phoneWidth;

				// var sliderWidth = new Foundation.Slider(demoWidthSlider);
				// var sliderHeight = new Foundation.Slider(demoHeightSlider);

				// console.log(sliderWidth);

				
				function setDefaults() {
					currentW = demoAd.width();
					currentH = demoAdContents.height();
					minW = 300;
					minH = 50;
					widthRange = currentW - minW;
					heightRange = currentH - minH;
					tabletWidth =  currentW * 0.75;
					phoneWidth = currentW * 0.4;
					console.log(phoneWidth);
				}

				function updateWidth() {
					var currentV = demoWidthValue.val();
					var newW = widthRange * (currentV/10000) + minW;
					demoAd.width(newW);

					if (newW <= tabletWidth && newW > phoneWidth) {
						demoAdDevice.attr("data-device", "tablet");
					} else if (newW <= phoneWidth) {
						demoAdDevice.attr("data-device", "phone");
					} else {
						demoAdDevice.attr("data-device", "desktop");
					}
				}

				function updateHeight() {
					var currentV = 10000 - demoHeightValue.val();
					var newH = heightRange * (currentV/10000) + minH;
					var mocksiteH = currentH - newH;
					demoAdContents.height(newH);
					demoAdMocksite.height(mocksiteH);
				}

				function init() {
					setDefaults();

					$(window).on('resize', function() {

						demoAd.width('');
						demoAdContents.height('');
						demoAdMocksite.height('');
						
						demoWidthSlider.attr("data-initial-start", "10000");
						Foundation.reInit(demoWidthSlider);
						
						demoHeightSlider.attr("data-initial-start", "10000");
						Foundation.reInit(demoHeightSlider);

						setDefaults();
					});

					demoWidthSlider.on('moved.zf.slider', function(){
					    updateWidth();
					});

					demoHeightSlider.on('moved.zf.slider', function(){
					    updateHeight();
					});
				}

				init();

			},
			setupGalleries : function() {
				$(document).ready(function () {
				    
				    var config = {
						loop: true,
				    	slidesPerView: 4,
				    	autoplay: 3000,
				        centeredSlides: true,
				        paginationClickable: true,
				        spaceBetween: 2
				    }

				    var formatGallery = new Swiper ('#format-gallery', config);
				    var conceptGallery = new Swiper ('#concept-gallery', config);    
				});
			},
			setupRichMediaSection : function() {
				var iconStartWidth = 25;
				var iconStartHeight = 75;
				var iconWidthAmount = 100 - iconStartWidth;
				var iconHeightAmount = 100 - iconStartHeight;
				var creativeTranslate = -350;
				var specsTranslate = -150;

				var video = document.getElementById("rich-media-video");

				$(document).scroll(function() {
					var viewport = $(window).height();
					var startPoint = richMediaSection.offset().top - (viewport/3);
					var endPoint = richMediaFeatures.offset().top - viewport;
					var distance = $(document).scrollTop();

					if (distance <= startPoint) {
						richMediaCreativeContent.css("opacity", 0);
					}

					if (distance > startPoint && distance < endPoint) {
						var amount = (startPoint - distance) * -1;
						var percent = amount/(endPoint - startPoint);
						
						var creativeDistance = creativeTranslate + ((creativeTranslate * -1) * percent);
						var specsDistance = specsTranslate + ((specsTranslate * -1) * percent);
						var iconWidth = iconStartWidth + (iconWidthAmount * percent);
						var iconHeight = iconStartHeight + (iconHeightAmount * percent);

						richMediaCreative.css("transform", "translate(-50%, " + creativeDistance + "px) rotateX(9.5deg)");
						richMediaSpecs.css("transform", "translate(-50%, " + specsDistance + "px) rotateX(9.5deg)");
						richMediaIcon.css("width", iconWidth + "%");
						richMediaIcon.css("height", iconHeight + "%");
						richMediaCreativeContent.css("opacity", percent);
						richMediaIconImage.css("display", "block");
						$(video).css("display", "none");
						video.pause();
					}

					if (distance >= endPoint) {
						richMediaCreative.css("transform", "translate(-50%, 0px) rotateX(9.5deg)");
						richMediaSpecs.css("transform", "translate(-50%, 0px) rotateX(9.5deg)");
						richMediaIcon.css("width", "100%");
						richMediaIcon.css("height", "100%");
						richMediaIconImage.css("display", "none");
						richMediaCreativeContent.css("opacity", 1);
						$(video).css("display", "inline-block");
						video.currentTime = 0;
						video.play();
					}

				});

			},
			inlineSVG : function() {
				$('img.svg').each(function(){
				    var $img = jQuery(this);
				    var imgID = $img.attr('id');
				    var imgClass = $img.attr('class');
				    var imgURL = $img.attr('src');

				    jQuery.get(imgURL, function(data) {
				        // Get the SVG tag, ignore the rest
				        var $svg = jQuery(data).find('svg');

				        // Add replaced image's ID to the new SVG
				        if(typeof imgID !== 'undefined') {
				            $svg = $svg.attr('id', imgID);
				        }
				        // Add replaced image's classes to the new SVG
				        if(typeof imgClass !== 'undefined') {
				            $svg = $svg.attr('class', imgClass+' replaced-svg');
				        }

				        // Remove any invalid XML tags as per http://validator.w3.org
				        $svg = $svg.removeAttr('xmlns:a');

				        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
				        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
				        }

				        // Replace image with new SVG
				        $img.replaceWith($svg);

				    }, 'xml');

				});
			}
		}

		var startSite = function() {
			$(document).foundation();
			site.setupHeroDemo();
			site.setupAdDemo();
			site.setupGalleries();
			site.setupRichMediaSection();
			site.inlineSVG();
		};

		startSite();

	});

})(jQuery, window, document);
