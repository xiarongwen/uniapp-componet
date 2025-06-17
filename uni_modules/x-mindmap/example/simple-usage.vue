<template>
  <view class="page">
    <view class="header">
      <text class="title">X-Mindmap 简单使用示例</text>
      <text class="subtitle">修复后的稳定版本</text>
    </view>
    
    <!-- 基础使用 -->
    <view class="section">
      <text class="section-title">基础使用</text>
      <x-mindmap 
        :data="basicData" 
        :height="300"
      />
    </view>
    
    <!-- 带配置的使用 -->
    <view class="section">
      <text class="section-title">自定义配置</text>
      <x-mindmap 
        :data="customData" 
        :height="350"
        theme="dark"
        :show-toolbar="true"
        :colors="customColors"
        :spacing="customSpacing"
        @ready="onReady"
        @error="onError"
      />
    </view>
    
    <!-- 控制按钮 -->
    <view class="controls">
      <button @click="updateData" class="btn">更新数据</button>
      <button @click="toggleTheme" class="btn">切换主题</button>
    </view>
  </view>
</template>

<script>
import XMindmap from '../components/x-mindmap/x-mindmap.vue'

export default {
  name: 'SimpleUsage',
  components: {
    XMindmap
  },
  data() {
    return {
      currentTheme: 'default',
      
      basicData: `# 基础示例

## 学习路径
- 前端开发
  - HTML/CSS
  - JavaScript
  - Vue.js
- 后端开发
  - Node.js
  - 数据库
  - API 设计`,

      customData: `# 项目规划

## 第一阶段
- 需求分析
  - 用户调研
  - 功能定义
  - 技术选型
- 原型设计
  - 界面设计
  - 交互设计
  - 用户体验

## 第二阶段
- 开发实现
  - 前端开发
  - 后端开发
  - 数据库设计
- 测试验证
  - 单元测试
  - 集成测试
  - 用户测试`,

      customColors: [
        '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4',
        '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f'
      ],
      
      customSpacing: {
        horizontal: 90,
        vertical: 6,
        paddingX: 10,
      }
    }
  },
  methods: {
    onReady(markmap) {
      console.log('思维导图加载完成:', markmap);
      uni.showToast({
        title: '加载成功',
        icon: 'success'
      });
    },
    
    onError(error) {
      console.error('思维导图加载失败:', error);
      uni.showToast({
        title: '加载失败',
        icon: 'error'
      });
    },
    
    updateData() {
      const timestamp = new Date().getTime();
      this.basicData = `# 更新示例 ${timestamp}

## 动态内容
- 时间戳: ${timestamp}
- 随机数: ${Math.floor(Math.random() * 100)}

## 功能验证
- 数据更新 ✅
- 重新渲染 ✅
- 配置保持 ✅`;
      
      uni.showToast({
        title: '数据已更新',
        icon: 'success'
      });
    },
    
    toggleTheme() {
      this.currentTheme = this.currentTheme === 'default' ? 'dark' : 'default';
      uni.showToast({
        title: `切换到${this.currentTheme}主题`,
        icon: 'none'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  
  .title {
    display: block;
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
  }
  
  .subtitle {
    display: block;
    font-size: 14px;
    color: #666;
  }
}

.section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  .section-title {
    display: block;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
  }
}

.controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  
  .btn {
    padding: 12px 24px;
    background: #007aff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.2s;
    
    &:hover {
      background: #0056cc;
    }
    
    &:active {
      background: #004499;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .page {
    padding: 15px;
  }
  
  .section {
    padding: 15px;
  }
  
  .controls {
    flex-direction: column;
    align-items: center;
    
    .btn {
      width: 200px;
    }
  }
}
</style>
