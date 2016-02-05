
function defineHeight (className) {
	return $(className).outerHeight(true);
}

function defineLineHeight(className){
	return parseInt($(className).css('lineHeight'), 10);
}

function defineNumbersOfLines (height, lineHeight){
	return height/lineHeight;
}

function buildLine (className) {
	var numberOfStrings, $fragment, generateDiv;
			numberOfStrings = defineNumbersOfLines(defineHeight(className), defineLineHeight(className)),
			$fragment = $(document.createDocumentFragment()),
			appendClass = $('.js-code__numbers');

		for (var i = 1; i <= numberOfStrings; i++) {
			generateDiv = i + "<br>";/*$('<div/>', {
				text: i
			});*/
			$fragment.append(generateDiv);
		};

		$(appendClass).html($fragment);
}

function defineColors(obj, contentClass, callback){
	for (var j = 0; j < $(contentClass).length; j++) {
		callback.call($(contentClass)[j],j);
	};
}

function dataFilter(className, dataParam, curParam){ 
	return $(className).filter(function(index, elem){
	    return $(elem).data(dataParam) === curParam;
	});
} 

function startFixPanel() {
    'use strict';
    var scrolled = window.pageYOffset || document.documentElement.scrollTop,
        pTop = $('.support').offset().top,
        windowH = $(window).height(),
        fixpanel = document.querySelector('.sticky');
    if (scrolled  >= pTop) {
        fixpanel.classList.add('sticky_fixed');       
    }
    else {
    	fixpanel.classList.remove('sticky_fixed');
    }
    if (scrolled>=(pTop + $('.support').height()-48)) {
        fixpanel.classList.remove('sticky_fixed');
    }
}

function buildOnCnahge(flag){
	buildLine(dataFilter('.code__language_show .js-code__content', 'converter', flag));
    dataFilter('.converter__state', 'converter', flag).addClass('converter__state_active');
}

var parseObj = [
		{
			str: ["[0,1],", "NULL"],
			className: 'code__color-purple'
		},
		{
			str: ['""', ,"(@|L)\"(.)+", ],
			className: 'code__color-green'
		},
		{
			str: ["new", "ref", "out", "void", "Dim", "As"],
			className: 'code__color-blue'
		},
		{
			str: [" = ::", "<br>::", " = ", " -", "-*&(gt|amp);", "\[*]" ],
			className: 'code__color-brown'
		},
		{
			str: [",", "(\[.]|\[(])|\[{]|\[}]", "\[)]|\[)];", ";$"],
			className: 'code__color-gray'
		},
		{
			str: ["MFFrameCreateFromMem", "WriterSet","ReceiverFramePut", "ReaderOpen", "SourceFrameGet", "WriterSet", "CoCreateInstance", "__uuidof", "SysAllocString", "Release", "ReaderClose"],
			className: 'code__color-red'
		}
	];

window.onscroll = function () {
    startFixPanel();
};

$(function () {

	startFixPanel();

    defineColors(parseObj, '.js-code__content', function(index){
		var elem = $(this),
			regexp,
			matches; 
		for (var i = 0; i < parseObj.length; i++) {

			parseObj[i].str.forEach(function(word) {
				regexp = new RegExp(word,'gm');
				
				matches = elem.html().replace(regexp, function(str){
					return  "<span class="+parseObj[i].className+">"+str+"</span>";
				});
				elem.html(matches);	
			});
		};
	});
	/*$('.code__body').height(defineHeight('.code__body')); */

	buildLine('.code__content_show');

    
    
	$('.js-converter__checkbox').change(function () {
		var flag;
		$('.converter__state').removeClass('converter__state_active');
		$('.code__content').toggleClass('code__content_show');
		$('.code__body').height(defineHeight('.code__language_show'));
		flag = (this.checked)?'encoding':'coding';
		buildOnCnahge(flag);
    });

    $('.js-btn__language').click(function  () {
    	$('.js-btn__language').removeClass('btn_active');
    	$(this).addClass('btn_active');
    	$('.js-code__language').removeClass('code__language_show');
    	dataFilter('.js-code__language', 'language', $(this).data('language')).addClass('code__language_show');        	       	
        buildLine('.code__language_show .code__content_show'); 
        
    	$('.code__body').height(defineHeight('.code__language_show'));
    })

    $('.js-show-next').click( function(e){
        e.preventDefault();
        $(this).next('.support__body').find('.support__spoiler').toggleClass('support__spoiler_open');
    });

    $('.support__headline').click( function(){
    	$(this).find('.support__arrow').toggleClass('support__arrow_close');
        if ($(this).hasClass('support__headline_last')) {$(this).toggleClass('support__headline_close')};
    });
	
 });