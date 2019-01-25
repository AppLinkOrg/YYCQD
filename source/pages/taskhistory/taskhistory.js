// pages/taskhistory/taskhistory.js
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
    this.Base.setMyData({
      today: this.Base.util.FormatDate(new Date())
    })
  }
  onMyShow() {
    var that = this;
    var orderapi=new OrderApi();
    //taskstatus: "1",taskstatus:"4"
    orderapi.list({ taskstatus:4 }, (list) => {
      this.Base.setMyData({ list });
    });
    var UserInfo = this.Base.getMyData().UserInfo;
    orderapi.enterpriselist({}, (errlist) => {
      this.Base.setMyData({ errlist })
    })
  }
  setPageTitle(instinfo) {
    var title = "历史任务";
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