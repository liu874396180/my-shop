

import React, { Component } from "react";
import "./index.css";
import ChatMes from "../chatMes";
import Liaison from "../liaison";
import store from '../../store'

class News extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            nav: [
                { id: 1, value: "联系人" },
                { id: 2, value: "消息" }
              ],
            navID: 1,
            Liaison:[],
            ChatMes:[]
         }
         //订阅Redux的状态
         store.subscribe(()=>{
            this.setState({
               Liaison:store.getState().info.data
            })
        }) 
    }
    componentDidMount(){
       
    }
    componentWillUnmount(){
        // 当在次页面切换到别的页面在返回来时报错
        // 解决Warning: Can't perform a React state update on an unmounted component.
        // This is a no-op, but it indicates a memory leak in your application. To fix,
        // cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
        //https://zhuanlan.zhihu.com/p/80796695
        this.setState = (state, callback) => {
            return;
        }
    }
    changeInput(){
        console.log("change")
    }
    render() { 
        return ( 
            <div className="news">
                <div className="search">
                    <div className="icon">
                        <img src={require("../../common/images/search.png")} alt="" />
                    </div>
                    <input type="text" value="" onChange={this.changeInput.bind(this)} placeholder="搜索" />
                </div>
                <div className="chat">
                    <ul className="top">
                        {this.state.nav.map((item,index)=>{
                            return(
                                <li className={ this.state.navID === item.id ? "item active" : "item"} key={item.id} onClick={this.navTab.bind(this, item.id)}>
                                    {item.value}
                                </li>
                            )
                        })}
                    </ul>
                    <div className="bottom">
                        {this.state.navID === 1 && <Liaison Liaison={this.state.Liaison} />}
                        {this.state.navID === 2 && <ChatMes />}
                    </div>
                </div>
            </div>
         );
    }
    navTab(id){
        this.setState({navID:id})
    }
}
 
export default News;