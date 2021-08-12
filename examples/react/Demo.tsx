import React , { useEffect, useRef,useState }from 'react'; 
import Preview from '../../src';
import "./index.css";

const Demo=()=>{
 
    const [url, setUrl] = useState('https://img.alicdn.com/imgextra/i4/3282796868/O1CN01gTtB5c20basEyuYsW_!!3282796868.jpg_430x430q90.jpg')

    const replaceUrl = () => {
        setUrl('https://sf6-ttcdn-tos.pstatp.com/img/user-avatar/b1e19b3de788bb023612756b337aa48c~300x300.image')
    }

    return (
        <div style={{padding:100}}>
            <Preview>
                <img 
                    src={url}
                    style={{width:500,height:500}}    
                />
            </Preview>
            <br />
            <button onClick={replaceUrl}>替换图片url</button>
        </div>
    )
}

export default Demo;