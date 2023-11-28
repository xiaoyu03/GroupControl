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
const dic = {}
var key_dict = {'精华推荐': ['堪比美颜开最大，这俩能甩贵妇精华八条街', '用前：广告做得好！用后', '真心推荐的大牌精华！选对不花冤枉钱', '不贵但好用到飞起的美白精华', '20年淡斑终于胜利了', 'Lulu的好物推荐', '美白精华物尽其用，速来抄作业！', '10年护肤总结，秋冬必备大牌精华', '熬夜脸有救了', '美白去黄精华推荐', '秋日美白精华这样选！都给你们总结好了', '黄黑皮28天减黄打卡实测', '小白瓶能不能白？15人真实打卡告诉你', '减黄和提亮没见过比它更牛的了！', '这期看完，淡斑还搞不定', 'csq敲前点播年度爱用精华之夜', '9款美白精华推荐！使用感总结', '618热门精华盘点，精华推荐还得去李老头', '减黄提亮淡斑一手抓', '减黄提亮神器', '初秋热门美白精华如何选', '双十一大牌精华怎么选', '值得反复回购的秋冬精华', '救救！好用s了！又双叒叕空瓶的抗糖', '值得入手的4款美白淡斑精华', '这个美白精华是真的顶', '我终于知道大娘为什么是护肤顶流了', '这样搭美白效果蹭蹭翻倍', '这个男人诚不欺我', '6枚白净精华尖子生', '是每次用完半夜起来都想哭的程度', '我的真爱精华从此出现了', 'OLAY双小白瓶怎么选', '值得入手的热门美白精华', '普通女生怎么做自媒体', '在呼伦贝尔呆了五天 一个花钱景点没去', '用过OLAY全家桶的人'], '抗老面霜': ['干皮油皮双十一抗老面霜怎么选', '百元价格千元配置，猛补胶原的抗老面霜', '说实话，抗老面霜很多，真能脸变紧的极少', '不到500就能搞定大集团抗老面霜', '用过百瓶抗老面霜！性价比超高的都在这', '抗老面霜怎么选', '垮脸不要试', '这个抗老面霜真有点东西', '人生建议一定要拥有的高性价比面霜', '消费更低抗老升级', '这抗老面霜牛', '小周的熬夜好物分享', '618抗衰老怎么选指南', '超红瓶到底有多香', '新品来袭！这面霜简直就是抗老界的特种兵', '十年面霜大户心得', '我不发谁知道这个百元面霜抗老这么顶', '不藏了，抗老面霜看这些', '不藏了！25+抗老面霜只推荐这几个', '双11必囤高性价', '双十一必囤抗老面霜'], '面膜推荐': ['25以后救大命的面膜都在这', '面膜破防', '3年项目爱好者', '面膜界无量流火', 'Lulu的好物推荐', '能让肤质变好的面膜推荐', '干皮我劝你买', '熬夜急救的神！垮掉半边的脸被拽回来了'], '双十一必买': ['双11必囤高性价', '双十一必囤抗老面霜', '李佳琦双十一美妆节', '双十一Olay豁出去了', '真正值得回购的大牌明星精华！双十一必囤'], '美白精华': ['突然悟到了亚洲人先稳后抗的护肤决胜路线', '干皮黄糙暗想翻身', '抗糖是投资最低，回报最高的事情', '旅游暴晒不想黑', '抓住晒后美白黄金期', '热卖榜前10的美白精华', '美白精华正确打开方式', '黄黑皮的钱该你赚！美白精华真有用', '熬夜脸有救了', '美白去黄精华推荐', '冷白皮计划2', '黄皮相见恨晚！这美白精华减黄快到离谱', '4个高性价比', '拜托！美白精华搭的好', '跟上大部队也能亮一个度', '10款大牌美白精华购买攻略', '今夏值得买的美白精华都在这了', '20年淡斑终于胜利了', '毫不夸张，谁用谁白净', '美白精华界无代餐', '先稳后抗诚不欺我护肤', '秋日美白精华这样选', '减黄提亮淡斑一手抓', '美白淡斑精华的万能公式搭配', '我再也不怕熬夜了', 'Lulu的好物推荐', '9款美白精华推荐', '值得入手的热门美白精华', '堪比院线！这样搭美白效果蹭蹭翻倍', '一张图，你能找出几个面部黄气的', '初秋热门美白精华如何选', '跟着老爸顺利下车', '为什么你天天涂美白精华都不白', '美白精华物尽其用，速来抄作业', '太阳下的pure', '造福暗黄瑕疵皮的精华', '好用又好搭的美白淡斑精华', '救救！好用s了！又双叒叕空瓶的抗糖', 'buy前请看！爆款美白精华', '李老头那买的美白精华', '28天打卡实测！这个方法真能对抗', '熬夜党为什么没早点发现这个美白精华啊', '减黄和提亮没见过比它更牛的了', '1分钟搞透美白逻辑', 'OLAY双小白瓶怎么选', '清醒点，很多美白精华都没意义', '7推荐的精华真的能用一辈子', '双小白到底怎么用？哪支是你的天菜', '没有一丝熬夜黄气能逃', '瑕疵皮上岸', '佳琦都说好用的美白紫微星OLAY', '小白瓶能不能白', '黄黑皮姐妹快来', '美白这样搭配用2个月', '熬夜也白白嫩嫩', '精华推荐！美白精华补货', '去黄比美白更重要', '风很大的先稳后抗', '是每次用完半夜起来都想哭的程度', '熬夜脸亲妈美白精华', '值得入手的4款美白淡斑精华', '30天实测！被这瓶美白精华震惊到', '黄黑皮怎样用美白精华养出白净水光肌', '低成本养成冷白皮', '减黄提亮神器', '黄黑皮28天减黄打卡实测', '4个神仙用法白成电灯', '早晚搭配要选对', '油皮美白精华这么搭', '用了不下20瓶淡斑小白瓶', '淡斑老用户的私教课', '这期看完，淡斑还搞不定', '骆王宇说的快速美白', '来总结几支真正有效的美白精华', '30+日常爱用的热门精华'], '双十一李佳琦清单': ['双11必囤高性价', '双十一必囤抗老面霜', '李佳琦双十一美妆节', '双十一Olay豁出去了', '真正值得回购的大牌明星精华！双十一必囤'], '李佳琦双十一': ['双11必囤高性价', '双十一必囤抗老面霜', '李佳琦双十一美妆节', '双十一Olay豁出去了', '真正值得回购的大牌明星精华！双十一必囤'], '面霜推荐': ['性价比炸裂，双十一要囤就囤这几瓶面霜吧', '传说中的逆转婴儿肌面霜', '十年面霜大户心得', 'OLAY新品硬核炸场', '劝大家今年护肤上一定要省钱', '这面霜简直就是抗老界的特种兵', '没人觉得OLAY太可怕了吗', '真的不给其他抗老面霜留活路', '值得投资的大牌面霜推荐'], '水乳推荐': ['双十一不同功效水乳怎么选', '换季干敏、底妆卡粉', '真正有效的水乳', '有它在秋冬你还跟我斗', '从平价到大牌，一些春夏热门水乳推荐', '把钱花在刀刃上', '油皮不懂我们干皮的痛', '秋冬高保湿水乳，又润又抗老']}
'9款热门大牌面霜的真实测评', '别纠结！好用抗初老面霜', '选对面霜很重要！抗老面霜', '李佳琦618攻略！想买面霜的看过来'],
 '水乳推荐': ['不同功效水乳你选对了吗', '大牌水乳推荐&&这些用着太爽了'], '美白精华': ['李老头那买的美白精华'], '精华推荐': ['618热门精华盘点，这几个去李老头', 'Lulu的好物推荐丨美白精华']}
for (var z = 0; z < key_dict.length; z++) {
    click_key(key_dict[z], key);
}

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

function zuixin(key, zx) {
    device.send(tcConst.keyCodes.KEYCODE_BACK, tcConst.STATE_PRESS);
    for (var q = 0; q < 3; q++) {
        if (get_Activity().indexOf('index') != -1) {
            device.click(970, 140, tcConst.STATE_PRESS);
            delay(1000);
//            print(device.name + "进入小红书搜索页");
                device.exec("ime set com.sigma_rt.totalcontrol/.ap.service.SigmaIME", 5000);
                delay(1000);
        }
        try {
            // 输入关键
            var keyword = device.inputTextSync(0, key);
            // var keyword =  device.inputText(key)
//            print(device.name + keyword)
            delay(2000);
            var search_text = device.sendAai({ query: "C:.EditText&&R:.dns", action: "getText" });
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
    device.sendAai({ query: "C:.TextView&&R:.dnx", action: "click" });
    delay(1500)
    if(zx){
        if (device.sendAai({ query: "T:全部*", action: "click" })) {
            delay(1500)
            if (device.sendAai({ query: "T:最新", action: "click" })) { print(device.name + '切换最新搜索'); delay(2500) }
            if (device.sendAai({ query: "T:*迷路了*", action: "getBounds" })) { print(device.name + '服务器迷路了'); return true }
        }
    }
    return false
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
                  printf(device.name + '查找到关键词：' + author_key + '  搜索词:' + gjc + '  作者' + author)
//                printf(device.name + '作者:%s,标题:%s,', author.retval, title.retval)
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
    for (var i = 0; i < 110; i++) {
        error()
        if (i == 80) {
            if (zuixin(key, true)){
                break
            }
        }

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
        if (get_Activity().indexOf("search") != -1 && device.sendAai({ query: "T:*搜索发现*", action: "getBounds" })) {
            zuixin(key, false)
        }
        // 下滑
        var slide = device.move(tcConst.movement.shiftDown);
        delay(1000);
    }
}

function run(key_dict) {
//    print(device.name + "打开小红书");
    if (get_Activity().indexOf('update') != -1) {
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
                var search_text = device.sendAai({ query: "C:.EditText&&R:.dns", action: "getText" });
//                print(device.name + search_text)
                if (keyword == true && search_text.retval == key) {
//                    print(device.name + "输入：" + key);
                    break;
                } else {
                    delay(500);
//                    print(device.name + '输入关键词错误  '+ search_text + keyword);
                    device.send(tcConst.keyCodes.KEYCODE_BACK, tcConst.STATE_PRESS);
                    // del_text = device.sendAai({query:"C:.TextView&&R:.dnk",action:"click"});
                    // print('删除:' +del_text)
                }
            } catch (err) {
                print(device.name + err);
            }
        }
        delay(1000);
        // 点击搜索按钮
        device.sendAai({ query: "C:.TextView&&R:.dnx", action: "click" });
        // 滑动页面
        search_key(key_dict[key], key)
        // 返回搜索页
//        print(device.name + '-----------------------------------')
        //        device.send(tcConst.keyCodes.KEYCODE_BACK, tcConst.STATE_PRESS);
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


