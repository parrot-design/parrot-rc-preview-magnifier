import React,{ useState,useCallback } from 'react';

let initPosition={left:0,top:0}

/**
 * 一个hook可以计算此时的position
 * @param wrapperRect 需要放大的图片
 * @param selectedRect 选中的盒子
 * @returns 
 */
export default function useMove(wrapperRect:any,selectedRect:any){ 

    const { 
        left:wrapperLeft,
        right:wrapperRight,
        top:wrapperTop,
        bottom:wrapperBottom,
        width:wrapperWidth,
        height:wrapperHeight
    }=wrapperRect; 

    const {
        width:selectedWidth
    }=selectedRect;
 

    const limitPx=selectedWidth/2;

    //记录刚进入的坐标
    const [startX, setStartX] = useState(0);
    const [startY,setStartY] = useState(0);

    const [position,setPosition]=useState<any>(initPosition);

    const reset=()=>{
        setStartX(0);
        setStartY(0);
        setPosition(initPosition)
    }

    const eventcall=useCallback((event:any)=>{
        let top;
        let left; 
        //如果刚开始从左边进入
        if(event.clientX-wrapperLeft<limitPx){
            left=0;
        //刚开始从右边进入
        }else if(wrapperRight-event.clientX<limitPx){
            left=wrapperWidth-selectedWidth;
        //从中间进入则在中间
        }else if(wrapperRight-event.clientX>limitPx || event.clientX-wrapperLeft>limitPx){
            left=event.clientX-wrapperLeft-limitPx;
        }
        //如果刚开始从上边进入
        if(event.clientY-wrapperTop<limitPx){
            top=0;
        //如果刚开始从下边进入
        }else if(wrapperBottom-event.clientY<limitPx){
            top=wrapperHeight-selectedWidth;
        //从中间进入则在中间
        }else if(wrapperBottom-event.clientY>limitPx || event.clientY-wrapperTop>limitPx){
            top=event.clientY-wrapperTop-limitPx;
        } 

        setPosition({top,left})
        
    },[wrapperLeft,wrapperRight,wrapperTop,wrapperBottom,wrapperWidth,wrapperHeight,selectedWidth])

    const start=(event:any)=>{ 
        
        reset();
        setStartX(event.clientX);
        setStartY(event.clientY);

        eventcall(event);
    }

    const move=useCallback((event:any)=>{
        eventcall(event);
    },[eventcall])

    return {
        start,
        move,
        reset,
        startX,
        startY,
        position
    }

}