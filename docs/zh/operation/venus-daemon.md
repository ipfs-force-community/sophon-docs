# 入门

这是安装和运行 Filecoin 节点并连接到本地机器测试网络的指南。

### 系统要求

Venus可以在大多数GNU/Linux和MacOS系统上构建和运行。尚不支持Windows。

验证节点可以在大多数具有至少 8GB RAM 的系统上运行。挖矿节点需要大量的 RAM 和 GPU 资源，这取决于正在使用的扇区配置。

### 安装依赖项和系统配置

从 Git 下载 `venus` 代码：

```sh
mkdir -p /path/to/filecoin-project
git clone https://github.com/filecoin-project/venus.git /path/to/filecoin-project/venus
```

#### 安装 Go

`venus` 的构建过程需要 [Go](https://golang.org/doc/install) >= v1.20。

> 第一次安装 Go？我们推荐 [这个教程](https://www.ardanlabs.com/blog/2016/05/installing-go-and-your-workspace.html) 其中包括环境设置。

由于`venus`中使用了`cgo`，因此无论是使用预构建库还是从源代码处编译，都需要一个 C 编译器来构建它。要使用 `gcc` （例如`export CC=gcc`），需要 v7.4.0 或更高版本。

构建过程将下载一个静态库，其中包含[Filecoin Proof 的实现](https://github.com/filecoin-project/rust-fil-proofs) (用 Rust 写的)。

> **注意：** 要从源代码生成证明，（1）必须安装 Rust 开发环境，（2）必须设置环境变量 `FFI_BUILD_FROM_SOURCE=1` 更多信息可在[filecoin-ffi](https://github.com/filecoin-project/filecoin-ffi)中找到。

#### 安装依赖项

```sh
make deps
```

 > **注意：** 第一次`deps` 启动可能**慢**，因为需要下载和编译 `filecoin-ffi`。

### 构建和运行测试

1. 构建二进制文件：
```sh
make
```

2. 运行单元测试：

```sh
make test
```

更多构建和测试命令请查看`Makefile`。

## 开始运行 Filecoin

1. 如果以前在系统上运行过`venus` ，请删除现有的 Filecoin repo（**这将删除所有以前的 Filecoin 数据**）：
```sh
rm -rf ~/.venus
```

2. 启动 venus 守护进程：
```sh
venus daemon
```
    
这应该返回“我的 peerID 是`<peerID>`” , 其中 `<peerID>` 是一个长的 [CID](https://github.com/filecoin-project/specs/blob/master/definitions.md#cid) ，是以“Qm”开头的字符串。

3. 检查节点的连接：
```sh
venus swarm peers                  # list addresses of peers to which you're connected
```

该节点现在应该连接到一些 peer，并将开始下载和验证区块链。

 > **注意：** 守护进程现在正在自己的终端中无限期运行 (`Ctrl + C` 退出)。要运行其他`venus` 命令，请打开第二个终端选项卡或窗口 (在 Mac 上是 `Cmd + T`)。


## 从 Filecoin 水龙头获取 FIL

**一旦你的链完成同步**, 你将可以使用水龙头获得 filecoin 代币（FIL）。在 Filecoin 节点可以参与市场之前需要一些启动文件，客户需要在他们的帐户中输入 FIL，以便与矿工进行存储交易。矿工在最初向网络抵押存储时使用 FIL 作为抵押品。

在早期测试中，可以从 Filecoin 水龙头获得模拟的测试 FIL。“水龙头”之所以得名，是因为它能把 FIL 发放到那些把钱包放在它下面的人。使用模拟的测试 FIL 可以对市场动态进行初步测试，而无需任何真实资金。

FIL 的所有余额都存放在钱包里。新创建节点时，它将有一个余额为 0 FIL 的 Filecoin 钱包。

1. 检索您的钱包地址：
```sh
venus wallet ls
```
    
2. 输出的应该是一个长的字母数字字符串。转到 testnet 的 [水龙头](https://faucet.calibration.fildev.network/) 并提交那个钱包地址。要花一分钟才能把钱放进钱包。

    * 或者你可以从命令行触发水龙头：
```sh
export WALLET_ADDR=`venus wallet ls`    # fetch your wallet address into a handy variable
MESSAGE_CID=`curl -X POST -F "address=${WALLET_ADDR}" "https://faucet.calibration.fildev.network/send"`
```
        
3. 水龙头将提供消息 CID。如果链已与网络同步，则此消息应在大约 30 秒内处理。可以运行以下命令以等待确认：

```sh
venus state wait-msg ${MESSAGE_CID}
```

4. 通过检查钱包余额验证 FIL 是否已转入钱包中：

```sh
venus wallet balance ${WALLET_ADDR}
```
    
## 等待链同步
🎉 恭喜，您现在已连接到 Filecoin！守护进程现在正忙于同步和验证现有的区块链，这可能需要一段时间---数小时甚至数天，具体取决于网络时间和活动。

在同步初期，一个 CPU 内核上会有激烈的活动。首先通过访问 [网络统计页](https://stats.testnet.filecoin.io) 了解当前块的高度，然后观察节点同步进度：
```sh
venus sync status
````

## 查看网络信息

有一些可视化工具可以帮助用户了解 Filecoin 网络中正在发生的事情，例如官方的 [网络统计页面](http://stats.testnet.filecoin.io/) 以及社区管理的区块浏览器 [filscan.io](https://filscan.io)。

## 组件默认端口

```shell
Auth 8989
Gateway 45132
Daemon node 3453
Miner 12308
Sealer 2345
Worker 3456
```

在构建 Venus 各组件过程中可能会产生 RPC 链接问题，可以运行类似 telnet 10.50.110.59 12308 命令测试各组件端口是否打开。
