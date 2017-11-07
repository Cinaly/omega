set names utf8;
drop database if exists omega;
create database omega charset=utf8;
use omega;

#用户表
create table user(
  user_id int primary key auto_increment comment '用户id',
  last_name varchar(8) comment '姓',
  family_name varchar(16) comment '名',
  email varchar(32) not null comment '邮箱',
  password varchar(16) not null comment '密码',
  birth varchar(16) comment '生日'
);

#产品系列表
create table product_series(
  series_id int primary key auto_increment comment '系列id',
  series_name varchar(16) comment '系列名字'
);
insert into product_series values
(null,"腕表"),(null,"欧米茄华贵珠宝系列"),(null,"配饰");

#系列分类表
create table series_category(
  sc_id int primary key auto_increment comment '系列分类id',
  sc_name varchar(32) comment '分类名字',
  sc_img varchar(128) comment '分类图片',
  series_id int comment '所属系列id'
);
insert into series_category values
(null,"星座系列","img/logo-constellation-hollow.png",1),
(null,"海马系列","img/logo-seamaster-hollow.png",1),
(null,"超霸系列","img/logo-speedmaster-hollow.png",1),
(null,"蝶飞系列","img/logo-deville-hollow.png",1),
(null,"特别系列","img/logo-specialities-hollow.png",1);

#系列分类子列表
create table category_list(
  cl_id int primary key auto_increment comment '子系列id',
  cl_name_en varchar(32) comment '子系列英文名',
  cl_name varchar(16) comment '子系列名字',
  sc_img varchar(128) comment '子系列图片',
  sc_id int comment '所属系列分类id'
);
insert into category_list values
(null,"GLOBEMASTER","尊霸腕表","img/category/1.png",1),
(null,"CONSTELLATION","星座系列","img/category/2.png",1),
(null,"SEAMASTER 300","海马300","img/category/3.png",2),
(null,"PLANET OCEAN 600M","海洋宇宙600米","img/category/4.png",2),
(null,"AQUA TERRA 150M","AQUA TERRA 150米","img/category/5.png",2),
(null,"RAILMASTER","铁霸","img/category/6.png",2),
(null,"DIVER 300M","300米潜水表","img/category/7.png",2),
(null,"BULLHEAD","牛头表","img/category/8.png",2),
(null,"PLOPROF 1200M","PLOPROF 1200米潜水表","img/category/9.png",2),
(null,"MOONWATCH","月球表","img/category/10.png",3),
(null,"SPEEDMASTER '57","超霸’57","img/category/11.png",3),
(null,"MARK II","MARK II腕表","img/category/12.png",3),
(null,"RACING","“赛车”腕表","img/category/13.png",3),
(null,"SPEEDMASTER 38","超霸系列","img/category/14.png",3),
(null,"SPEEDMASTER","超霸系列","img/category/15.png",3),
(null,"HB-SIA","HB-SIA腕表","img/category/16.png",3),
(null,"X-33 REGATTA","超霸系列X-33“帆船赛”腕表","img/category/17.png",3),
(null,"SKYWALKER X-33","“天行者” X-33腕表","img/category/18.png",3),
(null,"SPACEMASTER Z-33","SPACEMASTER Z-33腕表","img/category/19.png",3),
(null,"LADYMATIC","LADYMATIC腕表","img/category/20.png",4),
(null,"HOUR VISION","HOUR VISION腕表","img/category/21.png",4),
(null,"TRÉSOR","名典腕表","img/category/22.png",4),
(null,"PRESTIGE","典雅系列","img/category/23.png",4),
(null,"DE VILLE","碟飞系列","img/category/24.png",4),
(null,"TOURBILLON","陀飞轮腕表","img/category/25.png",4),
(null,"OLYMPIC GAMES COLLECTION","奥林匹克系列腕表","img/category/26.png",5),
(null,"OLYMPIC OFFICIAL TIMEKEEPER","奥运会正式计时","img/category/27.png",5),
(null,"OLYMPIC POCKET WATCH 1932","奥林匹克怀表1932","img/category/28.png",5),
(null,"THE 1957 TRILOGY","欧米茄1957年三大经典腕表","img/category/29.png",5),
(null,"MUSEUM","博物馆特别系列","img/category/30.png",5),
(null,"EDIZIONE VENEZIA","威尼斯特别版","img/category/31.png",5);

#产品所属人群表
create table product_gender(
  pg_id int primary key auto_increment,
  pg_name varchar(16) comment '所属人群类型'
);
insert into product_gender values
(null,"女士腕表系列");

#手表产品表
create table products(
  p_id int primary key auto_increment comment '产品id',
  p_name varchar(32) comment '产品名称',
  p_code varchar(64) comment '产品编号',
  p_title varchar(128) comment '产品标题',
  p_price double comment '产品价格',
  p_info varchar(1024) comment '产品描述' default "这款超霸系列38毫米腕表以众多独特的设计元素为特色，并礼赞国际奥比斯组织及其眼科飞行医院向偏远地区提供短缺的眼科医疗服务。

这款腕表采用精钢表壳，搭配双重表圈，外层精钢表圈饰有测速刻度，内层搭配蓝色铝质测速圈。

太阳纹饰蓝色表盘设有水平浅蓝色椭圆形小表盘，并于6时位置设有垂直椭圆形日历窗口。小时刻度经过镀铑处理，搭配镀铑或蓝色指针。中央蓝色计时秒针末端饰以别具匠心的奥比斯泰迪熊形象。 

腕表搭配精钢表链，表背印刻奥比斯泰迪熊图案，内部搭载欧米茄3330同轴机芯。",
  p_img_m varchar(128) comment '产品中图片',
  p_img_l varchar(128) comment '产品大图片',
  pg_id int comment '所属人群id',
  cl_id int comment '所属子系列id',
  case_id int comment '所属表壳id',
  size_id int comment '所属尺寸id',
  func_id varchar(128) comment '所属功能id',
  color_id int comment '所属颜色id',
  mt_id int comment '所属机芯类型id',
  chain_id int comment '所属表链id',
  movement_id int comment '所属机芯id',
  waterproof_id int comment '所属防水深度id'
);
insert into products values
(null,"“平昌2018”限量版腕表","522.32.44.21.03.001","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/1.png","img/products/1.jpg",1,1,1,87,"37,40,44,45,50",25,84,13,58,74),
(null,"“深海之黑”腕表","216.92.46.51.01.001","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/2.png","img/products/2.jpg",1,2,2,87,"37,40,44,45,50",26,85,14,59,75),
(null,"“陨石”腕表","522.32.44.21.03.001","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/3.png","img/products/3.jpg",1,3,3,87,"37,40,44,45,50",27,86,15,60,76),
(null,"557套三大经典腕表限量版套装","622.32.44.21.03.001","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/4.png","img/products/4.jpg",1,4,4,87,"37,40,44,45,50",28,84,16,61,77),
(null,"“索契2014”限量版腕表","422.32.44.21.03.001","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/5.png","img/products/5.jpg",1,5,5,87,"37,40,44,45,50",29,85,17,62,78),
(null,"“平昌2018”限量版腕表","322.32.44.21.03.001","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/6.png","img/products/6.jpg",1,6,6,87,"37,40,44,45,50",30,86,18,63,79),
(null,"“里约2016”限量版腕表","622.30.41.20.01.001","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/7.png","img/products/7.jpg",1,8,7,87,"37,40,44,45,50",31,84,19,64,80),
(null,"“里约2016”限量版腕表","622.30.41.20.01.001","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/8.png","img/products/8.jpg",1,8,7,87,"37,40,44,45,50",31,84,19,64,80),
(null,"“索契2014”限量版腕表","522.30.46.21.01.001","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/9.png","img/products/9.jpg",1,9,8,87,"37,40,44,45,50",32,85,20,65,81),
(null,"碟飞系列50周年纪念腕表","522.32.44.21.03.001","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/10.png","img/products/10.jpg",1,10,9,87,"37,40,44,45,50",33,86,21,66,82),
(null,"“深海之黑”新西兰酋长队腕表","522.32.44.21.03.001","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/11.png","img/products/11.png",1,11,10,88,"37,40,44,45,50",34,84,22,67,83),
(null,"“指挥官”限量版腕表","212.32.41.20.04.001","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/12.png","img/products/12.png",1,12,11,88,"37,40,44,45,50",35,85,23,68,74),
(null,"“幽灵党”007限量版腕表","233.32.41.21.01.001","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/13.png","img/products/13.png",1,13,12,88,"37,40,44,45,50",25,86,24,69,75),
(null,"“Speedy Yuesday”腕表","311.32.42.30.01.001","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/14.png","img/products/14.png",1,14,1,88,"37,40,44,45,50",26,84,13,70,76),
(null,"“皎月之光”腕表","528.32.44.21.03.001","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/15.png","img/products/15.png",1,15,2,88,"37,40,44,45,50",27,85,14,71,77),
(null,"高尔夫腕表","542.32.44.21.03.001","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/16.png","img/products/16.png",1,16,3,88,"37,40,44,45,50",28,86,15,72,78),
(null,"月相至臻天文台表","321.32.44.21.03.001","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/17.png","img/products/17.png",1,17,4,88,"37,40,44,45,50",29,84,16,73,79),
(null,"“平昌2018”限量版腕表","522.32.44.21.03.002","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/18.png","img/products/18.png",1,18,5,88,"37,40,44,45,50",3,85,17,58,80),
(null,"“深海之黑”腕表","216.92.46.51.01.002","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/","img/products/19.png",1,19,6,88,"37,40,44,45,50",30,86,18,59,81),
(null,"“陨石”腕表","522.32.44.21.03.002","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/","img/products/20.png",1,20,7,88,"37,40,44,45,50",31,84,19,60,82),
(null,"557套三大经典腕表限量版套装","622.32.44.21.03.002","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/","img/products/21.png",1,21,8,88,"37,40,44,45,50",32,85,20,61,83),
(null,"“索契2014”限量版腕表","422.32.44.21.03.002","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/","img/products/22.png",1,22,9,88,"37,40,44,45,50",33,86,21,62,74),
(null,"“平昌2018”限量版腕表","322.32.44.21.03.002","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/","img/products/23.png",1,23,10,88,"37,40,44,45,50",34,84,22,63,75),
(null,"“莱德怀”腕表","231.10.42.21.02.002","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/","img/products/24.png",1,24,11,88,"37,40,44,45,50",35,85,23,64,76),
(null,"“里约2016”限量版腕表","622.30.41.20.01.002","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/","img/products/25.png",1,25,12,88,"37,40,44,45,50",25,86,24,65,77),
(null,"“索契2014”限量版腕表","522.30.46.21.01.002","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/","img/products/26.png",1,26,1,88,"37,40,44,45,50",26,84,13,66,78),
(null,"碟飞系列50周年纪念腕表","522.32.44.21.03.002","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/","img/products/27.png",1,27,2,88,"37,40,44,45,50",27,85,14,67,79),
(null,"“深海之黑”新西兰酋长队腕表","522.32.44.21.03.002","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/","img/products/28.png",1,28,3,88,"37,40,44,45,50",28,86,15,68,80),
(null,"“指挥官”限量版腕表","212.32.41.20.04.002","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/","img/products/29.png",1,29,4,88,"37,40,44,45,50",29,84,16,69,81),
(null,"“幽灵党”007限量版腕表","233.32.41.21.01.002","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/","img/products/30.png",1,30,5,88,"37,40,44,45,50",30,85,17,70,82),
(null,"“Speedy Yuesday”腕表","311.32.42.30.01.002","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/","img/products/31.png",1,31,6,88,"37,40,44,45,50",31,86,18,71,83),
(null,"“皎月之光”腕表","528.32.44.21.03.002","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/","img/products/32.png",1,1,7,88,"37,40,44,45,50",32,84,19,72,74),
(null,"高尔夫腕表","542.32.44.21.03.002","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/","img/products/33.png",1,2,8,88,"37,40,44,45,50",33,85,20,73,75),
(null,"月相至臻天文台表","321.32.44.21.03.002","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",20000,default,"img/products/","img/products/34.png",1,3,9,88,"37,40,44,45,50",34,86,21,58,76),
(null,"超霸系列 38毫米同轴计时腕表奥比斯","324.30.38.50.03.002","海洋宇宙600米 欧米茄45.5毫米至臻天文台GMT腕表",36500,default,"img/products/","img/products/35.png",1,14,10,88,"37,40,44,45,50",35,84,22,59,77);

#筛选规则表
create table select_rules(
    sr_id int primary key auto_increment,
    rules_name varchar(16) comment '筛选规则各个分类',
    rule_id int comment '规则id'
);
insert into select_rules values
(null,"系列",1),(null,"子系列",2),(null,"表壳",3),(null,"表链",4),(null,"表盘颜色",5),(null,"功能",6),
(null,"机芯",7),(null,"防水深度",8),(null,"机芯类型",9),(null,"尺寸",10);

#规则表
create table rules(
    rules_id int primary key auto_increment,
    rules_info varchar(32) comment '规则名称',
    rule_id int comment '规则id'
);
insert into rules values
(null,"黑色陶瓷表壳",3),(null,"蓝色陶瓷",3),(null,"橙金",3),(null,"灰色陶瓷表壳",3),
(null,"粉金表壳",3),(null,"铂金表壳",3),(null,"红金表壳",3),(null,"白色陶瓷表壳",3),
(null,"钛金属表壳",3),(null,"黄金表壳",3),(null,"精钢表壳",3),(null,"白色K金表壳",3),
(null,"涂层尼龙面料表带",4),(null,"皮革表带",4),(null,"白色K金表链",4),(null,"铂金表链",4),
(null,"精钢表链",4),(null,"精钢 - Sedna® K金表链",4),(null,"钛金属表链",4),(null,"黄金表链",4),
(null,"红金表链",4),(null,"Sedna® K金表链",4),(null,"精钢 - 红金表链",4),(null,"精钢 - 黄金表链",4),
(null,"黑色",5),(null,"蓝色",5),(null,"棕色",5),(null,"香槟色",5),(null,"粉红色",5),(null,"灰色",5),
(null,"紫罗兰色",5),(null,"红色",5),(null,"银色",5),(null,"蓝宝石色",5),(null,"白色",5),
(null,"24小时指针",6),(null,"24小时两地时区显示",6),(null,"年历",6),(null,"闹钟",6),(null,"防磁",6),
(null,"双向旋转表圈",6),(null,"Ceragold",6),(null,"计时功能",6),(null,"日期显示",6),(null,"钻石",6),
(null,"获瑞士官方天文台认证",6),(null,"星期 - 日期显示",6),(null,"使用期满",6),(null,"排氦气阀门",6),
(null,"限量发行",6),(null,"液态金属",6),(null,"月相盈亏显示",6),(null,"多功能",6),(null,"注明编号",6),
(null,"万年历显示",6),(null,"脉搏针",6),(null,"测速计",6),
(null,"欧米茄1376",7),(null,"欧米茄1424",7),(null,"欧米茄1861",7),(null,"欧米茄1532",7),
(null,"欧米茄1863",7),(null,"欧米茄1866",7),(null,"欧米茄2211",7),(null,"欧米茄2627",7),
(null,"欧米茄3603",7),(null,"欧米茄4061",7),(null,"欧米茄4561",7),(null,"欧米茄8400",7),
(null,"欧米茄3889",7),(null,"欧米茄8900",7),(null,"欧米茄9615",7),(null,"欧米茄9904",7),
(null,"0个大气压（0米/0英尺）",8),(null,"3个大气压（30米/100英尺）",8),
(null,"5个大气压（50米/167英尺）",8),(null,"6个大气压（60米/200英尺）",8),
(null,"10个大气压（100米/330英尺）",8),(null,"15个大气压（150米/500英尺）",8),
(null,"30个大气压（300米/1000英尺）",8),(null,"30个大气压（300米/1000英尺）",8),
(null,"60个大气压（600米/2000英尺）",8),(null,"120个大气压（1200米/4000英尺）",8),
(null,"手动上链",9),(null,"石英",9),(null,"自动上链",9),
(null,"小（<32 毫米）",10),(null,"中（32 - 42 毫米）",10);

##表壳分类表
#create table watch_case(
  #case_id int primary key auto_increment comment '表壳id',
  #case_name varchar(16) comment '表壳类型名'
#);
#insert into watch_case values
#(null,"黑色陶瓷表壳"),(null,"蓝色陶瓷"),(null,"橙金"),
#(null,"灰色陶瓷表壳"),(null,"粉金表壳"),(null,"铂金表壳"),
#(null,"红金表壳"),(null,"白色陶瓷表壳"),(null,"钛金属表壳"),
#(null,"黄金表壳"),(null,"精钢表壳"),(null,"白色K金表壳");

##表链分类表
#create table watch_chain(
  #chain_id int primary key auto_increment comment '表链id',
  #chain_name varchar(16) comment '表链类型名'
#);
#insert into watch_chain values
#(null,"涂层尼龙面料表带"),(null,"皮革表带"),(null,"白色K金表链"),
#(null,"铂金表链"),(null,"精钢表链"),(null,"精钢 - Sedna® K金表链"),
#(null,"钛金属表链"),(null,"黄金表链"),(null,"红金表链"),
#(null,"Sedna® K金表链"),(null,"精钢 - 红金表链"),(null,"精钢 - 黄金表链");

##尺寸表
#create table watch_size(
  #size_id int primary key auto_increment comment '尺寸类型id',
  #size_name varchar(16) comment '尺寸类型名'
#);
#insert into watch_size values
#(null,"小（<32 毫米）"),(null,"中（32 - 42 毫米）");

##机芯类型表
#create table movement_type(
  #mt_id int primary key auto_increment comment '机芯类型id',
  #mt_name varchar(16) comment '机芯类型名'
#);
#insert into movement_type values
#(null,"手动上链"),(null,"石英"),(null,"自动上链");

##机芯表
#create table movement(
  #movement_id int primary key auto_increment comment '机芯id',
  #movement_name varchar(16) comment '机芯名'
#);
#insert into movement values
#(null,"欧米茄1376"),(null,"欧米茄1424"),(null,"欧米茄1861"),(null,"欧米茄1532"),
#(null,"欧米茄1863"),(null,"欧米茄1866"),(null,"欧米茄2211"),(null,"欧米茄2627"),
#(null,"欧米茄3603"),(null,"欧米茄4061"),(null,"欧米茄4561"),(null,"欧米茄8400"),
#(null,"欧米茄3889"),(null,"欧米茄8900"),(null,"欧米茄9615"),(null,"欧米茄9904");

##功能表
#create table watch_func(
  #func_id int primary key auto_increment comment '功能id',
  #func_name varchar(16) comment '功能类型'
#);
#insert into watch_func values
#(null,"24小时指针"),(null,"24小时两地时区显示"),(null,"年历"),
#(null,"闹钟"),(null,"防磁"),(null,"双向旋转表圈"),
#(null,"Ceragold"),(null,"计时功能"),(null,"日期显示"),
#(null,"获瑞士官方天文台认证"),(null,"钻石"),(null,"星期 - 日期显示"),
#(null,"使用期满"),(null,"排氦气阀门"),(null,"限量发行"),
#(null,"液态金属"),(null,"月相盈亏显示"),(null,"多功能"),
#(null,"注明编号"),(null,"万年历显示"),(null,"脉搏针"),(null,"测速计");

##表盘颜色分类表
#create table watch_color(
  #color_id int primary key auto_increment comment '颜色id',
  #color_name varchar(16) comment '颜色类型'
#);
#insert into watch_color values
#(null,"黑色"),(null,"蓝色"),(null,"棕色"),(null,"香槟色"),
#(null,"粉红色"),(null,"灰色"),(null,"紫罗兰色"),(null,"红色"),
#(null,"银色"),(null,"蓝宝石色"),(null,"白色");

##防水深度表
#create table watch_waterproof(
  #ww_id int primary key auto_increment comment '防水深度id',
  #ww_name varchar(16) comment '防水深度类型'
#);
#insert into watch_waterproof values
#(null,"0个大气压（0米/0英尺）"),
#(null,"3个大气压（30米/100英尺）"),
#(null,"5个大气压（50米/167英尺）"),
#(null,"6个大气压（60米/200英尺）"),
#(null,"10个大气压（100米/330英尺）"),
#(null,"15个大气压（150米/500英尺）"),
#(null,"30个大气压（300米/1000英尺）"),
#(null,"30个大气压（300米/1000英尺）"),
#(null,"60个大气压（600米/2000英尺）"),
#(null,"120个大气压（1200米/4000英尺）");

#销售点类型表
create table pos_type(
  pos_type_id int primary key auto_increment comment '销售点类型id',
  pos_type_name varchar(16) comment '销售点类型名字'
);
insert into pos_type values
(null,"欧米茄旗舰店"),(null,"欧米茄特约零售商铺");

#销售点所属省份表
create table pos_province(
  pos_pro_id int primary key auto_increment comment '销售点所属省份id',
  pos_pro_name varchar(16) comment '销售点所属省份名字'
);

insert into pos_province values
(null,"上海"),(null,"云南"),(null,"内蒙古"),
(null,"北京"),(null,"吉林"),(null,"四川"),
(null,"天津"),(null,"宁夏"),(null,"安徽"),
(null,"山东"),(null,"山西"),(null,"广东"),
(null,"广西"),(null,"新疆"),(null,"江苏"),
(null,"江西"),(null,"河北"),(null,"河南"),
(null,"浙江"),(null,"海南"),(null,"湖北"),
(null,"湖南"),(null,"甘肃"),(null,"福建"),
(null,"贵州"),(null,"辽宁"),(null,"重庆"),
(null,"陕西"),(null,"青海"),(null,"黑龙江");

#销售点所属城市表
create table pos_city(
  pos_city_id int primary key auto_increment comment '销售点所属城市id',
  pos_city_name varchar(16) comment '销售点所属城市名字',
  pos_pro_id int comment '城市所属省份id'
);
insert into pos_city values
(null,"上海",1),(null,"昆明",2),(null,"包头",3),
(null,"北京",4),(null,"长春",5),(null,"成都",6),
(null,"天津",7),(null,"银川",8),(null,"合肥",9),
(null,"青岛",10),(null,"太原",11),(null,"深圳",12),
(null,"南宁",13),(null,"乌鲁木齐",14),(null,"南京",15),
(null,"江西",16),(null,"石家庄",17),(null,"洛阳",18),
(null,"杭州",19),(null,"三亚",20),(null,"武汉",21),
(null,"长沙",22),(null,"兰州",23),(null,"福州",24),
(null,"贵阳",25),(null,"沈阳",26),(null,"重庆",27),
(null,"西安",28),(null,"西宁",29),(null,"哈尔滨",30);

#销售点经营种类
create table pos_sale_type(
    sale_type_id int primary key,
    sale_type_name varchar(16) comment '种类名称',
    sale_type_img varchar(128) comment '种类图片'
);
insert into pos_sale_type values
(1,"腕表","img/storedetails/wanbiao.png"),(2,"华贵珠宝","img/storedetails/zhubao.png"),
(3,"配饰","img/storedetails/peishi.png"),(4,"香水","img/storedetails/xiangshui.png"),
(5,"太阳眼镜","img/storedetails/yanjing.png"),(6,"维修中心","img/storedetails/weixiu.png");

#销售点
create table pos(
  pos_id int primary key auto_increment comment '销售点id',
  pos_name varchar(32) comment '销售点名字',
  pos_address varchar(64) comment '销售点地址',
  pos_postcode varchar(10) comment '邮编',
  pos_type_id int comment '所属类型id',
  pos_pro_id int comment '所属省份id',
  pos_city_id int comment '所属城市id',
  pos_connect varchar(512) comment '联系方式' default 'T. +86 (021)64376672,F. +86 (021)64376671,Boutique.GrandGateway.sh.cn@Omegawatches.com',
  pos_business varchar(32) comment '营业时间' default '周一 - 周日 10:00 - 22:00',
  pos_attitude decimal(8,4) comment '经度' default 121.48,
  pos_longtitude decimal(8,4) comment '纬度' default 31.22,
  sale_type varchar(32) comment '经营种类'
);
insert into pos values
(null,"欧米茄旗舰店","上海久光百货<br>南京西路1618号<br>久光百货1楼D117",200040,1,1,1,default,default,default,default,"1,2,6"),
(null,"欧米茄旗舰店","上海钟表商店<br>淮海中路478-492号",200040,1,1,1,default,default,default,default,"1,2,4,6"),
(null,"欧米茄旗舰店","南京西路2-88号新世界购物<br>中心1楼上海新世界城",200040,1,1,1,default,default,default,default,"1,4,5,6"),
(null,"欧米茄旗舰店","上海第一八佰伴有限公司<br>上海市张扬路501号一楼",200040,1,1,1,default,default,default,default,"1,2,3,4,5,6"),
(null,"上海东方商厦有限公司","漕溪北路8号",200040,2,1,1,default,default,default,default,"1,6"),
(null,"上海亨达利钟表公司新华联店(三联)","南京东路340-370号",200040,2,1,1,default,default,default,default,"1,4,5,6"),
(null,"欧米茄旗舰店","昆明久光百货<br>南京西路1618号<br>久光百货1楼D118",200040,1,2,2,default,default,default,default,"1,2,3"),
(null,"欧米茄旗舰店","昆明钟表商店<br>淮海中路478-492号",200040,1,2,2,default,default,default,default,"2,3,4,5"),
(null,"欧米茄旗舰店","南京西路2-88号新世界<br>购物中心2楼上海新世界城",200040,1,2,2,default,default,default,default,"1,4,5,6"),
(null,"欧米茄旗舰店","包头第一八佰伴有限公司<br>上海市张扬路501号二楼",200040,1,3,3,default,default,default,default,"1,2"),
(null,"包头东方商厦有限公司","漕溪北路10号",200040,2,3,3,default,default,default,default,"2,3"),
(null,"包头亨达利钟表公司新华联店(三联)","南京东路340-370号",200040,2,3,3,default,default,default,default,"4,5,6"),
(null,"欧米茄旗舰店","北京久光百货<br>南京西路1618号<br>久光百货1楼D119",200040,1,4,4,default,default,default,default,"1,2,3,4,5"),
(null,"欧米茄旗舰店","北京钟表商店<br>淮海中路478-493号",200040,1,4,4,default,default,default,default,"1,4,5"),
(null,"欧米茄旗舰店","南京西路2-88号新世界<br>购物中心3楼上海新世界城",200040,1,4,4,default,default,default,default,"1,5,6"),
(null,"欧米茄旗舰店","长春第一八佰伴有限公司<br>上海市张扬路501号三楼",200040,1,5,5,default,default,default,default,"2,4,5,6"),
(null,"长春东方商厦有限公司","漕溪北路9号",200040,2,5,5,default,default,default,default,"1"),
(null,"长春亨达利钟表公司新华联店(三联)","南京东路341-370号",200040,2,5,5,default,default,default,default,"1");

#首页banner表
create table index_banner(
  ban_id int primary key auto_increment comment 'bannerid',
  ban_url varchar(128) comment 'banner图片',
  ban_type varchar(32) comment 'banner类型'
);
insert into index_banner values
(null,"img/banner/1.mp4","video"),
(null,"img/banner/2.jpg","img"),
(null,"img/banner/3.jpg","img"),
(null,"img/banner/4.jpg","img"),
(null,"img/banner/5.jpg","img");

#首页楼层表
create table index_floor(
  f_id int primary key auto_increment comment '楼层id',
  f_title varchar(16) comment '楼层标题',
  f_url varchar(128) comment '楼层图片',
  f_url_type varchar(16) comment 'url类型(图片还是视频)',
  f_content varchar(512) comment '楼层内容',
  p_ids varchar(128) comment '拥有产品ids'
);
insert into index_floor values
(null,"普雷斯利·格伯展示全新超霸系列38毫米 “奥比斯”腕表","img/floor/1.jpg","img","普雷斯利·格伯(Presley Gerber)在加入欧米茄大家庭数天后，便承担起令其母亲辛迪·克劳馥(Cindy Crawford)为之自豪的任务：于“世界爱眼日”（World Sight Day）的庆典上展示欧米茄超霸系列38毫米“奥比斯”腕表。","35,"),
(null,"欧米茄海马系列AQUA TERRA 150米至臻天文台男士腕表","img/floor/2.mp4","video","简约、大气，呈现平衡之美。探索最新推出的海马系列Aqua Terra男士腕表，经过重新设计，演绎引人瞩目的设计格调。表款在备受欢迎的设计元素上，融入诸多巧妙革新，赋予时计全新外观，通过至臻天文台认证，令人难以抗拒。","1,2,3,4,5,6,7,8,9,10,11"),
(null,"欧米茄海马系列AQUA TERRA 2017“高尔夫”腕表","img/floor/3.jpg","img","无需参加高尔夫大赛，亦可佩戴大师系列腕表。欧米茄推出全新的海马系列Aqua Terra“高尔夫”腕表，搭配“NATO”北约军用尼龙表带，不仅造型出众，更通过高水准测试荣膺至臻天文台认证.","-1"),
(null,"欧米茄超霸系列38毫米腕表","img/floor/4.jpg","img","超霸系列38毫米腕表采用精巧别致的表壳尺寸，同时更融入鲜明活力的色彩与独特的设计元素，赋予经典计时腕表焕然一新的格调。","10,11,12,13"),
(null,"防磁腕表——难以阻挡的魅力","img/floor/5.jpg","img","一个世纪以来，制表业不断探索，从未停止摆脱磁场引力“魔咒”的步伐。欧米茄携手瑞士联邦计量研究院（METAS）联合推出至臻天文台表认证，将一种全新的抗磁法宝引入精准计时艺术之中。","-1");


#新闻表
create table news(
  news_id int primary key auto_increment comment '新闻id',
  news_title varchar(64) comment '新闻标题',
  news_img varchar(128) comment '新闻图片',
  news_content varchar(1024) comment '新闻内容', 
  news_date varchar(16) comment '新闻发布日期' 
);
insert into news values
(null,"欧米茄名人大使普雷斯利·格伯 (Presley Gerber) 揭幕全新超霸系列38毫米“奥比斯”腕表","img/news/1.jpg","刚刚加入欧米茄名人大使大家庭的普雷斯利·格伯 (Presley Gerber) 为欧米茄全新超霸系列38毫米“奥比斯”腕表揭幕，传承了母亲辛迪·克劳馥 (Cindy Crawford) 对慈善事业的热忱奉献。","2017-10-15"),
(null,"欧米茄于巴黎举办“她的时光”女士腕表百年臻品展开幕仪式 并庆祝凯雅·格伯 (Kaia Gerber) 和普雷斯利·格伯 (Presley Gerber) 加入名人大使大家庭","img/news/2.jpg","为了致敬品牌制作璀璨典雅女士腕表的悠久历史，欧米茄于巴黎举办开幕仪式并邀请品牌名人大使辛迪·克劳馥 (Cindy Crawford)出席并宣布她的儿女凯雅·格伯 (Kaia Gerber) 和普雷斯利·格伯 (Presley Gerber)...
","2017-10-13"),
(null,"妮可·基德曼佩戴欧米茄腕表出席艾美奖颁奖典礼","img/news/3.jpg","妮可·基德曼佩戴欧米茄古董珠宝腕表出席艾美奖颁奖典礼","2017-10-12"),
(null,"迈克尔·菲尔普斯与米歇尔·莫娜汉赢得欧米茄高尔夫名人大师赛","img/news/4.jpg","好莱坞著名演员米歇尔·莫娜汉和泳坛传奇迈克尔·菲尔普斯在首届欧米茄高尔夫名人大师赛典礼上一同捧起奖杯。","2017-10-11"),
(null,"欧米茄腕表——从战壕到敦刻尔克","img/news/5.jpg","在两次世界大战期间，欧米茄是最大的军用腕表供应商之一，其在战争中起到的关键作用至今仍被广为传颂。","2017-10-10");

#超霸60周年表
create table anniversary(
    an_id int primary key auto_increment,
    year int ,
    img varchar(128)
);

insert into anniversary values
(null,1957,"img/60th/1957---Broad-Arrow-3-min.png"),
(null,1959,"img/60th/1959-First-Omega-in-Space-3-min.png"),
(null,1963,"img/60th/1963---Third-Generation-3-min.png"),
(null,1964,"img/60th/1964---A.C.P-3-min.png"),
(null,1965,"img/60th/1965---The-Moonwatch-3-min.png"),
(null,1968,"img/60th/1968---Racing-Dial-4-min.png"),
(null,1968,"img/60th/1968---The-Moonwatch-3-min.png"),
(null,1968,"img/60th/1968---Ultraman-3-min.png"),
(null,1969,"img/60th/1969---Alaska-I-3-min.png"),
(null,1969,"img/60th/1969---Commemorative-edition-3-min.png"),
(null,1969,"img/60th/1969---Mark-II-3-min.png"),
(null,1971,"img/60th/1971---Mark-III-4-min.png"),
(null,1972,"img/60th/1972---Alaska-II-3-min.png"),
(null,1973,"img/60th/1973---Speedmaster-128-min.png"),
(null,1973,"img/60th/1973---Speedsonic-3-min.png"),
(null,1975,"img/60th/1975---Apollo-Soyuz-3-min.png"),
(null,1978,"img/60th/1978---Alaska-III-3-min.png"),
(null,1979,"img/60th/1979---Alaska-IV-3-min.png"),
(null,1980,"img/60th/1980---Apollo-14-min.png"),
(null,1983,"img/60th/1983---Bicolor-3-min.png"),
(null,1985,"img/60th/1985---Speedymoon-3-min.png"),
(null,1987,"img/60th/1987---Italy-3-min.png"),
(null,1987,"img/60th/1987---Speedmaster-Automatic-4-min.png"),
(null,1991,"img/60th/1991---Perpetual-Calendar-min.png"),
(null,1992,"img/60th/1992---Jubilee-4-min.png"),
(null,1992,"img/60th/1992---Skeleton-5-min.png"),
(null,1995,"img/60th/1995---Apollo-17-min.png"),
(null,1995,"img/60th/1995---MIR_365_DAYS-4-min.png"),
(null,1996,"img/60th/1996---Racing-Schumacher-4-min.png"),
(null,1997,"img/60th/1997---40th-Anniversary-4-min.png"),
(null,1997,"img/60th/1997---Relaunch-4-min.png"),
(null,1997,"img/60th/1997---The_Golden_Panda_3690.30.01-4-min.png"),
(null,1998,"img/60th/1998---X33-4-min.png"),
(null,1999,"img/60th/1999---Apollo-15-min.png"),
(null,2000,"img/60th/2000---Apollo-Soyuz-3-min.png"),
(null,2003,"img/60th/2003---From-the-moon-to-mars-3-min.png"),
(null,2003,"img/60th/2003---Snoopy-3-min.png"),
(null,2004,"img/60th/2004---Apollo-14-min.png"),
(null,2005,"img/60th/2005---Co-Axial-GMT-3-min.png"),
(null,2005,"img/60th/2005---Gemini-IV-3-min.png"),
(null,2006,"img/60th/2006---Apollo-18-min.png"),
(null,2007,"img/60th/2007---50th-Anniversary-Patch-3-min.png"),
(null,2008,"img/60th/2008---Alaska-Project-3-min.png"),
(null,2008,"img/60th/2008---Beijing-4-min.png"),
(null,2008,"img/60th/2008---HB-SIA-GMT-3-min.png"),
(null,2009,"img/60th/2009---Apollo-14-min.png"),
(null,2010,"img/60th/2010---Apollo-Soyuz-3-min.png"),
(null,2011,"img/60th/2011---Apollo-18-min.png"),
(null,2012,"img/60th/2012---Apollo-20-min.png"),
(null,2014,"img/60th/2014---Apollo-14-min.png"),
(null,2014,"img/60th/2014---Dark-side-of-the-moon-3-min.png"),
(null,2015,"img/60th/2015---Silver-Snoopy-Award-3-min.png"),
(null,2015,"img/60th/2015---Skywalker-X33-3-min.png"),
(null,2015,"img/60th/2015---Speedmaster'57-3-min.png"),
(null,2015,"img/60th/2015---X33-Si2-3-min.png"),
(null,2016,"img/60th/2016---CK2998-4-min.png"),
(null,2016,"img/60th/2016---Moonphase-3-min.png"),
(null,2017,"img/60th/2017_V2-min.png"),
(null,2017,"img/60th/2017---Speedmaster-38mm-3-min.png"),
(null,2017,"img/60th/2017---Speedmaster-Automatic-3-min.png");
