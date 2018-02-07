function hover(dom){
	var $dom = $(dom);
	var latex = $dom.attr('data-latex');

	// hack
	if(token2char != undefined){
		latex = token2char(latex);	
	}

	html2canvas($dom, {
		onrendered: function (canvas) {
			var url = canvas.toDataURL();
			var $img = $('<img class="kfformula" src='+url+' onclick="start_edit(this)">');
			$img.attr('data-latex', latex); 
			$img.insertAfter($dom);
			$dom.remove();
		}	
	});
}

function start_edit(dom){
	var _this = $(this);
	var latex = $(dom).attr('data-latex');

	// setTimeout(function(){
	// 	window.parent.g_kfDialog.open();
	// }, 100)
}

function remove_content(em){
	var $obj = $(em).parent().parent();
	if($obj.hasClass('knowledge-content')){
		var text = $obj[0].outerHTML;
		var body = $('body').html();
		body = body.replace(text, '');
		$('body').html(body);
	}
}

window.onload = function(){

	setInterval(function(){
	   $('img[resize=true]').each(function(){
	       $(this).width($(this).width() * 0.77);
	       $(this).height($(this).height() * 0.78);
	       $(this).removeAttr('resize');
	   });

	}, 1000);
}
