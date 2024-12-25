// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单控制
    const menuBtn = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 移动端菜单切换
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

    // 页面切换逻辑
    function switchPage(hash) {
        // 移除所有 section 的 active 类
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // 移除所有导航链接的 active 类
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // 激活对应的 section
        const targetSection = document.querySelector(hash) || document.querySelector('#home');
        targetSection.classList.add('active');

        // 激活对应的导航链接
        const targetLink = document.querySelector(`a[href="${hash}"]`);
        if (targetLink) {
            targetLink.classList.add('active');
        }

        // 关闭移动端菜单
        mobileMenu.classList.remove('active');
    }

    // 监听 hash 变化
    window.addEventListener('hashchange', () => {
        switchPage(window.location.hash || '#home');
    });

    // 初始页面加载时处理
    switchPage(window.location.hash || '#home');

    // 轮播图逻辑
    const carousel = {
        container: document.querySelector('.carousel-container'),
        items: document.querySelectorAll('.carousel-item'),
        prevBtn: document.querySelector('.carousel-prev'),
        nextBtn: document.querySelector('.carousel-next'),
        indicators: document.querySelector('.carousel-indicators'),
        currentIndex: 0,
        interval: null
    };

    // 初始化轮播图
    function initCarousel() {
        if (carousel.items.length === 0) return;

        // 创建指示器
        carousel.items.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-indicator');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            carousel.indicators.appendChild(dot);
        });

        // 启动自动轮播
        startCarousel();

        // 鼠标悬停时暂停轮播
        carousel.container.addEventListener('mouseenter', stopCarousel);
        carousel.container.addEventListener('mouseleave', startCarousel);

        // 添加按钮事件
        carousel.prevBtn.addEventListener('click', prevSlide);
        carousel.nextBtn.addEventListener('click', nextSlide);
    }

    function goToSlide(index) {
        // 移除当前活动项
        carousel.items[carousel.currentIndex].classList.remove('active');
        carousel.indicators.children[carousel.currentIndex].classList.remove('active');

        // 激活新项
        carousel.currentIndex = index;
        carousel.items[carousel.currentIndex].classList.add('active');
        carousel.indicators.children[carousel.currentIndex].classList.add('active');
    }

    function nextSlide() {
        const newIndex = (carousel.currentIndex + 1) % carousel.items.length;
        goToSlide(newIndex);
    }

    function prevSlide() {
        const newIndex = (carousel.currentIndex - 1 + carousel.items.length) % carousel.items.length;
        goToSlide(newIndex);
    }

    function startCarousel() {
        if (carousel.interval) return;
        carousel.interval = setInterval(nextSlide, 3000);
    }

    function stopCarousel() {
        if (carousel.interval) {
            clearInterval(carousel.interval);
            carousel.interval = null;
        }
    }

    // 初始化轮播图
    initCarousel();

    // 动态加载内容
    function loadContent() {
        // 示例数据
        const tools = [
            {
                title: 'VS Code',
                description: '强大的代码编辑器，支持多种编程语言和丰富的插件生态。',
                icon: 'fa-code'
            },
            // 添加更多工具...
        ];

        const links = [
            {
                category: '学习资源',
                items: [
                    { title: 'MDN Web Docs', url: 'https://developer.mozilla.org', icon: 'fa-book' },
                    // 添加更多链接...
                ]
            },
            // 添加更多分类...
        ];

        // 渲染工具卡片
        const toolsGrid = document.querySelector('.tools-grid');
        if (toolsGrid) {
            tools.forEach(tool => {
                toolsGrid.innerHTML += `
                    <div class="tool-card">
                        <i class="fas ${tool.icon}"></i>
                        <h3>${tool.title}</h3>
                        <p>${tool.description}</p>
                    </div>
                `;
            });
        }

        // 渲染链接列表
        const linksContainer = document.querySelector('.links-container');
        if (linksContainer) {
            links.forEach(category => {
                linksContainer.innerHTML += `
                    <div class="link-category">
                        <h3>${category.category}</h3>
                        <ul class="link-list">
                            ${category.items.map(item => `
                                <li>
                                    <a href="${item.url}" target="_blank">
                                        <i class="fas ${item.icon}"></i>
                                        ${item.title}
                                    </a>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            });
        }
    }

    // 加载页面内容
    loadContent();
	// 工具数据
const toolsData = [
    {
        title: 'ChatGPT',
        description: '强大的AI语言模型，可用于对话、写作、编程等多种场景。',
        icon: 'fa-robot',
        link: 'https://chat.openai.com'
    },
    {
        title: 'VS Code',
        description: '功能丰富的代码编辑器，支持多种编程语言和插件扩展。',
        icon: 'fa-code',
        link: 'https://code.visualstudio.com'
    },
    {
        title: 'Jupyter Notebook',
        description: '交互式编程环境，特别适合数据分析和机器学习项目。',
        icon: 'fa-book-open',
        link: 'https://jupyter.org'
    },
    {
        title: 'Git',
        description: '版本控制工具，帮助管理代码版本和团队协作。',
        icon: 'fa-code-branch',
        link: 'https://git-scm.com'
    },
    {
        title: 'Docker',
        description: '容器化平台，简化应用程序的部署和运行环境配置。',
        icon: 'fa-docker',
        link: 'https://www.docker.com'
    },
    {
        title: 'Postman',
        description: 'API开发和测试工具，方便进行接口调试。',
        icon: 'fa-paper-plane',
        link: 'https://www.postman.com'
    }
];

// 渲染工具卡片
function renderTools() {
    const toolsGrid = document.querySelector('.tools-grid');
    if (!toolsGrid) return;

    toolsGrid.innerHTML = toolsData.map(tool => `
        <div class="tool-card">
            <div class="tool-icon">
                <i class="fas ${tool.icon}"></i>
            </div>
            <h3>${tool.title}</h3>
            <p>${tool.description}</p>
            <a href="${tool.link}" target="_blank" class="tool-link">
                了解更多 <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `).join('');
}

// 在页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    renderTools();
});

  // 初始化图表
function initializeCharts() {
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
}

// 页面加载完成后初始化图表
document.addEventListener('DOMContentLoaded', initializeCharts);
    // 当切换到数据可视化页面时初始化图表
    function initChartsOnVisibilityChange() {
        const visualizationSection = document.querySelector('#visualization');
        if (visualizationSection && visualizationSection.classList.contains('active')) {
            initializeCharts();
        }
    }

    // 监听页面切换
    window.addEventListener('hashchange', initChartsOnVisibilityChange);
    
    // 初始检查
    initChartsOnVisibilityChange();
}); // JavaScript Document
        const tools = [
            {
                title: 'VS Code',
                description: '强大的代码编辑器，支持多种编程语言和丰富的插件生态。',
                icon: 'fa-code'
            },
            // 添加更多工具...
        ];

        const links = [
            {
                category: '学习资源',
                items: [
                    { title: 'MDN Web Docs', url: 'https://developer.mozilla.org', icon: 'fa-book' },
                    // 添加更多链接...
                ]
            },
            // 添加更多分类...
        ];

        // 渲染工具卡片
        const toolsGrid = document.querySelector('.tools-grid');
        if (toolsGrid) {
            tools.forEach(tool => {
                toolsGrid.innerHTML += `
                    <div class="tool-card">
                        <i class="fas ${tool.icon}"></i>
                        <h3>${tool.title}</h3>
                        <p>${tool.description}</p>
                    </div>
                `;
            });
        }

        // 渲染链接列表
        const linksContainer = document.querySelector('.links-container');
        if (linksContainer) {
            links.forEach(category => {
                linksContainer.innerHTML += `
                    <div class="link-category">
                        <h3>${category.category}</h3>
                        <ul class="link-list">
                            ${category.items.map(item => `
                                <li>
                                    <a href="${item.url}" target="_blank">
                                        <i class="fas ${item.icon}"></i>
                                        ${item.title}
                                    </a>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            });
        }
