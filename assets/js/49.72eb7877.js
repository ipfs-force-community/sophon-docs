(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{417:function(e,t,s){"use strict";s.r(t);var a=s(17),n=Object(a.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"venus-组件构建"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#venus-组件构建"}},[e._v("#")]),e._v(" Venus 组件构建")]),e._v(" "),s("p",[e._v("本文档各组件以 "),s("code",[e._v("TAG:v1.0.0")]),e._v(" 为例说明,实际场景中按需检出.")]),e._v(" "),s("blockquote",[s("p",[e._v("每个组件的构建相互独立,无顺序之分.")])]),e._v(" "),s("h2",{attrs:{id:"环境准备"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#环境准备"}},[e._v("#")]),e._v(" 环境准备")]),e._v(" "),s("p",[e._v("系统需要安装 "),s("code",[e._v("Go")]),e._v(","),s("code",[e._v("Rust")]),e._v("等必要软件,可以参考 "),s("code",[e._v("lotus")]),e._v(" 文档中的相应部分 "),s("a",{attrs:{href:"https://lotus.filecoin.io/lotus/install/linux/#building-from-source",target:"_blank",rel:"noopener noreferrer"}},[e._v("building-from-source"),s("OutboundLink")],1),e._v("。")]),e._v(" "),s("p",[s("code",[e._v("Venus")]),e._v(" 组件均在 "),s("code",[e._v("github")]),e._v(" 开源,通常用 "),s("code",[e._v("git")]),e._v(" 管理, "),s("code",[e._v("git")]),e._v(" 命令使用可参考 "),s("a",{attrs:{href:"https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches",target:"_blank",rel:"noopener noreferrer"}},[e._v("Branching-Remote-Branches"),s("OutboundLink")],1)]),e._v(" "),s("p",[e._v("部分组件依赖"),s("code",[e._v("filecoin-ffi")]),e._v(", "),s("code",[e._v("Filecoin")]),e._v("官方提供了编译好的静态库文件.如果需要源码编译此静态库,可参考 "),s("a",{attrs:{href:"https://lotus.filecoin.io/lotus/install/linux/#native-filecoin-ffi",target:"_blank",rel:"noopener noreferrer"}},[e._v("native-filecoin-ffi"),s("OutboundLink")],1),e._v(",通常"),s("code",[e._v("venus-cluster")]),e._v("或"),s("code",[e._v("venus-sealer")]),e._v("源码编译此库以提升扇区封装效率.")]),e._v(" "),s("h2",{attrs:{id:"venus-auth"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#venus-auth"}},[e._v("#")]),e._v(" venus-auth")]),e._v(" "),s("div",{staticClass:"language-shell script extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[e._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" clone https://github.com/filecoin-project/venus-auth.git\n$ "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("cd")]),e._v(" venus-auth\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" checkout -b v1.0.0 v1.0.0\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("make")]),e._v(" \n")])])]),s("h2",{attrs:{id:"venus"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#venus"}},[e._v("#")]),e._v(" venus")]),e._v(" "),s("div",{staticClass:"language-shell script extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[e._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" clone https://github.com/filecoin-project/venus.git\n$ "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("cd")]),e._v(" venus\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" checkout -b v1.0.0 v1.0.0\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" submodule update --init --recursive\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("make")]),e._v(" deps\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("make")]),e._v("\n")])])]),s("h2",{attrs:{id:"venus-gateway"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#venus-gateway"}},[e._v("#")]),e._v(" venus-gateway")]),e._v(" "),s("div",{staticClass:"language-shell script extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[e._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" clone https://github.com/ipfs-force-community/venus-gateway.git\n$ "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("cd")]),e._v(" venus-gateway\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" checkout -b v1.0.0 v1.0.0\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" submodule update --init --recursive\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("make")]),e._v("\n")])])]),s("p",[e._v("如果遇到编译错误: "),s("code",[e._v("github.com/dgraph-io/badger/v3@v3.2011.1/fb/BlockOffset.go:6:2: missing go.sum entry for module providing package github.com/google/flatbuffers/go (imported by github.com/dgraph-io/badger/v3/table); to add: go get github.com/dgraph-io/badger/v3/table@v3.2011.1")]),e._v(" ,先执行:")]),e._v(" "),s("div",{staticClass:"language-shell script extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[e._v("$ go get github.com/google/flatbuffers@v1.12.1\n")])])]),s("h2",{attrs:{id:"venus-messager"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#venus-messager"}},[e._v("#")]),e._v(" venus-messager")]),e._v(" "),s("div",{staticClass:"language-shell script extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[e._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" clone https://github.com/filecoin-project/venus-messager.git\n$ "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("cd")]),e._v(" venus-messager\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" checkout -b v1.0.0 v1.0.0\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("make")]),e._v(" \n")])])]),s("h2",{attrs:{id:"venus-miner"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#venus-miner"}},[e._v("#")]),e._v(" venus-miner")]),e._v(" "),s("div",{staticClass:"language-shell script extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[e._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" clone https://github.com/filecoin-project/venus-miner.git\n$ "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("cd")]),e._v(" venus-miner\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" checkout -b v1.0.0 v1.0.0\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" submodule update --init --recursive\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("make")]),e._v("\n")])])]),s("h2",{attrs:{id:"venus-market"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#venus-market"}},[e._v("#")]),e._v(" venus-market")]),e._v(" "),s("p",[e._v("参考 "),s("code",[e._v("venus-market")]),e._v(" 项目的 "),s("code",[e._v("readme")]),e._v(" 文档中 "),s("a",{attrs:{href:"https://github.com/filecoin-project/venus-market#readme",target:"_blank",rel:"noopener noreferrer"}},[e._v("Build"),s("OutboundLink")],1)]),e._v(" "),s("h2",{attrs:{id:"venus-wallet"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#venus-wallet"}},[e._v("#")]),e._v(" venus-wallet")]),e._v(" "),s("p",[e._v("参考 "),s("code",[e._v("venus-wallet")]),e._v(" 项目的 "),s("code",[e._v("readme")]),e._v(" 文档中 "),s("a",{attrs:{href:"https://github.com/filecoin-project/venus-wallet#readme",target:"_blank",rel:"noopener noreferrer"}},[e._v("Build"),s("OutboundLink")],1)]),e._v(" "),s("h2",{attrs:{id:"venus-cluster"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#venus-cluster"}},[e._v("#")]),e._v(" venus-cluster")]),e._v(" "),s("p",[e._v("参考 "),s("code",[e._v("venus-cluster")]),e._v(" 项目的文档 "),s("code",[e._v("05.快速启用.md")]),e._v(" 中 "),s("a",{attrs:{href:"https://github.com/ipfs-force-community/venus-cluster/blob/main/docs/zh/05.%E5%BF%AB%E9%80%9F%E5%90%AF%E7%94%A8.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("准备工作"),s("OutboundLink")],1)]),e._v(" "),s("h2",{attrs:{id:"venus-sealer-将弃用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#venus-sealer-将弃用"}},[e._v("#")]),e._v(" venus-sealer(将弃用)")]),e._v(" "),s("div",{staticClass:"language-shell script extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[e._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" clone https://github.com/filecoin-project/venus-sealer.git\n$ "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("cd")]),e._v(" venus-sealer\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" checkout -b v1.0.0 v1.0.0\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" submodule update --init --recursive\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("make")]),e._v(" deps\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("make")]),e._v("\n")])])])])}),[],!1,null,null,null);t.default=n.exports}}]);