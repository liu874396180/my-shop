import React, { Component } from 'react';
import PropTypes from "prop-types";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import About from "../../pages/about";
import "./index.css"
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      navState: false // 是否显示导航栏
     }
     this.toggleNav = this.toggleNav.bind(this);
  }
  static propTypes = {
    record:PropTypes.any,
    title:PropTypes.string,
  }
  render() { 
    return ( 
      <div>
        <div className="headers">
          <span 
            className="icon-catalog margin-ft"
            onClick={this.toggleNav}
          >
          </span>
          <span className="title">{this.props.title}</span>
          <span className="margin-ft"></span>
        </div>
        <ReactCSSTransitionGroup
          component={this.FirstChild}
          transitionName="nav"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {this.state.navState && (
            <div className="nav-slide" onClick={this.toggleNav}>
              <About />
            </div>
          )}
        </ReactCSSTransitionGroup>
      </div>  
    );
  }
  toggleNav(){
    this.setState({
      navState: !this.state.navState
    })
  }
}
 
export default Header;