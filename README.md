---
theme: condensed-night-purple
---
# 一、基于React+Hooks实现的一个仿天猫的购物放大镜组件

>之前在项目中有遇到实现购物车放大镜的功能，当时比较着急，没有考虑复用性等。最近项目比较闲，所以就写了这样的一个组件。

# 二、使用方法

```js
1.安装插件
npm install @parrotjs/react-preview-magnifier

2.在需要使用的地方进行引用并使用
import Preview from '@parrotjs/react-preview-magnifier';
import "@parrotjs/react-preview-magnifier/dist/index.css" 

3.使用
<Preview>
    <img 
          alt={''} 
          style={{width:400,height:400}} 
          src={"https://img.alicdn.com/imgextra/i4/3282796868/O1CN01gTtB5c20basEyuYsW_!!3282796868.jpg_430x430q90.jpg"} 
    />
</Preview>
```

# 三、使用注意事项
   
```js
```

## 1.需要将img标签作为子元素传入

```js
图片需要设置宽高等，便于组件内部进行计算高度等，且必须要是单标签
```

# 四、开放的API

```js
```

## 1.offsetLeft

```js
右边预览框距离左边的距离,默认为10px
```

## 2.shrinkProportion

```js
选择框内选择区域相较于选择框的占比，默认是0.5
```

## 3.previewBoxSize

```js
预览框相较于原图的大小比例，默认是1
```

## 4.小伙伴可以提出需求 我会开放更多api
       
```js
```

# 五、未来插件

```js
如果有小伙伴使用 我会带来更多的功能 丰富完善插件 

1.增加滚轮放大功能
2.....
```

# 六、预览地址

[codesandbox预览地址](https://codesandbox.io/s/competent-bardeen-pe62y?file=/src/App.tsx:0-562)


![测试.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34e43e1b1b99448d81966870e27e5c3d~tplv-k3u1fbpfcp-watermark.image)


# 七、github地址

[github地址](https://github.com/parrot-design/parrot-rc-preview-magnifier)

