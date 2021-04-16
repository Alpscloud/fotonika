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


	

	// Sliders
	var promoSliderInit = $('.js-promo-slider');

	if (promoSliderInit.length > 0) {
		var promoSlider = new Swiper(promoSliderInit, {
			spaceBetween: 0,
			loop: true,
			
			speed: 750,
			pagination: {
				clickable: true,
				el: '.js-promo-slider-pagination'
			},
		});
	}

	// Popups
	

	$('.js-open-callback-form-btn').on('click',function(e) {
		e.preventDefault();
		$('.js-popup-callback').fadeIn(300);
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
