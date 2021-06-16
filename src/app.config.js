export default {
  pages: [
    'pages/index/index',
    'pages/detail/index',
    'pages/study/index',
    'pages/report/index',
    'pages/my/index',
    'pages/auth/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#FFFBEB',
    navigationBarTitleText: '简单识字卡',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#000',
    selectedColor: '#78350F',
    backgroundColor: '#FDE68A',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '识字卡',
        iconPath: 'assets/img/tabbar/home.png',
        selectedIconPath: 'assets/img/tabbar/home-on.png'
      },
      {
        pagePath: 'pages/report/index',
        text: '学习报告',
        iconPath: 'assets/img/tabbar/report.png',
        selectedIconPath: 'assets/img/tabbar/report-on.png'
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        iconPath: 'assets/img/tabbar/my.png',
        selectedIconPath: 'assets/img/tabbar/my-on.png'
      }
    ]
  }
}
