import React from "react";
import { render } from "react-dom";
import {getCookie } from './common/helper.js';
import {user_info } from './common/state.js';
const request = require('superagent');

class ShopAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        post_data : {'name':'','status':''},
        name_error_cls:'',
    };
  }

  change_shop_name(event){
    let post_data = this.state.post_data;
    post_data.name = event.target.value;
    this.setState({ post_data:post_data})
  }

  change_disc(event){
    let post_data = this.state.post_data;
    post_data.status = event.target.value;
    this.setState({ post_data:post_data})
  }

  handle_save(){
    let post_data = this.state.post_data;
    if(post_data.name !=''){
        console.log("post_data", this.state.post_data)
        const req = request.post('/api/shop/');
        req.send(this.state.post_data)
        req.set("X-CSRFToken", getCookie('csrftoken'))
        req.end((err, res) => {
            if (!err && res) {
                let obj = JSON.parse(res.text);
                if (obj.success === true) {
                    post_data.name = '';
                    post_data.status ='';
                    this.setState({ post_data:post_data,name_error_cls:''})
                    this.props.new_shop(obj.success)
                } else {
                    this.props.new_shop(false)
                }
            }else {
               console.log('There was an error fetching data', err);
            }
        });
    }else{
        this.setState({ name_error_cls:'has-error'})
    }
  }

  render() {
    return (
        <div className="col-sm-4">
            <div className="">
                  <div className="form-group">
                    <label htmlFor="user_name">Name</label>
                    <input type="text"
                    className="form-control"
                    id="user_name"
                    value={user_info.LOGED_IN_USER}
                    disabled />
                  </div>
                  <div className={"form-group " + this.state.name_error_cls}>
                    <label htmlFor="pwd">Shop Name</label>
                    <input type="shop_name" value={this.state.post_data.name} className="form-control" id="pwd"
                        onChange={this.change_shop_name.bind(this)}
                        required ="true"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pwd">Status</label>
                    <textarea className="form-control" rows="5" id="comment"
                     onChange={this.change_disc.bind(this)}
                     value={this.state.post_data.status}
                    >
                    </textarea>
                  </div>
                  <button type="button" className="btn btn-primary" onClick={this.handle_save.bind(this)}>Submit</button>
            </div>
        </div>
    );
  }
}

export default ShopAdd;
