// pages/dirhistory/dirhistory.js
// pages/driverlist/driverlist.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { OrderApi } from "../../apis/order.api.js";
import { ExampleApi } from "../../apis/example.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
     id: this.Base.options.id
    })
    console.log(11111);
  }
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: '司机列表',
    });

    // var id=this.Base.getMyData().id;
    var orderapi = new OrderApi();
    orderapi.applylist({ transport: "L", orderid: this.Base.options.id }, (completedlist) => {
      this.Base.setMyData({ completedlist });
    });
    
  }
  
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindcompleted = content.bindcompleted;
body.bindwaitcompleted = content.bindwaitcompleted;
body.bindcontact = content.bindcontact;
body.bindqueren = content.bindqueren;
body.Determineduse = content.Determineduse;
body.Refuse = content.Refuse;
body.addcompleted = content.addcompleted;
body.weightsheet = content.weightsheet;
Page(body)