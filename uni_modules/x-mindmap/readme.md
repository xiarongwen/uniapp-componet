# X-Mindmap 思维导图插件

基于 markmap 的 uniapp 三端通用思维导图插件，支持 H5、小程序、App 等多平台。

## 特性

- 🚀 **三端通用**: 支持 H5、小程序、App 等多平台
- 🎨 **多主题支持**: 内置 default、dark、colorful、minimal 四种主题
- 🛠️ **丰富配置**: 支持自定义颜色、字体、间距、动画等
- 📱 **响应式设计**: 自适应不同屏幕尺寸
- 🔧 **工具栏功能**: 支持缩放、展开/折叠、导出等操作
- ✏️ **编辑功能**: 支持节点编辑、添加、删除等交互操作
- 📝 **Markdown 支持**: 直接使用 Markdown 语法创建思维导图
- 🎯 **事件回调**: 支持节点点击、展开折叠等事件监听

## 安装

### 方式一：通过 uni_modules 安装（推荐）

1. 下载插件到项目的 `uni_modules` 目录
2. 在需要使用的页面中引入组件

### 方式二：手动安装

1. 将 `x-mindmap` 文件夹复制到项目中
2. 安装依赖（推荐使用 pnpm）：

```bash
# 使用 pnpm（推荐）
pnpm install markmap-lib markmap-view markmap-common d3

# 或使用 npm
npm install markmap-lib markmap-view markmap-common d3
```

**注意**: 请确保使用兼容的版本：
- markmap-lib: ^0.18.12
- markmap-view: ^0.18.12
- markmap-common: ^0.18.9
- d3: ^7.9.0

## 基础用法

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
import XMindmap from '@/uni_modules/x-mindmap/components/x-mindmap/x-mindmap.vue'

export default {
  components: {
    XMindmap
  },
  data() {
    return {
      mindmapData: `# 我的思维导图

## 学习计划
- 前端技术
  - Vue.js
  - React
  - Angular
- 后端技术
  - Node.js
  - Python
  - Java`
    }
  }
}
</script>
```

## 高级用法

```vue
<template>
  <view>
    <x-mindmap
      :data="mindmapData"
      :height="500"
      :show-toolbar="true"
      theme="dark"
      :colors="customColors"
      :spacing="customSpacing"
      :font="customFont"
      @ready="onReady"
      @node-click="onNodeClick"
      @error="onError"
    />
  </view>
</template>
```

## 编辑功能用法

```vue
<template>
  <view>
    <x-mindmap
      :data="mindmapData"
      :height="500"
      :show-toolbar="true"
      :editable="true"
      theme="default"
      @ready="onReady"
      @edit-mode-change="onEditModeChange"
      @node-add="onNodeAdd"
      @node-delete="onNodeDelete"
      @node-edit="onNodeEdit"
      @data-change="onDataChange"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      mindmapData: `# 项目管理...`,
      customColors: [
        '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4',
        '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f'
      ],
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
      }
    }
  },
  methods: {
    onReady(markmap) {
      console.log('思维导图加载完成', markmap);
    },
    onNodeClick(node) {
      console.log('节点被点击', node);
    },
    onError(error) {
      console.error('加载失败', error);
    }
  }
}
</script>
```

## API 文档

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| data | String | '' | 思维导图数据（Markdown 格式） |
| height | Number | 400 | 容器高度（px） |
| width | Number/String | '100%' | 容器宽度 |
| theme | String | 'default' | 主题：default/dark/colorful/minimal |
| colors | Array | 内置颜色 | 自定义颜色数组 |
| duration | Number | 500 | 动画持续时间（ms） |
| maxWidth | Number | 300 | 节点最大宽度（px） |
| initialExpandLevel | Number | -1 | 初始展开层级（-1 为全部展开） |
| spacing | Object | 见下方 | 节点间距配置 |
| font | Object | 见下方 | 字体配置 |
| showToolbar | Boolean | false | 是否显示工具栏 |
| zoomable | Boolean | true | 是否可缩放 |
| draggable | Boolean | true | 是否可拖拽 |
| customStyle | Object | {} | 自定义样式 |
| editable | Boolean | false | 是否可编辑 |
| editConfig | Object | 见下方 | 编辑配置 |

### spacing 配置

```javascript
{
  horizontal: 80,    // 水平间距
  vertical: 5,       // 垂直间距
  paddingX: 8,       // 内边距
}
```

### font 配置

```javascript
{
  family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  baseSize: 14,      // 基础字体大小
  maxSize: 20,       // 最大字体大小
  minSize: 12,       // 最小字体大小
}
```

### editConfig 配置

```javascript
{
  allowAddNode: true,     // 允许添加节点
  allowDeleteNode: true,  // 允许删除节点
  allowEditText: true,    // 允许编辑文本
  allowDragNode: false,   // 允许拖拽节点（暂未实现）
}
```

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| ready | markmap 实例 | 思维导图加载完成 |
| error | error 对象 | 加载失败 |
| node-click | node 对象 | 节点被点击 |
| node-expand | node 对象 | 节点展开 |
| node-collapse | node 对象 | 节点折叠 |
| zoom-in | - | 放大 |
| zoom-out | - | 缩小 |
| reset-zoom | - | 重置缩放 |
| expand-all | - | 展开所有 |
| collapse-all | - | 折叠所有 |
| export-svg | - | 导出 SVG |
| edit-mode-change | Boolean | 编辑模式切换 |
| node-add | Object | 节点添加 |
| node-delete | Object | 节点删除 |
| node-edit | Object | 节点编辑 |
| data-change | String | 数据变化 |

## 主题预览

### Default 主题
默认主题，适合大多数场景。

### Dark 主题
暗色主题，适合暗色界面。

### Colorful 主题
彩色主题，色彩丰富。

### Minimal 主题
简约主题，简洁清爽。

## 编辑功能说明

### 开启编辑模式
设置 `editable="true"` 并显示工具栏：
```vue
<x-mindmap
  :data="data"
  :editable="true"
  :show-toolbar="true"
/>
```

### 编辑操作
1. **进入编辑模式**: 点击工具栏的编辑按钮（✎）
2. **选择节点**: 单击任意节点进行选择
3. **编辑文本**: 双击节点开始编辑文本
4. **添加节点**: 选中父节点后点击添加按钮（⊕）
5. **删除节点**: 选中节点后点击删除按钮（⊖）
6. **退出编辑**: 再次点击编辑按钮退出编辑模式

### 事件处理
```javascript
methods: {
  onEditModeChange(editMode) {
    console.log('编辑模式:', editMode);
  },
  onNodeAdd(data) {
    console.log('添加节点:', data);
  },
  onNodeDelete(node) {
    console.log('删除节点:', node);
  },
  onNodeEdit(data) {
    console.log('编辑节点:', data);
  },
  onDataChange(newData) {
    console.log('数据更新:', newData);
    // 可以保存到本地或服务器
  }
}
```

## 平台兼容性

| 平台 | 支持情况 | 说明 |
|------|----------|------|
| H5 | ✅ | 完全支持 |
| 小程序 | ✅ | 支持（需要 renderjs） |
| App | ✅ | 支持 |
| 快应用 | ✅ | 支持 |

## 注意事项

1. **小程序平台**: 需要在 `manifest.json` 中配置 `renderjs` 支持
2. **数据格式**: 必须是有效的 Markdown 格式
3. **性能优化**: 大型思维导图建议设置合适的 `initialExpandLevel`
4. **样式冲突**: 避免全局样式影响组件内部样式

## 常见问题

### Q: 出现 "Cannot read properties of undefined" 错误？
A: 这个问题在 v1.0.2 版本中已修复。如果仍然遇到，请确保：
- 使用最新版本的插件
- 正确传递 props 参数
- 检查数据格式是否正确

### Q: 小程序中无法显示？
A: 确保在 `manifest.json` 中开启了 `renderjs` 支持，并且小程序支持 `renderjs`。

### Q: 如何自定义节点样式？
A: 可以通过 `theme`、`colors`、`font` 等属性进行自定义，或使用 `customStyle` 覆盖默认样式。

### Q: 支持哪些 Markdown 语法？
A: 支持标准的 Markdown 标题语法（#、##、###等）和列表语法（-、*、+等）。

### Q: 如何处理大型思维导图的性能问题？
A: 可以设置 `initialExpandLevel` 限制初始展开层级，或者分割大型思维导图为多个小的图表。

### Q: 依赖安装失败怎么办？
A: 推荐使用 pnpm 安装依赖：
```bash
pnpm install markmap-lib markmap-view markmap-common d3
```
如果仍有问题，请删除 node_modules 和 lock 文件后重新安装。

## 📚 完整文档

- 📖 [API 文档](./API文档.md) - 完整的 API 参考手册
- 📝 [使用说明详细版](./使用说明详细版.md) - 详细的使用指南和示例
- 🐛 [错误修复指南](./错误修复指南.md) - 常见问题和解决方案
- 📋 [更新日志](./changelog.md) - 版本更新记录

## 💡 示例代码

查看 `example` 目录下的完整示例：

- `demo.vue` - 基础功能演示
- `editable-demo.vue` - 编辑功能演示
- `simple-usage.vue` - 简单使用示例

## 🔄 更新日志

### v1.1.1 - 2024-12-19 (最新)

#### 🐛 错误修复
- 修复 NaN 坐标错误：`<line> attribute y1: Expected length, "NaN"`
- 修复 SVGLength 错误：`Failed to read the 'value' property from 'SVGLength'`
- 增强错误检测和自动修复机制
- 改进容器尺寸处理逻辑

#### 🔧 技术改进
- 添加 `validateNodePositions()` 方法自动修复坐标
- 添加 `fixSVGLengthErrors()` 方法处理 SVG 长度问题
- 使用固定像素值替代相对单位
- 改进 ResizeObserver 处理逻辑

#### 📝 文档完善
- 新增完整的 API 文档
- 新增详细的使用说明
- 新增错误修复指南
- 新增测试页面

### v1.1.0 - 2024-12-19

#### ✨ 新增功能
- 支持编辑功能（节点编辑、添加、删除）
- 新增工具栏编辑按钮
- 支持实时数据更新
- 新增编辑相关事件

#### 🎨 界面优化
- 优化工具栏样式和布局
- 改进编辑模式的视觉反馈
- 增强移动端适配

### v1.0.0 - 2024-12-18
- 初始版本发布
- 支持基础思维导图功能
- 支持多主题
- 支持工具栏
- 支持事件回调

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

如有问题，请通过以下方式联系：
- 提交 Issue
- 发送邮件