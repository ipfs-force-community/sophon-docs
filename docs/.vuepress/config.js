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
                    text: 'Reference',
                    link: '/ref/'
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
                    {
                        title: 'Deployment',
                        collapsable: false,
                        children: [
                            ['deploy-a-cs.md', 'Deploy a Sophon service'],
                            ['join-a-cs.md', 'Use a Sophon service'],
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
                    '/ref/': [{
                        title: 'Sophon Components',
                        collapsable: false,
                        children: [
                            ['', 'venus daemon'],
                            ['venus-auth.md', 'venus-auth'],
                            ['venus-miner.md', 'venus-miner'],
                            ['venus-messager.md', 'venus-messager'],
                            ['venus-gateway.md', 'venus-gateway'],
                        ]
                    },
                    {
                        title: 'Optional Components',
                        collapsable: false,
                        children: [
                            ['venus-wallet-builtin.md', 'venus-wallet (builtin)'],
                            ['venus-wallet.md', 'venus-wallet (remote)'],
                        ]
                    },
                    {
                        title: 'RPC API Reference',
                        collapsable: false,
                        children: [
                            ['chain-api-v0.md', 'Chain api v0', "https://github.com/filecoin-project/venus/blob/master/venus-shared/api/chain/v0/method.md"],
                            ['chain-api-v1.md', 'Chain api v1', "https://github.com/filecoin-project/venus/blob/master/venus-shared/api/chain/v1/method.md"],
                            ['gateway-api-v0.md', 'Gateway api v0', "https://github.com/filecoin-project/venus/blob/master/venus-shared/api/gateway/v0/method.md"],
                            ['gateway-api-v1.md', 'Gateway api v1', "https://github.com/filecoin-project/venus/blob/master/venus-shared/api/gateway/v1/method.md"],
                            ['messager-api.md', 'Messager api', "https://github.com/filecoin-project/venus/blob/master/venus-shared/api/messager/method.md"],
                            ['wallet-api.md', 'Wallet api', "https://github.com/filecoin-project/venus/blob/master/venus-shared/api/wallet/method.md"]
                        ]
                    },
                    ],
                    '/about/': [{
                        title: '',
                        collapsable: false,
                        children: [
                            ['', 'About Us'],
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
                            ['venus-run-in-docker.md', '使用Docker部署智子服务'],
                            ['join-a-cs.md', '使用智子服务'],
                        ]
                    },
                    {
                        title: '智子服务组件',
                        collapsable: false,
                        children: [
                            ['venus-daemon.md', 'Venus daemon'],
                            ['venus-auth.md', 'sophon-auth', "https://github.com/ipfs-force-community/sophon-auth/blob/master/docs/zh/%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B.md"],
                            ['venus-miner.md', 'sophon-miner', "https://github.com/ipfs-force-community/sophon-miner/blob/master/docs/zh/getting-start.md"],
                            ['venus-messager.md', 'sophon-messager', "https://github.com/ipfs-force-community/sophon-messager/blob/master/docs/zh/%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B.md"],
                            ['venus-gateway.md', 'sophon-gateway', "https://github.com/ipfs-force-community/venus-gateway/blob/master/docs/zh/%E5%BF%AB%E9%80%9F%E5%90%AF%E7%94%A8.md"],
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