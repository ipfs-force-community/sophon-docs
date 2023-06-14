---
title: 'venus: 链管理'
description: 'Venus 区块链携带计算网络当前状态所需的信息，存储在磁盘上，每 30 秒增加一个新的块。本指南解释了如何管理 th 链的几个方面。'
breadcrumb: '链管理'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

[[TOC]]

## 同步

Venus 将通过以下方式自动同步到最新的 _chain head_ :

- 获取从当前区块头到最后一个同步高度的区块头。
- 检索并验证从上一次同步的高度到当前块头的所有区块。

一旦 Venus 同步后，它将通过 Pubsub 在每个高度出新块时进行相应的验证。请注意，在 Venus 上，每个高度可能会看到不同数量的区块。

Filecoin 的区块链增长相对较快，因此完全同步将需要很长时间。因此，Venus 提供了一种通过受信任状态快照进行同步的更快方法。

### 从受信任状态快照（主网）进行同步

我们建议大多数用户从最小的轻量级快照执行初始节点同步。受信任状态快照不包含完整的链，并且可能不适合需要对历史状态信息执行查询的节点（例如区块浏览器），但对于大多数用户而言，它们是可行的。

最近的最小受信任状态链快照在 [这里](https://snapshots.mainnet.filops.net/minimal/latest). 我们可以用 venus 启动守护程序并直接从 URL 导入：

```sh
# 快照大小约为100GiB。这适用于mainnet。
venus daemon --import-snapshot https://snapshots.mainnet.filops.net/minimal/latest

# 另一种方法是先下载并使用该文件
venus daemon --import-snapshot <filename.car>

# sha256sum 与临时快照一起存储，可以通过以下方式获取
curl -sI https://snapshots.mainnet.filops.net/minimal/latest \
| perl -ne '/^x-amz-website-redirect-location:(.+)\.car\s*$/ && print "$1.sha256sum"' \
| xargs curl -s
```

::: 如果您不信任快照的来源，或者只是想让 Venus 验证链，则需要按照下一节中的步骤进行操作。完整验证链的速度要慢一个数量级，预计需要几天的时间。:::

### 检查同步状态

有两种方法可以跟踪 Venus 守护程序是否正确同步了链，以及还需要多久才能完成同步：

```sh
# 检查当前同步状态，同步works程序等：
venus sync status
# 查看链头与当前时间的时间戳：
venus chain head
```

## 压缩链数据

通过从最小快照重新同步，可以精简 Venus 使用的当前链数据以减少 Venus 节点的磁盘占用量。

1. 停止 Venus daemon:

  ```bash
  venus daemon stop
  ```

2. 在 Venus 的路径中删除 `badger/` 文件夹的内容：

  ```bash
  rm -rf ~/.venus/badger/*
  ```
  
3. 如上所述，使用最小快照启动 daemon:

  ```bash
  venus daemon --import-snapshot https://snapshots.mainnet.filops.net/minimal/latest
  ```

在 GitHub 上[创建一个问题](https://github.com/filecoin-project/venus-docs/issues)。
