<template>
	<div class="ueditor" :text="text" :exportData="exportData">
		<div class="controler">
			<button @click="setContent" v-if="!display" v-show="!show">编辑</button>
			<button @click="getContent" v-show="!show">完成</button>
			<button @click="saveContent" v-if="!display" v-show="!display || show">保存</button>
			<button @click="exitEdit" v-if="!display" v-show="show">退出</button>
		</div>
		<div :id="ueid+'_preText'" class="pre-text" v-html="contentText" v-if="!display" v-show="!show"></div>
		<div :id="ueid" v-show="display || show"></div>
    </div>
</template>
<script>
    export default {
		props: ['exportData', 'display', 'importData', 'text'],
		data(){
			var ueid = String(Date.now());
			return {
				lock: false,
				contentText: '',
				ueid: ueid,
				ue: undefined,
				show: false
			}
		},
		mounted(){
			this.contentText = this.text;

			this.ue = UE.getEditor(this.ueid, {
				toolbars: [
					['source', 'undo', 'redo', 'kityformula']
				],
				initialStyle: 'body {font-size:14px; line-height: 1.6em;} h4 {font-size:18px; margin: 10px;}',
				initialFrameWidth: '100%',
				autoHeightEnabled: true,
				autoFloatEnabled: true	
			});

			var that = this;
			if(this.exportData){
				that.ue.addListener('contentChange', function(){
					if(window && window.$ && !that.lock){
						that.lock = true;
						var a = that.ue.getContent();
						debugger;
						a = that._pRender(a);
						debugger;
						that.contentText = a;
						that.exportData(a);
						setTimeout(function(){
							that.lock = false;
						}, 0)
					}
				});
			}
		},
		updated(){
			if(this.show != true){
				MathJax.Hub.Config({
					tex2jax: {
						inlineMath: [["$", "$"]]
					},
					"HTML-CSS": {linebreaks: {automatic: true}, matchFontHeight: false},
					SVG: {linebreaks: {automatic: true}, matchFontHeight: false}
				});
				MathJax.Hub.Configured();
				MathJax.Hub.Queue(["Typeset", MathJax.Hub, function(){
					$('[type="math/tex"]').each(function(){
						var data_latex = $(this).html().slice(1, -1);
						var id = $(this).attr('id')+'-Frame';
						$('#'+id).attr('data-latex', data_latex);
						$(this).remove();
					});
					$('.MJX_Assistive_MathML').remove();
					$('.MathJax_Preview').remove();
					$('em').each(function(){
						if($(this).html() === '')
							$(this).remove();
					});
				}]);
			}
		},
		methods: {

			_pRender: function(content){
				
				var text = '';

				try{
					text = $(content)[0].outerHTML;
				}catch(err){
					text = $('<p>'+content+'</p>')[0].outerHTML;
				}

				var $html = $(text);
				$html.find('img.kfformula').each(function(){
					text = text.replace(this.outerHTML, '${'+$(this).attr('data-latex')+'}$');
				});

				$html = $(text);
				$html.find('[type="math/tex"]').each(function(){
					var data_latex = $(this).html();
					text = text.replace($(this)[0].outerHTML, '$'+data_latex+'$');
				});

				$html = $(text);
				$html.find('.MJX_Assistive_MathML').remove();
				$html.find('.MathJax_Preview').remove();
				$html.find('.MathJax').remove();

				text = $html[0].outerHTML;
				return text;
			},

			render: function(){
				var that = this;
				var text = $(that.contentText)[0].outerHTML;
				$(text).find('img.kfformula').each(function(){
					text = text.replace(this.outerHTML, '${'+$(this).attr('data-latex')+'}$');
				});
				this.contentText = text;
			},

			_getContent: function(){

			},

			getContent: function(){
				this.saveContent();
				var that = this;
				setTimeout(function(){
					var text = that.contentText;
					if(that.exportData)
						that.exportData(text);
				}, 0)
			},

			setContent: function(){
				
				var HTML = '<div>' + $('#'+this.ueid+'_preText')[0].innerHTML + '</div>';

				var $html = $(HTML);

				$html.find('.MathJax').each(function(){
					$(this).attr('onmouseover', 'hover(this)');
				});

				HTML = $html.html();
				this.ue.setContent(HTML);

				if(!this.display)
					this.show = true;
			},

			saveContent: function(){
				var html = this.ue.getContent();
				var $html = $(html);
				if($html.attr('id') != undefined)
					html = $html.html();

				this.contentText = html;

				if(!this.display)
					this.show = false;

				var that = this;
				setTimeout(function(){
					that.render();
				}, 0)
			},

			exitEdit: function(){
				if(!this.display)
					this.show = false;
			}
		}
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
	.ueditor {
		width: 90%;
		margin-left: auto;
		margin-right: auto;
		background-color: #e5e5e5;
		border: 1px solid #a1a1a1;
		padding: 10px;
		border-radius: 10px;
		button {
			background-color: white;
			border-radius: 15px;
			padding: 5px;
			margin: 5px 10px 5px 0px;
		}
		.pre-text {
			padding: 20px 10px;
			border: 1px solid #a1a1a1;
			background-color: #f5f5f5;
			min-height: 80px;
			border-radius: 10px;
			margin-left: auto;
			margin-right: auto;
		}
	}
</style>
