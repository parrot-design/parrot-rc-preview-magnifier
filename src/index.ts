import React, { MutableRefObject, ReactElement } from 'react';

export { default } from './PreviewMagnifier';

export interface SizeProps{
    width:number;
    height:number;
}

export interface ISelectedBoxProps{  
    parentSize:number;//外层包裹组件的大小
    shrinkProportion:number;//相较于父容器
    prefixCls?:string;//元素前缀
    componentName?:string;//组件名称
    visible:boolean;
    position?:{top:number,left:number};
    sizeCallback?:Function;//计算完的大小回调
} 

export interface IPreviewMagnifierProps{
    prefixCls?:string;//元素前缀
    componentName?:string;//组件名称
    children?:any;
    offsetLeft?:number;//向左偏移量
    shrinkProportion?:number;//选择盒子占图片大小比例
    previewBoxSize?:number;//预览盒子与原图大小比例
}

export interface ISearchIconProps{
    prefixCls?:string;//元素前缀
    componentName?:string;//组件名称
    children?:any;
    visible:boolean;
}

export interface IPreviewBoxProps{
    prefixCls?:string;//元素前缀
    componentName?:string;//组件名称
    children?:any; 
    target:any;
    visible:boolean;
    size:number;
    offsetLeft:number;//向左偏移量
    imgRef?:MutableRefObject<HTMLImageElement>;//Dom对象-img
    selectBoxSize?:number;//选择盒子的大小
    shrinkProportion?:number;////选择盒子占图片大小比例
    previewBoxSize:number;//预览盒子与原图大小比例
    position?:{top:number,left:number};
}