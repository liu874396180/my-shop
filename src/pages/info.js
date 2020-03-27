import React, { Component } from "react";
import "../common/style/app.css";
import AHeader from "../components/header";
import Footer from "../components/footer";
import News from "../components/news";
import {getLinkListData} from "../store/info/actionCrater";
import store from '../store'
class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
     componentDidMount(){
        const action = getLinkListData()
        store.dispatch(action)
    }
    render() { 
        return ( 
            <div className="info">
                <AHeader title="消息" />
                <News />
                <Footer />
            </div>
         );
    }
}
 
export default Category;