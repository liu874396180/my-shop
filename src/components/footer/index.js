import React, {Component } from 'react';
import { Link } from "react-router-dom";
import './index.css'
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            //   底部导航栏
            footerNav: [
                { path: "/", exact: true, icon: "home.jpg", name: "首页" },
                { path: "/category", exact: false, icon: "category.jpg", name: "分类" },
                { path: "/info", exact: false, icon: "info.jpg", name: "消息" },
                { path: "/cart", exact: false, icon: "cart.jpg", name: "购物车" },
                { path: "/my", exact: false, icon: "my.jpg", name: "我的" }
            ]
         }
    }
    render() { 
        return ( 
            <div className="footer">
                <div className="foot-ul">
                    {
                        this.state.footerNav.map((item,index)=>{
                            return(
                                <Link  key={item + index} to={item.path} className="foot-item">
                                  <img src={require("../../common/images/" + item.icon)} alt="" />
                                  <span>{item.name}</span>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
         );
    }
}
 
export default Footer;