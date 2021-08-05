import React ,{ useEffect } from 'react';
import { IPreviewBoxProps } from '.';
import Popper from '@parrotjs/react-popper';
import classnames from '@parrotjs/classnames';


const PreviewBox=React.forwardRef((props:IPreviewBoxProps,ref)=>{
    const { 
        prefixCls:customizePrefixCls='parrot',
        componentName='preview-box',
        target, 
        size,
        offsetLeft,
        imgUrl, 
        shrinkProportion,
        previewBoxSize,
        position,
        visible
    }=props;

    const prefixCls=customizePrefixCls+'-'+componentName; 

    const growMultiple=(1/(shrinkProportion as number)) * previewBoxSize; 

    //图片大小
    const imgSize=growMultiple * size;

    const styles={
        width:size*previewBoxSize,
        height:size*previewBoxSize
    };

    const imgStyles={
        width:imgSize,
        height:imgSize,
        left:-((position as any).left * growMultiple),
        top:-((position as any).top * growMultiple)
    }
 
    return (
        <Popper 
            target={target} 
            visible={visible}
            placement='right'
            popperOptions={{
                modifiers:[
                    {
                        name: 'offset',
                        options: {
                          offset: [0, offsetLeft],
                        },
                    },
                ]
            }}
        >
            <div 
                className={
                    classnames(prefixCls)
                } 
                ref={(ref as any)}
                style={styles} 
            >
                {imgUrl?<img src={imgUrl} style={imgStyles}/>:null}
            </div>
        </Popper>
    )
    
});

export default  PreviewBox;