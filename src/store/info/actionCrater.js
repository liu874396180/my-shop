import {linkList,chatList} from "../../api/index";
import { GETINFOLIST,CHANGEINFOLIST } from './actionType'

// let chatListData = await chatList({type:"chatList"});

export const getLinkListData = ()=>{
 
    return (dispatch)=>{
        linkList({type:"linkList"}).then((res)=>{
            let linkListData = res.data.linkList;
            dispatch({type:GETINFOLIST,data:linkListData})
        });
    }
    
}
