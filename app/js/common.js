$(document).ready(function() {
	//  ========= Variables =========
	var body = $('body'),
			html = body.width(),
			timer; // for disable scroll
	// ========= =========== =========== ===========

	// Disable hover effect when client scrolles the page
	$(window).on('scroll',function() {
		clearTimeout(timer);
		if(!body.hasClass('disable-hover')) {
			body.addClass('disable-hover');
		}

		timer = setTimeout(function() {
			body.removeClass('disable-hover');
		}, 200);
	});

	// Menu
	$('.js-toggle-sublist-btn').on('click', function(e) {
		e.preventDefault();

		$(this).toggleClass('is-active');
		$(this).next('ul').stop().slideToggle(250);
	});


	$('.js-open-mobile-menu-btn').on('click', function(e) {
		e.preventDefault();
		$('.js-phones').stop().slideUp(250);
		if (html < 620) {
			$('.header-top .search').stop().slideUp(250);
		}
		
		$('.js-menu').toggleClass('is-opened');
		$('html').toggleClass('is-fixed');
	});

	$('.js-close-mobile-menu-btn').on('click', function(e) {
		e.preventDefault();

		$('.js-menu').removeClass('is-opened');
		$('html').removeClass('is-fixed');
	});

	$('.js-toggle-phones-btn').on('click', function(e) {
		e.preventDefault();
		if (html < 620) {
			$('.header-top .search').stop().slideUp(250);
		}
		$('.js-phones').stop().slideToggle(250);
	});

	$('.js-toggle-search-btn').on('click', function(e) {
		e.preventDefault();
		$('.js-phones').stop().slideUp(250);
		$('.header-top .search').stop().slideToggle(250);
	});

	// Quantity
	$('.product-quantity').on('click', function(event) {
		var input = $(this).find('.js-quantity-input'),
			value = input.val(),
			target = $(event.target);

		var text = $(this).find('.product-quantity__unit');
		
		if(target.attr('data-action') === 'plus') {
			value++;
			
			input.val(value).trigger('change');
			text.text(value);
	
		

		} else if(target.attr('data-action') === 'minus') {	
			if(input.val() <= 1) {return};
			value--;	
			
			input.val(value).trigger('change');
			text.text(value);
			
			
		}

	});


	$('.product-content__col, .product-slider__col').theiaStickySidebar({
		'additionalMarginTop': 20,
		'disableOn': false
	});


	

	// Sliders
	var promoSliderInit = $('.js-promo-slider');

	var productsCardsSliderInit = $('.js-products-cards-slider');

	var productSliderInit = $('.js-product-slider');

	if (promoSliderInit.length > 0) {
		var promoSlider = new Swiper(promoSliderInit, {
			spaceBetween: 0,
			loop: true,
			effect: 'coverflow',
			coverflowEffect: {
				rotate: 50,

				slideShadows: false,
			},
			speed: 750,
			pagination: {
				clickable: true,
				el: '.js-promo-slider-pagination'
			},
		});
	}

	if (productsCardsSliderInit.length > 0) {

		function initProductsCardsSlider() {

			productsCardsSliderInit.each(function() {

				var self = $(this);
				var wrapper = self.parents('.products-cards-slider');

				var slidesCount = wrapper.find('.swiper-slide').length;

				if (slidesCount < 4) {
					var loop = false;
				} else {
					var loop = true;
				}

				var productsCardsSlider = new Swiper(self, {
					slidesPerView: 1,
					spaceBetween: 10,
					loop: loop,
					pagination: {
						clickable: true,
						el: wrapper.find('.js-products-cards-slider-pagination')
					},
					navigation: {
						nextEl: wrapper.find('.js-products-cards-slider-btn-next'),
						prevEl: wrapper.find('.js-products-cards-slider-btn-prev'),
					},
					breakpoints: {
						1280: {
							slidesPerView: 4,
							spaceBetween: 30
						},
						1050: {
							slidesPerView: 3,
							spaceBetween: 20
						},
						767: {
							slidesPerView: 2,
							spaceBetween: 15
						}
					}
				});
			});

		}

		initProductsCardsSlider();
	}


	if (productSliderInit.length > 0) {


		var productSliderThumbnails = new Swiper('.js-product-slider-thumbnails', {
			spaceBetween: 12,
			direction: 'horizontal',
			slidesPerView: 'auto',
			freeMode: false,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			touchRatio: 0,
			breakpoints: {
			620: {
				direction: 'vertical',
				slidesPerView: 6,
				}
			}
		});

		var productSlider = new Swiper(productSliderInit, {
			thumbs: {
        swiper: productSliderThumbnails
      },
      on: {
				slideChange: function (el) {
					$('.swiper-slide').each(function () {
					var youtubePlayer = $(this).find('iframe').get(0);
					if (youtubePlayer) {
						youtubePlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
						}
					});
				},

				init: function() {
					$('.js-product-slider-loader').hide(200);
				}
			},
			
		});
	}

	// Popups
	

	$('.js-open-callback-form-btn').on('click',function(e) {
		e.preventDefault();
		$('.js-popup-callback').fadeIn(300);
		$('html').addClass('is-fixed');
	});

	$('.js-open-request-popup-btn').on('click',function(e) {
		e.preventDefault();
		$('.js-popup-request').fadeIn(300);
		$('html').addClass('is-fixed');
	});

	


	$('.js-close-popup-btn').on('click',function(e) {
		e.preventDefault();
		$(this).parents('.js-popup').fadeOut(300);
		$('html').removeClass('is-fixed');
	});

	$('.popup__overflow').on('click', function(e) {
		e.stopPropagation();

		var content = $(this).find('.popup__body');

		if(!content.is(e.target) && content.has(e.target).length === 0) {
			$('html').removeClass('is-fixed');
			$('.js-popup').fadeOut(300);
		}

	});


	$('.js-add-to-cart-btn').on('click', function(e) {
		e.preventDefault();

		var productImg = $(this).attr('data-product-img');
		var productPrice = $(this).attr('data-product-price');

		$('.js-popup-added-to-cart').find('.product-price').html(productPrice);
		$('.js-popup-added-to-cart').find('img').attr('src', productImg);

		$('html').addClass('is-fixed');
		$('.js-popup-added-to-cart').fadeIn(300);


	});
	// ===========

	$('.form-input').on('focus', function() {
		var label = $(this).parents('.form-group__label');

		label.find('.form-group__label--text').hide();
	});

	$('.form-input').on('blur', function() {
		var label = $(this).parents('.form-group__label');

		if (!$(this).val() && $(this).val() == '') {
			label.find('.form-group__label--text').show();
		} else {
			label.find('.form-group__label--text').hide();
		}

	});

	$('.js-required-input').on('focus', function() {
		if($(this).hasClass('is-error')) {
			$(this).removeClass('is-error');
		}

	});

	// Toggles
	$('.js-toggle-order-details-btn').on('click', function(e) {
		e.preventDefault();

		$(this).toggleClass('is-active');
		$(this).parents('.orders-history__item').find('.orders-history__item--details').stop().slideToggle(250);
	});

	// Tabs
	$('.js-tab-content').not(":first").hide();
	$('.js-tab-btn:first').addClass('is-active');

	$('.js-tab-btn').on('click', function(e) {
		e.preventDefault();
		$('.js-tab-content').removeClass('is-active');
		$('.js-tab-btn').removeClass('is-active').eq($(this).index()).addClass('is-active');
		$('.js-tab-content').hide().eq($(this).index()).fadeIn().addClass('is-active');
	}).eq(0).addClass('is-active');


	$("input[type=tel]").inputmask({
		"mask": "+7 (999) 999-9999","clearIncomplete": false,
		'showMaskOnHover': false
	});




	// ========= G o o g l e   m a p   s t y l e s ===========

	// Styles
	var style =  [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 65
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": "50"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "40"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ffff00"
            },
            {
                "lightness": -25
            },
            {
                "saturation": -97
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "lightness": -25
            },
            {
                "saturation": -100
            }
        ]
    }
];
	var mapZoom = 17;
	var markerUrl = 'img/icons/location.png';

	// Create the point
	

	var mapBlocks = $('.js-map');

	function createMaps(id, latitude, longitude) {
		var mapOptions = {
			center: new google.maps.LatLng(latitude, longitude),
			zoom: mapZoom,
			panControl: false,
			zoomControl: true,
			mapTypeControl: false,
			streetViewControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			scrollwheel: false,
			styles: style
		};

		var map = new google.maps.Map(document.getElementById(id), mapOptions);

		var	marker = new google.maps.Marker({
			position: new google.maps.LatLng(latitude, longitude),
			map: map,
			visible: true,
			icon: markerUrl
		});

	}

	if (mapBlocks.length > 0) {
		mapBlocks.each(function() {
			var self = $(this);

			var id = self.attr('id');
			var latitude = self.attr('data-latitude');
			var longitude = self.attr('data-longitude');

			createMaps(id, latitude, longitude);

			

		});
	}

	
	// ========= =========== =========== ===========

});
