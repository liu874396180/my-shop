import React, { Component, Fragment } from "react";
import "./index.css"
import {cateList} from "../../api/index";
class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            cateListData:[]
         }
    }
    async componentDidMount(){
        let cateListData = await cateList({type:"cateList"});
        this.setState({
            cateListData:cateListData.data.cateList
        })
    }
    render() { 
        return ( 
            <div className="categorylist">
                {this.state.cateListData.map((item,index)=>{
                    return(
                        <Fragment key={item.id}>
                            {this.props.id === item.id && (
                            <Fragment key={item.id}>
                                {item.list.map((item1, index1) => {
                                    return(
                                        <div className="module" key={item1 + index1}>
                                            <div className="title">
                                                <span className="line"></span>
                                                <span className="title-name">{item1.title}</span>
                                                <span className="line rt"></span>
                                            </div>
                                            <ul className="content">
                                            {item1.list.map((item2, index2) => {
                                                return(
                                                    <li key={item2 + index2} className="item">
                                                        <div className="imgs">
                                                        <img src={item2.img} alt="" />
                                                        </div>
                                                        <div className="text">
                                                        <p>{item2.subTitle}</p>
                                                        <div className="all-price">
                                                            <div>
                                                            ￥<span>{item2.price}</span>
                                                            </div>
                                                            <div className="price">
                                                            ￥<span>{item2.oldPrice}</span>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                            </ul>
                                        </div>
                                    )
                                })}
                            </Fragment>
                        )}
                    </Fragment>
                    )
                })}
            </div>
         );
    }
}
 
export default CategoryList;