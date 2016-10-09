# 在AppCan中使用lazyload加载图片

> 原项目地址：https://github.com/jieyou/lazyload

## 简介

"lazyload.js"是基于jQuery或Zepto的图片延迟加载插件

该插件在较长的页面中延迟加载图片。视窗外的图片会延迟加载，直到它们由于用户滚动而出现到视窗中。可以将它看做图像预加载技术的反向运用。

在包含很多大图片且较长页面中使用延迟加载，能使页面载入更快。浏览器在只加载可见区域的图片后就达到绪状态。在某些情况下，它也能帮助减少服务器端的负载。

## 使用

appcan.js基于Zepto，如果项目中使用了appcan.js，把lazyload.js拷入项目中之后，直接在HTML代码中引入即可：

```html
 <script src="../../js/lazyload.js"></script>
```

**以下部分摘抄自原项目README文档：**

你必须改写你的HTML代码。真实图像的URL必须被放入到`data-original`属性中。给所有需要延迟加载图片一个特殊的class是一个好主意。这样你就可以很容易地控制哪些图片会被插件绑定到。请注意，你的图片应该有宽度和高度属性，或者通过CSS来控制图片的宽度和高度，或者通过某些手段来确保它有正确的宽度和宽度。

```html
    <!-- 直接赋予图片宽高 -->
    <img class="lazy" data-original="img/example.jpg" width="640" height="480">
    
    <!-- 或：通过css赋予图片宽高 -->
    <style>
        .lazy{width:640px;height:480px;}
    </style>
    <img class="lazy" data-original="img/example.jpg">
    
    <!-- 或：自适应宽度的图片样式（常用于移动端） -->
    <style>
        .lazy{width:100%;height:0;padding-top:75%;background-size:100%;}
        /* 假设高宽比为 480:640，即75%，并使用背景图的方式将图片铺在padding-top区域内
        （padding的百分比是宽度的百分比而不是高度的，即使是padding-top|padding-bottom） */
    </style>
    <div class="lazy" data-original="img/example.jpg"><div>
    <!-- 请参阅examples/enabled_image_full_width.html -->
```

然后你在你的代码中加入:

```javascript
$(".lazy").lazyload();
```

这会使得所有class为lazy的元素被延迟加载

### 高级

#### 在AJAX加载的内容中使用

```html
<img class="lazy" data-original="img/example.jpg" width="765" height="574">
```

```javascript
$("#container").one("click", function() {
    $("#container").load("images.html", function(response, status, xhr) {
        $("img.lazy").lazyload();
    });              
});
```

请参阅 `enabled_ajax.html`

#### 与css背景图一起使用

```html
<div class="lazy" data-original="img/bmw_m1_hood.jpg" style="background-image: url('img/grey.gif'); width: 765px; height: 574px;"></div>
```

```javascript
$("div.lazy").lazyload();
// 或加入某些效果
$("div.lazy").lazyload({
    effect : "fadeIn"
});
```

请参阅 `enabled_background.html`

#### 图片在某个容器中滚动

```html
<img class="lazy" data-original="img/example.jpg" width="765" height="574">
```

```css
#container {
    height: 600px;
    overflow: scroll;
}
```

```javascript
$("img.lazy").lazyload({         
    effect : "fadeIn",
    container: $("#container")
});
```

请参阅 `enabled_container.html`

#### 在`scrollstop`(或其他自定义事件)时判断是否应该加载图片

```html
<img class="lazy" data-original="img/example.jpg" width="765" height="574">
```

```html
<script src="jquery.scrollstop.js" type="text/javascript"></script>
```

```javascript
$("img.lazy").lazyload({
  event: "scrollstop"
});
```

请参阅 `enabled_gazillion.php`

#### 图片在某个容器中的水平方向滚动

```html
<img class="lazy" data-original="img/example.jpg" width="765" height="574">
```

```css
#container {
    width: 800px;
    overflow: scroll;
}
#inner_container {
    width: 4750px;
}
```

```javascript
$("img.lazy").lazyload({
    container: $("#container")
});
```

请参阅 `enabled_wide_container.html`

#### 加入fadeIn效果

```html
<img class="lazy" data-original="img/example.jpg" width="765" height="574">
```

```javascript
$("img.lazy").lazyload({
    effect : "fadeIn"
});
```

请参阅 `enabled_fadein.html`

#### 在5秒延迟后加载图片

```html
<img class="lazy" src="img/grey.gif" data-original="img/example.jpg" width="765" height="574">
```

```javascript
$(function() {          
    $("img.lazy").lazyload({
        event : "sporty"
    });
});
 
$(window).bind("load", function() { 
    var timeout = setTimeout(function() {
        $("img.lazy").trigger("sporty")
    }, 5000);
});
```

请参阅 `enabled_timeout.html`

#### 在水平方向很宽的页面中使用

```html
<img class="lazy" data-original="img/example.jpg" width="765" height="574">
```

```javascript
$("img.lazy").lazyload();
```

请参阅 `enabled_wide.html`

#### 在只能在竖直方向滚动的页面中使用

```html
<img class="lazy" data-original="img/example.jpg" width="765" height="574">
```

```javascript
$("img.lazy").lazyload({
    vertical_only: true
});
```

请参阅 `enabled_vertical_only.html`

#### 重写图片的原始url

某些情况下，你需要对图片的原始url做一些处理

```html
<img class="lazy" data-original="img/bmw_m1_hood.jpg" width="765" height="574">
```

```javascript
$("img.lazy").lazyload({
    url_rewriter_fn:function($element,originalSrcInAttr){
        // this -> image element
        if(originalSrcInAttr == 'img/bmw_m1_hood.jpg'){ // in the example, we changed the first image's url to another
            return 'img/bmw_m1_hood_rewritten.jpg'
        }
        return originalSrcInAttr
    }
})
// 回调函数中，`this`指向出现的图片元素的节点，参数第一项为当前元素的jQuery|Zepto对象，第二项为当前元素的图片的原始url
```

#### 不使用假图片预加载

默认情况下，我们在加载图片时，会先创建一个 Image 对象（fake image）将远端的图片加载到本地，再更改真正需要此图片的元素的 src 或 background-image 属性。这样用户看上去图片不是被缓慢加载出来的，而是在立即展现，或能添加诸如 fadeIn 类的效果。

但是如果图片是从某个接口动态返回的，而不是实际的一个静态文件，上述机制在某些情况下可能导致图片被加载两次（创建的Image对象会加载一次，实际DOM树中的元素设置 src 或 background-image 时又会加载一次），此时你可以将 no_fake_img_loader 参数设置为true，这样不会有 fake image 的机制，从而规避这种问题。

请注意 [与srcset属性一起使用](https://github.com/jieyou/lazyload#%E4%B8%8Esrcset%E5%B1%9E%E6%80%A7%E4%B8%80%E8%B5%B7%E4%BD%BF%E7%94%A8) 时，则一定会开启“不使用假图片预加载”，而无论你设置的no_fake_img_loader的值是true还是false。

```html
<img class="lazy" data-original="img/bmw_m1_hood.jpg" width="765" height="574">
```

```javascript
$("img.lazy").lazyload({
    no_fake_img_loader:true
})
```

请参阅 `enabled_no_fake_img_loader.html`

#### 与AMD模块加载器（如requirejs）一起使用

```html
<img class="lazy" data-original="img/bmw_m1_hood.jpg" width="765" height="574">
```

```javascript
require(['jquery','../lazyload'],function($){
  $(".lazy").lazyload()
})
```

请参阅 `enabled_amd.html`

#### 与srcset属性一起使用

更多详情请见 `enabled_srcset.html`

```html
<img class="lazy" data-original="img/bmw_m1_hood.jpg" data-original-srcset="img/bmw_m1_hood.jpg 765w" sizes="765px" width="765" height="574">
```

```javascript
$("img.lazy").lazyload()
```

请参阅 `enabled_srcset.html`

#### options对象

你可以将options对象当做`lazyload`方法的第一个参数来使用。

```javascript
var options = {
    // 默认情况下，图像会在出现在屏幕上时被加载。如果你想的图像更早地加载，可以使用threshold参数。设置threshold为200，将导致图像在它离视窗边缘还有200px时开始加载。
    threshold          : 0, // default: 0. 另一个例子: 200
    
    // 在页面滚动后，该插件将所有未加载的图像循环一遍。并在循环检查图像是否在视窗中。默认情况下，发现第一个位于视窗外的图片时，循环停止。这是基于以下的假设：页面上图像的顺序与它们在HTML代码中的顺序是一致的。然而对于某些布局，这可能是错误的。你可以通过设置failure_limit参数来控制循环终止的行为（failure_limit参数的数值为最多允许多少张图片被检查出位于视窗外后停止检查循环中剩余未检查的图片），当你将它设置为一个比较大的数值，显著多余总的图片数量（如9999）时，则可以认为会检测到每一张图片。
    failure_limit      : 0, // default: 0. 另一个例子: 10
    
    // 指定触发什么事件时，开始加载真实的图片。你可以使用jQuery中已有的事件，如click或mouseover。你也可以使用自定义的事件如sporty或foobar。当事件是`scroll`或类似事件类型时，还需要检查图像是否已出现在视窗中。
    event              : 'scroll', // default: 'scroll'. 另一个例子: 'click'
    
    // 默认情况下插件在等待图片完全加载后调用show()。你可以使用想要的任何效果。下面的代码使用了fadeIn效果。你可以在demo页面中查看该效果。
    effect             : 'show', // default: 'show'. 另一个例子: 'fadein'
    
    // 上述效果（`effect`）函数的参数数组。举两个例子，如果`effect`参数设置为`show`且`effect_params`参数设置为[400]，将会调用`$element.show(400)`，即在400ms后显示图片；如果`effect`参数设置为`fadein`且`effect_params`参数设置为[400,completeFunction]，将会调用`fadein(400,completeFunction)`，即在400ms内渐入显示图片，并在渐入动画完成时调用`completeFunction`。
    effect_params      : null, // default: undefined. 另一个例子: [400].
    
    // 你可以将改插件运用在某个容器内，如一个有滚动条的div。只需要传递容器的jQuery对象。我们有在纵向和横向滚动的容器中使用插件的两个demo。
    container          : window, // default: 'show'. 另一个例子: $('#container')
    
    // 默认情况下，图片的真实url被设置在`data-original`属性内，你可以通过修改下面这个值来改变这个属性名（如`url`，这样插件将在`data-url`属性中查找图片的真实地址）注意下面这个值是不用包含`data-`头的。
    data_attribute     : 'original', // default: 'original'. 另一个例子: 'url'

    // 当你将图片懒加载技术与`srcset`一起使用时，你不能将`srcset`的值直接写在`srcset`内，否则会导致图片立即加载。默认情况下，你应该写在属性`data-original-srcset`内，这样lazyload插件会帮你在合适的时候将它的赋值到`srcset`上。你可以通过修改下面这个值来改变这个属性名。注意下面这个值是不用包含`data-`头的。
    data_srcset_attribute     : 'original-srcset', // default: 'original-srcset'. 另一个例子: 'o-srcset'
    
    // 当图片在视窗中出现时回调。`this`指向出现的图片元素的节点，参数第一项为当前元素的jQuery|Zepto对象，第二项为尚未出现的图片的数量，第三项为配置参数对象。
    appear             : function(){}, // default: `the emptyFunc`. 另一个例子: function($elements, elements_left, options){}
    
    // 当图片加载完毕时回调。`this`指向出现的图片元素的节点，参数第一项为当前元素的jQuery|Zepto对象，第二项为尚未出现的图片的数量，第三项为配置参数对象。
    load               : function(){}, // default: `the emptyFunc`. 另一个例子: function($elements, elements_left, options){}
    
    // 在大多数情况下，页面只能纵向滚动。此时，只需要检查图片的竖直位置是否出现在视图中即可。如果这样做能提高性能。你可以在只能纵向滚动的页面中将`vertical_only`参数设置为true
    vertical_only      : false, // default: false. 另一个例子: true
    
    // 默认情况下，lazyload会在`window`的`scroll`、`resize`事件被触发时，检查图片是否已经出现在视窗中，但用户一次缩放屏幕通常可能连续触发多次resize事件；除了iOS以外的设备，用户一次滚屏也可能触发多次scroll事件，这造成了性能上的浪费。你可以通过这个参数设置两次检查之间最少的间隔时间，用来提高性能。当设置为0时，则每次触发`scroll`、`resize`事件时都会检测
    check_appear_throttle_time            : 300, // default: 300. 另一个例子: 0
    
    // 重写图片的原始url。回调函数中，`this`指向出现的图片元素的节点，参数第一项为当前元素的jQuery|Zepto对象，第二项为当前元素的图片的原始url
    url_rewriter_fn             : function(){},  // default: `the emptyFunc`. 另一个例子: function($element,originalSrcInAttr){}
    
    // 不使用假图片预加载（详见上面“高级”中的“不使用假图片预加载”）
    no_fake_img_loader          : false, // default: false. 另一个例子: true
    
    // 如果一个img元素没有指定src属性，我们使用这个placeholder，在真正的图片被加载之前，此img会呈现这个占位图。
    placeholder_data_img : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC',
    
    // IE6/7 的 placeholder。这是我当时在百度时的cdn地址，建议改为你服务器上的任一张灰色或白色的1*1的小图
    placeholder_real_img : 'http://webmap3.map.bdimg.com/yyfm/lazyload/0.0.1/img/placeholder.png'
}

$("img.lazy").lazyload(options);
```

#### 移除skip_invisible属性

由于display:none时，jQuery/Zepto中的`$(selector).offset().top/left`属性始终为0( [链接](http://bugs.jquery.com/ticket/3037) )，因此该属性为false并且图片一开始display:none时，由于无法得到该标签距离文档顶部的实际像素数，图片在一开始就会被加载上来，违背了lazyload的初衷。因此该版本中删掉了该属性。lazyload不会去管display:none的图片，可能会出现当将display:none改变为其它值，图片仍然没有被加载的情况，但是只要滑动滚轮触发scroll或event中设定的事件，图片还是可以被加载出来的，examples中的remove_invisible.html展示了这一场景

## 