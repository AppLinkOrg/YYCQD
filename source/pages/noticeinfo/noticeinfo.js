// pages/noticeinfo/noticeinfo.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { OrderApi } from "../../apis/order.api.js"; 

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  } 
  onMyShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: '公告内容',
    });

    var orderapi = new OrderApi();
    orderapi.messageinfo({ id:this.Base.options.id }, (messageinfo) => {
      this.Base.setMyData({ messageinfo })
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)