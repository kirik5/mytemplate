import $ from 'jquery';

import DLAnimate from 'dl-animate/dist/dl-animate-module';
let myAnimate = new DLAnimate();

// import slick from 'slick-carousel';
// $('.your-class').slick();

$(document).ready(function () {

	function change_mgrt(){
		var w = $('.first_offerimg img').css("width")
		var mr = -parseInt(w) / 2 + "px";
		$('.first_offerimg img').css("margin-right", mr);
	}
	
	change_mgrt();

    $(window).resize(function () {
        change_mgrt();
    });

    var navMenu = document.querySelector('.nav');
	var navBtn = document.querySelector('.navbutton');
	var line01 = document.querySelector('.navbutton_line01');
	var line02 = document.querySelector('.navbutton_line02');
	var line03 = document.querySelector('.navbutton_line03');

    function OffScroll() {
		var winScrollTop = $(window).scrollTop();
		$(window).bind('scroll', function(){
			$(window).scrollTop(winScrollTop);
		});
	}

	function showMenu(){
		myAnimate.show(navMenu, {
			name: 'menu'
		});
		navBtn.classList.add('navbutton-active');
		line01.classList.add('navbutton_line01-active');
		line02.classList.add('navbutton_line02-active');
		line03.classList.add('navbutton_line03-active');
		$('.nav_overlay').css("display", "block");
		OffScroll();
	}

	function hideMenu(){
		myAnimate.hide(navMenu, {
			name: 'menu'
		});
		navBtn.classList.remove('navbutton-active');
		line01.classList.remove('navbutton_line01-active');
		line02.classList.remove('navbutton_line02-active');
		line03.classList.remove('navbutton_line03-active');
		$('.nav_overlay').css("display", "none");
		$(window).unbind('scroll');
	}
    
    navBtn.addEventListener('click', function(){
		if ((!(navMenu.hasAttribute('style'))) || (navMenu.style.display === 'none')) {
			showMenu();
		} else {
			hideMenu();
		}
    });
    
    window.addEventListener('resize', function(){
		if (document.documentElement.clientWidth >= 992) {
			navMenu.removeAttribute('style');
			if (navBtn.classList.contains('navbutton-active')) {
				navBtn.classList.remove('navbutton-active');
			}
			if (line01.classList.contains('navbutton_line01-active')) {
				line01.classList.remove('navbutton_line01-active')
			}
			if (line02.classList.contains('navbutton_line02-active')) {
				line02.classList.remove('navbutton_line02-active')
			}
			if (line03.classList.contains('navbutton_line03-active')) {
				line03.classList.remove('navbutton_line03-active')
			}
			$('.nav_overlay').css("display", "none");
			$(window).unbind('scroll');
		}
    });
    
    $('.nav_overlay').on('click', hideMenu);
});