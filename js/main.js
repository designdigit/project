window.addEventListener("load", function(){
	var winHalf;
	var t=0;
	var n=0;
	var darkN=0;
	var scrollTimer=0;
	var targety=0;
	var pageList=[];
	var container=document.getElementsByClassName("wrapper")[0];

	for(var item of container.children){
		if(item.tagName == "HEADER"){
			pageList.push(item);
		}
		else if(item.tagName == "SECTION"){
			pageList.push(item);
		}
	}

	var globalMenu=header.getElementsByClassName("global_menu")[0];
	var globalMenuList=globalMenu.getElementsByClassName("menu")[0].firstElementChild.children;
	var globalTabs=document.getElementsByClassName("global_tabs")[0];
	var download=document.getElementsByClassName("download")[0];
	var floatingMenu=document.getElementsByClassName("floating_menu")[0];
	var mobileMenuList=floatingMenu.getElementsByClassName("menu")[0].firstElementChild.children;

	function init(){
		winHalf=window.innerHeight/2;
		pageList[n].classList.add("active");
		globalMenuList[darkN].classList.add("active");
		mobileMenuList[darkN].classList.add("active");
	}
	init();

	window.addEventListener("resize", function(){
		winHalf=window.innerHeight/2;
	});
	window.addEventListener("scroll", function(){
		clearTimeout(scrollTimer);

		scrollTimer=setTimeout(function(){
			t=window.pageYOffset;

			// #header, #page1, #page2, #page3, #page4
			if(t <= pageList[1].offsetTop-winHalf){
				n=0;
			}
			else if(t <= pageList[2].offsetTop-winHalf){
				n=1;
			}
			else if(t <= pageList[3].offsetTop-winHalf){
				n=2;
			}
			else if(t <= pageList[4].offsetTop-winHalf){
				n=3;
			}
			else{
				n=4;
			}

			for(var i=0; i<pageList.length; i++){
				if(i == n){
					pageList[i].classList.add("active");
					globalMenuList[i].classList.add("active");
					mobileMenuList[i].classList.add("active");
				}
				else{
					pageList[i].classList.remove("active");
					globalMenuList[i].classList.remove("active");
					mobileMenuList[i].classList.remove("active");
				}
			}

			if(t <= pageList[1].offsetTop){
				darkN=0;
			}
			else if(t <= pageList[2].offsetTop){
				darkN=1;
			}
			else if(t <= pageList[3].offsetTop){
				darkN=2;
			}
			else if(t <= pageList[4].offsetTop){
				darkN=3;
			}
			else{
				darkN=4;
			}

			if(darkN == 1 || darkN == 3){
				globalMenu.classList.add("dark");
				globalTabs.classList.add("dark");
				download.classList.add("dark");
			}
			else{
				globalMenu.classList.remove("dark");
				globalTabs.classList.remove("dark");
				download.classList.remove("dark");
			}
		}, 50);
	});

	globalTabs.addEventListener("click", function(e){
		e.preventDefault();
		document.body.classList.toggle("fixed");
		globalTabs.classList.toggle("active");
		floatingMenu.classList.toggle("active");
	});

	for(var i=0; i<globalMenuList.length; i++){
		globalMenuList[i].index=i;
		mobileMenuList[i].index=i;

		globalMenuList[i].addEventListener("click", function(e){
			e.preventDefault();
			n=e.currentTarget.index;
			targety=pageList[n].offsetTop+1;
			gsap.to(window, {scrollTo: targety, duration: 0.5});
		});
		mobileMenuList[i].addEventListener("click", function(e){
			e.preventDefault();
			n=e.currentTarget.index;
			targety=pageList[n].offsetTop+1;
			document.body.classList.remove("fixed");
			globalTabs.classList.remove("active");
			floatingMenu.classList.remove("active");
			gsap.to(window, {scrollTo: targety, duration: 0.5, delay: 0.5});
		});
	}

	var mainSlider=document.getElementsByClassName("main_slider")[0];
	var mainText=mainSlider.getElementsByClassName("main_text")[0];
	var mainTextBox=mainText.firstElementChild;

	for(var item of mainTextBox.children){
		if(item.tagName == "SPAN"){
			var mainTextTitle=item;
		}
		else if(item.tagName == "P"){
			var mainTextSub=item;
		}
	}

	var slideText=[
		{title: "CHANBED BY DESIGN", sub: "???????????? ?????? ?????????????????? ??????, ??????????????? ?????? ?????? ??????????????????"},
		{title: "BUSINESS", sub: "???????????? ????????? ???????????? ????????? ?????? ????????? ???????????? ???????????????"},
		{title: "PORTFOLIO", sub: "???????????? ?????? ??? ????????? ????????? ??? ????????? ???????????????"},
		{title: "SERVICE", sub: "???????????? ????????? ???????????? ???????????? ?????????????????? ?????????????????????"}
	];

	var mainSwiper=new Swiper("#header .swiper-container", {
		autoplay: {
			delay: 8000
		},
		pagination: {
			el: "#header .swiper-pagination",
			type: "fraction"
		},
		on: {
			init: function(){
				setTimeout(function(){
					mainText.classList.add("active");
				}, 800);
			},
			slideChange: function(){
				mainText.classList.remove("active");
				mainTextTitle.innerText=slideText[mainSwiper.activeIndex].title;
				mainTextSub.innerText=slideText[mainSwiper.activeIndex].sub;

				setTimeout(function(){
					mainText.classList.add("active");
				}, 800);
			}
		}
	});
});