// X-Mindmap 配置文件
// 提供常用的配置预设，方便开发者快速使用

// 主题配置
export const themes = {
  default: {
    name: 'default',
    colors: [
      '#007aff', '#34c759', '#ff9500', '#ff3b30',
      '#af52de', '#5ac8fa', '#ffcc00', '#ff2d92'
    ],
    font: {
      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      baseSize: 14,
      maxSize: 20,
      minSize: 12,
    },
    spacing: {
      horizontal: 80,
      vertical: 5,
      paddingX: 8,
    }
  },
  
  dark: {
    name: 'dark',
    colors: [
      '#64b5f6', '#81c784', '#ffb74d', '#f06292',
      '#ba68c8', '#4db6ac', '#ffd54f', '#ff8a65'
    ],
    font: {
      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      baseSize: 14,
      maxSize: 20,
      minSize: 12,
    },
    spacing: {
      horizontal: 80,
      vertical: 5,
      paddingX: 8,
    }
  },
  
  colorful: {
    name: 'colorful',
    colors: [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4',
      '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f'
    ],
    font: {
      family: 'Arial, sans-serif',
      baseSize: 15,
      maxSize: 22,
      minSize: 13,
    },
    spacing: {
      horizontal: 90,
      vertical: 6,
      paddingX: 10,
    }
  },
  
  minimal: {
    name: 'minimal',
    colors: [
      '#666666', '#888888', '#aaaaaa', '#cccccc',
      '#999999', '#777777', '#bbbbbb', '#555555'
    ],
    font: {
      family: 'Georgia, serif',
      baseSize: 13,
      maxSize: 18,
      minSize: 11,
    },
    spacing: {
      horizontal: 70,
      vertical: 4,
      paddingX: 6,
    }
  }
};

// 预设配置
export const presets = {
  // 基础配置
  basic: {
    height: 400,
    theme: 'default',
    showToolbar: false,
    zoomable: true,
    draggable: true,
    duration: 500,
    maxWidth: 300,
    initialExpandLevel: -1,
  },
  
  // 带工具栏的配置
  withToolbar: {
    height: 450,
    theme: 'default',
    showToolbar: true,
    zoomable: true,
    draggable: true,
    duration: 500,
    maxWidth: 300,
    initialExpandLevel: -1,
  },
  
  // 演示配置
  presentation: {
    height: 600,
    theme: 'colorful',
    showToolbar: true,
    zoomable: true,
    draggable: true,
    duration: 800,
    maxWidth: 350,
    initialExpandLevel: 2,
  },
  
  // 移动端配置
  mobile: {
    height: 350,
    theme: 'default',
    showToolbar: false,
    zoomable: true,
    draggable: true,
    duration: 300,
    maxWidth: 250,
    initialExpandLevel: 1,
    spacing: {
      horizontal: 60,
      vertical: 4,
      paddingX: 6,
    },
    font: {
      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      baseSize: 12,
      maxSize: 16,
      minSize: 10,
    }
  },
  
  // 大屏配置
  desktop: {
    height: 700,
    theme: 'default',
    showToolbar: true,
    zoomable: true,
    draggable: true,
    duration: 600,
    maxWidth: 400,
    initialExpandLevel: -1,
    spacing: {
      horizontal: 100,
      vertical: 8,
      paddingX: 12,
    },
    font: {
      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      baseSize: 16,
      maxSize: 24,
      minSize: 14,
    }
  }
};

// 示例数据
export const sampleData = {
  basic: `# 基础思维导图

## 学习计划
- 前端技术
  - Vue.js
  - React
  - Angular
- 后端技术
  - Node.js
  - Python
  - Java`,

  project: `# 项目管理

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

  knowledge: `# 知识体系

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
  - 贪心算法

## 编程语言
- JavaScript
  - ES6+
  - TypeScript
  - Node.js
- Python
  - Django
  - Flask
  - FastAPI
- Java
  - Spring
  - Spring Boot
  - MyBatis

## 数据库
- 关系型数据库
  - MySQL
  - PostgreSQL
  - Oracle
- 非关系型数据库
  - MongoDB
  - Redis
  - Elasticsearch`
};

// 工具函数
export const utils = {
  // 获取主题配置
  getThemeConfig(themeName) {
    return themes[themeName] || themes.default;
  },
  
  // 获取预设配置
  getPresetConfig(presetName) {
    return presets[presetName] || presets.basic;
  },
  
  // 合并配置
  mergeConfig(base, custom) {
    return {
      ...base,
      ...custom,
      spacing: { ...base.spacing, ...custom.spacing },
      font: { ...base.font, ...custom.font },
    };
  },
  
  // 验证数据格式
  validateData(data) {
    if (!data || typeof data !== 'string') {
      return false;
    }
    // 简单验证是否包含 markdown 标题
    return /^#\s+/.test(data.trim());
  }
};

export default {
  themes,
  presets,
  sampleData,
  utils
};
