## 准备

所需组件构建完成，可参考 [组件构建](/zh/operation/#venus-%E4%BA%A7%E5%93%81%E6%9E%84%E5%BB%BA)

:::warning

建议您在部署到主网上之前在 `calibration` 网络中测试您的配置。

:::

### 软件依赖

在运行 `Venus` 之前，您需要安装[这些](https://lotus.filecoin.io/lotus/install/linux/#software-dependencies)软件。（注：和 lotus 的软件依赖相同）

## 启动 sophon-auth

```shell script
$ nohup ./sophon-auth run > auth.log 2>&1 &
```

:::tip
`sophon-auth` 的默认配置文件位于 `~/.sophon-auth/config.toml`
:::

:::tip Logs

日志默认打印到控制台。通过配置可以支持 `InfluxDB`。

:::

:::tip port
`sophon-auth`默认端口为 8989，下面其他组件使用参数--auth-url，填写的相关参数就是这个端口号与相应 ip。
:::

### 查看配置

```shell
$ head  ~/.sophon-auth/config.toml
Port = "8989"
```

### 使用 MySQL (可选)

支持 MySQL 5.7 及以上版本，可替代默认的 `Badger` 键值数据库。要使用 MySQL 数据库，请修改配置中的 `db` 部分。

```shell script
$ vim ~/.sophon-auth/config.toml

# Data source configuration item
[db]
# support: badger (default), mysql 
# the mysql DDL is in the script package 
type = "mysql" 
# The following parameters apply to MySQL
DSN = "<USER>:<PASSWORD>@(127.0.0.1:3306)/venus_auth?parseTime=true&loc=Local&charset=utf8mb4&collation=utf8mb4_unicode_ci&readTimeout=10s&writeTimeout=10s"
# conns 1500 concurrent
maxOpenConns = 64
maxIdleConns = 128
maxLifeTime = "120s"
maxIdleTime = "30s"
```
重启 `sophon-auth` 使配置生效。

```shell script
$ ps -ef | grep auth
$ kill <VENUS_AUTH_PID>
$ nohup ./sophon-auth run > auth.log 2>&1 &
```

### user 及 token 生成

`sophon-auth` 管理着其他 venus 模块使用的[jwt](https://jwt.io/)令牌，以便它们在网络上安全地相互通信。

:::tip

`venus` 集群中 `token` 的理论知识可参考 `venus` 集群 `token` [认证体系](https://github.com/filecoin-project/venus/discussions/4880)
:::


为链服务组件生成 token 需要先生成用户。

```shell script
# 先生成用户
$ ./sophon-auth user add <USERNAME>

# 生成用户token
$ ./sophon-auth token gen --perm admin <USERNAME>
<SHARED_ADMIN_AUTH_TOKEN>
```

给 `user` 绑定矿工 (`miner`)，一个 `user` 可以有多个矿工。

```
$ ./sophon-auth user miner add <USER> <MINER_ID>

# 查看user列表
$ ./sophon-auth user list
```

设置 `user` 可用，否则在其他组件请求 `user` 列表时请求不到。
 
 ```
$ ./sophon-auth user update --name=<USER> --state=1
  update user success
 ```

## 启动 sophon-gateway

下载并编译`sophon-gateway`的源代码。

```bash
$ git clone https://github.com/ipfs-force-community/sophon-gateway.git
$ cd sophon-gateway
$ git checkout <RELEASE_TAG>
$ make deps
$ make
```

:::tip
 如果遇到以下编译错误，先执行 `go get github.com/google/flatbuffers@v1.12.1`

```bash
github.com/dgraph-io/badger/v3@v3.2011.1/fb/BlockOffset.go:6:2: missing go.sum entry for module providing package github.com/google/flatbuffers/go (imported by github.com/dgraph-io/badger/v3/table); to add:
        go get github.com/dgraph-io/badger/v3/table@v3.2011.1
```
:::

启动 `sophon-gateway`

```bash
$ ./sophon-gateway --listen /ip4/0.0.0.0/tcp/45132 run \
# Use either a http or https url
--auth-url <http://VENUS_AUTH_IP_ADDRESS:PORT> \
--auth-token <SHARED_ADMIN_AUTH_TOKEN> \
> sophon-gateway.log 2>&1 &
```

## 启动 venus daemon

启动 `venus` 进程进行链同步。使用 `--network` 来指定 `venus` 连接的网络。

```shell script
$ nohup ./venus daemon --network=calibrationnet --auth-url=<http://VENUS_AUTH_IP_ADDRESS:PORT> --auth-token=<SHARED_ADMIN_AUTH_TOKEN> > venus.log 2>&1 &
```

:::tip

使用 `tail -f venus.log` 或 `./venus sync status` 检查同步过程中是否有任何错误。

:::

### venus 监听远程访问

默认情况下，`venus`进程只响应本地访问。更改以下配置以允许从其他地址访问。

```shell script
vim ~/.venus/config.json
```

将 `apiAddress` 从 `/ip4/127.0.0.1/tcp/3453` 更改为 `/ip4/0.0.0.0/tcp/3453`。此修改重启后生效

```json
{
	"api": {"apiAddress": "/ip4/0.0.0.0/tcp/3453"}
}
```

重启 `Venus daemon`。

```bash
$ ps -ef | grep venus
$ kill -9 <VENUS_PID>
$ nohup ./venus daemon --network=calibrationnet --auth-url=<http://VENUS_AUTH_IP_ADDRESS:PORT> --auth-token=<SHARED_ADMIN_AUTH_TOKEN> > venus.log 2>&1 &
```

在其他机器上执行 `telnet` 验证配置生效：

```shell script
telnet <VENUS_IP_ADDRESS> <PORT>
```


:::tip

为了链服务能够与链进行交互，`daemon`需要与网络其他节点同步最新的链。具体如何导入一个链的 `snapshot` 进行链同步可参见[这个文档](/zh/operation/chain-mng)。

:::

## 启动 sophon-messager

启动 `sophon-messager`。请注意，`--auth-url`、`--node-url` 和`--auth-token` 是为了让 sophon-messager 了解其他 `venus` 模块的存在并进行自身的身份验证。

```shell script
$ nohup ./sophon-messager run \
--auth-url=<http://VENUS_AUTH_IP_ADDRESS:PORT> \
--node-url /ip4/<VENUS_DAEMON_IP_ADDRESS>/tcp/3453 \
--gateway-url=/ip4/<IP_ADDRESS_OF_VENUS_GATEWAY>/tcp/45132 \
--auth-token <SHARED_ADMIN_AUTH_TOKEN> \
--db-type mysql \
--mysql-dsn "<USER>:<PASSWORD>@(127.0.0.1:3306)/venus_messager?parseTime=true&loc=Local&readTimeout=10s&writeTimeout=10s" \
> msg.log 2>&1 &
```

:::tip

如果没有指定与数据库相关的参数，`sophon-messager` 将默认使用 `sqlite3` 数据库。

:::


## 启动 sophon-miner

初始化 `sophon-miner`。

```shell script
$ ./sophon-miner init \
--auth-api <http://VENUS_AUTH_IP_ADDRESS:PORT> \
--token <SHARED_ADMIN_AUTH_TOKEN> \
--gateway-api /ip4/<VENUS_GATEWAY_IP_ADDRESS>/tcp/45132 \
--api /ip4/<VENUS_DAEMON_IP_ADDRESS>/tcp/3453 \
--slash-filter mysql \
--mysql-conn "<USER>:<PASSWORD>@(127.0.0.1:3306)/venus_miner?parseTime=true&loc=Local&readTimeout=10s&writeTimeout=10s" 
```

启动 `sophon-miner`。

```shell script
$ nohup ./sophon-miner run > miner.log 2>& 1 &
```

`sophon-miner` 启动后会从 `sophon-auth` 请求矿工列表，并对每个矿工执行出块的必要检查，如：钱包服务，WinningPoSt 服务是否正常等。检查矿工列表：

```shell script
$ ./sophon-miner address list 
[
        {
                "Addr": "f031429",
                "Id": "1f06d7b9-9fb2-497e-80f5-68f06b0a4b5f",
                "Name": "200-21"
        }
]
```

如果列表中没有在 `sophon-auth` 中配置的矿工，则需要从 `sophon-auth` 检查配置是否正确
- `检查venus-miner` 初始化配置的 `auth-token` 对应的 `user`是激活状态，即 `state=enabled`
```shell script
$ ./sophon-auth user list
name: ***
state: enabled
```

- 检查 `sophon-miner` 初始化配置的 `auth-token` 对应的 `user`下成功添加了此矿工。

```shell script
./sophon-auth user list
name: ***
miners: [***,***,...]
```
:::tip 
`miners` 列表有此矿工为正确。
:::

修改成功后执行下列命令重新拉取：

```shell script
$ ./sophon-miner address update
```

如果想要暂时终止或开始列表中某个矿工的出块，可通过下列命令执行。通常用于某个矿工出问题或集群迁移时使用。

```shell script
$ ./sophon-miner address start <MINER_ID>
$ ./sophon-miner address stop <MINER_ID>
```

## 启动 droplet（可选）

`droplet` 可以作为链服务组件之一来进行部署，具体部署文档请参考[文档](https://droplet.venus-fil.io/zh/operation/)

## 下一步

接下来请按照这个[文档](join-a-cs.md)加入到你刚刚部署的智子服务吧！

## 问题？

欢迎来[Slack](https://filecoinproject.slack.com/archives/C028PCH8L31)上找我们反馈！
