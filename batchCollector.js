/*
 * File Name: batchCollector.js
 * Author: John Doe
 * Created Date: 2023-08-09
 * Version: 1.0.0
 *
 *  该代码用于实现抖音作品信息批量采集
 */


/*
 *  异步模块定义，定义 version resolution,requireVersion 三个模块的属性
 */
define("version", "9.0.u1254303");
define("resolution", "1080*1920");
define("requireVersion", "3.4.0");

//数值定义
var device = Device.searchObject(sigmaConst.DevSelectOne);
//获取当前主控设备对象
var device = Device.getMain();
var douyinapp = "com.ss.android.ugc.aweme";
var calendarname = "com.android.calendar"

//批量采集 数值存放
const MAX_CONTENT_NUM= 100;    //设置最大数值为100
var infoIdsList = []   //设置ids列表
const searchKeyword = ["美白精华","水乳推荐"];
//var searchKeyword2 = [];
const filePath = '';
let line = 0;

//是否存在app
function checkDouyinInstalled() {
    var installedAPKs = device.getInstalledAPKList();
    if (installedAPKs.includes(douyinapp)) {
        print(`${device.name} --->  抖音已安装`);
    } else {
        print(`${device.name} --->  抖音未安装`);
    }
}


//打开app
function Restart_App(appName) {
var maxAttempts = 3;

    for(var i = 0; i < maxAttempts; i++){
      try {
          var runAppResult = device.runApp(appName);   //运行抖音App
          delay(1500);

          if (runAppResult === 0) {
              printf(`${device.name} --->  抖音启动成功`);
              break;
          }else {
              printf(`${device.name} --->  抖音启动失败`);
          }
      } catch (err) {
          printf("ERROR:"+device.name+"----"+err);
      }
    }
}


/*
 *创建一个新的排列数组
 */
function realignKeywords() {
    var totalKeywords = searchKeyword.length;

    for (var i = 0; i < totalKeywords + 10; i++) {
        var randomIndex = Math.floor(Math.random() * totalKeywords);
        var removedKeyword = searchKeyword.splice(randomIndex, 1); // 根据随机索引进行删除，并将删除的关键词存储在变量中
        searchKeyword.push(removedKeyword[0]); // 将删除的关键词添加到数组的末尾
    }
    printf("当前关键词列表:--->    "+searchKeyword);
}

//调用函数

delay(1500);
Restart_App(douyinapp);
realignKeywords();



/*
 *主运行函数
 *@param 接受一个关键词列表
 */
function Run(key){

    //获取日期字符串，并格式化----YYYY.MMMM.DDDD
    // var date = new Date();
    // var new_time = date.getFullYear() + "." + (date.getMonth() + 1)+ "." + date.getDate();

    //设置存放文件路径
    //var filePath = "D:/douyindata/testExcel.xlsx";
    //var filePath = "D:/douyindata/" + device.name + '_' + "_content.txt";
    for (var j = 0; j < key.length; j++){
      try {
        var home_activity = get_Activity();
        if(home_activity.indexOf("SplashActivity") != -1){
            sendKey(key[j]);
            delay(1000);
        //点击搜索按钮
            //device.sendAai({actions:["waitQuery('C:.TextView&&R:.v6q',1500)","click"]})
            device.sendAai({ query: "C:.TextView&&R:.v6q", action: "click" });
            crawl(filePath, key[j]);
            infoIdsList = [];
        }
    } catch(err) {
        printf("ERROR:"+device.name+"----"+err);
    }
        //searchKeyword2.push(key[j]);
    }
}


/*
 *进入搜索页面
 *@param 接受一个关键词列表
 */
 function sendKey(key){
     for(var i = 0; i < 3; i++){
        //进入抖音搜索页
        //device.sendAai({actions:["waitQuery('C:.Button&&R:.ji3',1500)","click"]})
        device.sendAai({ query: "C:.Button&&R:.ji3", action: "click" });
     try{
        printf(device.name + "---> 进入抖音搜索页！");
        delay(1000);
        device.exec("ime set com.sigma_rt.totalcontrol/.ap.service.SigmaIME", 5000);
    //输入关键词

        var keyword = device.inputTextSync(0,key);
        printf("当前输入关键词--->"+key);
        delay(1000);
        var searchText = device.sendAai({ query: "C:.EditText&&R:.et_search_kw", action: "getText" });
        printf("--->>>"+searchText)
        if(keyword  && searchText.retval === key){
            printf(device.name + "输入：" + key);
            break;
        }else{
            printf(device.name + "---> 错误关键词");
            device.send(tcConst.keyCodes.KEYCODE_BACK, tcConst.STATE_PRESS)
        }
      }catch (err){
            printf("ERROR:"+device.name + "---" + err);
      }
    }
}


/*
 *广告推荐消除
 */
function clearAds(adItem,brandItem) {
    try {
        // var adItem = device.sendAai({ query: "C:*com.lynx.tasm.behavior.ui.text.FlattenUIText", action: "getText" });
        // var brandItem = device.sendAai({ query: "T:*品牌广告*", action: "getText" });

        if (brandItem) {
            devices.move(tcConst.movement.pageDown); // 下移
        }

        if (adItem) {
            var adItem1 = adItem.retval[0]; // 获取商品


            if (adItem1 === "商品 · " || adItem1 === "经验 · ") { // 消除经验和商品
                var feedback = device.sendAai({ query: "T:*反馈入口*", action: "click" });
                delay(500);

                if (feedback) {
                    delay(500);
                    device.sendAai({ query: "T:*内容质量差*", action: "click" });
                }
            }
        }
    } catch (err) {
        printf("ERROR: " + device.name + " --- " + err);
    }
}


/*
 *合集判断
 */
function getCollection(isCharsExist) {
  try{
    // var adItem = device.sendAai({ query: "C:*com.lynx.tasm.behavior.ui.text.FlattenUIText",action: "getText"});
    // var isCharsExist = /合集/.test(adItem); // 是否存在"合集"
    printf("存在合集:"+isCharsExist);
    if(isCharsExist){

        var video_info = device.sendAai({query: "C:com.ss.android.ugc.aweme.xsearch.video.LynxSearchVideo",action: "getBounds"});
        if( video_info === null) {
            vidoe_info = device.sendAai({query: "C:com.ss.android.ugc.aweme.xsearch.photosalbum.LynxSearchPhotosAlbum",action: "getBounds"});
        }
        var time = 1;
        return video_info;
    }
    //return video_info;
  }catch (err){
    printf("ERROR: " + device.name + " --- " + err);
  }
}


/*
 *进入搜索页面
 *@param 接受一个关键词列表
 */
function crawl(filePath,gjc){
    device.sendAai({actions:["waitQuery('T:全部',5000)","getText"]})
    for (var i = 0; i  < 120 ;i++){
        error();
        let adItem = device.sendAai({ query: "C:*com.lynx.tasm.behavior.ui.text.FlattenUIText",action: "getText"});
        let brandItem = device.sendAai({ query: "T:*品牌广告*", action: "getText" });
        clearAds(adItem,brandItem);
        var isCharsExist = /合集/.test(adItem); // 是否存在"合集"
        if(isCharsExist){
            video_info = getCollection(isCharsExist);
        }

        delay(500);

        let time = device.sendAai({query: "C:.TextView&&R:.u7m",action: "getText"});
        if(time == null && (!isCharsExist)){
            device.sendAai({ query: "C:.ImageView&&R:.je2",action:"click"});
            delay(500);
            device.sendAai({ query: "T:*该结果与我想搜的内容无关*",action:"click"});
            device.sendAai({ query: "T:*提交*",action:"click"});
            delay(500);
        }
        if(video_info != null){
            time = 1;
        }
        if(!isCharsExist){
            var video_info = device.sendAai({query: "C:android.view.View&&R:.l==",action: "getBounds"});
         }

         //printf("video_info:"+video_info.ids);
         if (!video_info){
           video_info = {'ids':[]}
         }

         for(var h = 0; h< video_info.ids.length;h++){
            var current_ids = video_info.ids[h];
            var subscript = infoIdsList.indexOf(current_ids);

            if(subscript == -1 && subscript != null && time != null){
                delay(500);
                infoIdsList.push(current_ids);
                click_key(gjc,current_ids,filePath);
                printf(device.name + "---列表数量:%d", infoIdsList.length)
            }else {
                var subscriptLast = infoIdsList.lastIndexOf(current_ids)
                if(infoIdsList.length - subscriptLast >= 2 && subscript != null && time != null){
                    delay(500);
                    infoIdsList.push(current_ids);
                    click_key(gjc,current_ids,filePath);
                    printf(device.name + "---列表数量:%d", infoIdsList.length)
                }else{
                    printf("ids已获取---"+current_ids);
             }
           }

         }

         //delay(500);
         printf("列表ID值:---"+infoIdsList);
         var slide = device.move(tcConst.movement.shiftDown);
}
}


/*
 *@param ids值，文件路径，关键词信息
 返回值: 序号1，ids值，时间，作者名字，标题，点赞，收藏，评论
 */
function click_key(gjc,ids,filePath){
    var t = false;
    var tt = false;
    var a  = device.sendAai({actions:["scrollIntoView(ID:"+ids+")", "click"]})
    //var content_zb = device.sendAai({ query: "ID:" + ids,action:"getBounds"})
    printf("当前作品ID值:---"+ids);
    // if(content_zb){
    //     //delay(500);
    //     if (content_zb.bounds[0][1]<200){
    //           tt = true
    //           device.move(tcConst.movement.shiftUp);
    //           delay(500);
    //   }
    // }
    if(!a){
      delay(500);
        var clickFail = device.sendAai({actions:["scrollIntoView(ID:"+ids+")", "click"]})
        if (clickFail === null){
            print(device.name + "点击失败");
        }
    }
   device.sendAai({ query: "C:.ImageView&&R:.r1f",action:"click"});
   device.sendAai({ query: "T:*复制链接*",action:"click"});
   delay(500);
   var link_copy = device.get("text:clipboard");

   var publishDate = device.sendAai({query:"C:.TextView&&R:.vyk",action:"getDescription"});
   //var authorName = device.sendAai({ query: "C:.TextView&&R:.title",action:"getText"});
   var authorName = device.sendAai({ query: "C:.TextView&&R:.title",action:"getText"});
   if(authorName.retval.length <=  1 ){
      author = authorName.retval[0];
   }else {
     author = authorName ;
   }
   var like = device.sendAai({query:"C:.TextView&&R:.eqa",action:"getText"});
   delay(500);
   var comment = device.sendAai({query:"C:.ImageView&&R:.c=7||OY:1",action:"getText"});
   var favorite = device.sendAai({query:"C:.TextView&&R:.c49",action:"getText"});
   //var zk = device.sendAai({ query:"C:.TextView&&R:.wcs",action:"click"});
   var image1 = device.sendAai({ query: "T:图文",action:"getText"});
   delay(1000);
   var expand = device.sendAai({query:"C:.TextView&&R:.wcs",action:"getText"});
   if(expand){
       device.sendAai({query:"C:.TextView&&R:.wcs",action:"click"});
       delay(1000);
   }

   var titleName = device.sendAai({ query: "C:.TextView&&R:.desc",action:"getText"});
   //var image1 = device.sendAai({ query: "T:图文",action:"getText"});

   if (image1 != null){
       titleName = device.sendAai({ query: "C:.TextView&&R:.eii",action:"getText"});
   }
   retvals =  titleName.retval.split('\n');
   for (var i = 0; i < retvals.length; i++){
       retvals.join(retvals[i]);
   }

   //var allText = device.sendAai({query:"C:.TextView",action:"getText"});
   if(publishDate == null ){
        //图文
        device.sendAai({query:"C:.TextView&&R:.wcs",action:"click"});
        delay(1000);
        device.move(tcConst.movement.shiftDown);
        var publishDate = device.sendAai({query:"C:.TextView&&R:.tw_",action:"getText"});
        delay(500);
        device.sendAai({query:"C:.ImageView&&R:.ay9",action:"click"});
   }
   printf(publishDate.retval);
   printf("昵称:---"+author.retval);
   printf("链接:---"+link_copy);
   printf("标题:---"+retvals);
   printf("点赞:---"+like.retval);
   printf("评论:---"+comment.retval);
   printf("收藏:---"+favorite.retval);
   if(image1 != null) {
       device.sendAai({ query:"C:.ImageView&&R:.ay9",action:"click"});
   }
   delay(500);
   device.sendAai({ query:"C:.TextView&&R:.title",action:"click"});
   delay(2000);
   var fan = device.sendAai({ query:"C:.TextView&&R:.w28",action:"getText"});
   delay(500);
   var xigua = device.sendAai({ query:"T:下载西瓜视频关注我",action:"getText"});
   if(xigua != null){
       fan = device.sendAai({query:"T:粉丝||OY:1",action:"getText"});
       var clickClean = device.sendAai({query:"C:.ImageView&&R:.dm",action:"click"});
   }
   // var fan = device.sendAai({ query:"C:.TextView&&R:.w28",action:"getText"});
   printf("粉丝:---"+fan.retval);
   //delay(2000);
   var a = [gjc,authorName.retval,link_copy,retvals,publishDate.retval,fan.retval,like.retval,favorite.retval,comment.retval];
   // var a = [gjc,retvals];
   // printf("op"+a);
   //var data = {"关键字":gjc,"昵称":authorName.retval,"链接":link_copy,"标题":retvals,"时间":publishDate.retval,"粉丝数":fan.retval,"点赞":like.retval,"收藏":favorite.retval,"评论":comment.retval};
   writeExcel(a);
   if(!clickClean){
       device.sendAai({ query: "C:.ImageView&&R:.back_btn",action:"click"});
   }
   delay(1000);
   device.sendAai({ query: "C:.ImageView&&R:.back_btn",action:"click"});


}



function writeFile(a, filePath) {
    var data = [];
    data[0] = a;
    device.writeFile(filePath, data, 0);
    device.writeFile(filePath, '********************', 0);
    var write = device.writeFile(filePath, 0);
    if (write == 0) {
        device.writeFile(filePath, '------------------------------', 0);
        print(device.name + "写入成功");
    } else {
        print(device.name + "写入失败" + lastError());
    }
}

function writeExcel(a){
  var data = [];
  data[0] = a;
  var ret1 = excelUtils.writeExcel("D:/douyindata/testExcel.xlsx", "Sheet1", 0, line, data);
  if (ret1 == true) {
      print("Successfully written to excel");
      line += 1;
  } else {
      print("Failed to write! The error is: " + lastError());
  }
}

/*
 *网络错误
 *@param 接受一个关键词列表
 */
function error() {
    for (var kk = 0; kk < 3; kk++) {
        var error_text = device.sendAai({ query: "T:*网络错误*", action: "getBounds" });
        if (error_text) {
            delay(100000);
            print(device.name + '网络中断,重新点击')
            device.sendAai({ query: "C:.ImageView&&R.v6q", action: "click" });
            delay(3000);
        }else{
            break
        }
    }
}



function get_Activity() {
    for (var q = 0; q < 3; q++) {
        var ret = device.getActivity();
        delay(500);
        if (ret) {
            return ret
            printf("ret："+ret);
        }
    }
    print(device.name + '3次get_Activity都失败')
}
Run(searchKeyword);
