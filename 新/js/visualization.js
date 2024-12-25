document.addEventListener('DOMContentLoaded', function() {
    // 技能掌握度雷达图
    const skillsChart = echarts.init(document.getElementById('skillsChart'));
    const skillsOption = {
        title: {
            text: '技能掌握程度',
            left: 'center'
        },
        tooltip: {},
        legend: {
            data: ['当前水平', '目标水平'],
            bottom: 0
        },
        radar: {
            indicator: [
                { name: '视频拍摄', max: 100 },
                { name: '视频剪辑', max: 100 },
                { name: '文案编辑', max: 100 },
                { name: '新闻摄影', max: 100 },
                { name: '全媒体运营', max: 100 }
            ]
        },
        series: [{
            name: '技能水平',
            type: 'radar',
            data: [
                {
                    value: [90, 85, 80, 85, 75],
                    name: '当前水平',
                    areaStyle: {
                        color: 'rgba(37, 99, 235, 0.2)'
                    }
                },
                {
                    value: [95, 90, 90, 90, 85],
                    name: '目标水平',
                    areaStyle: {
                        color: 'rgba(5, 150, 105, 0.2)'
                    }
                }
            ]
        }]
    };
    skillsChart.setOption(skillsOption);

    // 学习时间分布图
    const timeChart = echarts.init(document.getElementById('timeChart'));
    const timeOption = {
        title: {
            text: '月度学习时间分布',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['理论学习', '实践操作', '项目实战'],
            bottom: 0
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
            type: 'value',
            name: '小时'
        },
        series: [
            {
                name: '理论学习',
                type: 'bar',
                stack: 'total',
                data: [20, 25, 30, 35, 40, 45]
            },
            {
                name: '实践操作',
                type: 'bar',
                stack: 'total',
                data: [30, 35, 40, 45, 50, 55]
            },
            {
                name: '项目实战',
                type: 'bar',
                stack: 'total',
                data: [25, 30, 35, 40, 45, 50]
            }
        ]
    };
    timeChart.setOption(timeOption);

    // 响应式处理
    window.addEventListener('resize', function() {
        skillsChart.resize();
        timeChart.resize();
    });
});// JavaScript Document

document.addEventListener('DOMContentLoaded', function() {
    // 处理侧边栏导航
    const sideNavLinks = document.querySelectorAll('.side-nav-link');
    const sections = document.querySelectorAll('.content-section');

    // 点击侧边栏链接时的处理
    sideNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 移除所有活动状态
            sideNavLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // 添加新的活动状态
            link.classList.add('active');
            const targetId = link.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');
        });
    });
});