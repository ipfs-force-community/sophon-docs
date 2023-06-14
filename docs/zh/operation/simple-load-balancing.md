:::tip
本文介绍了一个简易的实现负载均衡的方式，使用`chain-co`的负载均衡方式请参照[这里](https://venus.filecoin.io/zh/operation/#%E9%83%A8%E7%BD%B2%E8%8A%82%E7%82%B9)。
:::

## 前期准备

1. 取消 venus 程序的 jwt-token 验证;
2. 本示例有两个 venus 节点：192.168.1.125(mainnet),192.168.1.134(calibnet);
3. 192.168.1.134 安装 nginx 作为负载均衡服务器;

## nginx 配置

1. venus 节点监听地址改为:/ip4/0.0.0.0/tcp/3453，文件：~/.venus/api
   
2. 负载均衡配置

```NGINX
... ...

http
    {
        ... ...

server
    {
        listen 888;
        server_name phpmyadmin;
        index index.html index.htm index.php;
        root  /www/server/phpmyadmin;

        #error_page   404   /404.html;
        include enable-php.conf;
    
        location /
        {
            proxy_pass http://venussvr;
        }

        access_log  /www/wwwlogs/access.log;
    }

upstream venussvr
    {
        server 192.168.1.125:3453 weight=1;
        server 192.168.1.134:3453 weight=1;
    }

include /www/server/panel/vhost/nginx/*.conf;
}
```

3. 重启 nginx 服务，这时就可以用 nginx 服务代理 venus 服务了
```shell script
curl http://192.168.1.134:888/rpc/v0 -X POST -H "Content-Type: application/json"  -d '{"method": "Filecoin.StateNetworkName","params":[],"id":1}'
{"jsonrpc":"2.0","result":"mainnet","id":1}

curl http://192.168.1.134:888/rpc/v0 -X POST -H "Content-Type: application/json"  -d '{"method": "Filecoin.StateNetworkName","params":[],"id":1}'
{"jsonrpc":"2.0","result":"calibrationnet","id":1}
```
