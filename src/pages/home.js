import React, { Component } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import ReactSwipe from "react-swipe";
import "../common/style/app.css";
import {swipeList,activeList,hotSaleList, navList} from "../api/index";
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            index: 0,
            swipeList:[],
            activeList:[],
            hotSaleList:[],
            navList:[]
         }
    }
    async componentDidMount(){
        let swipeListData = await swipeList({type:"swipeList"});
        let activeListData = await activeList({type:"activeList"});
        let hotSaleListData = await hotSaleList({type:"hotSaleList"});
        let navListData = await navList({type:"navList"});
        
        Promise.all([swipeListData,activeListData,hotSaleListData,navListData]).then(([swipeListData,activeListData,hotSaleListData,navListData])=>{
            this.setState({
                swipeList:swipeListData.data.swipeList,
                activeList:activeListData.data.activeList,
                hotSaleList:hotSaleListData.data.hotSaleList,
                navList:navListData.data.navList,
            })
        })
    }
    render() { 
        return (
            <div className="home">
                <Header title="首页"/>
                <ReactSwipe
                    swipeOptions={{ continuous: true, auto: 3000 }}
                    key={this.state.swipeList.length}
                    className="swipers"
                >
                    {this.state.swipeList.map((item,index)=>{
                        return(
                            <div key={index} className="swiper">
                                <img src={require("../common/images" + item)} alt="" />
                            </div>
                        )
                    })}
                </ReactSwipe>
                <div className="nav">
                    <ul>
                        {
                            this.state.navList.map((item,index)=>{
                                return(
                                    <li key={index}>
                                        <img src={require("../common/images/" + item.imgSrc)} alt=""/>
                                        <span>{item.name}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="bodyblock">
                    <div className="block-active">
                        <ul>
                            {this.state.activeList.map((item,index)=>{
                                return(
                                    <li className="items" key={item + index}>
                                        <div className="title">
                                            <img src={item.titleImg} alt={item.bigTitle} />
                                            <span>{item.titleIntroduce}</span>
                                        </div>
                                        <ul className="content">
                                            {item.list.map((_item,_index)=>{
                                                return(
                                                    <li key={_item + _index}>
                                                        <img src={_item.img} alt="" />
                                                        <div className="rt">
                                                            { _item.smallTitle && <span className="smallTitle">{_item.smallTitle}</span>}
                                                            <span className="introduce">{_item.introduce} </span>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="recommend">
                        <img
                        src="https://img.alicdn.com/simba/img/TB1pIQFjbr1gK0jSZR0SuvP8XXa.jpg"
                        alt=""
                        />
                    </div>
                     {/* 热卖单品 */}
                     <div className="hot-sale">
                        <div className="title">
                            <span>热卖单品</span>
                        </div>
                        <div className="sale-bodyblock">
                            <ul>
                                {this.state.hotSaleList.map((item,index)=>{
                                    return(
                                        <li key={item + index}>
                                            <img src={item.detailImg} alt="" />
                                            <p>{item.title}</p>
                                            <div className="hot-bt">
                                                <span>
                                                    <span className="mark">￥</span>
                                                    <span className="price">{item.price}</span>
                                                </span>
                                                <span className="volume">
                                                    {item.salesVolume !== 0
                                                    ? "销量：" + item.salesVolume
                                                    : ""}
                                                </span>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                     </div>
                </div>
                <Footer />
            </div>
        );
    }
}
 
export default Home;