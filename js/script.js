// 修改后的createShapes函数
function createShapes() {
    const container = document.getElementById('bg-shapes');
    const shapes = Array.from(container.children);
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
  
    // 第一阶段：旧形状退出动画
    shapes.forEach(shape => {
      const exitX = (Math.random() - 0.5) * screenWidth * 0.8;
      const exitY = (Math.random() - 0.5) * screenHeight * 0.8;
      
      shape.style.setProperty('--exit-x', `${exitX}px`);
      shape.style.setProperty('--exit-y', `${exitY}px`);
      shape.style.animation = 'shapeExit 0.8s ease-out forwards';
    });
  
    // 第二阶段：延迟创建新形状
    setTimeout(() => {
        container.innerHTML = '';
        
        for(let i = 0; i < 20; i++) {
          const shape = document.createElement('div');
          shape.className = 'shape';
          const styles = getRandomShapeStyle();
          
          // 使用正确的方式设置属性
          Object.entries(styles).forEach(([key, value]) => {
            if (key.startsWith('--')) {
              shape.style.setProperty(key, value);
            } else {
              shape.style[key] = value;
            }
          });
      
          // 初始状态
          shape.style.opacity = '0';
          shape.style.animation = 'shapeEnter 0.6s ease forwards';
          shape.style.animationDelay = `${i * 0.05}s`;
          
          container.appendChild(shape);
        }
      }, 400);
      

}


//随机样式生成
function getRandomShapeStyle() {
    const size = 50 + Math.random() * 150;
    const borderRadius = `${Math.random() * 50}%`;
    const rotation = Math.random() * 360;
    
    const floatDistanceX = 50 + Math.random() * 120;
    const floatDistanceY = 30 + Math.random() * 90;
    const floatDuration = 15 + Math.random() * 15;

    return {
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: borderRadius,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        background: `hsla(${200 + Math.random() * 160}, 70%, 60%, 0.1)`,
        transform: `rotate(${rotation}deg)`,
        animation: `float ${floatDuration}s infinite linear, shapeEnter 0.6s ease forwards`,
        animationDelay: `${Math.random() * 20}s`,
        '--float-x': `${floatDistanceX}px`,
        '--float-y': `${floatDistanceY}px`,
        '--float-rotation': 90 + Math.random() * 270
    };
}


  // 初始化形状
  window.addEventListener('load', () => {
    createShapes();
    
    // 点击任意按钮时重置形状
    document.addEventListener('click', (e) => {
      if (e.target.closest('.action-card, #SCE-Logo')) {
        createShapes();
      }
    });
  });
  
window.addEventListener('load', function() {
    const loading = document.querySelector('.loading');
    const start = document.querySelector('.start');

    loading.classList.add('hidden');
    
    loading.addEventListener('transitionend', function() {
        this.remove();
        
        // 同时激活两个元素的可见状态
        start.style.display = 'block';
        
        // 强制重绘
        void start.offsetWidth;
        
        // 添加可见类
        start.classList.add('visible');
        
        // 补偿布局偏移
        setTimeout(() => {
            document.body.style.paddingBottom = '60px';
        }, 800); // 匹配动画持续时间
    }, { once: true });
});

// 在文件底部添加以下代码
function initModal() {
    const modal = document.querySelector('.about-modal');
    const logo = document.getElementById('SCE-Logo');
    const closeBtn = document.querySelector('.close-btn');

    // 显示弹窗
    function showModal() {
        modal.style.display = 'flex';
        setTimeout(() => modal.style.opacity = 1, 10);
    }

    // 隐藏弹窗
    function hideModal() {
      const modalContent = document.querySelector('.modal-content');
      modalContent.style.animation = 'modalExit 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards';
      
      setTimeout(() => {
          modal.style.display = 'none';
          modalContent.style.animation = ''; // 重置动画
      }, 300);
  }
    // 事件绑定
    logo.addEventListener('click', showModal);
    closeBtn.addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => {
        if(e.target === modal) hideModal();
    });
}

// 在window load事件中初始化
window.addEventListener('load', () => {
    initModal();
    // 其他原有初始化代码...
});