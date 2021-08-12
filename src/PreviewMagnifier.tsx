import React, { useRef, useEffect, useState, useCallback } from 'react';
import { IPreviewMagnifierProps } from '.';
import classnames from '@parrotjs/classnames';
import { getBoundingClientRect } from '@parrotjs/dom-utils';
import { useForkRef } from '@parrotjs/react-hooks';
import SelectedBox from './SelectedBox';
import SearchIcon from './SearchIcon';
import useMove from './hooks/useMove';
import PreviewBox from './PreviewBox';
import './index.scss';

const initRect = { width: 0, height: 0, left: 0, top: 0, bottom: 0, right: 0 };

const PreviewMagnifier = React.forwardRef((props: IPreviewMagnifierProps, ref) => {
    const {
        prefixCls: customizePrefixCls = 'parrot',
        componentName = 'preview-magnifier',
        children,
        offsetLeft=10,
        shrinkProportion=0.5,
        previewBoxSize=1
    } = props;

    const prefixCls = customizePrefixCls + '-' + componentName;
    //当前最外层节点
    const wrapperRef = useRef(null);
    //图片的size
    const [imgSize, setImgSize] = useState(0); 
    //图片的节点
    const imgRef = useRef<any>(null);
    //预览图片的节点
    const previewRef = useRef(null);
    //选择box节点
    const selectBoxRef = useRef(null);
    //记录盒子的大小
    const [selectBoxSize, setSelectBoxSize] = useState(0);
    //指针是否进入
    const [pointerIn, setPointerIn] = useState(false);
    //选择盒子大小变化的回调
    const selectedBoxSizeCallback = useCallback((size) => { setSelectBoxSize(size) }, []);

    useEffect(() => {
        const { width, height } = getBoundingClientRect(imgRef.current) 
        setImgSize(Math.max(width, height))
    }, []); 

    const { position, start, move, reset } = useMove(
        imgRef.current ? getBoundingClientRect(imgRef.current) : initRect,
        selectBoxRef.current ? { ...getBoundingClientRect(selectBoxRef.current), width: selectBoxSize } : initRect
    );
    //指针进入
    const handlePointerEnter = useCallback((e) => {  
        setPointerIn(true); start(e)
    }, [start]
    );
    //指针离开
    const handlePointerLeave = useCallback((e) => { 
        setPointerIn(false); reset();
    }, [reset]);
    //指针移动
    const handleMouseMove = useCallback((e) => {
        move(e);
    }, [move]);

    const handleRef = useForkRef(ref, wrapperRef);

    return (
        <div
            className={classnames(prefixCls)} 
            onMouseMove={handleMouseMove}
            ref={handleRef}
        >
            <div className={`${prefixCls}-action`} onMouseEnter={handlePointerEnter} onMouseLeave={handlePointerLeave} >

                {React.cloneElement(children, {
                    ref: imgRef
                })}

                <SelectedBox
                    visible={pointerIn}
                    parentSize={imgSize}
                    prefixCls={customizePrefixCls}
                    position={position}
                    shrinkProportion={shrinkProportion}
                    sizeCallback={selectedBoxSizeCallback}
                    ref={selectBoxRef}
                />

            </div>


            <SearchIcon visible={!pointerIn} />

            <PreviewBox 
                ref={previewRef} 
                target={wrapperRef.current} 
                offsetLeft={offsetLeft} 
                visible={pointerIn} 
                size={imgSize} 
                selectBoxSize={selectBoxSize}
                previewBoxSize={previewBoxSize}
                shrinkProportion={shrinkProportion}
                imgUrl={imgRef?.current?.src}
                position={position}
            />

        </div>
    )

});

export default PreviewMagnifier;
