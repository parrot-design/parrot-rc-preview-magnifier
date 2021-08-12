import React, { useEffect, useState, useCallback, useRef } from 'react';
import classnames from '@parrotjs/classnames';
import { getBoundingClientRect } from '@parrotjs/dom-utils';
import { useForkRef } from '@parrotjs/react-hooks';
import { Search } from '@parrotjs/react-icon';
import '@parrotjs/react-icon/dist/index.css';
import Popper from '@parrotjs/react-popper';

const SelectedBox = React.forwardRef((props, ref) => {
    const { parentSize = 0, shrinkProportion, prefixCls: customizePrefixCls = 'parrot', componentName = 'selected-box', visible, position, sizeCallback = () => { } } = props;
    const prefixCls = customizePrefixCls + '-' + componentName;
    const size = parentSize * shrinkProportion;
    const boxStyles = Object.assign({ width: size, height: size }, position);
    useEffect(() => {
        if (size > 0) {
            sizeCallback(size);
        }
    }, [size, sizeCallback]);
    return (React.createElement("span", { className: classnames(prefixCls, {
            [`${prefixCls}-hidden`]: !visible
        }), style: boxStyles, ref: ref }));
});

const SearchIcon = React.forwardRef((props, ref) => {
    const { prefixCls: customizePrefixCls = 'parrot', componentName = 'search-icon', visible } = props;
    const prefixCls = customizePrefixCls + '-' + componentName;
    return (React.createElement("span", { className: classnames(prefixCls, {
            [`${prefixCls}-hidden`]: !visible
        }) },
        React.createElement(Search, { size: 'default' })));
});

let initPosition = { left: 0, top: 0 };
/**
 * 一个hook可以计算此时的position
 * @param wrapperRect 需要放大的图片
 * @param selectedRect 选中的盒子
 * @returns
 */
function useMove(wrapperRect, selectedRect) {
    const { left: wrapperLeft, right: wrapperRight, top: wrapperTop, bottom: wrapperBottom, width: wrapperWidth, height: wrapperHeight } = wrapperRect;
    const { width: selectedWidth } = selectedRect;
    const limitPx = selectedWidth / 2;
    //记录刚进入的坐标
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [position, setPosition] = useState(initPosition);
    const reset = () => {
        setStartX(0);
        setStartY(0);
        setPosition(initPosition);
    };
    const eventcall = useCallback((event) => {
        let top;
        let left;
        //如果刚开始从左边进入
        if (event.clientX - wrapperLeft < limitPx) {
            left = 0;
            //刚开始从右边进入
        }
        else if (wrapperRight - event.clientX < limitPx) {
            left = wrapperWidth - selectedWidth;
            //从中间进入则在中间
        }
        else if (wrapperRight - event.clientX > limitPx || event.clientX - wrapperLeft > limitPx) {
            left = event.clientX - wrapperLeft - limitPx;
        }
        //如果刚开始从上边进入
        if (event.clientY - wrapperTop < limitPx) {
            top = 0;
            //如果刚开始从下边进入
        }
        else if (wrapperBottom - event.clientY < limitPx) {
            top = wrapperHeight - selectedWidth;
            //从中间进入则在中间
        }
        else if (wrapperBottom - event.clientY > limitPx || event.clientY - wrapperTop > limitPx) {
            top = event.clientY - wrapperTop - limitPx;
        }
        setPosition({ top, left });
    }, [wrapperLeft, wrapperRight, wrapperTop, wrapperBottom, wrapperWidth, wrapperHeight, selectedWidth]);
    const start = (event) => {
        reset();
        setStartX(event.clientX);
        setStartY(event.clientY);
        eventcall(event);
    };
    const move = useCallback((event) => {
        eventcall(event);
    }, [eventcall]);
    return {
        start,
        move,
        reset,
        startX,
        startY,
        position
    };
}

const PreviewBox = React.forwardRef((props, ref) => {
    const { prefixCls: customizePrefixCls = 'parrot', componentName = 'preview-box', target, size, offsetLeft, imgUrl, shrinkProportion, previewBoxSize, position, visible } = props;
    const prefixCls = customizePrefixCls + '-' + componentName;
    const growMultiple = (1 / shrinkProportion) * previewBoxSize;
    //图片大小
    const imgSize = growMultiple * size;
    const styles = {
        width: size * previewBoxSize,
        height: size * previewBoxSize
    };
    const imgStyles = {
        width: imgSize,
        height: imgSize,
        left: -(position.left * growMultiple),
        top: -(position.top * growMultiple)
    };
    return (React.createElement(Popper, { target: target, visible: visible, placement: 'right', popperOptions: {
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, offsetLeft],
                    },
                },
            ]
        } },
        React.createElement("div", { className: classnames(prefixCls), ref: ref, style: styles }, imgUrl ? React.createElement("img", { src: imgUrl, style: imgStyles }) : null)));
});

const initRect = { width: 0, height: 0, left: 0, top: 0, bottom: 0, right: 0 };
const PreviewMagnifier = React.forwardRef((props, ref) => {
    var _a;
    const { prefixCls: customizePrefixCls = 'parrot', componentName = 'preview-magnifier', children, offsetLeft = 10, shrinkProportion = 0.5, previewBoxSize = 1 } = props;
    const prefixCls = customizePrefixCls + '-' + componentName;
    //当前最外层节点
    const wrapperRef = useRef(null);
    //图片的size
    const [imgSize, setImgSize] = useState(0);
    //图片的节点
    const imgRef = useRef(null);
    //预览图片的节点
    const previewRef = useRef(null);
    //选择box节点
    const selectBoxRef = useRef(null);
    //记录盒子的大小
    const [selectBoxSize, setSelectBoxSize] = useState(0);
    //指针是否进入
    const [pointerIn, setPointerIn] = useState(false);
    //选择盒子大小变化的回调
    const selectedBoxSizeCallback = useCallback((size) => { setSelectBoxSize(size); }, []);
    useEffect(() => {
        const { width, height } = getBoundingClientRect(imgRef.current);
        setImgSize(Math.max(width, height));
    }, []);
    const { position, start, move, reset } = useMove(imgRef.current ? getBoundingClientRect(imgRef.current) : initRect, selectBoxRef.current ? Object.assign(Object.assign({}, getBoundingClientRect(selectBoxRef.current)), { width: selectBoxSize }) : initRect);
    //指针进入
    const handlePointerEnter = useCallback((e) => {
        setPointerIn(true);
        start(e);
    }, [start]);
    //指针离开
    const handlePointerLeave = useCallback((e) => {
        setPointerIn(false);
        reset();
    }, [reset]);
    //指针移动
    const handleMouseMove = useCallback((e) => {
        move(e);
    }, [move]);
    const handleRef = useForkRef(ref, wrapperRef);
    return (React.createElement("div", { className: classnames(prefixCls), onMouseMove: handleMouseMove, ref: handleRef },
        React.createElement("div", { className: `${prefixCls}-action`, onMouseEnter: handlePointerEnter, onMouseLeave: handlePointerLeave },
            React.cloneElement(children, {
                ref: imgRef
            }),
            React.createElement(SelectedBox, { visible: pointerIn, parentSize: imgSize, prefixCls: customizePrefixCls, position: position, shrinkProportion: shrinkProportion, sizeCallback: selectedBoxSizeCallback, ref: selectBoxRef })),
        React.createElement(SearchIcon, { visible: !pointerIn }),
        React.createElement(PreviewBox, { ref: previewRef, target: wrapperRef.current, offsetLeft: offsetLeft, visible: pointerIn, size: imgSize, selectBoxSize: selectBoxSize, previewBoxSize: previewBoxSize, shrinkProportion: shrinkProportion, imgUrl: (_a = imgRef === null || imgRef === void 0 ? void 0 : imgRef.current) === null || _a === void 0 ? void 0 : _a.src, position: position })));
});

export default PreviewMagnifier;
