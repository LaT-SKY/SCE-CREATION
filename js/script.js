function toggleTheme() {
    document.documentElement.classList.toggle('light');
    document.documentElement.classList.toggle('dark'); // 假设有 dark.css
}

function controlcard(id , id2) {
    const obj = document.getElementById(id);
    const obj2 = document.getElementById(id2);
    obj.classList.add('card-animation'); // 确保应用动画样式
    
    if (obj.classList.contains('hide')) {
        // 显示动画
        obj.style.display = 'grid';
        // 强制重绘确保动画生效
        void obj.offsetWidth; 
        obj.classList.remove('hide');
    } else {
        // 隐藏动画
        obj.classList.add('hide');
        // 动画结束后隐藏元素
        setTimeout(() => {
            obj.style.display = 'none';
        }, 300); // 匹配过渡时间 0.3s
    }
    // 如果id2的src是hide.svg则替换为show.svg，否则替换为hide.svg
    if (obj2.src.includes('hide.svg')) {
        obj2.src = 'assets/svg/show.svg';
    } else {
        obj2.src = 'assets/svg/hide.svg';
    }
}

function clearinput(inputId) {
    const targetInput = document.getElementById(inputId);
    if (!targetInput) {
        return;
    }
    targetInput.value = "";
}

function cleargroup(ids) {
    ids.forEach(id => clearinput(id));
}

function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    
    if (!btn) return;
    
    // 点击事件
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
document.addEventListener('DOMContentLoaded', initBackToTop);

function showdog(dialogId) { // 修正1：规范函数命名和参数语义化
    // 获取元素时使用参数传递的ID
    const moreBtn = document.getElementById('more');
    const dogDialog = document.getElementById(dialogId); // 修正2：使用参数变量而非字符串'id'
    
    // 修正3：添加元素存在性校验
    if (!moreBtn || !dogDialog) {
        console.error('未找到指定元素，请检查以下ID是否存在：', {
            buttonId: 'more',
            dialogId: dialogId
        });
        return;
    }
    
    // 修正4：确保dialog元素支持showModal方法
    if (typeof dogDialog.showModal !== 'function') {
        console.error('目标元素不支持showModal方法，请使用<dialog>元素');
        return;
    }
    
    // 修正5：避免重复绑定事件
    moreBtn.removeEventListener('click', handleClick); // 先移除旧监听器
    moreBtn.addEventListener('click', handleClick);
    
    function handleClick() {
        // 增加打开动画
        dogDialog.classList.add('opening');
        dogDialog.showModal();
        
        // 动画结束后移除临时class
        setTimeout(() => {
            dogDialog.classList.remove('opening');
        }, 300);
    }
}