import React ,{ useState } from 'react';
import { ISearchIconProps } from '.';
import classnames from '@parrotjs/classnames';
import { Search } from '@parrotjs/react-icon';
import '@parrotjs/react-icon/dist/index.css';


const SearchIcon=React.forwardRef((props:ISearchIconProps,ref)=>{
    const { 
        prefixCls:customizePrefixCls='parrot',
        componentName='search-icon',
        visible
    }=props;

    const prefixCls=customizePrefixCls+'-'+componentName; 

    return (
        <span className={classnames(prefixCls,{
            [`${prefixCls}-hidden`]:!visible
        })} >
           <Search size={'default'} />
        </span>
    )
    
});

export default  SearchIcon;