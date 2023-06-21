(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{416:function(v,_,e){"use strict";e.r(_);var o=e(17),s=Object(o.a)({},(function(){var v=this,_=v.$createElement,e=v._self._c||_;return e("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[e("h1",{attrs:{id:"sophon-miner"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#sophon-miner"}},[v._v("#")]),v._v(" "),e("code",[v._v("sophon-miner")])]),v._v(" "),e("h2",{attrs:{id:"简介"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#简介"}},[v._v("#")]),v._v(" 简介")]),v._v(" "),e("p",[e("code",[v._v("sophon-miner")]),v._v(" 是 "),e("code",[v._v("Venus")]),v._v(" 矿池中的链服务组件之一，是矿工出块的调度器。与 "),e("code",[v._v("PL")]),v._v(" 实现的 "),e("code",[v._v("lotus-miner")]),v._v(" 不同的是：")]),v._v(" "),e("ul",[e("li",[e("p",[v._v("支持多个矿工出块，"),e("code",[v._v("lotus-miner")]),v._v(" 的一个实例负责单个矿工的出块；")])]),v._v(" "),e("li",[e("p",[v._v("与 "),e("code",[v._v("Venus")]),v._v(" 矿池中其他组件配合完成矿工的出块流程：")]),v._v(" "),e("ul",[e("li",[v._v("调用 "),e("code",[v._v("venus-wallet")]),v._v(" 进行签名及签名验证；")]),v._v(" "),e("li",[v._v("调用 "),e("code",[v._v("venus-sealer")]),v._v("（将弃用） 或 "),e("code",[v._v("venus-cluster")]),v._v(" 计算获胜证明。")])])]),v._v(" "),e("li",[e("p",[v._v("多个矿工合作出块，保证收益最大化。如：一个周期有多个出块时，打包不重复的消息，获得更多的小费，也可以保证消息及时上链，提升网络的TPS。")])])]),v._v(" "),e("h2",{attrs:{id:"功能模块"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#功能模块"}},[v._v("#")]),v._v(" 功能模块")]),v._v(" "),e("p",[e("code",[v._v("sophon-miner")]),v._v(" 的主要模块有：矿工管理，出块管理。")]),v._v(" "),e("h3",{attrs:{id:"矿工管理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#矿工管理"}},[v._v("#")]),v._v(" 矿工管理")]),v._v(" "),e("p",[e("code",[v._v("Venus")]),v._v(" 矿池中的用户（或称为矿工）是由 "),e("code",[v._v("sophon-auth")]),v._v(" 组件管理的，其记录了每个矿工的基础信息及身份验证信息。"),e("code",[v._v("sophon-miner")]),v._v(" 从 "),e("code",[v._v("sophon-auth")]),v._v(" 拉取最新的矿工列表，并周期性地进行区块生产流程。")]),v._v(" "),e("p",[e("code",[v._v("sophon-miner")]),v._v(" 可以暂停矿工列表中任意矿工的出块，比如某个矿工的签名节点失联时，可以手动暂停该矿工的出块流程，等待签名正常后再开启出块。")]),v._v(" "),e("p",[e("code",[v._v("sophon-miner")]),v._v(" 执行 "),e("code",[v._v("update")]),v._v(" 更新矿工列表，通常在某些矿工退出矿池或有新的矿工加入矿池时进行。")]),v._v(" "),e("h3",{attrs:{id:"出块管理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#出块管理"}},[v._v("#")]),v._v(" 出块管理")]),v._v(" "),e("p",[e("code",[v._v("sophon-miner")]),v._v(" 的一轮出块流程如下：")]),v._v(" "),e("ul",[e("li",[e("p",[v._v("请求同步节点获取 "),e("code",[v._v("Base")]),v._v("，即 "),e("code",[v._v("parent Tipset")]),v._v("（通常是最近一次有出块周期的 "),e("code",[v._v("Block")]),v._v("集）及空轮数（空轮表示该周期没有任何矿工出块）；")])]),v._v(" "),e("li",[e("p",[v._v("统计本周期获得出块权的矿工及出块必要数据，如随机数，选中扇区信息等；")])]),v._v(" "),e("li",[e("p",[v._v("为每个获得出块权的矿工计算获胜证明，选择消息，创建区块；")])]),v._v(" "),e("li",[e("p",[v._v("验证本周期生产的区块合法性（是否存在共识错误，因为广播具有共识错误的区块会受到一定的 "),e("code",[v._v("Fil")]),v._v(" 惩罚），广播区块。")])])])])}),[],!1,null,null,null);_.default=s.exports}}]);