import $ from 'jquery';
import DLAnimate from 'dl-animate/dist/dl-animate-module';
let myAnimate = new DLAnimate();
import slick from 'slick-carousel';
import validation from 'jquery-validation';
import magnificPopup from 'magnific-popup';


$(document).ready(function () {

	function change_mgrt() {
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
		$(window).bind('scroll', function () {
			$(window).scrollTop(winScrollTop);
		});
	}

	function showMenu() {
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

	function hideMenu() {
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

	navBtn.addEventListener('click', function () {
		if ((!(navMenu.hasAttribute('style'))) || (navMenu.style.display === 'none')) {
			showMenu();
		} else {
			hideMenu();
		}
	});

	window.addEventListener('resize', function () {
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

	$('.slider').slick({
		centerMode: true,
		  centerPadding: '0px',
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive:[
			{
				breakpoint: 992,
				settings:{
					slidesToShow: 1,
					centerPadding: '200px',
					arrows: false
				}
			},
			{
				breakpoint: 768,
				settings:{
					slidesToShow: 1,
					centerPadding: '100px'
				}
			},
			{
				breakpoint: 576,
				settings:{
					slidesToShow: 1,
					centerPadding: '0px',
					arrows: true
				}
			}
		]
	});

	$('form').validate({
		submitHandler: function(form){
			$.ajax({
				type: "POST",
				url: "php/send.php",
				data: $(form).serialize(),
				success: function() {
					
				},
				error:  function(){
					
					$('.popup-modal').magnificPopup('open');
					$('input[type=text]').val('');
					$('textarea').val('');
				}
			});
		},
		rules:{
			name:{
				required: true,
				minlength: 2
			},
			email:{
				required: true,
				minlength: 5
			},
			title:{
				required: true,
				minlength: 5
			},
			details:{
				required: true,
				minlength: 5
			}
		},
		messages:{
			name:{
				required: "Це поле обов'язкове для заповнення!",
				minlength: "Ім'я повинно бути не менш ніж 2 символи!"
			},
			email:{
				required: "Це поле обов'язкове для заповнення!",
				minlength: "Номер телефону має містити не менш ніж 5 символів!"
			},
			title:{
				required: "Це поле обов'язкове для заповнення!",
				minlength: "Номер телефону має містити не менш ніж 5 символів!"
			},
			details:{
				required: "Це поле обов'язкове для заповнення!",
				minlength: "Номер телефону має містити не менш ніж 5 символів!"
			}
		}
	});

	$(function () {
		$('.popup-modal').magnificPopup({
			type: 'inline',
			preloader: false
		});
		$(document).on('click', '.popup-modal-dismiss', function (e) {
			e.preventDefault();
			$.magnificPopup.close();
		});
	});

});