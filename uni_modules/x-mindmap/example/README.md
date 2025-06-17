# X-Mindmap 示例代码

本目录包含了 X-Mindmap 组件的各种使用示例，帮助您快速了解和使用组件的各项功能。

## 📁 示例文件

### 1. simple-usage.vue
**简单使用示例**
- 最基础的使用方法
- 适合快速上手
- 包含基本的配置选项

```vue
<x-mindmap 
  :data="mindmapData" 
  :height="400"
/>
```

### 2. demo.vue
**基础功能演示**
- 展示主要功能特性
- 包含工具栏使用
- 事件处理示例
- 主题切换演示

```vue
<x-mindmap 
  :data="mindmapData" 
  :height="400"
  :show-toolbar="true"
  theme="default"
  @ready="onReady"
  @node-click="onNodeClick"
/>
```

### 3. editable-demo.vue
**编辑功能演示**
- 完整的编辑功能展示
- 节点增删改操作
- 数据实时更新
- 编辑状态管理

```vue
<x-mindmap 
  :data="mindmapData" 
  :height="500"
  :show-toolbar="true"
  :editable="true"
  @edit-mode-change="onEditModeChange"
  @data-change="onDataChange"
/>
```

### 4. complete-demo.vue
**完整功能演示**
- 包含所有功能的综合示例
- 多标签页展示不同特性
- 实时配置调整
- 事件日志记录
- 响应式设计演示

## 🚀 如何运行示例

### 1. 在 uni-app 项目中使用

将示例文件复制到您的 uni-app 项目中：

```
pages/
  mindmap-demo/
    simple-usage.vue
    demo.vue
    editable-demo.vue
    complete-demo.vue
```

### 2. 配置页面路由

在 `pages.json` 中添加页面配置：

```json
{
  "pages": [
    {
      "path": "pages/mindmap-demo/simple-usage",
      "style": {
        "navigationBarTitleText": "简单使用示例"
      }
    },
    {
      "path": "pages/mindmap-demo/demo",
      "style": {
        "navigationBarTitleText": "基础功能演示"
      }
    },
    {
      "path": "pages/mindmap-demo/editable-demo",
      "style": {
        "navigationBarTitleText": "编辑功能演示"
      }
    },
    {
      "path": "pages/mindmap-demo/complete-demo",
      "style": {
        "navigationBarTitleText": "完整功能演示"
      }
    }
  ]
}
```

### 3. 小程序配置

如果在小程序中使用，确保在 `manifest.json` 中开启 renderjs：

```json
{
  "mp-weixin": {
    "setting": {
      "renderjs": true
    }
  }
}
```

## 📖 示例说明

### Simple Usage - 简单使用
```vue
<template>
  <x-mindmap :data="data" :height="400" />
</template>
```
- 最简单的使用方式
- 只需要传入数据和高度
- 适合快速集成

### Basic Demo - 基础演示
```vue
<template>
  <x-mindmap 
    :data="data" 
    :height="400"
    :show-toolbar="true"
    theme="default"
    @ready="onReady"
  />
</template>
```
- 展示工具栏功能
- 主题切换
- 事件处理
- 基础交互

### Editable Demo - 编辑演示
```vue
<template>
  <x-mindmap 
    :data="data" 
    :height="500"
    :show-toolbar="true"
    :editable="true"
    @data-change="onDataChange"
  />
</template>
```
- 完整编辑功能
- 节点增删改
- 数据持久化
- 编辑状态管理

### Complete Demo - 完整演示
```vue
<template>
  <view>
    <!-- 多标签页展示 -->
    <view class="tabs">...</view>
    
    <!-- 不同功能演示 -->
    <x-mindmap v-if="tab === 'basic'" ... />
    <x-mindmap v-if="tab === 'edit'" ... />
    <x-mindmap v-if="tab === 'custom'" ... />
  </view>
</template>
```
- 综合功能展示
- 实时配置调整
- 响应式设计
- 事件日志

## 🎯 学习路径

### 第一步：简单使用
从 `simple-usage.vue` 开始，了解基本用法：
- 如何引入组件
- 基本的 props 配置
- Markdown 数据格式

### 第二步：基础功能
学习 `demo.vue`，掌握主要功能：
- 工具栏的使用
- 主题切换
- 事件处理
- 交互操作

### 第三步：编辑功能
通过 `editable-demo.vue` 学习编辑功能：
- 如何开启编辑模式
- 节点的增删改操作
- 数据变化处理
- 状态管理

### 第四步：高级应用
参考 `complete-demo.vue` 进行高级应用：
- 自定义样式配置
- 响应式设计
- 复杂交互逻辑
- 性能优化

## 🔧 自定义修改

### 修改数据内容
```javascript
data() {
  return {
    mindmapData: `# 您的思维导图标题
## 主要分支
- 子项目1
- 子项目2`
  }
}
```

### 调整样式配置
```javascript
// 自定义颜色
customColors: [
  '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'
],

// 自定义间距
spacing: {
  horizontal: 100,
  vertical: 8,
  paddingX: 12
},

// 自定义字体
font: {
  baseSize: 16,
  maxSize: 24,
  minSize: 14
}
```

### 添加事件处理
```javascript
methods: {
  onReady(markmap) {
    console.log('思维导图加载完成');
  },
  
  onNodeClick(node) {
    console.log('点击节点:', node.content);
  },
  
  onDataChange(newData) {
    // 保存数据
    uni.setStorageSync('mindmapData', newData);
  }
}
```

## 🐛 常见问题

### 1. 组件不显示
- 检查是否正确引入组件
- 确保容器有明确的高度
- 验证数据格式是否正确

### 2. 小程序中无法使用
- 确保开启了 renderjs 支持
- 检查小程序是否支持 renderjs

### 3. 编辑功能异常
- 确保同时设置了 `editable="true"` 和 `show-toolbar="true"`
- 检查事件监听是否正确

### 4. 样式显示异常
- 避免全局样式影响
- 检查自定义样式配置
- 确认主题设置正确

## 📚 更多资源

- [API 文档](../API文档.md)
- [使用说明](../使用说明详细版.md)
- [错误修复指南](../错误修复指南.md)
- [快速开始](../快速开始.md)

## 💡 贡献示例

如果您有好的示例代码，欢迎贡献：

1. Fork 项目
2. 创建示例文件
3. 添加详细注释
4. 提交 Pull Request

---

**提示**: 建议按照学习路径逐步学习，从简单到复杂，循序渐进地掌握组件的各项功能。
