<template>
  <view class="demo-page">
    <view class="header">
      <text class="title">X-Mindmap 完整功能演示</text>
      <text class="subtitle">包含所有功能的综合示例</text>
    </view>

    <!-- 功能切换 -->
    <view class="feature-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.key"
        :class="['tab-btn', { active: activeTab === tab.key }]"
        @click="switchTab(tab.key)"
      >
        {{ tab.label }}
      </button>
    </view>

    <!-- 基础展示 -->
    <view v-if="activeTab === 'basic'" class="demo-section">
      <view class="section-title">基础展示功能</view>
      <view class="controls">
        <picker :range="themeOptions" :value="themeIndex" @change="onThemeChange">
          <view class="picker">主题：{{ themeOptions[themeIndex] }}</view>
        </picker>
      </view>
      <x-mindmap 
        :data="basicData" 
        :height="400"
        :show-toolbar="true"
        :theme="currentTheme"
        @ready="onReady"
        @node-click="onNodeClick"
      />
    </view>

    <!-- 编辑功能 -->
    <view v-if="activeTab === 'edit'" class="demo-section">
      <view class="section-title">编辑功能演示</view>
      <view class="edit-status">
        <text>编辑模式：{{ editMode ? '开启' : '关闭' }}</text>
        <text v-if="selectedNode">选中节点：{{ selectedNode.content }}</text>
      </view>
      <x-mindmap 
        :data="editableData" 
        :height="500"
        :show-toolbar="true"
        :editable="true"
        theme="colorful"
        @edit-mode-change="onEditModeChange"
        @node-click="onNodeSelect"
        @node-add="onNodeAdd"
        @node-delete="onNodeDelete"
        @data-change="onDataChange"
      />
    </view>

    <!-- 自定义样式 -->
    <view v-if="activeTab === 'custom'" class="demo-section">
      <view class="section-title">自定义样式演示</view>
      <view class="style-controls">
        <view class="control-group">
          <text>动画时长：{{ customConfig.duration }}ms</text>
          <slider 
            :value="customConfig.duration" 
            :min="100" 
            :max="2000" 
            @change="onDurationChange"
          />
        </view>
        <view class="control-group">
          <text>水平间距：{{ customConfig.spacing.horizontal }}px</text>
          <slider 
            :value="customConfig.spacing.horizontal" 
            :min="50" 
            :max="200" 
            @change="onSpacingChange"
          />
        </view>
      </view>
      <x-mindmap 
        :data="customData" 
        :height="450"
        :show-toolbar="true"
        :colors="customColors"
        :duration="customConfig.duration"
        :spacing="customConfig.spacing"
        :font="customConfig.font"
        :custom-style="customStyle"
      />
    </view>

    <!-- 响应式演示 -->
    <view v-if="activeTab === 'responsive'" class="demo-section">
      <view class="section-title">响应式设计演示</view>
      <view class="size-controls">
        <button @click="changeSize('small')">小尺寸</button>
        <button @click="changeSize('medium')">中尺寸</button>
        <button @click="changeSize('large')">大尺寸</button>
      </view>
      <view :style="{ height: responsiveHeight + 'px' }" class="responsive-container">
        <x-mindmap 
          :data="responsiveData" 
          :height="responsiveHeight"
          :show-toolbar="responsiveHeight > 300"
          :spacing="responsiveSpacing"
          :font="responsiveFont"
          theme="minimal"
        />
      </view>
    </view>

    <!-- 事件日志 -->
    <view class="event-log">
      <view class="log-title">事件日志</view>
      <scroll-view class="log-content" scroll-y>
        <text 
          v-for="(log, index) in eventLogs" 
          :key="index"
          class="log-item"
        >
          [{{ log.time }}] {{ log.message }}
        </text>
      </scroll-view>
      <button @click="clearLogs" class="clear-btn">清空日志</button>
    </view>
  </view>
</template>

<script>
import XMindmap from '../components/x-mindmap/x-mindmap.vue'

export default {
  name: 'CompleteDemo',
  components: {
    XMindmap
  },
  data() {
    return {
      activeTab: 'basic',
      editMode: false,
      selectedNode: null,
      themeIndex: 0,
      responsiveHeight: 400,
      eventLogs: [],
      
      tabs: [
        { key: 'basic', label: '基础功能' },
        { key: 'edit', label: '编辑功能' },
        { key: 'custom', label: '自定义样式' },
        { key: 'responsive', label: '响应式设计' }
      ],
      
      themeOptions: ['default', 'dark', 'colorful', 'minimal'],
      
      customColors: [
        '#e74c3c', '#3498db', '#2ecc71', '#f39c12',
        '#9b59b6', '#1abc9c', '#f1c40f', '#e67e22'
      ],
      
      customConfig: {
        duration: 500,
        spacing: {
          horizontal: 80,
          vertical: 5,
          paddingX: 8
        },
        font: {
          baseSize: 16,
          maxSize: 24,
          minSize: 14
        }
      },
      
      customStyle: {
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '2px solid #e3f2fd'
      },
      
      basicData: `# 基础功能演示

## 展示功能
- 多层级结构
- 丰富的内容
- 美观的样式

## 交互功能
- 节点点击
- 缩放操作
- 展开折叠`,

      editableData: `# 编辑功能演示

## 可编辑内容
- 双击编辑文本
- 添加新节点
- 删除现有节点

## 操作说明
- 点击编辑按钮进入编辑模式
- 选择节点后可进行操作`,

      customData: `# 自定义样式演示

## 样式配置
- 自定义颜色
- 调整间距
- 字体设置

## 动画效果
- 可调节动画时长
- 流畅的过渡效果`,

      responsiveData: `# 响应式设计

## 自适应布局
- 不同屏幕尺寸
- 动态调整样式

## 移动端优化
- 触摸友好
- 性能优化`
    }
  },
  
  computed: {
    currentTheme() {
      return this.themeOptions[this.themeIndex];
    },
    
    responsiveSpacing() {
      return {
        horizontal: this.responsiveHeight > 400 ? 80 : 60,
        vertical: this.responsiveHeight > 400 ? 5 : 3,
        paddingX: this.responsiveHeight > 400 ? 8 : 6
      };
    },
    
    responsiveFont() {
      return {
        baseSize: this.responsiveHeight > 400 ? 14 : 12,
        maxSize: this.responsiveHeight > 400 ? 20 : 16,
        minSize: this.responsiveHeight > 400 ? 12 : 10
      };
    }
  },
  
  methods: {
    switchTab(tab) {
      this.activeTab = tab;
      this.addLog(`切换到${this.tabs.find(t => t.key === tab).label}标签`);
    },
    
    onThemeChange(e) {
      this.themeIndex = e.detail.value;
      this.addLog(`切换主题为：${this.currentTheme}`);
    },
    
    onReady(markmap) {
      this.addLog('思维导图加载完成');
    },
    
    onNodeClick(node) {
      this.addLog(`点击节点：${node.content}`);
    },
    
    onEditModeChange(editMode) {
      this.editMode = editMode;
      this.addLog(`编辑模式${editMode ? '开启' : '关闭'}`);
    },
    
    onNodeSelect(node) {
      this.selectedNode = node;
      this.addLog(`选中节点：${node.content}`);
    },
    
    onNodeAdd(data) {
      this.addLog(`添加节点：${data.content || '新节点'}`);
    },
    
    onNodeDelete(node) {
      this.addLog(`删除节点：${node.content}`);
      this.selectedNode = null;
    },
    
    onDataChange(newData) {
      this.editableData = newData;
      this.addLog('数据已更新');
    },
    
    onDurationChange(e) {
      this.customConfig.duration = e.detail.value;
      this.addLog(`动画时长调整为：${e.detail.value}ms`);
    },
    
    onSpacingChange(e) {
      this.customConfig.spacing.horizontal = e.detail.value;
      this.addLog(`水平间距调整为：${e.detail.value}px`);
    },
    
    changeSize(size) {
      const sizes = {
        small: 250,
        medium: 400,
        large: 600
      };
      this.responsiveHeight = sizes[size];
      this.addLog(`切换到${size}尺寸：${sizes[size]}px`);
    },
    
    addLog(message) {
      const time = new Date().toLocaleTimeString();
      this.eventLogs.unshift({ time, message });
      if (this.eventLogs.length > 50) {
        this.eventLogs.pop();
      }
    },
    
    clearLogs() {
      this.eventLogs = [];
    }
  }
}
</script>

<style scoped>
.demo-page {
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 14px;
  color: #666;
  display: block;
}

.feature-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  padding: 0 10px;
}

.tab-btn {
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  color: #666;
  font-size: 14px;
  text-align: center;
}

.tab-btn.active {
  background: #007aff;
  color: white;
  border-color: #007aff;
}

.demo-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  display: block;
}

.controls, .style-controls, .size-controls {
  margin-bottom: 15px;
}

.picker {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #f8f9fa;
  color: #333;
}

.edit-status {
  margin-bottom: 15px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 6px;
}

.edit-status text {
  display: block;
  margin-bottom: 5px;
  color: #666;
}

.control-group {
  margin-bottom: 15px;
}

.control-group text {
  display: block;
  margin-bottom: 8px;
  color: #666;
  font-size: 14px;
}

.size-controls {
  display: flex;
  gap: 10px;
}

.size-controls button {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  color: #666;
}

.responsive-container {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: height 0.3s ease;
}

.event-log {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.log-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  display: block;
}

.log-content {
  height: 200px;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 10px;
  background: #f8f9fa;
}

.log-item {
  display: block;
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
  font-family: monospace;
}

.clear-btn {
  margin-top: 10px;
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #f8f9fa;
  color: #666;
  font-size: 14px;
}
</style>
