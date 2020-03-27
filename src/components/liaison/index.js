import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types'
import "./index.css";

class Liaison extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          Liaison: []
         }
        //  console.log(this.props.Liaison)
    }
   
  componentDidUpdate(prevProps){
        // console.log(prevProps)
  }
  static getDerivedStateFromProps(props, current_state) {
    if(props.Liaison.length !== current_state.Liaison.length){
      // console.log(props)
      // console.log(current_state)
    }
    return null;
  }
    getMore(item){
        item.state = !item.state;
        let list = [...this.props.Liaison];
        list.map((items, indexs) => {
            if (items.lid === item.lid) {
              items = item;
            }
            return item // 消除警告
        });
        this.setState({
          Liaison: list
        });
    }
    render() { 
        return ( 
            <div className="liaison">
                <ul>
                   {this.props.Liaison.map((item, index) => {
                       return(
                        <li key={item.lid}>
                            <div className="lis-top" onClick={this.getMore.bind(this, item)}>
                                <div className="icon">
                                    {!item.state&&( <img src={require("../../common/images/arrow.png")} alt=""/> )}
                                    {item.state&&( <img src={require("../../common/images/down.png")} alt=""/> )}
                                </div>
                                <div className="names">{item.group}</div>
                            </div>
                            <div className="lis-ul">
                                {item.list.map((items, indexs) => {
                                    return(
                                        <Fragment key={items.id}>
                                            {item.state&&(
                                                <div className="items-li">
                                                    <div className="lts">
                                                        <img src={items.avatar} alt="" />
                                                    </div>
                                                    <div className="rts">
                                                        <div>{items.name}</div>
                                                        <div className="sign">{items.sign}</div>
                                                    </div>
                                                </div>
                                            )}
                                        </Fragment>
                                    )
                                })}
                            </div>
                        </li>
                       )
                   })}
                </ul>
            </div>
         );
    }
}
Liaison.propTypes = {
  Liaison:PropTypes.array,
}
// https://www.jianshu.com/p/3f5514843b8a
export default Liaison;