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

    // 在 loadContent 函数后添加数据可视化相关代码
    function initializeCharts() {
        // 学习时长统计图表
        const learningChart = document.getElementById('learningChart');
        if (learningChart) {
            new Chart(learningChart, {
                type: 'line',
                data: {
                    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
                    datasets: [{
                        label: '学习时长（小时）',
                        data: [30, 45, 60, 70, 85, 90],
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: '每月学习时长统计'
                        },
                        legend: {
                            position: 'bottom'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: '小时'
                            }
                        }
                    }
                }
            });
        }

        // 技能分布饼图
        const skillsChart = document.getElementById('skillsChart');
        if (skillsChart) {
            new Chart(skillsChart, {
                type: 'doughnut',
                data: {
                    labels: ['前端开发', '后端开发', 'AI/机器学习', '数据分析', '项目管理'],
                    datasets: [{
                        data: [35, 25, 20, 15, 5],
                        backgroundColor: [
                            '#2563eb',
                            '#7c3aed',
                            '#db2777',
                            '#059669',
                            '#d97706'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: '技能分布'
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }

        // 项目完成情况柱状图
        const projectsChart = document.getElementById('projectsChart');
        if (projectsChart) {
            new Chart(projectsChart, {
                type: 'bar',
                data: {
                    labels: ['Web开发', 'AI项目', '数据分析', '工具开发'],
                    datasets: [{
                        label: '已完成',
                        data: [8, 5, 4, 3],
                        backgroundColor: '#2563eb'
                    }, {
                        label: '进行中',
                        data: [3, 2, 1, 2],
                        backgroundColor: '#059669'
                    }, {
                        label: '计划中',
                        data: [2, 3, 2, 1],
                        backgroundColor: '#d97706'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: '项目完成情况'
                        },
                        legend: {
                            position: 'bottom'
                        }
                    },
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true,
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: '项目数量'
                            }
                        }
                    }
                }
            });
        }

        // 技能成长雷达图
        const growthChart = document.getElementById('growthChart');
        if (growthChart) {
            new Chart(growthChart, {
                type: 'radar',
                data: {
                    labels: [
                        '编程技能',
                        '问题解决',
                        '团队协作',
                        '学习能力',
                        '创新思维',
                        '项目管理'
                    ],
                    datasets: [{
                        label: '2023年初',
                        data: [65, 70, 60, 75, 55, 50],
                        backgroundColor: 'rgba(37, 99, 235, 0.2)',
                        borderColor: '#2563eb',
                        pointBackgroundColor: '#2563eb'
                    }, {
                        label: '2024年初',
                        data: [85, 85, 75, 90, 70, 65],
                        backgroundColor: 'rgba(5, 150, 105, 0.2)',
                        borderColor: '#059669',
                        pointBackgroundColor: '#059669'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: '技能成长对比'
                        },
                        legend: {
                            position: 'bottom'
                        }
                    },
                    scales: {
                        r: {
                            min: 0,
                            max: 100,
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

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
});  