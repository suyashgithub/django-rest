import React from "react";
import { render } from "react-dom";
const request = require('superagent');
import ShopList from './shop_list.js';
import ShopAdd from './shop_add.js';

class Shop extends React.Component {
  constructor() {
    super();
    this.state = {
        new_shop:false
    };
  }
  new_shop_fn(status){
    this.setState({new_shop:status})
  }

  render() {
    return (
        <div className="container-fluid">
            <div className="row content">
                {/* search commented <div className="row">
                  <div className="col-sm-7 pull-right">
                    <div className="input-group col-sm-4">
                        <input type="text" className="form-control" placeholder="Search" />
                        <div className="input-group-btn">
                          <button className="btn btn-default" type="submit">
                            <i className="glyphicon glyphicon-search"></i>
                          </button>
                        </div>
                    </div>
                  </div>
                </div>*/}
                <ShopList
                    is_new_shop={this.state.new_shop}
                    new_shop={this.new_shop_fn.bind(this)}
                />
                <ShopAdd new_shop={this.new_shop_fn.bind(this)}/>
            </div>
        </div>
    );
  }
}

export default Shop;
