/*
    单个采集_多个关键词脚本_抖音
    8-3
    1
*/
define("version", "9.0.u1254303");    //定义APP版本号
define("resolution", "1080*1920");     //定义分辨率 1080*1920
define("requireVersion", "3.4.0");

var device = Device.searchObject(sigmaConst.DevSelectOne);
var device = Device.getMain();    //获取当前主控设备对象

/* 单采_多个关键词_数据字典存放 */
var key_dict = {'美白精华':['夏季美白新思路，稳妥又有用','学生党的美白精华来啦！！！'],'水乳推荐':['从价格到产品都良心的水乳！'],'身体乳':['17款身体乳评测完我们发现贵的不一定更好用！']};
var caij_end = []
const dic = {}


if ( ! device ) {   //判断当前设备是否在线
    print("No device found");
} else {
    var ret = device.getActivity();
    print("The activity running in the foreground is: " + ret);
}


/*
        获取抖音的Activity
*/
function get_Activity() {
    for (var i = 0; i < 3; i++) {
        var ret = device.getActivity();
        delay(500);
        if (ret) {
            return ret
        }
    }
    print(device.name + '3次get_Activity都失败')
}


/**
*设置公共函数：启动测试的APP
*/
function restart_app_douyin() {
  for(var i = 0; i < 3; i++){
    try {
      var runAppName = "com.ss.android.ugc.aweme";   //存放App应用程序
      var runapp = device.runApp(runAppName);   //运行抖音App
      delay(3000);
      if(runapp == 0){
          ret = get_Activity();
          printf("启动APP执行成功:",+device.name);
          break;
      }else {
          printf("启动APP执行失败:"+device.name);
          delay(2000);
      }
    } catch (err) {
      printf("ERROR:"+device.name+"---"+err);
    }
  }
}


/*
  进入搜索栏页面
*/
function page1_search_click(){
    if (get_Activity().indexOf('update') != -1) {   //判
        device.sendAai({ query: "C:.ImageView&&R:.az9", action: "click" });
    }
    // var a = get_Activity().indexOf('index');
    // printf("a:"+a);
    if (get_Activity().indexOf('index') == -1) {    //进入搜索栏框
        device.sendAai({ query: "C:.Button&&R:.ji3", action: "click" });
        //device.click(984, 118, tcConst.STATE_PRESS);
        printf("successful:(Enter Douyin search page)");
        delay(1000);
        page1_search_input(key_dict)
        //device.exec("ime set com.sigma_rt.totalcontrol/.ap.service.SigmaIME", 5000);
    }else{
        printf("点击搜索栏失败");
    }
}


/*
    搜索栏输入关键词
*/
function page1_search_input(key_dict){
    printf("关键词词典:"+key_dict);
    for (var key in key_dict) {
      for (var q = 0; q < 3; q++) {
        printf("关键词:"+key);
        device.exec("ime set com.sigma_rt.totalcontrol/.ap.service.SigmaIME", 5000);    //打开Sigma输入法
        delay(1000);
        try{
            var keyword = device.inputTextSync(0, key);//输入关键词
            print(device.name +":---"+ keyword);
            delay(1000);
            print(device.name + "输入：" + key);
            var search_text = device.sendAai({ query: "C:.EditText&&R:.et_search_kw", action: "getText" });
            printf("搜索栏输入关键词:"+search_text);
            if (keyword == true && search_text.retval == key) {
                break;
            }else {
                delay(500);
                print(device.name + '输入关键词错误  '+ search_text + keyword);
                // device.send(tcConst.keyCodes.KEYCODE_BACK, tcConst.STATE_PRESS);
              }
        }catch(err){
            print(device.name + err);
        }
    }
        delay(1000);
        device.sendAai({ query: "C:.TextView&&R:.v6q", action: "click" });
        delay(1000);
        device.sendAai({ query: "T:*视频*", action: "click" });
        printf("提示:>>>关键词字典列表:"+ key_dict[key]+"<<<");
        search_key(key_dict[key], key);
        //device.sendAai({ query: "C:.TextView&&R:.v6q", action: "click" });
    }
    //这里进行调试，key_dict[key] = ？
}


// 滑动页面
function search_key(author_key, key) {
    var page_num = 0;
    var ls = ''
    caij_end = []
    for (var i = 0; i < 110; i++) {
        error()   //进行调用错误函数调用，判断是否出
        if (i == 80) {
            if (zuixin(key, true)){
                var videoCount = 0;
                if (videoCount >= 200) {
                    break;
                }
            }
        }
        for (var x = 0; x < 2; x++) {
            //这里进行调试,i : ?,x : ?; author_key : ?,author_key.length: ?;
//            printf("i:"+i+",x:"+x+",author_key:"+author_key+",author_key.length:"+author_key.length);
            for (var z = 0; z < author_key.length; z++) {
                click_key(author_key[z], key);    //点击的
            }
            if (caij_end && author_key) {
                for (var j = 0; j < caij_end.length; j++) {
                    if (author_key.indexOf(caij_end[j]) != -1) {
                        author_key.splice(author_key.indexOf(caij_end[j]), 1)
                        print(device.name + "-关键词:" + key + "   已经完成:" + caij_end + '  未完成:' + author_key)
                    }
                }
            }

        }
        if (author_key.length == 0) {
            break
        }
        if (get_Activity().indexOf("search") != -1 && device.sendAai({ query: "T:*搜索发现*", action: "getBounds" })) {
            zuixin(key, false)
        }
        // 下滑
        var slide = device.move(tcConst.movement.shiftDown);
        delay(1000);
        page_num ++;
    }
    printf("提示:>>>滑动了"+page_num+"次<<<");
    printf("提示:>>>关键词查找完毕<<<");
}
function zuixin(key, zx) {
//    device.send(tcConst.keyCodes.KEYCODE_BACK, tcConst.STATE_PRESS);
    for (var q = 0; q < 3; q++) {
        if (get_Activity().indexOf('index') != -1) {
            device.click(996, 138, tcConst.STATE_PRESS);
            delay(1000);
//            print(device.name + "进入抖音搜索页");
                device.exec("ime set com.sigma_rt.totalcontrol/.ap.service.SigmaIME", 5000);
                delay(1000);
        }
        try {
            // 输入关键
            var keyword = device.inputTextSync(0, key);
            // var keyword =  device.inputText(key)
//            print(device.name + keyword)
            delay(2000);
            var search_text = device.sendAai({ query: "C:.EditText&&R:.et_search_kw", action: "getText" });
//            print(device.name + search_text)
            if (keyword == true && search_text.retval == key) {
//                print(device.name + "输入：" + key);
                break;
            } else {
//                print(device.name + '判断输入关键词是否成功');
                reload()
            }
        } catch (err) {
            print(device.name + err);
        }

    }
    delay(1000);
    // 点击搜索按钮
    device.sendAai({ query: "C:.TextView&&R:.v6q", action: "click" });
    delay(1000)
    device.click(1000, 260, tcConst.STATE_PRESS);
    delay(1000)
    device.click(410, 530, tcConst.STATE_PRESS);
    delay(1000)
    device.click(500, 1500, tcConst.STATE_PRESS);
    delay(1000)
    if(zx){
        if (device.sendAai({ query: "T:全部*", action: "click" })) {
            delay(1500)
            if (device.sendAai({ query: "T:最新", action: "click" })) { print(device.name + '切换最新搜索'); delay(2500) }
            if (device.sendAai({ query: "T:*迷路了*", action: "getBounds" })) { print(device.name + '服务器迷路了'); return true }
        }
    }
    return false
}


function error() {
    for (var kk = 0; kk < 3; kk++) {
    /*
        ****************
        这里需要修改成抖音的网络错误提示
        网络错误:
        2、"网络错误"中间灰框弹出提示，获取query值
        3、"加载失败，请稍后重试"，获取query值
    */
    var error_text = device.sendAai({ query: "T:*网络好像断了*", action: "getBounds" });
    if (error_text) {
        delay(1000);
//        print(device.name + '网络中断,重新点击')
        device.sendAai({ query: "C:.ImageView&&R:.dfs", action: "click" });
        delay(1000);

    }}
}

function click_key(author_key, gjc) {
    var tt = false
    bij_ids = ''
    delay(500);
    author_key2 = author_key.split('&&')
    //调试:author_key2 ： ？
    printf("提示:>>>正在查找的关键词 : "+author_key2+"<<<");
    var img = device.sendAai({ query: "T:*" + author_key2[0] + "*", action: "getBounds" });
    if (img&& author_key2.length != 1){
        for (i = 0; i < img.ids.length; i++) {
            for (j = 0; j < 3; j++) {
                t = device.sendAai({ query: "ID:"+img.ids[i], action: "getText" });
                if (t){
                     if(t.retval.indexOf(author_key2[1])!=-1){
                        bij_ids = img.ids[i]
                     }
                    break
                }
            }
            if (bij_ids){break}
        }
    } else if (img&& author_key2.length==1) {
        bij_ids = img.ids[0]
    }
   if (bij_ids) {

        delay(500);
        printf("提示:关键词视频点击坐标: >>>" + img.bounds[0][1]+ "<<<");
        if (img.bounds[0][1] < 200) {
            tt = true
            device.move(tcConst.movement.shiftUp);
            delay(1000);
        }
        device.sendAai({ query: "ID:" + bij_ids, action: "click" })
        delay(500);
        var detail_activity = get_Activity();
        //  判断是否为详情页
        if (detail_activity.indexOf("search.GlobalSearchActivity") == -1) {

            try {
                var author = device.sendAai({ query: "C:.TextView&&R:.title&&CC:0", action: "getText" });
                if (detail_activity.indexOf("detail.activity.DetailFeedActivity") != -1) {
                    for (i=0; i<2; i++){
                        var author = device.sendAai({ query: "C:.TextView&&R:.matrixNickNameView", action: "getText" });
                        if (author){break}
                    }
//                    var obj = UiElement.findObject(device,"C:.TextView&&R:.title&&CC:0");
                    // 标题
                    var title = device.sendAai({ query: "C:.TextView&&R:.noteContentText", action: "getText" });
                    personate_detail("2")

                }

                if (!author) {
                    author = { 'retval': '' };
                };
                if (!(title)) {
                    title = { 'retval': '' };
                };
                var brief = device.sendAai({ query: "C:.TextView&&R:.we-", action: "getText" });
                if (brief != null){
                    printf("brief"+brief);
                    device.sendAai({ query: "C:.ImageView&&R:.back_btn", action: "click" });
                }
                printf("提示:>>>>"+device.name + '--查找到关键词：' + author_key + '--搜索词:' + gjc + '--作者:' + author + "!");
//                  printf(device.name + '作者:%s,标题:%s,', author.retval, title.retval)
                caij_end.push(author_key);
            } catch (err) {
                print(device.name + "错误描述11：" + err.message);
                delay(1000);
            }
            for (var i = 0; i < 1; i++) {

                var detail_activity2 = get_Activity();
                    browseVideos()
                //  判断是否为详情页
                if (detail_activity2.indexOf("search.GlobalSearchActivity") == -1) {
                    device.send(tcConst.keyCodes.KEYCODE_BACK);
                    delay(1000);
                }
            }
        } else {
            print(device.name + 'ERROR:---当前页面既不是视频也不是图片!!!');
        }
    }
    if (tt) {
    device.move(tcConst.movement.shiftDown);
    delay(1000);
    }

}


/*
    播放浏览设置(通过进度条长度来进行判断)
*/
function browseVideos() {
    delay(7000);
    device.click(578, 667, tcConst.STATE_PRESS);
    delay(1000);
    var seekbar = device.sendAai({ query: "C:.SeekBar&&R:.w-x&&CC:0", action: "getProgress" });
    var progress_value = seekbar.retval.current;
    printf("提示:>>>当前进度为:"+progress_value + "<<<");
    device.click(578, 667, tcConst.STATE_PRESS);
    delay(2000);
    printf("进度条状态 : "+seekbar);
    if(progress_value  >= 5188){
        device.click(72, 122, tcConst.STATE_PRESS);
    }else{
        printf("提示:>>>视频进度超过15秒,延时一分钟<<<");
        delay(60000);
        device.click(72, 122, tcConst.STATE_PRESS);
    }

}


function CloseDouyin(){
  printf("所有关键词搜索成功!---5秒后关闭抖音")
  delay(5000);
  var closeapp = device.closeApp("com.ss.android.ugc.aweme");
  if (closeapp == 0){
  	print('关闭抖音失败');
  } else{
  	print('成功关闭抖音');
  }
}


restart_app_douyin();
page1_search_click();
CloseDouyin();
