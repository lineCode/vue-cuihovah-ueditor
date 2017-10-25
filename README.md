# vue-cuihovah-ueditor

利用

## Examples
[Examples Page](https://github.com/cuihovah/vue-cuihovah-ueditor/tree/master/examples)

## Installation

```shell
npm install vue-cuihovah-ueditor
```

## Usage
```xml
<template>
	<selector :init="selectorConstructor" :handle="selectorHandle"></selector>
</template>
```
```javascript

<template>
    <div>
		<vue-ueditor :display="false" :exportData="exportData" />
	</div>
</template>
<script>
	import VueUeditor from 'vue-cuihovah-ueditor';
	export default {
		data(){
			return {
				text: ''
			}
		},
		mounted(){
			var that = this;
		},
		components: {
			VueUeditor
		},
		methods: {
			exportData: function(text){
				this.text = text;
			},
			importData: function(text){
				this.contentText = text;
			}
		}
	}
</script>
```

## Options
exportData: 获取富文本编辑器的函数

## contributing
* cuihovah@gmail.com

## License (MIT)
