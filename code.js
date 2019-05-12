const wrapper = document.querySelector('.container');
const schemeOne = document.querySelector('.box__scheme_1'); 
const schemeTwo = document.querySelector('.box__scheme_2'); 
const schemeThree = document.querySelector('.box__scheme_3'); 
const blizzard = document.querySelector('.horizontal_scroll_bar'); 
const iceberg = document.querySelector('.hs_scale_slider_click');
const boxSchemesContainer = document.querySelector('.box_schemes__container');
const shadowScroll = document.querySelector('.hor_scroll_scale_shadow');

let isAnimating = false;
let yOffset;

let startWorck = false; 
let xOffset; 

//--------------------------------------
blizzard.ontouchmove = function(e) { //823 173 
	let rightCorderCoord = 823;

	if ((e.changedTouches[0].clientX > rightCorderCoord/3 && e.changedTouches[0].clientX < rightCorderCoord/2) || (e.changedTouches[0].clientX >rightCorderCoord/1.5 && e.changedTouches[0].clientX < rightCorderCoord-60)) {
		iceberg.style.right = rightCorderCoord - e.changedTouches[0].clientX + 'px';
		shadowScroll.style.width = 800 - e.changedTouches[0].clientX + 'px';
	} else if (e.changedTouches[0].clientX <= rightCorderCoord/2.1) {
		//показать схему 3
		boxSchemesContainer.classList.add('second_horizontal');
		iceberg.style.right = "640px";
		shadowScroll.style.width = '620px';
	} else if (e.changedTouches[0].clientX >= rightCorderCoord/1.35	){
		//показать схему 1
		boxSchemesContainer.classList.remove('first_horizontal');
		iceberg.style.right = "";
		shadowScroll.style.width = "";
	} else {
		//показать схему 2
		if (boxSchemesContainer.classList.value.match('first_horizontal')) {
			boxSchemesContainer.classList.remove('second_horizontal');
		} else { 
			boxSchemesContainer.classList.add('first_horizontal');
		}
		iceberg.style.right = "325px";
		shadowScroll.style.width = '300px';
	}

	
}


//--------------------------------------
document.body.ontouchstart = function(e) {
	yOffset = e.changedTouches[0].clientY;
}

document.body.ontouchend = function(e) {
	if (isAnimating) return false;

	let endYOffset = e.changedTouches[0].clientY;

	isAnimating = true;
	setTimeout(() => {
		isAnimating = false;
	}, 500);

	if (endYOffset < yOffset) {
		if (wrapper.classList.contains('first')) {
	  		wrapper.classList.add('second');
		} else {
			wrapper.classList.add('first');
		}
	}

	if (endYOffset > yOffset && endYOffset-yOffset > 200) {
		if (wrapper.classList.contains('second')) {
			wrapper.classList.remove('second');
		} else {
			wrapper.classList.remove('first');
		}
	}

	[].slice.call(document.querySelectorAll('.dots_screen')).forEach(function(elem, i){
		elem.classList.remove('yellow_dot');
		if (wrapper.classList.contains('second')) {
			if (i == 2) {addCls(elem);}
		} else if (wrapper.classList.contains('first')) {
			if (i == 1) {addCls(elem);}
		} else {
			if (i === 0) {addCls(elem);}
		}
	});
}

function addCls(el) {
	el.classList.add('yellow_dot');
}