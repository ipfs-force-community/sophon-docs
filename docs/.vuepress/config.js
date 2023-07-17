module.exports = {
    title: 'Sophon',
    description: 'Sophon, formerly known as Venus Chain Service, is THE Filecoin super node solution.',
    base: '/',
    markdown: {
        config: md => {
            md.set({
                linkify: true
            })
            md.use(require('markdown-it-emoji'))
            md.use(require('markdown-it-container'))
            md.use(require('markdown-it-footnote'))
            md.use(require('markdown-it-deflist'))
            md.use(require('markdown-it-task-lists'))
        }
    },
    plugins: [
        'vuepress-plugin-check-md',
        '@vuepress/active-header-links',
        '@vuepress/back-to-top',
        '@vuepress/nprogress',
        '@vuepress/medium-zoom',
        '@vuepress-plugin-zooming',
        ['vuepress-plugin-code-copy', true]
    ],
    head: [
        ['link', {
            rel: 'icon',
            href: '/assets/sophon-icon.png'
        }],
        [
            'script',
            {
                async: true,
                src: 'https://www.googletagmanager.com/gtag/js?id=G-RHJWEBDXVD',
            },
        ],
        [
            'script',
            {},
            [
                "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-RHJWEBDXVD');",
            ],
        ],
    ],
    locales: {
        '/': {
            lang: 'en-US',
            title: 'Sophon',
            description: 'Sophon, formerly known as Venus Chain Service, is THE Filecoin super node solution.',
        },
        '/zh/': {
            lang: 'zh-CN',
            title: '智子',
            description: '智子，原Venus链服务，是一个Filecoin超级节点解决方案',
        }
    },
    themeConfig: {
        logo: '/assets/sophon-icon.png',
        lastUpdated: 'Last Updated',
        // Optional options for generating "Edit this page" link
        // if your docs are in a different repo from your main project:
        docsRepo: 'ipfs-force-community/sophon-docs',
        // if your docs are not at the root of the repo:
        docsDir: 'docs',
        // if your docs are in a specific branch (defaults to 'master'):
        docsBranch: 'main',
        // defaults to false, set to true to enable
        editLinks: true,
        // end Edit on Github section
        displayAllHeaders: false,
        locales: {
            '/': {
                selectText: 'Languages',
                label: 'English',
                lang: 'en-US',
                title: 'Sophon',
                description: 'Sophon (formerly known as Venus Chain Service) is THE Filecoin super node solution.',
                nav: [{
                    text: 'Introduction',
                    link: '/intro/'
                },
                {
                    text: 'Deployment & Operation',
                    link: '/operation/'
                },
                {
                    text: 'Developer',
                    link: '/developer/'
                },
                {
                    text: 'About',
                    link: '/about/'
                },
                ],
                sidebar: {
                    '/intro/': [{
                        title: 'Introduction',
                        collapsable: false,
                        children: [
                            ['', 'Overview'],
                        ]
                    },
                    ],
                    '/operation/': [
                    {
                        title: 'Deployment',
                        collapsable: false,
                        children: [
                            ['', 'Before deployment'],
                            ['deploy-a-cs.md', 'Deploy a Sophon service'],
                            ['join-a-cs.md', 'Use a Sophon service'],
                        ]
                    },
                    {
                        title: 'Sophon Components',
                        collapsable: false,
                        children: [
                            ['venus-daemon.md', 'venus daemon'],
                            ['venus-auth.md', 'venus-auth', "https://github.com/ipfs-force-community/sophon-auth/blob/master/docs/en/getting-started.md"],
                            ['venus-miner.md', 'venus-miner', "https://github.com/ipfs-force-community/sophon-miner/blob/master/docs/en/config-desc.md"],
                            ['venus-messager.md', 'venus-messager', "https://github.com/ipfs-force-community/sophon-messager/blob/master/docs/en/getting-started.md"],
                            ['venus-gateway.md', 'venus-gateway', "https://github.com/ipfs-force-community/sophon-gateway/blob/master/docs/en/getting-started.md"],
                        ]
                    },
                    {
                        title: 'Optional Components',
                        collapsable: false,
                        children: [
                            ['venus-wallet-builtin.md', 'venus-wallet (builtin)', "https://github.com/filecoin-project/venus-wallet/blob/master/docs/en/getting-started-local.md"],
                            ['venus-wallet.md', 'venus-wallet (remote)', "https://github.com/filecoin-project/venus-wallet/blob/master/docs/en/getting-started-remote.md"],
                        ]
                    },
                    {
                        title: 'Operations',
                        collapsable: false,
                        children: [
                            ['chain-mng.md', 'Chain management'],
                            ['simple-load-balancing.md', 'Simple load balancing'],
                            ['ha.md', 'High availability solution'],
                        ]
                    },
                    ],
                    '/developer/': [{
                        title: 'Development',
                        collapsable: false,
                        children: [
                            ['', 'Setup local 2k Env'],
                        ]
                    },
                    {
                        title: 'RPC reference',
                        collapsable: false,
                        children: [
                            ['', 'Setup local 2k Env'],
                        ]
                    },
                    ],
                    '/about/': [{
                        title: '',
                        collapsable: false,
                        children: [
                            ['chain-api-v0.md', 'Chain api v0', "https://github.com/filecoin-project/venus/blob/master/venus-shared/api/chain/v0/method.md"],
                            ['chain-api-v1.md', 'Chain api v1', "https://github.com/filecoin-project/venus/blob/master/venus-shared/api/chain/v1/method.md"],
                            ['messager-api.md', 'Messager api', "https://github.com/filecoin-project/venus/blob/master/venus-shared/api/messager/method.md"],
                            ['gateway-api-v0.md', 'Gateway api v0', "https://github.com/filecoin-project/venus/blob/master/venus-shared/api/gateway/v0/method.md"],
                            ['gateway-api-v1.md', 'Gateway api v1', "https://github.com/filecoin-project/venus/blob/master/venus-shared/api/gateway/v1/method.md"],
                            ['market-api-v0.md', 'Market api v0', "https://github.com/filecoin-project/venus/blob/master/venus-shared/api/market/v0/method.md"],
                            ['market-api-v1.md', 'Market api v1', "https://github.com/filecoin-project/venus/blob/master/venus-shared/api/market/v1/method.md"],
                            ['wallet-api.md', 'Wallet api', "https://github.com/filecoin-project/venus/blob/master/venus-shared/api/wallet/method.md"]
                        ]
                    },
                    ],
                }
            },
            '/zh/': {
                selectText: '选择语言',
                label: '简体中文',
                title: '智子',
                description: '智子（原Venus链服务）是一个Filecoin超级节点解决方案',
                nav: [
                {
                    text: '功能介绍',
                    link: '/zh/intro/'
                },
                {
                    text: '部署/运维',
                    link: '/zh/operation/'
                },
                {
                    text: '研发/设计',
                    link: '/zh/developer/'
                },
                {
                    text: '关于',
                    link: '/zh/about/'
                },
                ],
                sidebar: {
                    '/zh/intro/': [{
                        title: '功能特性',
                        collapsable: false,
                        children: [
                            ['', '概要'],
                        ]
                    },
                    ],
                    '/zh/operation/': [
                    {
                        title: '部署',
                        collapsable: false,
                        children: [
                            ['', '部署前准备'],
                            ['deploy-a-cs.md', '部署智子服务'],
                            ['venus-run-in-docker.md', '使用 Docker 部署智子服务'],
                            ['join-a-cs.md', '使用智子服务'],
                        ]
                    },
                    {
                        title: '智子服务组件',
                        collapsable: false,
                        children: [
                            ['venus-daemon.md', 'venus daemon'],
                            ['sophon-auth.md', 'sophon-auth', "https://github.com/ipfs-force-community/sophon-auth/blob/master/docs/zh/%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B.md"],
                            ['sophon-miner.md', 'sophon-miner', "https://github.com/ipfs-force-community/sophon-miner/blob/master/docs/zh/getting-start.md"],
                            ['sophon-messager.md', 'sophon-messager', "https://github.com/ipfs-force-community/sophon-messager/blob/master/docs/zh/%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B.md"],
                            ['sophon-gateway.md', 'sophon-gateway', "https://github.com/ipfs-force-community/venus-gateway/blob/master/docs/zh/%E5%BF%AB%E9%80%9F%E5%90%AF%E7%94%A8.md"],
                        ]
                    },
                    {
                        title: '配置文件',
                        collapsable: false,
                        children: [
                            ['sophon-auth-config.md', 'sophon-auth', "https://github.com/ipfs-force-community/sophon-auth/blob/master/docs/zh/config-desc.md"],
                            ['sophon-miner-config.md', 'sophon-miner', "https://github.com/ipfs-force-community/sophon-miner/blob/master/docs/zh/config-desc.md"],
                            ['sophon-messager-config.md', 'sophon-messager', "https://github.com/ipfs-force-community/sophon-messager/blob/master/docs/zh/config-desc.md"],
                            ['sophon-gateway-config.md', 'sophon-gateway', "https://github.com/ipfs-force-community/sophon-gateway/blob/master/docs/zh/config-desc.md"],
                        ]
                    },
                    {
                        title: '可选组件',
                        collapsable: false,
                        children: [
                            ['venus-wallet-builtin.md', 'venus-wallet（内置）', "https://github.com/filecoin-project/venus-wallet/blob/master/docs/zh/%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B%5B%E6%9C%AC%E5%9C%B0%5D.md"],
                            ['venus-wallet.md', 'venus-wallet（远程）', "https://github.com/filecoin-project/venus-wallet/blob/master/docs/zh/%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B%5B%E8%BF%9C%E7%A8%8B%5D.md"],
                        ]
                    },
                    {
                        title: '运维',
                        collapsable: false,
                        children: [
                            ['chain-mng.md', '链管理'],
                            ['simple-load-balancing.md', '简易负载均衡'],
                            ['ha.md', '高可用解决方案'],
                        ]
                    },
                    ],
                    '/zh/developer/': [{
                        title: '研发',
                        collapsable: false,
                        children: [
                            ['', '本地2k开发网络'],
                        ]
                    },
                    {
                        title: '智子组件设计',
                        collapsable: false,
                        children: [
                            ['miner-design.md', 'miner 设计', "https://github.com/ipfs-force-community/sophon-miner/blob/master/docs/zh/design-spec.md"],
                            ['messager-design.md', 'messager 设计', "https://github.com/ipfs-force-community/sophon-messager/blob/master/docs/zh/design-specs.md"],
                            ['gateway-design.md', 'gateway 设计', "https://github.com/ipfs-force-community/venus-gateway/blob/master/docs/zh/%E7%BB%84%E4%BB%B6%E8%AE%BE%E8%AE%A1.md"],
                        ]
                    },
                    {
                        title: '功能设计',
                        collapsable: false,
                        children: [
                            ['data-by-id.md', '用户数据隔离'],
                        ]
                    },
                    {
                        title: 'RPC 接口参考',
                        collapsable: false,
                        children: [
                            ['chain-api-v1.md', 'Chain api v1', "https://github.com/filecoin-project/venus/blob/master/venus-shared/api/chain/v1/method.md"],
                            ['chain-api-v0.md', 'Chain api v0', "https://github.com/filecoin-project/venus/blob/master/venus-shared/api/chain/v0/method.md"],
                            ['gateway-api-v1.md', 'Gateway api v1', "https://github.com/filecoin-project/venus/blob/master/venus-shared/api/gateway/v1/method.md"],
                            ['gateway-api-v0.md', 'Gateway api v0', "https://github.com/filecoin-project/venus/blob/master/venus-shared/api/gateway/v0/method.md"],
                            ['messager-api.md', 'Messager api', "https://github.com/filecoin-project/venus/blob/master/venus-shared/api/messager/method.md"],
                            ['wallet-api.md', 'Wallet api', "https://github.com/filecoin-project/venus/blob/master/venus-shared/api/wallet/method.md"]
                        ]
                    },
                    ],
                    '/zh/about/': [{
                        title: '',
                        collapsable: false,
                        children: [
                            ['', '关于我们'],
                        ]
                    },
                    ]
                }
            }
        }
    }
}
