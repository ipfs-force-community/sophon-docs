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

:::

:::tip port
`sophon-auth`默认端口为 8989，下面其他组件使用参数--auth-url，填写的相关参数就是这个端口号与相应 ip。
:::

### 使用 MySQL (可选)

支持 MySQL 5.7 及以上版本，并创建好组件所需的数据库。可替代默认的 `Badger` 键值数据库。

```bash
# 创建数据库
create database sophon_auth default charset utf8;
```

要使用 MySQL 数据库，请修改配置中的 `db` 部分。

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

### 生成user 及 token

`sophon-auth` 管理着其他 venus 模块使用的[jwt](https://jwt.io/)令牌，以便它们在网络上安全地相互通信。

:::tip

`venus` 集群中 `token` 的理论知识可参考 `venus` 集群 `token` [认证体系](https://github.com/filecoin-project/venus/discussions/4880)
:::

为链服务组件生成 token 需要先生成用户。

生成`admin`权限token，用于链服务使用。后面`venus`,`sophon-gateway`,`sophon-messsager`,`sophon-miner`,`sophon-co`5个组件都需要使用本次生成的token。

```shell script
# 先生成用户
$ ./sophon-auth user add <USERNAME>

# 为用户生成token，权限是admin
$ ./sophon-auth token gen --perm admin <USERNAME>
<SHARED_ADMIN_AUTH_TOKEN>
```

给 `user` 绑定矿工 (`miner`)，一个 `user` 可以有多个矿工。

```shell
$ ./sophon-auth user miner add <USER> <MINER_ID>

# 查看user列表
$ ./sophon-auth user list
```

如user的`state`不是`enabled`的话，需要设置 `user` 可用，否则在其他组件请求 `user` 列表时请求不到。

 ```bash
# 设置用户可用
$ ./sophon-auth user update --name=<USER> --state=1
  update user success
 ```

## 启动 sophon-gateway

下载并编译`sophon-gateway`的源代码。

```bash
$ git clone https://github.com/ipfs-force-community/sophon-gateway.git
$ cd sophon-gateway
$ git checkout <RELEASE_TAG>
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

获取网络快照。

```bash
# mainnet网:
aria2c -x5 https://forest-archive.chainsafe.dev/latest/mainnet -o snapshot.car

# calibnet网络：
aria2c -x5 https://forest-archive.chainsafe.dev/latest/calibnet -o snapshot.car
```

启动 `venus` 进程进行链同步。使用 `--network` 来指定 `venus` 连接的网络。

```shell script
$ ./venus daemon 
--network=calibrationnet \
--auth-url=<http://VENUS_AUTH_IP_ADDRESS:PORT> \
--auth-token=<SHARED_ADMIN_AUTH_TOKEN> \
--import-snapshot snapshot.car
```
### 节点磁盘数据合并
当节点系统磁盘空间不足时，需要重新导入快照文件，以保证venus节点的稳定运行。具体操作方法如下:
1、停止venus进程运行，可以用 `kill <venus_pid>` 方法停止进程运行；
2、移除老的 `badge` 、 `chain` 和 `version` 文件，并备份文件；
```shell script
cd ~/.venus/
mkdir backup
mv badger chain version backup/
```
3、导入新的快照文件，并开始同步；同步完成后，就可以把 `~/.venus/backup` 删除。
```shell script
./venus daemon 
--network=calibrationnet \
--auth-url=<http://VENUS_AUTH_IP_ADDRESS:PORT> \
--auth-token=<SHARED_ADMIN_AUTH_TOKEN> \
--import-snapshot snapshot.car
```

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
$ venus daemon \
--network=calibrationnet \
--auth-url=<http://VENUS_AUTH_IP_ADDRESS:PORT> \
--auth-token=<SHARED_ADMIN_AUTH_TOKEN> \
--import-snapshot snapshot.car
```

在其他机器上执行 `telnet` 验证配置生效：

```shell script
telnet <VENUS_IP_ADDRESS> <PORT>
```

可以使用 `tail -f venus.log` 或 `./venus sync status` 或`./venus chain head`多种办法检查同步过程中是否有任何错误。

```bash
# 查看`Timestamp`如果是当前时间，说明节点同步完成。
$ ./venus chain head
{
	"Height": 769959,
	"ParentWeight": "14246387999",
	"Cids": [
		{
			"/": "bafy2bzacebuy3bxoxy7h2rlhttwvnte27ebpcro6kfew7ce3fojgghpctlchm"
		},
		{
			"/": "bafy2bzaceawzuc6l3dnj3jbnqc5xynfz6ak3kzad4iejnmu7owaon2iygmqfq"
		}
	],
	"Timestamp": "2023-07-27 10:32:30"
}
```

## 启动sophon-co（可选）

```bash
$ sophon-co --listen 0.0.0.0:6666 run \
--auth <SHARED_ADMIN_AUTH_TOKEN:http://VENUS_AUTH_IP_ADDRESS:PORT \
--node <SHARED_ADMIN_AUTH_TOKEN:/ip4/VENUS_DAEMON_IP_ADDRESS/tcp/VENUS_DAEMON_PORT/ws>
--node <SHARED_ADMIN_AUTH_TOKEN:/ip4/VENUS_DAEMON_IP_ADDRESS/tcp/VENUS_DAEMON_PORT/ws>
```

如果启动多个节点，可以通过 `--node` 来指定多个节点选择最优链信息，返回给请求组件。

查看 `sophon-co` 下的所有节点，以及调度的优先级:

```bash
./sophon-co --listen 0.0.0.0:6666 weight list
#Address                        Weight  Priority
#/ip4/10.10.66.141/tcp/3453/ws  1       2
```

## 启动 sophon-messager

> 如果没有指定与数据库相关的参数，`sophon-messager` 将默认使用 `sqlite3` 数据库。

选择mysql数据库的话，首先需要创建数据库。

```bash
# 创建数据库
$ create database sophon_messager default charset utf8;
```

启动 `sophon-messager`。请注意，`--auth-url`、`--node-url` 和`--auth-token` 是为了让 sophon-messager 了解其他 `venus` 模块的存在并进行自身的身份验证。

```shell script
$ nohup ./sophon-messager run \
--auth-url=<http://VENUS_AUTH_IP_ADDRESS:PORT> \
--node-url /ip4/<VENUS_DAEMON_IP_ADDRESS>/tcp/3453 \
--gateway-url=/ip4/<IP_ADDRESS_OF_VENUS_GATEWAY>/tcp/45132 \
--auth-token <SHARED_ADMIN_AUTH_TOKEN> \
--db-type mysql \
--mysql-dsn "<USER>:<PASSWORD>@(127.0.0.1:3306)/sophon_messager?parseTime=true&loc=Local&readTimeout=10s&writeTimeout=10s" \
> msg.log 2>&1 &
```


## 启动 sophon-miner

### 初始化 `sophon-miner`。

选择mysql数据库的话，首先需要创建数据库。

```bash
# 创建数据库
$ create database sophon_miner default charset utf8;
```

初始化。

```shell script
$ ./sophon-miner init \
--auth-api <http://VENUS_AUTH_IP_ADDRESS:PORT> \
--token <SHARED_ADMIN_AUTH_TOKEN> \
--gateway-api /ip4/<VENUS_GATEWAY_IP_ADDRESS>/tcp/45132 \
--api /ip4/<VENUS_DAEMON_IP_ADDRESS>/tcp/3453 \
--slash-filter mysql \
--mysql-conn "<USER>:<PASSWORD>@(127.0.0.1:3306)/sophon_miner?parseTime=true&loc=Local&readTimeout=10s&writeTimeout=10s" 
```

### 启动 `sophon-miner`。

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

## 配置链服务统一入口

因为链服务组件比较多，当下游组件想要链接同一个链服务的多个链服务组件时，配置会比较繁琐，并且需要提供多个链服务的入口。
可以使用 `sophon-gateway` 代理其他链服务的请求，对外提供一个统一的链服务入口。参考[部署统一链服务入口]。(https://sophon.venus-fil.io/zh/operation/sophon-gateway.html#%E4%BD%BF%E7%94%A8-gateway-%E4%BB%A3%E7%90%86%E5%AF%B9%E5%85%B6%E4%BB%96%E7%BA%BF%E4%B8%8A%E7%BB%84%E4%BB%B6%E7%9A%84%E8%AF%B7%E6%B1%82)

## 启动 droplet（可选）

`droplet` 可以作为链服务组件之一来进行部署，具体部署文档请参考[文档](https://droplet.venus-fil.io/zh/operation/)

## 下一步

接下来请按照这个[文档](join-a-cs.md)加入到你刚刚部署的智子服务吧！

## 问题？

欢迎来[Slack](https://filecoinproject.slack.com/archives/C028PCH8L31)上找我们反馈！
