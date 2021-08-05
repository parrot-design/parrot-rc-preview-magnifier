import React , { useEffect, useRef }from 'react'; 
import Preview from '../../src';
import "./index.css";

const Demo=()=>{
 
 
    return (
        <div style={{padding:100}}>
            <Preview>
                <img 
                    src={'https://img.alicdn.com/imgextra/i4/3282796868/O1CN01gTtB5c20basEyuYsW_!!3282796868.jpg_430x430q90.jpg'}
                    style={{width:500,height:500}}    
                />
            </Preview>
        </div>
    )
}

export default Demo;