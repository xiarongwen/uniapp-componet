<template>
  <view class="mobile-test-page">
    <view class="header">
      <text class="title">移动端兼容性测试</text>
    </view>
    
    <view class="content">
      <!-- 思维导图组件 -->
      <x-mindmap
        :data="mindmapData"
        :height="400"
        :width="'100%'"
        theme="default"
        :show-toolbar="false"
        @ready="onReady"
        @error="onError"
        @node-click="onNodeClick"
      />
      
      <!-- 日志区域 -->
      <view class="log-section">
        <text class="log-title">运行日志：</text>
        <scroll-view class="log-container" scroll-y="true">
          <view v-for="(log, index) in logs" :key="index" class="log-item">
            <text class="log-text">{{ log }}</text>
          </view>
        </scroll-view>
      </view>
      
      <!-- 测试按钮 -->
      <view class="button-group">
        <button class="test-btn" @click="testBasicRender">测试基础渲染</button>
        <button class="test-btn" @click="testDataChange">测试数据变更</button>
        <button class="test-btn" @click="clearLogs">清空日志</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'MobileTest',
  data() {
    return {
      logs: [],
      mindmapData: `# 移动端测试
## 基础功能
- 渲染测试
- 事件测试
- 兼容性测试
## 高级功能
- 动态数据
- 主题切换
- 错误处理`
    };
  },
  mounted() {
    this.addLog('页面加载完成');
    this.addLog('用户代理: ' + navigator.userAgent);
    this.addLog('是否为移动端: ' + this.isMobile());
  },
  methods: {
    addLog(message) {
      const timestamp = new Date().toLocaleTimeString();
      this.logs.push(`[${timestamp}] ${message}`);
      
      // 限制日志数量
      if (this.logs.length > 50) {
        this.logs.shift();
      }
      
      // 自动滚动到底部
      this.$nextTick(() => {
        const logContainer = document.querySelector('.log-container');
        if (logContainer) {
          logContainer.scrollTop = logContainer.scrollHeight;
        }
      });
    },
    
    isMobile() {
      return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    onReady(markmap) {
      this.addLog('✅ 思维导图渲染成功');
      this.addLog('Markmap实例: ' + (markmap ? '已创建' : '未创建'));
    },
    
    onError(error) {
      this.addLog('❌ 渲染错误: ' + error.message);
      console.error('Mindmap error:', error);
    },
    
    onNodeClick(node) {
      this.addLog('🖱️ 节点点击: ' + (node.content || '未知节点'));
    },
    
    testBasicRender() {
      this.addLog('🧪 开始基础渲染测试...');
      this.mindmapData = `# 测试数据 ${Date.now()}
## 节点1
- 子节点1
- 子节点2
## 节点2
- 子节点3
- 子节点4`;
    },
    
    testDataChange() {
      this.addLog('🧪 开始数据变更测试...');
      const randomData = [
        '# 随机数据1\n## 分支A\n- 项目1\n- 项目2',
        '# 随机数据2\n## 分支B\n- 内容1\n- 内容2\n## 分支C\n- 详情1',
        '# 随机数据3\n## 测试\n- 功能测试\n- 性能测试\n- 兼容性测试'
      ];
      
      this.mindmapData = randomData[Math.floor(Math.random() * randomData.length)];
    },
    
    clearLogs() {
      this.logs = [];
      this.addLog('日志已清空');
    }
  }
};
</script>

<style lang="scss" scoped>
.mobile-test-page {
  padding: 20rpx;
  background: #f5f5f5;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 30rpx;
  
  .title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
  }
}

.content {
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.log-section {
  margin-top: 40rpx;
  
  .log-title {
    font-size: 28rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 20rpx;
  }
  
  .log-container {
    height: 300rpx;
    border: 2rpx solid #e5e5e5;
    border-radius: 10rpx;
    padding: 20rpx;
    background: #fafafa;
    
    .log-item {
      margin-bottom: 10rpx;
      
      .log-text {
        font-size: 24rpx;
        color: #666;
        line-height: 1.4;
      }
    }
  }
}

.button-group {
  display: flex;
  gap: 20rpx;
  margin-top: 40rpx;
  flex-wrap: wrap;
  
  .test-btn {
    flex: 1;
    min-width: 200rpx;
    height: 80rpx;
    background: #007aff;
    color: #fff;
    border: none;
    border-radius: 10rpx;
    font-size: 26rpx;
    
    &:active {
      background: #0056cc;
    }
  }
}

// 移动端适配
@media (max-width: 768px) {
  .mobile-test-page {
    padding: 10rpx;
  }
  
  .content {
    padding: 20rpx;
  }
  
  .button-group {
    .test-btn {
      min-width: 150rpx;
      height: 70rpx;
      font-size: 24rpx;
    }
  }
}
</style>
