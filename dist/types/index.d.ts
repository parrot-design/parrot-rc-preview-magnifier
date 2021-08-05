export { default } from './PreviewMagnifier';
export interface SizeProps {
    width: number;
    height: number;
}
export interface ISelectedBoxProps {
    parentSize: number;
    shrinkProportion: number;
    prefixCls?: string;
    componentName?: string;
    visible: boolean;
    position?: {
        top: number;
        left: number;
    };
    sizeCallback?: Function;
}
export interface IPreviewMagnifierProps {
    prefixCls?: string;
    componentName?: string;
    children?: any;
    offsetLeft?: number;
    shrinkProportion?: number;
    previewBoxSize?: number;
}
export interface ISearchIconProps {
    prefixCls?: string;
    componentName?: string;
    children?: any;
    visible: boolean;
}
export interface IPreviewBoxProps {
    prefixCls?: string;
    componentName?: string;
    children?: any;
    target: any;
    visible: boolean;
    size: number;
    offsetLeft: number;
    imgUrl?: string;
    selectBoxSize?: number;
    shrinkProportion?: number;
    previewBoxSize: number;
    position?: {
        top: number;
        left: number;
    };
}
