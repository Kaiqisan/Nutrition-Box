export default {
    pages: [
        'pages/packDetails/index',
        'pages/main/index',
        'pages/confirmPage/index',
        'pages/mine/index',
        'pages/shoppingCart/index',
        'pages/production/index',
        'pages/report/index',
    ],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
    },
    tabBar: {
        color: "#858585",
        selectedColor: "#000000",
        backgroundColor: "#ffffff",
        list: [
            {
                pagePath: "pages/main/index",
                text: "首页",
                iconPath: "./assets/images/home.png",
                selectedIconPath: "./assets/images/home.png"
            },
            {
                pagePath: "pages/report/index",
                text: "报告",
                iconPath: "./assets/images/home.png",
                selectedIconPath: "./assets/images/home.png"
            },
            {
                pagePath: "pages/production/index",
                text: "产品",
                iconPath: "./assets/images/home.png",
                selectedIconPath: "./assets/images/home.png"
            },
            {
                pagePath: "pages/shoppingCart/index",
                text: "购物车",
                iconPath: "./assets/images/home.png",
                selectedIconPath: "./assets/images/home.png"
            },
            {
                pagePath: "pages/mine/index",
                text: "我的",
                iconPath: "./assets/images/home.png",
                selectedIconPath: "./assets/images/home.png"
            },
        ]
    }
}
