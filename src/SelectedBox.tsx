import React ,{ useEffect } from 'react';
import { ISelectedBoxProps } from '.';
import classnames from '@parrotjs/classnames';


const SelectedBox=React.forwardRef((props:ISelectedBoxProps,ref)=>{
    const {
        parentSize=0,
        shrinkProportion,
        prefixCls:customizePrefixCls='parrot',
        componentName='selected-box',
        visible,
        position,
        sizeCallback=()=>{}
    }=props;

    const prefixCls=customizePrefixCls+'-'+componentName; 

    const size=parentSize*shrinkProportion;

    const boxStyles={
        width:size,
        height:size,
        ...position
    }

    useEffect(() => {
        if(size>0){
            sizeCallback(size);
        }
    }, [size,sizeCallback])

    return (
        <span className={classnames(
            prefixCls,
            {
                [`${prefixCls}-hidden`]:!visible
            }
        )} style={boxStyles} ref={(ref as any)} /> 
    )
    
});

export default  SelectedBox;