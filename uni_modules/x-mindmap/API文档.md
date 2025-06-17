# X-Mindmap 组件 API 文档

## 📖 组件概述

X-Mindmap 是一个基于 markmap 的 uniapp 三端通用思维导图组件，支持展示、编辑、交互等功能。

### 特性
- 🚀 三端通用（H5、小程序、App）
- 🎨 多主题支持
- ✏️ 可编辑功能
- 🛠️ 丰富的工具栏
- 📱 响应式设计
- 🎯 完整的事件系统

## 🔧 安装使用

### 1. 安装依赖

```bash
# 推荐使用 pnpm
pnpm install markmap-lib markmap-view markmap-common d3

# 或使用 npm
npm install markmap-lib markmap-view markmap-common d3
```

### 2. 引入组件

```vue
<script>
import XMindmap from '@/uni_modules/x-mindmap/components/x-mindmap/x-mindmap.vue'

export default {
  components: {
    XMindmap
  }
}
</script>
```

### 3. 基础使用

```vue
<template>
  <view>
    <x-mindmap 
      :data="mindmapData" 
      :height="400"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      mindmapData: `# 我的思维导图
## 分支1
- 内容1
- 内容2
## 分支2
- 内容3
- 内容4`
    }
  }
}
</script>
```

## 📋 Props API

### 基础属性

| 属性名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| data | String | '' | ✅ | 思维导图数据（Markdown格式） |
| height | Number | 400 | ❌ | 容器高度（px） |
| width | Number/String | '100%' | ❌ | 容器宽度 |

### 主题配置

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| theme | String | 'default' | 主题类型：default/dark/colorful/minimal |
| colors | Array | 内置颜色 | 自定义颜色数组 |
| customStyle | Object | {} | 自定义容器样式 |

### 动画配置

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| duration | Number | 500 | 动画持续时间（ms） |
| maxWidth | Number | 300 | 节点最大宽度（px） |
| initialExpandLevel | Number | -1 | 初始展开层级（-1为全部展开） |

### 间距配置

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| spacing | Object | 见下方 | 节点间距配置 |

```javascript
// spacing 默认值
{
  horizontal: 80,    // 水平间距
  vertical: 5,       // 垂直间距
  paddingX: 8,       // 内边距
}
```

### 字体配置

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| font | Object | 见下方 | 字体配置 |

```javascript
// font 默认值
{
  family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  baseSize: 14,      // 基础字体大小
  maxSize: 20,       // 最大字体大小
  minSize: 12,       // 最小字体大小
}
```

### 交互配置

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| showToolbar | Boolean | false | 是否显示工具栏 |
| zoomable | Boolean | true | 是否可缩放 |
| draggable | Boolean | true | 是否可拖拽 |

### 编辑功能

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| editable | Boolean | false | 是否可编辑 |
| editConfig | Object | 见下方 | 编辑配置 |

```javascript
// editConfig 默认值
{
  allowAddNode: true,     // 允许添加节点
  allowDeleteNode: true,  // 允许删除节点
  allowEditText: true,    // 允许编辑文本
  allowDragNode: false,   // 允许拖拽节点（暂未实现）
}
```

## 🎯 Events API

### 基础事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| ready | markmap实例 | 思维导图加载完成 |
| error | error对象 | 加载失败 |

### 交互事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| node-click | node对象 | 节点被点击 |
| node-expand | node对象 | 节点展开 |
| node-collapse | node对象 | 节点折叠 |

### 工具栏事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| zoom-in | - | 放大操作 |
| zoom-out | - | 缩小操作 |
| reset-zoom | - | 重置缩放 |
| expand-all | - | 展开所有节点 |
| collapse-all | - | 折叠所有节点 |
| export-svg | - | 导出SVG |

### 编辑事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| edit-mode-change | Boolean | 编辑模式切换 |
| node-add | Object | 节点添加 |
| node-delete | Object | 节点删除 |
| node-edit | Object | 节点编辑 |
| data-change | String | 数据变化（Markdown格式） |

## 📝 使用示例

### 基础展示

```vue
<template>
  <x-mindmap 
    :data="data" 
    :height="400"
    theme="default"
    @ready="onReady"
  />
</template>

<script>
export default {
  data() {
    return {
      data: `# 项目计划
## 第一阶段
- 需求分析
- 原型设计
## 第二阶段
- 开发实现
- 测试验证`
    }
  },
  methods: {
    onReady(markmap) {
      console.log('思维导图加载完成');
    }
  }
}
</script>
```

### 带工具栏

```vue
<template>
  <x-mindmap 
    :data="data" 
    :height="500"
    :show-toolbar="true"
    theme="dark"
    :colors="customColors"
    @zoom-in="onZoomIn"
    @export-svg="onExport"
  />
</template>

<script>
export default {
  data() {
    return {
      data: '# 思维导图...',
      customColors: [
        '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'
      ]
    }
  },
  methods: {
    onZoomIn() {
      console.log('放大操作');
    },
    onExport() {
      console.log('导出SVG');
    }
  }
}
</script>
```

### 可编辑模式

```vue
<template>
  <x-mindmap 
    :data="data" 
    :height="600"
    :show-toolbar="true"
    :editable="true"
    @edit-mode-change="onEditModeChange"
    @node-add="onNodeAdd"
    @node-delete="onNodeDelete"
    @data-change="onDataChange"
  />
</template>

<script>
export default {
  data() {
    return {
      data: '# 可编辑思维导图...'
    }
  },
  methods: {
    onEditModeChange(editMode) {
      console.log('编辑模式:', editMode);
    },
    onNodeAdd(nodeData) {
      console.log('添加节点:', nodeData);
    },
    onNodeDelete(node) {
      console.log('删除节点:', node);
    },
    onDataChange(newData) {
      this.data = newData;
      console.log('数据更新:', newData);
    }
  }
}
</script>
```

### 自定义配置

```vue
<template>
  <x-mindmap 
    :data="data" 
    :height="500"
    :show-toolbar="true"
    theme="colorful"
    :duration="800"
    :max-width="250"
    :spacing="customSpacing"
    :font="customFont"
    :custom-style="customStyle"
  />
</template>

<script>
export default {
  data() {
    return {
      data: '# 自定义思维导图...',
      customSpacing: {
        horizontal: 100,
        vertical: 8,
        paddingX: 12,
      },
      customFont: {
        family: 'Arial, sans-serif',
        baseSize: 16,
        maxSize: 24,
        minSize: 14,
      },
      customStyle: {
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
      }
    }
  }
}
</script>
```

## 🎨 主题系统

### 内置主题

1. **default** - 默认主题，适合大多数场景
2. **dark** - 暗色主题，适合暗色界面
3. **colorful** - 彩色主题，色彩丰富
4. **minimal** - 简约主题，简洁清爽

### 自定义颜色

```javascript
// 自定义颜色数组
colors: [
  '#ff6b6b', // 红色
  '#4ecdc4', // 青色
  '#45b7d1', // 蓝色
  '#96ceb4', // 绿色
  '#ffeaa7', // 黄色
  '#dda0dd', // 紫色
  '#98d8c8', // 薄荷绿
  '#f7dc6f'  // 金黄色
]
```

## 📱 平台兼容性

| 平台 | 支持情况 | 说明 |
|------|----------|------|
| H5 | ✅ 完全支持 | 推荐平台，所有功能可用 |
| 小程序 | ✅ 支持 | 需要 renderjs 支持 |
| App | ✅ 完全支持 | Vue/nvue 都支持 |
| 快应用 | ✅ 基础支持 | 基础功能可用 |

## ⚠️ 注意事项

1. **数据格式**: 必须是有效的 Markdown 格式
2. **容器尺寸**: 确保容器有明确的高度
3. **小程序配置**: 需要在 manifest.json 中开启 renderjs
4. **性能考虑**: 大型思维导图建议设置合适的 initialExpandLevel

## 🔧 故障排除

### 常见问题

1. **思维导图不显示**
   - 检查数据格式是否正确
   - 确保容器有足够的高度
   - 查看控制台错误信息

2. **小程序中无法使用**
   - 确保小程序支持 renderjs
   - 检查 manifest.json 配置

3. **编辑功能异常**
   - 确保设置了 `editable="true"`
   - 检查是否开启了工具栏

### 调试方法

```javascript
// 监听所有事件进行调试
<x-mindmap 
  @ready="console.log('ready', $event)"
  @error="console.error('error', $event)"
  @node-click="console.log('click', $event)"
/>
```

## 📚 更多资源

- [完整示例](./example/demo.vue)
- [编辑功能示例](./example/editable-demo.vue)
- [错误修复指南](./错误修复指南.md)
- [更新日志](./changelog.md)
