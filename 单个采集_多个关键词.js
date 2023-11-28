define("version", "9.0.u1254303");
define("resolution", "1080*1920");
define("requireVersion", "3.4.0");
var device = Device.searchObject(sigmaConst.DevSelectOne);
// 创建手机对象
// var device = Device.getMain();
if (!device) {
//    print(device.name + "Cannot find device");
    throw "Cannot find device";
};
var caij_end = []
var keyAll = []
var authorAll = []
var count = 0
const dic = {}
var key_dict = {'水乳推荐': ['水乳二合一！我要锁死这瓶！'],'好人家':['所有的快乐都源于好人家']}
for (var o = 0; o < 3; o++) {
    try {
        var runAppName = "com.xingin.xhs"
        var runapp = device.runApp(runAppName);
        delay(3000);
        if (runapp == 0) {
            ret = get_Activity()
            if (ret.indexOf('intersitial.ui') != -1) {
                device.click(960, 130, tcConst.STATE_PRESS);
//                print(device.name + "关闭广告");
                delay(1000);
            }
            run(key_dict)
            writeEx(keyAll,authorAll)
            printf(keyAll)
            delay(1000);
            device.closeApp(runAppName);
            print(device.name + "-----------结束")
            break
        } else {
            print(device.name + '打开小红书失败');
            delay(2000);
        }
    } catch (err) {
        print(device.name + err);
    }

}



function reload() {
    device.send(tcConst.KEY_RECENTAPP);
    delay(2000);
    device.send(tcConst.KEY_BACK);
    delay(3000);
}

function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

// 列表页随机点击
function personate_list(num) {
    var num = randomNum(1, num)
    if (num == 1) {
        for (var ii = 0; ii < 3; ii++) {
            device.click(randomNum(100, 1000), randomNum(500, 2000), tcConst.STATE_PRESS);
            delay(1000)
            var detail_activity4 = get_Activity();
            //  判断是否为详情页
            if (detail_activity4.indexOf("notedetail.NoteDetailActivity") != -1 || detail_activity4.indexOf("detail.activity.DetailFeedActivity")) {
//                print(device.name + '列表页随机点击')
                personate_detail('3')
                break
            }
        }
    };
}
// 内容页随机
function personate_detail(detail_type) {
    // 进入随机内容页面
    if (detail_type == '3') {
        //        print(device.name + '随机内容页面')
        delay(randomNum(7000, 10000))
        for (var i = 0; i < randomNum(2, 5); i++) {
            delay(randomNum(1000, 3000));
            device.move(tcConst.movement.shiftDown);
        }
        delay(randomNum(1000, 3000));
        var detail_activity3 = get_Activity();
        //  判断是否为详情页
        if (detail_activity3.indexOf("search") == -1) {
            device.send(tcConst.keyCodes.KEYCODE_BACK, tcConst.STATE_PRESS);
            delay(1000);
        }        // 选定内容页面
    } else {
//        print(device.name + '选定内容页面')
        if (detail_type == '1') {
            for (var ii = 0; ii < randomNum(2, 3); ii++) {
                delay(randomNum(1000, 3000))
                device.move(tcConst.movement.shiftRight);
                delay(1000)
                var author_page = device.sendAai({ query: "T:*获赞与收藏*", action: "getBounds" });
                if (author_page) {
                    delay(1000)
                    device.send(tcConst.keyCodes.KEYCODE_BACK, tcConst.STATE_PRESS);
                    break
                }
            }
            for (var i = 0; i < randomNum(4, 6); i++) {
                delay(randomNum(5000, 10000));
                device.move(tcConst.movement.shiftDown);
            }
        } else {
            delay(randomNum(30000, 40000))
        }
        author_info(detail_type)
    }
}
// 作者页面随机
function author_info(detail_type) {
    var num = randomNum(1, 10)
    var author_click = false
    for (var i = 0; i < 3; i++) {
        if (detail_type == '1') {
            // 点赞
            //        if (num == 1) { device.sendAai({ query: "C:.ImageView&&R:.eb_", action: "click" }); }
            delay(1000);
            // 图片页面
            if (device.sendAai({ query: "R:.avatarLayout", action: "click" })) { author_click = true }
        } else {
            //            if (num == 1) { device.sendAai({ query: "C:.ImageView&&R:.dte", action: "click" }); }
            delay(1000);
            if (device.sendAai({ query: "R:.matrixAvatarView", action: "click" })) { author_click = true }
        }
        if (author_click) { break }
    }
    delay(1000);
//    print(device.name + '进入作者页面')
    // 作者页面下滑
    for (var i = 0; i < randomNum(2, 4); i++) {
        device.move(tcConst.movement.shiftDown);
        delay(randomNum(1000, 3000));
        // 随机点击
        personate_list(5)
    }
}

function error() {
    for (var kk = 0; kk < 3; kk++) {
    var error_text = device.sendAai({ query: "T:*网络好像断了*", action: "getBounds" });
    if (error_text) {
        delay(1000);
//        print(device.name + '网络中断,重新点击')
        device.sendAai({ query: "C:.ImageView&&R:.dfs", action: "click" });
        delay(3000);

    }}
}
function writeEx(keyAll, authorAll) {
  var existingData = excelUtils.readExcel("C:/Users/mac/Desktop/data/key.xlsx", "Sheet1");

  var startingRow = 0;

  if (existingData != null && existingData.length > 0) {
    startingRow = existingData.length; // 下一行开始添加新数据
  }

  var data = [];

  for (var i = 0; i < keyAll.length; i++) {
    var row = [];
    row.push(key_dict);
    row.push(keyAll[i]);
    row.push(authorAll[i]);
    data.push(row);
  }

  var ret = excelUtils.writeExcel("C:/Users/mac/Desktop/data/key.xlsx", "Sheet1",0 , startingRow, data);

  if (ret == true) {
    console.log("Successfully written to excel");
  } else {
    console.log("Failed to write! The error is: " + lastError());
  }
}




function click_key(author_key, gjc) {
    var tt = false
    bij_ids = ''
//    delay(500);
    author_key2 = author_key.split('&&')
    var img = device.sendAai({ query: "T:*" + author_key2[0] + "*", action: "getBounds" });
    if (img&&author_key2.length!=1){
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
    } else if (img&&author_key2.length==1) {
        bij_ids = img.ids[0]
    }
//    print(bij_ids)
    if (bij_ids) {
        delay(500);
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
                if (detail_activity.indexOf("notedetail.NoteDetailActivity") != -1) {
                    personate_detail("1")

                    delay(1000);
                    device.move(tcConst.movement.shiftDown);
                    // 作者
                    for (i=0; i<2; i++){
                         var author = device.sendAai({ query: "C:.TextView&&R:.nickNameTV", action: "getText" });
                         if (author){break}
                    }
                    // 标题
                    var title = device.sendAai({ query: "C:.TextView&&R:.ebx", action: "getText" });
                }
                if (detail_activity.indexOf("detail.activity.DetailFeedActivity") != -1) {
                    for (i=0; i<2; i++){
                        var author = device.sendAai({ query: "C:.TextView&&R:.matrixNickNameView", action: "getText" });
                        if (author){break}
                    }
                    // 标题
                    var title = device.sendAai({ query: "C:.TextView&&R:.noteContentText", action: "getText" });
                    personate_detail("2")
                }
                if (!author) {
                    author = { 'retval': '' };
                };
                if (!(title)) {
                    title = { 'retval': '' };;
                };
                  count = count + 1
                  printf(device.name + '查找到关键词：' + author_key + '共' + count +  '次' + '  搜索词:' + gjc + '  作者' + author)

                  // 存储关键词 keyAll
                  keyAll.push(author_key)
                  authorAll.push(author)
                caij_end.push(author_key)
            } catch (err) {
                print(device.name + "错误描述11：" + err.message);
                delay(1000);
            }
            for (var i = 0; i < 3; i++) {
                var detail_activity2 = get_Activity();
                //  判断是否为详情页
                if (detail_activity2.indexOf("search.GlobalSearchActivity") == -1) {
                    device.send(tcConst.keyCodes.KEYCODE_BACK, tcConst.STATE_PRESS);
                    delay(1000);
                }
            }
        } else {
            print(device.name + '当前页面既不是视频也不是图片');
        }
    }
    if (tt) { device.move(tcConst.movement.shiftDown); delay(1000); }

}

// 滑动页面
function search_key(author_key, key) {
    var ls = ''
    caij_end = []
    for (var i = 0; i < 20; i++) {
        error()

        for (var x = 0; x < 2; x++) {
            for (var z = 0; z < author_key.length; z++) {
                click_key(author_key[z], key);
            }
            if (caij_end && author_key) {
                for (var j = 0; j < caij_end.length; j++) {
                    if (author_key.indexOf(caij_end[j]) != -1) {
                        author_key.splice(author_key.indexOf(caij_end[j]), 1)
                        print(device.name + "关键词:" + key + "   已经完成:" + caij_end + '  未完成:' + author_key)
                    }
                }
            }

        }
        if (author_key.length == 0) {
            break
        }
        // 下滑
        var slide = device.move(tcConst.movement.shiftDown);
        delay(1000);
    }
}

function run(key_dict) {
//    print(device.name + "打开小红书");
    if (get_Activity().indexOf('update') != -1)
    {
        device.sendAai({ query: "C:.ImageView&&R:.az9", action: "click" });
    }
    //对坐标(123,254)进行点击操作（按下+弹起）
    for (var key in key_dict) {
        for (var q = 0; q < 3; q++) {
            if (get_Activity().indexOf('index') != -1) {
                device.click(970, 140, tcConst.STATE_PRESS);
//                print(device.name + "进入小红书搜索页");
                delay(1000);
                device.exec("ime set com.sigma_rt.totalcontrol/.ap.service.SigmaIME", 5000);
                delay(1000);
            }
            try {
                // 输入关键
                var keyword = device.inputTextSync(0, key);
                // var keyword =  device.inputText(key)
//                print(device.name + keyword)
                delay(1000);
                var search_text = device.sendAai({ query: "C:.EditText&&R:.ceo", action: "getText" });

//                print(device.name + search_text)
                if (keyword == true &&  search_text.retval.replace(/搜索,/g,"") == key) {
//                    print(device.name + "输入：" + key);
                    break;
                } else {
                    delay(500);
//                    print(device.name + '输入关键词错误  '+ search_text + keyword);
                    device.send(tcConst.keyCodes.KEYCODE_BACK, tcConst.STATE_PRESS);
                }
            } catch (err) {
                print(device.name + err);
            }
        }
        delay(1000);
        // 点击搜索按钮
        device.sendAai({ query: "C:.Button&&R:.cet", action: "click" });
        // 滑动页面
        search_key(key_dict[key], key)

    }
}

function get_Activity() {
    for (var q = 0; q < 3; q++) {
        var ret = device.getActivity();
        delay(500);
        if (ret) {
            return ret
        }
    }
    print(device.name + '3次get_Activity都失败')
}
