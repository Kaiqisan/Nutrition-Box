export default {
    pages: [
        'pages/testPage/index',
        'pages/main/index',
        'pages/production/index',
        'pages/packDetails/index',
        'pages/confirmPage/index',
        'pages/allProduction/index',
        'pages/mine/index',
        'pages/shoppingCart/index',
        'pages/report/index',
        'pages/paymentPage/index',
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
                selectedIconPath: "./assets/images/home-a.png"
            },
            {
                pagePath: "pages/report/index",
                text: "报告",
                iconPath: "./assets/images/report.png",
                selectedIconPath: "./assets/images/report-a.png"
            },
            {
                pagePath: "pages/production/index",
                text: "产品",
                iconPath: "./assets/images/production.png",
                selectedIconPath: "./assets/images/production-a.png"
            },
            {
                pagePath: "pages/shoppingCart/index",
                text: "购物车",
                iconPath: "./assets/images/shoppingCart.png",
                selectedIconPath: "./assets/images/shoppingCart-a.png"
            },
            {
                pagePath: "pages/mine/index",
                text: "我的",
                iconPath: "./assets/images/mine.png",
                selectedIconPath: "./assets/images/mine-a.png"
            },
        ]
    }
}
