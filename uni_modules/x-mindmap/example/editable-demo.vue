<template>
  <view class="page">
    <view class="header">
      <text class="title">可编辑思维导图示例</text>
      <text class="subtitle">支持节点编辑、添加、删除等操作</text>
    </view>
    
    <!-- 操作说明 -->
    <view class="instructions">
      <text class="instructions-title">操作说明：</text>
      <text class="instruction-item">1. 点击工具栏的编辑按钮进入编辑模式</text>
      <text class="instruction-item">2. 单击节点选中，双击节点编辑文本</text>
      <text class="instruction-item">3. 选中节点后可以添加子节点或删除节点</text>
      <text class="instruction-item">4. 右键点击节点显示上下文菜单</text>
    </view>
    
    <!-- 可编辑思维导图 -->
    <view class="mindmap-section">
      <x-mindmap 
        :data="mindmapData" 
        :height="500"
        :show-toolbar="true"
        :editable="true"
        theme="default"
        :colors="customColors"
        @ready="onReady"
        @error="onError"
        @edit-mode-change="onEditModeChange"
        @node-click="onNodeClick"
        @node-add="onNodeAdd"
        @node-delete="onNodeDelete"
        @node-edit="onNodeEdit"
        @data-change="onDataChange"
      />
    </view>
    
    <!-- 状态信息 -->
    <view class="status-section">
      <view class="status-item">
        <text class="status-label">编辑模式：</text>
        <text class="status-value" :class="{ active: editMode }">
          {{ editMode ? '开启' : '关闭' }}
        </text>
      </view>
      <view class="status-item" v-if="selectedNode">
        <text class="status-label">选中节点：</text>
        <text class="status-value">{{ selectedNode.content }}</text>
      </view>
      <view class="status-item">
        <text class="status-label">操作历史：</text>
        <text class="status-value">{{ operationHistory.length }} 条</text>
      </view>
    </view>
    
    <!-- 操作历史 -->
    <view class="history-section" v-if="operationHistory.length > 0">
      <text class="section-title">操作历史</text>
      <view class="history-list">
        <view 
          v-for="(operation, index) in operationHistory.slice(-5)" 
          :key="index"
          class="history-item"
        >
          <text class="history-time">{{ operation.time }}</text>
          <text class="history-action">{{ operation.action }}</text>
          <text class="history-detail">{{ operation.detail }}</text>
        </view>
      </view>
    </view>
    
    <!-- 数据预览 -->
    <view class="data-section">
      <text class="section-title">当前数据（Markdown格式）</text>
      <textarea 
        class="data-textarea" 
        :value="mindmapData" 
        @input="onDataInput"
        placeholder="在此编辑 Markdown 格式的思维导图数据..."
      />
    </view>
  </view>
</template>

<script>
import XMindmap from '../components/x-mindmap/x-mindmap.vue'

export default {
  name: 'EditableDemo',
  components: {
    XMindmap
  },
  data() {
    return {
      editMode: false,
      selectedNode: null,
      operationHistory: [],
      
      mindmapData: `# 我的项目计划

## 第一阶段：需求分析
- 用户调研
  - 问卷调查
  - 用户访谈
- 竞品分析
  - 功能对比
  - 优劣势分析
- 需求整理
  - 功能需求
  - 非功能需求

## 第二阶段：设计开发
- UI设计
  - 原型设计
  - 视觉设计
- 技术开发
  - 前端开发
  - 后端开发
  - 数据库设计

## 第三阶段：测试上线
- 功能测试
- 性能测试
- 用户验收测试
- 正式上线`,

      customColors: [
        '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4',
        '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f'
      ]
    }
  },
  methods: {
    onReady(markmap) {
      console.log('可编辑思维导图加载完成:', markmap);
      this.addOperation('系统', '思维导图加载完成');
    },
    
    onError(error) {
      console.error('思维导图加载失败:', error);
      this.addOperation('错误', `加载失败: ${error.message}`);
    },
    
    onEditModeChange(editMode) {
      this.editMode = editMode;
      this.addOperation('模式', editMode ? '进入编辑模式' : '退出编辑模式');
      
      uni.showToast({
        title: editMode ? '编辑模式已开启' : '编辑模式已关闭',
        icon: 'none'
      });
    },
    
    onNodeClick(node) {
      this.selectedNode = node;
      console.log('节点被点击:', node);
    },
    
    onNodeAdd(data) {
      const parentText = data.parentNode ? data.parentNode.content : '根节点';
      this.addOperation('添加', `在"${parentText}"下添加节点"${data.text}"`);
      
      uni.showToast({
        title: '节点添加成功',
        icon: 'success'
      });
    },
    
    onNodeDelete(node) {
      this.addOperation('删除', `删除节点"${node.content}"`);
      this.selectedNode = null;
      
      uni.showToast({
        title: '节点删除成功',
        icon: 'success'
      });
    },
    
    onNodeEdit(data) {
      this.addOperation('编辑', `将"${data.oldText}"修改为"${data.newText}"`);
      
      uni.showToast({
        title: '节点编辑成功',
        icon: 'success'
      });
    },
    
    onDataChange(newData) {
      this.mindmapData = newData;
      this.addOperation('数据', '思维导图数据已更新');
    },
    
    onDataInput(event) {
      this.mindmapData = event.detail.value;
    },
    
    addOperation(action, detail) {
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      
      this.operationHistory.push({
        time,
        action,
        detail,
        timestamp: now.getTime()
      });
      
      // 只保留最近50条记录
      if (this.operationHistory.length > 50) {
        this.operationHistory = this.operationHistory.slice(-50);
      }
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
  margin-bottom: 20px;
  
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

.instructions {
  background: #e3f2fd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  
  .instructions-title {
    display: block;
    font-size: 16px;
    font-weight: bold;
    color: #1976d2;
    margin-bottom: 10px;
  }
  
  .instruction-item {
    display: block;
    font-size: 14px;
    color: #424242;
    margin-bottom: 5px;
    padding-left: 10px;
  }
}

.mindmap-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.status-section {
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  
  .status-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    
    .status-label {
      font-size: 14px;
      color: #666;
      margin-right: 8px;
    }
    
    .status-value {
      font-size: 14px;
      color: #333;
      
      &.active {
        color: #007aff;
        font-weight: bold;
      }
    }
  }
}

.history-section {
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  
  .section-title {
    display: block;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }
  
  .history-list {
    .history-item {
      display: flex;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;
      
      &:last-child {
        border-bottom: none;
      }
      
      .history-time {
        font-size: 12px;
        color: #999;
        width: 60px;
        margin-right: 10px;
      }
      
      .history-action {
        font-size: 12px;
        color: #007aff;
        width: 50px;
        margin-right: 10px;
      }
      
      .history-detail {
        font-size: 12px;
        color: #666;
        flex: 1;
      }
    }
  }
}

.data-section {
  background: white;
  border-radius: 8px;
  padding: 15px;
  
  .section-title {
    display: block;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }
  
  .data-textarea {
    width: 100%;
    height: 200px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    font-size: 12px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    resize: vertical;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .page {
    padding: 15px;
  }
  
  .mindmap-section {
    padding: 15px;
  }
}
</style>
