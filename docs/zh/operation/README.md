## 背景

考虑到庞大的初始硬件和 Filecoin 质押[投资](https://filscan.io/calculator)以及相关的运营成本，开始 Filecoin 存储提供是一项艰巨的任务。囊括了分布式部署架构，订单服务和算力服务，Venus 将帮助存储提供者，如社区所说，把[全职工作](https://filecoinproject.slack.com/archives/CEGN061C5/p1610810730117900?thread_ts=1610809298.116800&cid=CEGN061C5)变成为一个对运维更加友好的解决方案。希望本教程能让您立即开始存储提供！

## 如何提供存储服务

有两种方法可以开始使用 Venus 来提供存储服务。

1. 部署最少的硬件并获得第三方智子服务的帐号。欢迎了解`Venushub`的孵化器[项目](https://venushub.io/zh/incubator/)，并加入`Venus`团队提供的免费智子服务。
2. 自行部署智子服务。请参阅[这个](deploy-a-cs.md)教程以了解更多信息。

在遵循其余的教程和成功部署后，您可以开始封装扇区，增加算力并通过您对网络存储容量的贡献最终获得区块奖励！

## venus 产品介绍

根据其在挖矿集群中的作用，模块可以大致分为两类：智子服务产品和 SP 本地产品。智子服务可以被认为是开始封装扇区所需的基础。大多数与区块链的交互，如链同步、发送消息、赢得赢票等，都是由智子服务处理的。这允许了许多存储提供者都可以共用一套智子服务，从而减少维护成本。SP 本地产品提供了一整套算力服务。如果您选择使用第三方托管的智子服务，您只要将花费大部分时间在 SP 本地产品上。

| name                                                         | role                                                  | product |
| ------ | ----------- | ------------- |
| [venus](https://github.com/filecoin-project/venus)           | daemon for chain interactions                         | venus              |
| [sophon-miner](https://github.com/ipfs-force-community/sophon-miner) | block winning and proving                             | sophon service             |
| [sophon-messager](https://github.com/ipfs-force-community/sophon-messager) | chain message management                              | sophon service             |
| [sophon-auth](https://github.com/ipfs-force-community/sophon-auth) | utility for authorized use of shared modules          | sophon service             |
| [sophon-gateway](https://github.com/ipfs-force-community/sophon-gateway) | utility for controlled access point of shared modules | sophon service             |
| [venus-wallet](https://github.com/filecoin-project/venus-wallet) | addresses/keys management                             | venus |
| [damocles](https://github.com/ipfs-force-community/damocles) | job scheduling, sealing and proving                   | damocles        |
| [droplet](https://github.com/ipfs-force-community/droplet) | storage deal making & data retrieval                                           | droplet        |
| ~~[venus-sealer](https://github.com/filecoin-project/venus-sealer), [venus-worker](https://github.com/filecoin-project/venus-sealer)~~ | ‼️Deprecated; ~~job scheduling, sealing and proving~~                   | ~~Local~~        |

## 服务架构

下图展示了 venus 模块如何相互交互。

![venus](https://github.com/ipfs-force-community/venus-core-devs/assets/1591330/27f50f09-5d14-4d6d-b0ab-fa4456a6f076)

## 硬件要求

在[此处](https://github.com/filecoin-project/community-china/discussions/18)了解有关硬件要求的更多信息。或者参阅我们的[单机配置示例](https://venus.filecoin.io/zh/operation/example-single-box.html)。

:::warning

使用 `damocles` 时，请参阅 `damocles` [性能测试](https://mp.weixin.qq.com/s/AxEaV2iZT8-8jOKyMoFRvA)中，社区成员使用的硬件，并作出对自己的最优调整。如有问题可以寻求[Venus Master](https://venushub.io/master/)的帮助。

:::

## Venus 产品构建

本文档各组件以 `TAG:v1.0.0` 为例说明，实际场景中按需检出。

> 每个组件的构建相互独立，无顺序之分。

### 环境准备

系统需要安装 `Go`，`Rust` 等必要软件，可以参考 `lotus` 文档中的相应部分 [building-from-source](https://lotus.filecoin.io/lotus/install/linux/#building-from-source)。

`Venus` 各产品均在 `github` 开源，通常用 `git` 管理，`git` 命令使用可参考 [Branching-Remote-Branches](https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches)

部分组件依赖 `filecoin-ffi`，`Filecoin`官方提供了编译好的静态库文件。如果需要源码编译此静态库，可参考 [native-filecoin-ffi](https://lotus.filecoin.io/lotus/install/linux/#native-filecoin-ffi)，通常 `damocles` 源码编译此库以提升扇区封装效率。

### venus

```shell script
$ git clone https://github.com/filecoin-project/venus.git
$ cd venus
$ git checkout -b v1.0.0 v1.0.0
$ git submodule update --init --recursive
$ make deps
$ make
```

### sophon-auth

```shell script
$ git clone https://github.com/ipfs-force-community/sophon-auth.git
$ cd sophon-auth
$ git checkout -b v1.0.0 v1.0.0
$ make 
```

### sophon-gateway

```shell script
$ git clone https://github.com/ipfs-force-community/sophon-gateway.git
$ cd sophon-gateway
$ git checkout -b v1.0.0 v1.0.0
$ git submodule update --init --recursive
$ make
```

:::tip

如果遇到编译错误：`github.com/dgraph-io/badger/v3@v3.2011.1/fb/BlockOffset.go:6:2: missing go.sum entry for module providing package github.com/google/flatbuffers/go (imported by github.com/dgraph-io/badger/v3/table); to add:
                     go get github.com/dgraph-io/badger/v3/table@v3.2011.1` ，先执行：
 
```shell script
$ go get github.com/google/flatbuffers@v1.12.1
```
:::

### sophon-messager

```shell script
$ git clone https://github.com/ipfs-force-community/sophon-messager.git
$ cd sophon-messager
$ git checkout -b v1.0.0 v1.0.0
$ make 
```

### sophon-miner

```shell script
$ git clone https://github.com/ipfs-force-community/sophon-miner.git
$ cd sophon-miner
$ git checkout -b v1.0.0 v1.0.0
$ git submodule update --init --recursive
$ make
```

### venus-wallet

参考 `venus-wallet` 项目的 `readme` 文档中 [Build](https://github.com/filecoin-project/venus-wallet#readme)

### droplet

参考 `droplet` 的产品[文档](https://droplet.venus-fil.io/zh/operation/#%E6%A6%82%E8%BF%B0)。

### damocles

参考 `damocles` 的产品[文档](https://damocles.venus-fil.io/zh/operation/)
