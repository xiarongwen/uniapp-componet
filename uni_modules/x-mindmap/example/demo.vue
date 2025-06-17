<template>
  <view class="demo-container">
    <view class="demo-header">
      <text class="demo-title">X-Mindmap 思维导图插件示例</text>
    </view>
    
    <!-- 基础示例 -->
    <view class="demo-section">
      <text class="section-title">基础示例</text>
      <x-mindmap 
        :data="basicData" 
        :height="400"
        @ready="onReady"
        @error="onError"
      />
    </view>
    
    <!-- 带工具栏示例 -->
    <view class="demo-section">
      <text class="section-title">带工具栏示例</text>
      <x-mindmap 
        :data="advancedData" 
        :height="450"
        :show-toolbar="true"
        theme="colorful"
        @node-click="onNodeClick"
        @zoom-in="onZoomIn"
        @zoom-out="onZoomOut"
      />
    </view>
    
    <!-- 暗色主题示例 -->
    <view class="demo-section">
      <text class="section-title">暗色主题示例</text>
      <x-mindmap 
        :data="darkThemeData" 
        :height="400"
        theme="dark"
        :show-toolbar="true"
        :colors="darkColors"
      />
    </view>
    
    <!-- 自定义配置示例 -->
    <view class="demo-section">
      <text class="section-title">自定义配置示例</text>
      <x-mindmap 
        :data="customData" 
        :height="500"
        :show-toolbar="true"
        theme="minimal"
        :duration="800"
        :max-width="250"
        :spacing="customSpacing"
        :font="customFont"
        :custom-style="customStyle"
      />
    </view>
    
    <!-- 控制按钮 -->
    <view class="demo-controls">
      <button @click="changeData" class="control-btn">切换数据</button>
      <button @click="changeTheme" class="control-btn">切换主题</button>
      <button @click="toggleToolbar" class="control-btn">切换工具栏</button>
    </view>
  </view>
</template>

<script>
import XMindmap from '../components/x-mindmap/x-mindmap.vue'

export default {
  name: 'MindmapDemo',
  components: {
    XMindmap
  },
  data() {
    return {
      currentTheme: 'default',
      showToolbar: false,
      
      // 基础数据
      basicData: `# 思维导图示例

## 学习计划
- 前端技术
  - Vue.js
  - React
  - Angular
- 后端技术
  - Node.js
  - Python
  - Java
- 数据库
  - MySQL
  - MongoDB
  - Redis`,

      // 高级数据
      advancedData: `# 项目管理

## 需求分析
- 用户调研
  - 问卷调查
  - 用户访谈
  - 竞品分析
- 需求整理
  - 功能需求
  - 非功能需求
  - 约束条件

## 设计阶段
- UI设计
  - 原型设计
  - 视觉设计
  - 交互设计
- 技术设计
  - 架构设计
  - 数据库设计
  - API设计

## 开发阶段
- 前端开发
- 后端开发
- 测试
- 部署`,

      // 暗色主题数据
      darkThemeData: `# 技术栈

## 前端
- 框架
  - Vue 3
  - React 18
  - Angular 15
- 工具
  - Webpack
  - Vite
  - Rollup

## 后端
- 语言
  - JavaScript
  - TypeScript
  - Python
- 框架
  - Express
  - Koa
  - FastAPI`,

      // 自定义数据
      customData: `# 知识体系

## 计算机基础
- 数据结构
  - 数组
  - 链表
  - 树
  - 图
- 算法
  - 排序
  - 搜索
  - 动态规划

## 编程语言
- JavaScript
- Python
- Java
- Go`,

      // 暗色主题颜色
      darkColors: [
        '#64b5f6', '#81c784', '#ffb74d', '#f06292',
        '#ba68c8', '#4db6ac', '#ffd54f', '#ff8a65'
      ],
      
      // 自定义间距
      customSpacing: {
        horizontal: 100,
        vertical: 8,
        paddingX: 12,
      },
      
      // 自定义字体
      customFont: {
        family: 'Arial, sans-serif',
        baseSize: 16,
        maxSize: 24,
        minSize: 14,
      },
      
      // 自定义样式
      customStyle: {
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
      },
      
      themes: ['default', 'dark', 'colorful', 'minimal'],
      currentThemeIndex: 0,
    }
  },
  methods: {
    onReady(markmap) {
      console.log('Mindmap ready:', markmap);
      uni.showToast({
        title: '思维导图加载完成',
        icon: 'success'
      });
    },
    
    onError(error) {
      console.error('Mindmap error:', error);
      uni.showToast({
        title: '思维导图加载失败',
        icon: 'error'
      });
    },
    
    onNodeClick(node) {
      console.log('Node clicked:', node);
      uni.showToast({
        title: `点击了节点: ${node.content}`,
        icon: 'none'
      });
    },
    
    onZoomIn() {
      console.log('Zoom in');
    },
    
    onZoomOut() {
      console.log('Zoom out');
    },
    
    changeData() {
      const newData = `# 新的思维导图

## 随机内容 ${Math.floor(Math.random() * 100)}
- 项目 A
  - 任务 1
  - 任务 2
- 项目 B
  - 任务 3
  - 任务 4`;
      
      this.basicData = newData;
      uni.showToast({
        title: '数据已更新',
        icon: 'success'
      });
    },
    
    changeTheme() {
      this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
      this.currentTheme = this.themes[this.currentThemeIndex];
      uni.showToast({
        title: `切换到${this.currentTheme}主题`,
        icon: 'none'
      });
    },
    
    toggleToolbar() {
      this.showToolbar = !this.showToolbar;
      uni.showToast({
        title: this.showToolbar ? '显示工具栏' : '隐藏工具栏',
        icon: 'none'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-container {
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
}

.demo-header {
  text-align: center;
  margin-bottom: 30px;
  
  .demo-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
}

.demo-section {
  margin-bottom: 40px;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  .section-title {
    display: block;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
  }
}

.demo-controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
  
  .control-btn {
    padding: 12px 24px;
    background: #007aff;
    color: #fff;
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
  .demo-container {
    padding: 15px;
  }
  
  .demo-section {
    padding: 15px;
    margin-bottom: 25px;
  }
  
  .demo-controls {
    flex-direction: column;
    align-items: center;
    
    .control-btn {
      width: 200px;
    }
  }
}
</style>
