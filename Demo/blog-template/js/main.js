// 鼠标跟踪效果
window.addEventListener("mousemove", function(e) {
    document.querySelectorAll(".magical").forEach(element => {
        if (!element.querySelector(".show")) {
            element.insertAdjacentHTML("beforeend", "<div class='show'></div>");
        }
        const rect = element.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        element.style.setProperty("--mouse-x", `${offsetX}px`);
        element.style.setProperty("--mouse-y", `${offsetY}px`);

        const hoverElement = element.querySelector(".show");
        if (hoverElement) {
            hoverElement.style.opacity = (offsetX >= 0 && offsetX <= element.clientWidth && offsetY >= 0 && offsetY <= element.clientHeight) ? 1 : 0;
        }
    });
});

// 获取一言内容 - 尝试连接API，失败则使用本地句子库
function fetchHitokoto() {
    // 本地句子库（作为备份）
    const backupQuotes = [
        "生活就像海洋，只有意志坚强的人才能到达彼岸。",
        "千里之行，始于足下。",
        "书籍是人类进步的阶梯。",
        "生命不是要超越别人，而是要超越自己。",
        "成功的秘诀在于对目标的执着追求。",
        "时间就像海绵里的水，只要愿挤，总还是有的。",
        "天生我材必有用。",
        "每一个不曾起舞的日子，都是对生命的辜负。",
        "路漫漫其修远兮，吾将上下而求索。",
        "人生如逆旅，我亦是行人。",
        "我们都在阴沟里，但仍有人仰望星空。",
        "世界以痛吻我，我却报之以歌。",
        "长风破浪会有时，直挂云帆济沧海。",
        "少年易学老难成，一寸光阴不可轻。",
        "山重水复疑无路，柳暗花明又一村。",
        "纸上得来终觉浅，绝知此事要躬行。",
        "问渠那得清如许？为有源头活水来。",
        "横看成岭侧成峰，远近高低各不同。",
        "欲穷千里目，更上一层楼。",
        "会当凌绝顶，一览众山小。"
    ];

    // 使用本地句子的函数
    function useBackupQuote() {
        const hitokoto = document.querySelector('#hitokoto_text');
        if (hitokoto) {
            const randomQuote = backupQuotes[Math.floor(Math.random() * backupQuotes.length)];
            hitokoto.href = '#';
            hitokoto.innerText = randomQuote;
        }
    }

    // 尝试连接一言API
    try {
        // 注意：如果您已经部署了自己的一言API实例，请将下面的URL改为您的实例地址
        const apiUrl = 'https://v1.hitokoto.cn/';
        
        fetch(apiUrl, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json'
            },
            timeout: 5000 // 5秒超时
        })
        .then(response => {
            if (!response.ok) throw new Error('HTTP error ' + response.status);
            return response.json();
        })
        .then(data => {
            const hitokoto = document.querySelector('#hitokoto_text');
            if (hitokoto && data && data.hitokoto) {
                hitokoto.href = data.from_who ? `https://hitokoto.cn/?uuid=${data.uuid}` : '#';
                hitokoto.innerText = data.hitokoto;
                console.log('成功获取一言API数据');
            } else {
                console.log('API返回数据格式异常，使用本地句子');
                useBackupQuote();
            }
        })
        .catch(error => {
            console.log('获取一言API失败，使用本地句子:', error);
            useBackupQuote();
        });
    } catch (e) {
        console.log('连接一言API时发生异常，使用本地句子:', e);
        useBackupQuote();
    }
}

// 页面加载完成后获取一言
document.addEventListener('DOMContentLoaded', function() {
    fetchHitokoto();

    // 每隔30秒自动刷新一言（可选）
    setInterval(fetchHitokoto, 30000);
});

// 移动端菜单
const menuExpand = document.getElementById("menu-expand");
const menuExpandChild = document.getElementById("menu-expand-child");
const menuPanel = document.getElementById("menu-panel");
let isMenuOpen = false;

if (menuExpand && menuPanel) {
    menuExpand.addEventListener("click", function(event) {
        event.stopPropagation();

        if (!isMenuOpen) {
            menuPanel.style.left = "40px";
            menuPanel.style.transition = "left .5s";
        } else {
            menuPanel.style.left = "100vw";
            menuPanel.style.transition = "left .5s";
        }
        isMenuOpen = !isMenuOpen;

        menuExpand.classList.toggle("active");

        // 添加旋转动画
        if (menuExpandChild && menuExpandChild.children && menuExpandChild.children[0]) {
            menuExpandChild.children[0].style.transition = "transform .5s";
            menuExpandChild.children[0].style.transform = isMenuOpen ? "rotate(45deg)" : "rotate(0deg)";
        }

        // 防止在动画期间再次点击
        menuExpand.style.pointerEvents = "none";

        // 监听动画结束事件
        menuPanel.addEventListener("transitionend", function() {
            menuExpand.style.pointerEvents = "auto";
            menuPanel.style.transition = "none";
        }, { once: true });
    });

    // 点击文档其他部分来关闭菜单
    document.addEventListener("click", function(event) {
        if (isMenuOpen && event.target !== menuExpand && !menuPanel.contains(event.target)) {
            menuPanel.style.left = "100vw";
            menuPanel.style.transition = "left .5s";
            isMenuOpen = false;
            menuExpand.classList.remove("active");

            // 添加反向旋转动画
            if (menuExpandChild && menuExpandChild.children && menuExpandChild.children[0]) {
                menuExpandChild.children[0].style.transition = "transform .5s";
                menuExpandChild.children[0].style.transform = "rotate(0deg)";
            }
        }
    });
}