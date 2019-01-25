// pages/weighingsheet/weighingsheet.js
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
    var orderapi = new OrderApi();
    orderapi.goodslist({}, (goodslist) => {
      this.Base.setMyData({ goodslist });
    });

  }
  onMyShow() {
    var that = this;
    var orderapi = new OrderApi();
    orderapi.applyinfo({ id: this.Base.options.id},(applyinfo)=>{
        this.Base.setMyData({ applyinfo})
      })
  }
  setPageTitle(instinfo) {
    var title = "过磅单";
    wx.setNavigationBarTitle({
      title: title,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)