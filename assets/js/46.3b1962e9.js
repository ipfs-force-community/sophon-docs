(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{413:function(t,a,s){"use strict";s.r(a);var n=s(17),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"sophon-gateway系统设计"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sophon-gateway系统设计"}},[t._v("#")]),t._v(" sophon-gateway系统设计")]),t._v(" "),s("h3",{attrs:{id:"背景"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#背景"}},[t._v("#")]),t._v(" 背景")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://github.com/ipfs-force-community/sophon-gateway",target:"_blank",rel:"noopener noreferrer"}},[t._v("sophon-gateway(gateway)"),s("OutboundLink")],1),t._v("是"),s("a",{attrs:{href:"https://filecoinfoundation.medium.com/introducing-the-filecoin-storage-provider-incubation-center-ea8743e18e",target:"_blank",rel:"noopener noreferrer"}},[t._v("venus incubation"),s("OutboundLink")],1),t._v("共享组件之一.")]),t._v(" "),s("p",[t._v("venus-incubation中的多个共享组件(eg. "),s("a",{attrs:{href:"https://github.com/ipfs-force-community/sophon-messager",target:"_blank",rel:"noopener noreferrer"}},[t._v("sophon-messager"),s("OutboundLink")],1),t._v("/"),s("a",{attrs:{href:"https://github.com/ipfs-force-community/sophon-miner",target:"_blank",rel:"noopener noreferrer"}},[t._v("sophon-miner..."),s("OutboundLink")],1),t._v(")都有对消息进行签名的需求.")]),t._v(" "),s("p",[t._v("提供签名的服务由接入孵化器的旷工运行的"),s("a",{attrs:{href:"https://github.com/filecoin-project/venus-wallet",target:"_blank",rel:"noopener noreferrer"}},[t._v("venus-wallet"),s("OutboundLink")],1),t._v("提供.")]),t._v(" "),s("h3",{attrs:{id:"设计思路"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#设计思路"}},[t._v("#")]),t._v(" 设计思路")]),t._v(" "),s("p",[t._v("由于venus-incubation中的多个共享组件(eg. "),s("a",{attrs:{href:"https://github.com/ipfs-force-community/sophon-messager",target:"_blank",rel:"noopener noreferrer"}},[t._v("sophon-messager"),s("OutboundLink")],1),t._v("/"),s("a",{attrs:{href:"https://github.com/ipfs-force-community/sophon-miner",target:"_blank",rel:"noopener noreferrer"}},[t._v("sophon-miner..."),s("OutboundLink")],1),t._v(")都有对访问孵化器的旷工提供的服务的需求.")]),t._v(" "),s("p",[t._v("sophon-messager/sophon-miner需要访问旷工的 venus-wallet 进行message/block签名.")]),t._v(" "),s("p",[t._v("sophon-miner需要访问旷工的 sophon-cluster 计算WinPOST证明.下面以venus-wallet来进行说明.")]),t._v(" "),s("p",[s("strong",[t._v("其中")]),t._v("一种做法, 是:")]),t._v(" "),s("blockquote",[s("p",[t._v("venus-walle启动时,去连接这些所有需要签名的孵化器共享组件这些共享组件独自管理注册到自己的venus-wallet服务,")]),t._v(" "),s("p",[t._v("并管理好签名地址与wallet服务的对应关系, 在需要签名的时候, 分别去请求这些venus-wallet.")])]),t._v(" "),s("p",[t._v("但更好的方法是, 把这一部分逻辑抽取出来, 分离成一个服务,")]),t._v(" "),s("p",[t._v("这样好处是:")]),t._v(" "),s("ol",[s("li",[t._v("venus-wallet启动的时候, 只需要连接gateway, 并告诉gateway, 其包含的地址私钥.而不需要向多个共享组件注册.")]),t._v(" "),s("li",[t._v("孵化器中的共享组件在需要签名时, 也只需要向gateway发送签名的请求, 其它复杂的工作(比如, 定位对应地址的venus-wallet服务)完全托管给gateway.")]),t._v(" "),s("li",[t._v("对于共享组件与gateway交互这一部分代码, 还可以编写为一个共享的package,降低了代码的重复.")]),t._v(" "),s("li",[t._v("如果后期增加了需要签名的共享组件, 不会涉及到系统中其它组件(比如:venus-wallet)的修改.极大的降低了系统的耦合程度.")])]),t._v(" "),s("p",[t._v("这样sophon-gateway在孵化器的共享组件中起到了"),s("strong",[t._v("桥接接需要签名的共享组件与提供签名服务的venus-wallet的功能.")])]),t._v(" "),s("p",[t._v("在实现sophon-gateway的时候, 我们需要考虑以下几个问题:")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("gateway如何于孵化器中的其它交互-交互模式")])]),t._v(" "),s("li",[s("p",[t._v("gateway的安全性-完全性")])])]),t._v(" "),s("h4",{attrs:{id:"交互模式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#交互模式"}},[t._v("#")]),t._v(" 交互模式")]),t._v(" "),s("p",[t._v("gateway在孵化器中,其作用是桥接孵化器中其它组件的相互调用,所以在交互上可以分为两类,")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("与消息生产者交互(包括sophon-miner,sophon-messager)")])]),t._v(" "),s("li",[s("p",[t._v("与消息消费者交互(包括venus-wallet, venus-cluster)")])])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://raw.githubusercontent.com/filecoin-project/venus-docs/master/docs/.vuepress/public/sophon-gateway-system-design.png",alt:"gateway交互图"}})]),t._v(" "),s("h5",{attrs:{id:"与消息消费者交互"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#与消息消费者交互"}},[t._v("#")]),t._v(" 与消息消费者交互")]),t._v(" "),s("p",[t._v("​Gateway与消息消费者的交互的详细内容可以在"),s("a",{attrs:{href:"https://github.com/filecoin-project/venus-docs/blob/master/docs/zh/advanced/venus-wallet-architecture.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("venus-wallet-系统设计"),s("OutboundLink")],1),t._v("中有详细的介绍, 这里不在赘述。特别说明的是：")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("venus-cluster消费的消息是"),s("code",[t._v("ComputeProof")]),t._v("计算"),s("code",[t._v("WinningPoSt")]),t._v("证明数据。")])]),t._v(" "),s("li",[s("p",[t._v("venus体系中的账号管理是通过sophon-auth管理的，账号就是消息生产者和消费者之间的桥梁。sophon-gateway从sophon-auth获取对应 "),s("code",[t._v("miner")]),t._v(" 或 "),s("code",[t._v("signer")]),t._v(" 的账号，然后从维持的消费者列表中找到对应的消费者（"),s("code",[t._v("venus-wallet")]),t._v(" 或 "),s("code",[t._v("venus-cluster")]),t._v("）处理消息。消费者在启动时将自身账号信息注册到 "),s("code",[t._v("sophon-gateway")]),t._v("。")])])]),t._v(" "),s("h5",{attrs:{id:"与消息生产者交互"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#与消息生产者交互"}},[t._v("#")]),t._v(" 与消息生产者交互")]),t._v(" "),s("p",[t._v("​sophon-gateway与消息生产者交互非常简单, 直接对外提供API.")]),t._v(" "),s("p",[t._v("对于sophon-messager来说是:")]),t._v(" "),s("div",{staticClass:"language-go extra-class"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" IWalletEvent "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("WalletHas")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx context"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Context"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" addr address"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Address"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("bool")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("WalletSign")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx context"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Context"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" addr address"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Address"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" toSign "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("byte")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" meta wallet"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("MsgMeta"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("crypto"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Signature"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("对于sophon-miner来说是:")]),t._v(" "),s("div",{staticClass:"language-go extra-class"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" IProofEvent "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ListConnectedMiners")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx context"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Context"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("address"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Address"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ListMinerConnection")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx context"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Context"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" addr address"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Address"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("MinerState"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ComputeProof")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx context"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Context"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" miner address"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Address"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" sectorInfos "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("proof5"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("SectorInfo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" rand abi"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("PoStRandomness"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("proof5"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("PoStProof"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h4",{attrs:{id:"安全性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安全性"}},[t._v("#")]),t._v(" 安全性")]),t._v(" "),s("h5",{attrs:{id:"访问权限控制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#访问权限控制"}},[t._v("#")]),t._v(" 访问权限控制")]),t._v(" "),s("p",[t._v("在sophon-gateway的访求权限使用了jwt权限访问控制模式.要求所有的请求都需要带有验证token,")]),t._v(" "),s("p",[t._v("但又不能为所有的旷工都使用统一的token.如果使用统一的token会带来以下问题:")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("当需要某个旷工需要退出孵化器时, 我们需要把这个token作废, 如果使用统一的token, 会影响其他的正常旷工.")])]),t._v(" "),s("li",[s("p",[t._v("使用不同的token可以为旷工提供更个性化的访问控制策略.如流量控制等.")])])]),t._v(" "),s("p",[t._v("所以, 我们开发了sophon-auth, 会为每个接入的旷工分配一个token, sophon-gateway把验证逻辑集成到请求的middleware中, 当收到请求时, 会先向sophon-auth验证token的合法性.")]),t._v(" "),s("h5",{attrs:{id:"流量控制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#流量控制"}},[t._v("#")]),t._v(" 流量控制")]),t._v(" "),s("p",[t._v("我们没有办法确保接入孵化器的旷工有不泄露自己的token, 或者把token共享给其他人使用.\n所以我们设计了一种机制可以把泄露的token的非法使用对系统造成的负载控制在较小的的范围之内.")]),t._v(" "),s("p",[t._v("对于安全性这一部分更多的信息可以参考:"),s("a",{attrs:{href:""}},[t._v("sophon-auth")])]),t._v(" "),s("h4",{attrs:{id:"总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),s("p",[t._v("Venus inclubation是一个复杂的分布式系统, 系统比较庞大, 如果需要对孵化器进行详细的了解请参考文档:"),s("a",{attrs:{href:"https://github.com/filecoin-project/venus-docs/blob/master/docs/guide/Using-venus-Shared-Modules.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("venus-Shared-Modules"),s("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=e.exports}}]);