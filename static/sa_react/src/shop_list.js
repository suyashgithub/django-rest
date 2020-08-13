import React from "react";
import { render } from "react-dom";
import {getCookie } from './common/helper.js';
const request = require('superagent');

class ShopList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {result :null};
    this.list_data()
  }
  componentDidUpdate(prevProps) {
      if (prevProps.is_new_shop !== this.props.is_new_shop) {
            this.list_data();
            this.props.new_shop(false);
      }
  }

  list_data(){
    const req = request.get('/api/shop/');
    req.set("X-CSRFToken", getCookie('csrftoken'))
    req.end((err, res) => {
        if (!err && res) {
            let obj = JSON.parse(res.text);
            if (obj.success === true) {
                this.setState({result:obj.result})
            } else {
                //To do trap errors
            }
        }else {
           console.log('There was an error fetching data', err);
        }
    });
  }

  delete_shop(shop_id){
    if(shop_id !=undefined && shop_id > 0){
        if(confirm("Are you sure ?")){
            const req = request.del('/api/shop/'+shop_id+'/');
            req.set("X-CSRFToken", getCookie('csrftoken'))
            req.end((err, res) => {
                if (!err && res) {
                    let obj = JSON.parse(res.text);
                    if (obj.success === true) {
                        this.list_data();
                    } else {
                        //To do trap errors
                    }
                }else {
                   console.log('There was an error fetching data', err);
                }
            });
        }
    }
  }


  render() {
    return (
    <div className="col-sm-8">
      <div className="">
        <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>S.No</th>
                <th>User</th>
                <th>Shop Name</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            { this.state.result ?
                this.state.result.map((shop, i) =>{
                  return (<tr key={'r'+i}>
                    <td>{i+1}</td>
                    <td>{shop.username}</td>
                    <td>{shop.name}</td>
                    <td>{shop.status}</td>
                    <td>{shop.created_at}</td>
                    <td>
                        <button type="button" className="btn btn-danger" onClick={this.delete_shop.bind(this, shop.id)} >Delete</button>
                    </td>
                  </tr>
                  )
              })
              :null
            }
            </tbody>
          </table>
      </div>
    </div>
    );
  }
}

export default ShopList;
