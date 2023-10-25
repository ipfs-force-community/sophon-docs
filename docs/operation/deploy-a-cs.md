## Pre-requisites

Before diving into deployment of your mining operation, please make sure you go through the following steps. 

:::warning

It is recommended that you test your setup in `calibration` network before deploying on `mainnet`. 

:::

### Setup your permanent storage

Choose a network file system that you are familiar with (NFS for example) and deploy your storage cluster.

### Software dependencies

You will need to install these [software dependencies](https://lotus.filecoin.io/lotus/install/linux/#software-dependencies) (same as Lotus) before running venus.

## Install sophon-auth

Download and compile the source code of venus-auth.

```shell script
$ git clone https://github.com/ipfs-force-community/sophon-auth.git
$ cd sophon-auth
$ git checkout <RELEASE_TAG>
$ make 
$ nohup ./sophon-auth run > auth.log 2>&1 &
```
:::tip 

Default config file for Venus-auth is located at `~/.sophon-auth/config.toml`.

:::

:::tip Logs

Log defaults printing to console. `InfluxDB` is supported through configuration.

:::

:::tip port

The default port of `sophon-auth` is `8989`.

:::

### Using MySQL (Optional)

MySQL 5.7 or above is supported and can be used as a substitute for the dedault Badger key-value  database. To use MySQL database, modify the db section of the config.

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
Restart sophon-auth for the configuration to take into effect.

```shell script
$ ps -ef | grep auth
$ kill <VENUS_AUTH_PID>
$ nohup ./sophon-auth run > auth.log 2>&1 &
```

### Token gerneration

sophon-auth manages [jwt](https://jwt.io/) tokens used by other venus modules for them to talk to each other securely on the network.

Generate tokens for shared modules.

```bash
# add user SHARED
$ ./sophon-auth user add <SHARED>

# --perm specifies admin, sign, write or read permission of the token generated
$ ./sophon-auth token gen --perm admin <SHARED>
<SHARED_ADMIN_AUTH_TOKEN>
```

Generate tokens for independent modules. Tokens can be logically grouped by `<USER>` as individual miner joining the mining pool.

```shell script
$ ./sophon-auth user add <USER>

$ ./sophon-auth token gen --perm write <USER>
<USER_WRITE_AUTH_TOKEN>
$ ./sophon-auth token gen --perm read <USER>
<USER_READ_AUTH_TOKEN>
```
:::tip

Use `./sophon-auth user add <USER>` to logically group different tokens. Activate the user, which was just created,  then bind miner to it:
```
$ ./sophon-auth user update --name <USER> --state 1
$ ./sophon-auth user miner add <USER> <MINER_ID>

# 查看user列表
$ ./sophon-auth user list
```

:::

## Install sophon-gateway

Download and compile the source code of sophon-gateway.

```bash
$ git clone https://github.com/ipfs-force-community/sophon-gateway.git
$ cd sophon-gateway
$ git checkout <RELEASE_TAG>
$ make
```

Start sophon-gateway.

```bash
$ ./sophon-gateway --listen=/ip4/0.0.0.0/tcp/45132 run \
# Use either a http or https url
--auth-url=<http://VENUS_AUTH_IP_ADDRESS:PORT> \
--auth-token=<SHARED_ADMIN_AUTH_TOKEN> \
> sophon-gateway.log 2>&1 &
```

:::tip

If you encounter the following compilation errors, execute first`go get github.com/google/flatbuffers@v1.12.1`

```bash
github.com/dgraph-io/badger/v3@v3.2011.1/fb/BlockOffset.go:6:2: missing go.sum entry for module providing package github.com/google/flatbuffers/go (imported by github.com/dgraph-io/badger/v3/table); to add:
        go get github.com/dgraph-io/badger/v3/table@v3.2011.1
```
:::

## Install venus daemon

Download and compile the source code of venus.

```shell script
$ git clone https://github.com/filecoin-project/venus.git
$ cd venus
$ git checkout <RELEASE_TAG>
$ make deps
$ make
```
Start venus daemon for chain synchronization. Use `--network` to specify the network venus is connecting to.

```bash
$ nohup ./venus daemon --network=calibrationnet --auth-url=<http://VENUS_AUTH_IP_ADDRESS:PORT> --auth-token=<SHARED_ADMIN_AUTH_TOKEN> > venus.log 2>&1 &
```

:::tip

Use `tail -f venus.log`  or `./venus sync status` to check if there is any errors during synchronization.

:::

### Grant access to venus daemon

By default, venus daemon only respond to local access. Change the following configuration to allow access from other addresses.

```shell script
vim ~/.venus/config.json
```

Change `apiAddress` from `/ip4/127.0.0.1/tcp/3453` to `/ip4/0.0.0.0/tcp/3453`. Save and close the config file.

```json
{
	"api": {"apiAddress": "/ip4/0.0.0.0/tcp/3453"}
}
```

Restart venus daemon for the config to take into effects.

```bash
$ ps -ef | grep venus
$ kill <VENUS_PID>
$ nohup ./venus daemon --network=calibrationnet --auth-url <http://VENUS_AUTH_IP_ADDRESS:PORT> --auth-token <SHARED_ADMIN_AUTH_TOKEN> > venus.log 2>&1 &
```

:::tip

In order for the chain service to interact with the chain, daemon needs to be synced with the network by importing a snapshot of the filecoin chain. Please refer to [this guide](venus-daemon.md) for more details.

:::

## Install sophon-messager

Download and compile the source code of sophon-messager.

```shell script
$ git clone https://github.com/ipfs-force-community/sophon-messager.git
$ cd sophon-messager
$ git checkout <RELEASE_TAG>
$ make 
```
Start sophon-messager. Note that `--auth-url`, `--node-url` and `--auth-token` are for sophon-messager to be aware of other venus modules and be properly authenticated.

```bash
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

If no database related params are specified, sophon-messager will default to use sqlite.

:::


## Install sophon-miner

Download and compile the source code of sophon-miner.

```shell script
$ git clone https://github.com/ipfs-force-community/sophon-miner.git
$ cd sophon-miner
$ git checkout <RELEASE_TAG>
$ make
```
Initialize sophon-miner.

```bash
$ ./sophon-miner init
--auth-api <http://VENUS_AUTH_IP_ADDRESS:PORT> \
--token <SHARED_ADMIN_AUTH_TOKEN> \
--gateway-api /ip4/<VENUS_GATEWAY_IP_ADDRESS>/tcp/45132 \
--api /ip4/<VENUS_DAEMON_IP_ADDRESS>/tcp/3453 \
--slash-filter local
```

Run sophon-miner.

```bash
$ nohup ./sophon-miner run >> miner.log 2>& 1 &
```

### Miner management

Once a user, [damocles](https://damocles.venus-fil.io/) with proper miner id, connected to your Sophon service. You can query the status of said miner id by the following.

```bash
$ ./sophon-miner address state 
[
	{
		"Addr": "<MINER_ID>",
		"IsMining": true,
		"Err": null
	}
]
```

If `IsMining` of your miner is `false`, you can run the following command to start the miner id.

```bash
$ ./sophon-miner address start <MINER_ID>
```

List all miner ids that have connected to sophon-miner.

```bash
$ ./sophon-miner address list
```

### Configure unified endpoint for chain service

Given the complexity that a Sophon chain service consists of multiple chain service components (endpoints), it can be cumbersome for downstream consumers to configure multiple endpoints to chain service components before they can use the Sophon chain service. 

To simplify this process and provide a unified endpoint for chain services, you can use `sophon-gateway` as a  proxy for requests to chain services. Details can be found at [configuring unified entry](https://sophon.venus-fil.io/zh/operation/sophon-gateway.html#%E4%BD%BF%E7%94%A8-gateway-%E4%BB%A3%E7%90%86%E5%AF%B9%E5%85%B6%E4%BB%96%E7%BA%BF%E4%B8%8A%E7%BB%84%E4%BB%B6%E7%9A%84%E8%AF%B7%E6%B1%82).

## Next steps

Next, please follow this [guide](join-a-cs.md) to connect to the Sophon service you just deployed!

## Questions？

Find us on [Slack](https://filecoinproject.slack.com/archives/CEHHJNJS3)!
