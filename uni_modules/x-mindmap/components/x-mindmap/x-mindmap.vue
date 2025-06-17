<template>
    <view
      class="x-mindmap-wrapper"
      :class="[`theme-${theme}`, { 'with-toolbar': showToolbar }]"
      :style="containerStyle"
    >
      <!-- 工具栏 -->
      <view v-if="showToolbar" class="x-mindmap-toolbar">
        <view class="toolbar-group">
          <button class="toolbar-btn" @click="zoomIn" :disabled="!zoomable">
            <text class="btn-icon">+</text>
          </button>
          <button class="toolbar-btn" @click="zoomOut" :disabled="!zoomable">
            <text class="btn-icon">-</text>
          </button>
          <button class="toolbar-btn" @click="resetZoom" :disabled="!zoomable">
            <text class="btn-icon">⌂</text>
          </button>
          </view>
        <view class="toolbar-group">
          <button class="toolbar-btn" @click="expandAll">
            <text class="btn-icon">⊞</text>
          </button>
          <button class="toolbar-btn" @click="collapseAll">
            <text class="btn-icon">⊟</text>
          </button>
        </view>
        <view class="toolbar-group" v-if="editable">
          <button class="toolbar-btn" @click="toggleEditMode" :class="{ active: editMode }">
            <text class="btn-icon">✎</text>
          </button>
          <button class="toolbar-btn" @click="addNode" :disabled="!editMode">
            <text class="btn-icon">⊕</text>
          </button>
          <button class="toolbar-btn" @click="deleteNode" :disabled="!editMode || !selectedNode">
            <text class="btn-icon">⊖</text>
          </button>
        </view>
        <view class="toolbar-group">
          <button class="toolbar-btn" @click="exportSVG">
            <text class="btn-icon">↓</text>
          </button>
        </view>
      </view>

      <!-- 思维导图容器 -->
      <view
        class="markmap-container"
        :data="data"
        :theme="theme"
        :colors="colors"
        :spacing="spacing"
        :font="font"
        :duration="duration"
        :max-width="maxWidth"
        :initial-expand-level="initialExpandLevel"
        :zoomable="zoomable"
        :draggable="draggable"
        :editable="editable"
        :change:data="markmap.init"
        :change:theme="markmap.updateTheme"
        :change:colors="markmap.updateColors"
        :change:spacing="markmap.updateSpacing"
        :change:font="markmap.updateFont"
        :style="mindmapStyle"
      >
      </view>
    </view>
  </template>
  
  <script>
  export default {
    name: 'XMindmap',
    props: {
      // 思维导图数据（markdown格式）
      data: {
        type: String,
        default: '',
      },
      // 容器高度
      height: {
        type: Number,
        default: 400,
      },
      // 容器宽度
      width: {
        type: [Number, String],
        default: '100%',
      },
      // 主题配置
      theme: {
        type: String,
        default: 'default', // default, dark, colorful, minimal
      },
      // 自定义颜色数组
      colors: {
        type: Array,
        default: () => [
          '#007aff', '#34c759', '#ff9500', '#ff3b30',
          '#af52de', '#5ac8fa', '#ffcc00', '#ff2d92'
        ],
      },
      // 动画持续时间
      duration: {
        type: Number,
        default: 500,
      },
      // 最大节点宽度
      maxWidth: {
        type: Number,
        default: 300,
      },
      // 初始展开层级 (-1表示全部展开)
      initialExpandLevel: {
        type: Number,
        default: -1,
      },
      // 节点间距配置
      spacing: {
        type: Object,
        default: () => ({
          horizontal: 80,
          vertical: 5,
          paddingX: 8,
        }),
      },
      // 字体配置
      font: {
        type: Object,
        default: () => ({
          family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          baseSize: 14,
          maxSize: 20,
          minSize: 12,
        }),
      },
      // 是否显示工具栏
      showToolbar: {
        type: Boolean,
        default: false,
      },
      // 是否可缩放
      zoomable: {
        type: Boolean,
        default: true,
      },
      // 是否可拖拽
      draggable: {
        type: Boolean,
        default: true,
      },
      // 自定义样式
      customStyle: {
        type: Object,
        default: () => ({}),
      },
      // 是否可编辑
      editable: {
        type: Boolean,
        default: false,
      },
      // 编辑模式下的配置
      editConfig: {
        type: Object,
        default: () => ({
          allowAddNode: true,
          allowDeleteNode: true,
          allowEditText: true,
          allowDragNode: false,
        }),
      },
    },
    emits: [
      'node-click', 'node-expand', 'node-collapse', 'ready', 'error',
      'node-add', 'node-delete', 'node-edit', 'data-change', 'edit-mode-change'
    ],
    computed: {
      containerStyle() {
        const style = {
          width: typeof this.width === 'number' ? `${this.width}px` : this.width,
          height: `${this.height}px`,
          ...this.customStyle,
        };
        return style;
      },
      mindmapStyle() {
        const toolbarHeight = this.showToolbar ? 50 : 0;
        return {
          height: `${this.height - toolbarHeight}px`,
        };
      },
    },
    methods: {
      // 工具栏方法
      zoomIn() {
        this.$emit('zoom-in');
        // 通过 renderjs 调用缩放方法
        if (this.$refs.markmap) {
          this.$refs.markmap.zoomIn();
        }
      },
      zoomOut() {
        this.$emit('zoom-out');
        if (this.$refs.markmap) {
          this.$refs.markmap.zoomOut();
        }
      },
      resetZoom() {
        this.$emit('reset-zoom');
        if (this.$refs.markmap) {
          this.$refs.markmap.resetZoom();
        }
      },
      expandAll() {
        this.$emit('expand-all');
        if (this.$refs.markmap) {
          this.$refs.markmap.expandAll();
        }
      },
      collapseAll() {
        this.$emit('collapse-all');
        if (this.$refs.markmap) {
          this.$refs.markmap.collapseAll();
        }
      },
      exportSVG() {
        this.$emit('export-svg');
        if (this.$refs.markmap) {
          this.$refs.markmap.exportSVG();
        }
      },

      // 编辑功能方法
      toggleEditMode() {
        this.editMode = !this.editMode;
        this.selectedNode = null;
        this.editingNode = null;
        this.$emit('edit-mode-change', this.editMode);

        // 通知 renderjs 切换编辑模式
        if (this.$refs.markmap) {
          this.$refs.markmap.setEditMode(this.editMode);
        }
      },

      addNode() {
        if (!this.editMode) return;

        const newNodeText = '新节点';
        this.$emit('node-add', {
          parentNode: this.selectedNode,
          text: newNodeText
        });

        // 通知 renderjs 添加节点
        if (this.$refs.markmap) {
          this.$refs.markmap.addNode(this.selectedNode, newNodeText);
        }
      },

      deleteNode() {
        if (!this.editMode || !this.selectedNode) return;

        this.$emit('node-delete', this.selectedNode);

        // 通知 renderjs 删除节点
        if (this.$refs.markmap) {
          this.$refs.markmap.deleteNode(this.selectedNode);
        }

        this.selectedNode = null;
      },

      editNodeText(node, newText) {
        if (!this.editMode) return;

        this.$emit('node-edit', {
          node: node,
          oldText: node.content,
          newText: newText
        });

        // 通知 renderjs 编辑节点
        if (this.$refs.markmap) {
          this.$refs.markmap.editNode(node, newText);
        }
      },

      selectNode(node) {
        this.selectedNode = node;
        this.$emit('node-click', node);
      },
    },
    data() {
      return {
        editMode: false,
        selectedNode: null,
        editingNode: null,
        nodeContextMenu: {
          show: false,
          x: 0,
          y: 0,
          node: null,
        },
      }
    },
  };
  </script>
  
  <script module="markmap" lang="renderjs">
  // 使用本地安装的markmap库
  import { Transformer } from 'markmap-lib';
  import { Markmap, loadCSS, loadJS } from 'markmap-view';
  
  let mm;
  let transformer;
  let timer;
  
  export default {
    data() {
      return {
        currentTheme: 'default',
        currentColors: [],
        currentSpacing: {},
        currentFont: {},
        editMode: false,
        selectedNode: null,
        currentData: null,
        isEditable: false,
      }
    },
    methods: {
      init(data, ownerInstance) {
        if (!data || typeof data !== 'string') {
          console.warn('Markmap: Invalid data provided');
          return;
        }

        // 保存组件实例引用
        this.ownerInstance = ownerInstance;

        // 从 DOM 元素获取配置
        const container = document.querySelector(".markmap-container");
        if (container) {
          // 获取当前配置，确保有默认值
          this.currentTheme = container.getAttribute('theme') || 'default';
          this.isEditable = container.getAttribute('editable') === 'true';

          // 解析颜色配置
          try {
            const colorsAttr = container.getAttribute('colors');
            this.currentColors = colorsAttr ? JSON.parse(colorsAttr) : [
              '#007aff', '#34c759', '#ff9500', '#ff3b30',
              '#af52de', '#5ac8fa', '#ffcc00', '#ff2d92'
            ];
          } catch (e) {
            this.currentColors = [
              '#007aff', '#34c759', '#ff9500', '#ff3b30',
              '#af52de', '#5ac8fa', '#ffcc00', '#ff2d92'
            ];
          }

          // 解析间距配置
          try {
            const spacingAttr = container.getAttribute('spacing');
            this.currentSpacing = spacingAttr ? JSON.parse(spacingAttr) : {
              horizontal: 80,
              vertical: 5,
              paddingX: 8,
            };
          } catch (e) {
            this.currentSpacing = {
              horizontal: 80,
              vertical: 5,
              paddingX: 8,
            };
          }

          // 解析字体配置
          try {
            const fontAttr = container.getAttribute('font');
            this.currentFont = fontAttr ? JSON.parse(fontAttr) : {
              family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              baseSize: 14,
              maxSize: 20,
              minSize: 12,
            };
          } catch (e) {
            this.currentFont = {
              family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              baseSize: 14,
              maxSize: 20,
              minSize: 12,
            };
          }
        } else {
          // 如果找不到容器，使用默认配置
          this.currentTheme = 'default';
          this.currentColors = [
            '#007aff', '#34c759', '#ff9500', '#ff3b30',
            '#af52de', '#5ac8fa', '#ffcc00', '#ff2d92'
          ];
          this.currentSpacing = {
            horizontal: 80,
            vertical: 5,
            paddingX: 8,
          };
          this.currentFont = {
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            baseSize: 14,
            maxSize: 20,
            minSize: 12,
          };
        }

        // 清除之前的定时器
        if (timer) {
          clearTimeout(timer);
        }

        // 延迟执行，确保DOM已渲染
        timer = setTimeout(() => {
          this.renderMarkmap(data);
        }, 100);
      },

      // 更新主题
      updateTheme(theme) {
        this.currentTheme = theme;
        if (mm) {
          this.applyTheme();
        }
      },

      // 更新颜色
      updateColors(colors) {
        this.currentColors = colors;
        if (mm) {
          this.updateMarkmapOptions();
        }
      },

      // 更新间距
      updateSpacing(spacing) {
        this.currentSpacing = spacing;
        if (mm) {
          this.updateMarkmapOptions();
        }
      },

      // 更新字体
      updateFont(font) {
        this.currentFont = font;
        if (mm) {
          this.updateMarkmapOptions();
        }
      },
  
      async renderMarkmap(data) {
        try {
          const container = document.querySelector(".markmap-container");
          if (!container) {
            console.error('Markmap container not found');
            return;
          }
  
          // 移除已存在的SVG
          let existingSvg = container.querySelector(".markmap-svg");
          if (existingSvg) {
            container.removeChild(existingSvg);
          }
  
          // 确保容器有有效的尺寸
          const containerRect = container.getBoundingClientRect();
          const containerWidth = Math.max(200, containerRect.width || 400);
          const containerHeight = Math.max(100, containerRect.height || 300);

          // 创建新的SVG元素
          const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svg.setAttribute("class", "markmap-svg");

          // 使用固定像素值而不是百分比，避免 SVGLength 解析错误
          svg.setAttribute('width', containerWidth.toString());
          svg.setAttribute('height', containerHeight.toString());
          svg.style.width = containerWidth + 'px';
          svg.style.height = containerHeight + 'px';
          svg.style.display = "block";
          svg.setAttribute('viewBox', `0 0 ${containerWidth} ${containerHeight}`);
          svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
          container.appendChild(svg);
  
          // 初始化transformer
          if (!transformer) {
            transformer = new Transformer();
          }
  
          // 转换markdown数据
          const { root, features } = transformer.transform(data);
  
          // 获取所需的资源
          const assets = transformer.getUsedAssets(features);

          // 先加载CSS和JS资源，等待加载完成
          const loadPromises = [];

          if (assets.styles && assets.styles.length > 0) {
            loadPromises.push(loadCSS(assets.styles));
          }
          if (assets.scripts && assets.scripts.length > 0) {
            loadPromises.push(loadJS(assets.scripts, {
              getMarkmap: () => ({ Markmap, loadCSS, loadJS })
            }));
          }

          // 等待所有资源加载完成
          if (loadPromises.length > 0) {
            await Promise.all(loadPromises);
            // 额外等待一点时间确保资源完全加载
            await new Promise(resolve => setTimeout(resolve, 100));
          }
  
          // 创建Markmap实例的配置
          const options = this.getMarkmapOptions();

          // 创建markmap实例
          mm = Markmap.create(svg, options, root);

          // 保存当前数据
          this.currentData = root;

          // 等待初始渲染完成
          setTimeout(() => {
            try {
              if (mm) {
                // 修复 SVG 长度错误
                this.fixSVGLengthErrors();

                // 确保所有节点都有有效的坐标
                this.validateNodePositions();

                // 适配容器
                mm.fit();

                // 如果是可编辑模式，添加编辑功能
                if (this.isEditable) {
                  this.setupEditableFeatures(svg);
                }
              }
            } catch (error) {
              console.error('后处理阶段出错:', error);
              // 尝试基本的适配
              if (mm) {
                try {
                  mm.fit();
                } catch (fitError) {
                  console.error('适配容器失败:', fitError);
                }
              }
            }
          }, 200);
  
          // 监听容器大小变化
          if (window.ResizeObserver) {
            const resizeObserver = new ResizeObserver((entries) => {
              if (mm && svg) {
                for (let entry of entries) {
                  const { width, height } = entry.contentRect;
                  const newWidth = Math.max(200, width);
                  const newHeight = Math.max(100, height);

                  // 更新 SVG 尺寸，使用固定像素值
                  svg.setAttribute('width', newWidth.toString());
                  svg.setAttribute('height', newHeight.toString());
                  svg.style.width = newWidth + 'px';
                  svg.style.height = newHeight + 'px';
                  svg.setAttribute('viewBox', `0 0 ${newWidth} ${newHeight}`);

                  // 重新适配
                  setTimeout(() => {
                    if (mm) {
                      mm.fit();
                    }
                  }, 50);
                }
              }
            });
            resizeObserver.observe(container);
          }
  
          console.log('Markmap rendered successfully');

          // 触发ready事件
          if (this.ownerInstance) {
            this.ownerInstance.$emit('ready', mm);
          }

        } catch (error) {
          console.error('Failed to render markmap:', error);
          this.showError(error.message);

          // 触发error事件
          if (this.ownerInstance) {
            this.ownerInstance.$emit('error', error);
          }
        }
      },

      // 获取markmap配置选项
      getMarkmapOptions() {
        const container = document.querySelector(".markmap-container");
        let duration = 500;
        let maxWidth = 300;
        let initialExpandLevel = -1;
        let zoomable = true;
        let draggable = true;

        if (container) {
          duration = parseInt(container.getAttribute('duration')) || 500;
          maxWidth = parseInt(container.getAttribute('max-width')) || 300;
          const expandLevel = container.getAttribute('initial-expand-level');
          initialExpandLevel = expandLevel !== null ? parseInt(expandLevel) : -1;
          zoomable = container.getAttribute('zoomable') !== 'false';
          draggable = container.getAttribute('draggable') !== 'false';
        }

        return {
          duration: duration,
          maxWidth: maxWidth,
          initialExpandLevel: initialExpandLevel,
          paddingX: Math.max(8, (this.currentSpacing && this.currentSpacing.paddingX) || 8),
          spacingHorizontal: Math.max(50, (this.currentSpacing && this.currentSpacing.horizontal) || 80),
          spacingVertical: Math.max(5, (this.currentSpacing && this.currentSpacing.vertical) || 5),
          zoom: zoomable,
          pan: draggable,
          autoFit: true,
          fitRatio: 0.95,
          // 确保容器有最小尺寸
          minWidth: 200,
          minHeight: 100,
          // 自定义颜色方案
          color: (node) => {
            return this.getNodeColor(node);
          },
          // 自定义线宽
          lineWidth: (node) => {
            const depth = (node && typeof node.depth === 'number') ? node.depth : 0;
            return Math.max(1, 4 - depth);
          }
        };
      },

      // 获取节点颜色
      getNodeColor(node) {
        const colors = this.currentColors || [
          '#007aff', '#34c759', '#ff9500', '#ff3b30',
          '#af52de', '#5ac8fa', '#ffcc00', '#ff2d92'
        ];
        const theme = this.currentTheme || 'default';
        const depth = (node && node.depth) || 0;

        if (theme === 'dark') {
          return this.getDarkThemeColor(depth, colors);
        } else if (theme === 'minimal') {
          return this.getMinimalThemeColor(depth);
        }
        return colors[depth % colors.length];
      },

      // 获取节点字体大小
      getNodeFontSize(node) {
        const font = this.currentFont || {
          baseSize: 14,
          maxSize: 20,
          minSize: 12
        };
        const depth = (node && node.depth) || 0;
        const baseFontSize = font.baseSize || 14;
        const maxFontSize = font.maxSize || 20;
        const minFontSize = font.minSize || 12;
        return Math.max(minFontSize, Math.min(maxFontSize, baseFontSize - depth * 2));
      },

      // 暗色主题颜色
      getDarkThemeColor(depth, colors) {
        const darkColors = colors.map(color => {
          // 将颜色调暗
          return this.adjustColorBrightness(color, -0.3);
        });
        return darkColors[depth % darkColors.length];
      },

      // 简约主题颜色
      getMinimalThemeColor(depth) {
        const minimalColors = ['#666', '#888', '#aaa', '#ccc'];
        return minimalColors[depth % minimalColors.length];
      },

      // 调整颜色亮度
      adjustColorBrightness(color, amount) {
        const usePound = color[0] === '#';
        const col = usePound ? color.slice(1) : color;
        const num = parseInt(col, 16);
        let r = (num >> 16) + amount * 255;
        let g = (num >> 8 & 0x00FF) + amount * 255;
        let b = (num & 0x0000FF) + amount * 255;
        r = r > 255 ? 255 : r < 0 ? 0 : r;
        g = g > 255 ? 255 : g < 0 ? 0 : g;
        b = b > 255 ? 255 : b < 0 ? 0 : b;
        return (usePound ? '#' : '') + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
      },

      // 更新markmap选项
      updateMarkmapOptions() {
        if (mm) {
          const options = this.getMarkmapOptions();
          mm.setOptions(options);
        }
      },

      // 应用主题
      applyTheme() {
        const container = document.querySelector(".markmap-container");
        if (container) {
          container.className = `markmap-container theme-${this.currentTheme}`;
        }
        this.updateMarkmapOptions();
      },
  
      // 工具栏功能方法
      zoomIn() {
        if (mm) {
          mm.rescale(1.2);
        }
      },

      zoomOut() {
        if (mm) {
          mm.rescale(0.8);
        }
      },

      resetZoom() {
        if (mm) {
          mm.fit();
        }
      },

      expandAll() {
        if (mm && mm.state && mm.state.data) {
          const data = mm.state.data;
          this.expandNode(data);
          mm.setData(data);
        }
      },

      collapseAll() {
        if (mm && mm.state && mm.state.data) {
          const data = mm.state.data;
          this.collapseNode(data);
          mm.setData(data);
        }
      },

      expandNode(node) {
        if (node.children) {
          node.payload = { ...node.payload, fold: 0 };
          node.children.forEach(child => this.expandNode(child));
        }
      },

      collapseNode(node) {
        if (node.children) {
          node.payload = { ...node.payload, fold: 1 };
          node.children.forEach(child => this.collapseNode(child));
        }
      },

      exportSVG() {
        if (mm && mm.svg) {
          const svgElement = mm.svg.node();
          const serializer = new XMLSerializer();
          const svgString = serializer.serializeToString(svgElement);

          // 创建下载链接
          const blob = new Blob([svgString], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'mindmap.svg';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      },

      // 验证节点位置，修复 NaN 坐标和 SVGLength 错误
      validateNodePositions() {
        const svg = document.querySelector('.markmap-container svg');
        if (!svg) return;

        console.log('开始验证节点位置...');

        // 安全获取属性值的函数
        const safeGetAttribute = (element, attr) => {
          try {
            const value = element.getAttribute(attr);
            if (value === null || value === undefined || value === '' || isNaN(parseFloat(value))) {
              return null;
            }
            return parseFloat(value);
          } catch (error) {
            console.warn(`获取属性 ${attr} 失败:`, error);
            return null;
          }
        };

        // 修复线条的 NaN 坐标
        const lines = svg.querySelectorAll('line');
        let fixedLines = 0;
        lines.forEach((line, index) => {
          try {
            const x1 = safeGetAttribute(line, 'x1');
            const y1 = safeGetAttribute(line, 'y1');
            const x2 = safeGetAttribute(line, 'x2');
            const y2 = safeGetAttribute(line, 'y2');

            if (x1 === null || y1 === null || x2 === null || y2 === null) {
              console.warn(`线条 ${index} 坐标无效: x1=${x1}, y1=${y1}, x2=${x2}, y2=${y2}`);
              // 设置默认值
              line.setAttribute('x1', '0');
              line.setAttribute('y1', '0');
              line.setAttribute('x2', '0');
              line.setAttribute('y2', '0');
              line.style.opacity = '0';
              fixedLines++;
            }
          } catch (error) {
            console.error(`处理线条 ${index} 时出错:`, error);
            line.style.display = 'none';
            fixedLines++;
          }
        });

        // 修复圆圈的 NaN 坐标
        const circles = svg.querySelectorAll('circle');
        let fixedCircles = 0;
        circles.forEach((circle, index) => {
          try {
            const cx = safeGetAttribute(circle, 'cx');
            const cy = safeGetAttribute(circle, 'cy');
            const r = safeGetAttribute(circle, 'r');

            if (cx === null || cy === null) {
              console.warn(`圆圈 ${index} 坐标无效: cx=${cx}, cy=${cy}`);
              circle.setAttribute('cx', '0');
              circle.setAttribute('cy', '0');
              if (r === null) {
                circle.setAttribute('r', '3');
              }
              circle.style.opacity = '0';
              fixedCircles++;
            }
          } catch (error) {
            console.error(`处理圆圈 ${index} 时出错:`, error);
            circle.style.display = 'none';
            fixedCircles++;
          }
        });

        // 修复文本的 NaN 坐标
        const texts = svg.querySelectorAll('text');
        let fixedTexts = 0;
        texts.forEach((text, index) => {
          try {
            const x = safeGetAttribute(text, 'x');
            const y = safeGetAttribute(text, 'y');

            if (x === null || y === null) {
              console.warn(`文本 ${index} 坐标无效: x=${x}, y=${y}`);
              text.setAttribute('x', '0');
              text.setAttribute('y', '0');
              text.style.opacity = '0';
              fixedTexts++;
            }
          } catch (error) {
            console.error(`处理文本 ${index} 时出错:`, error);
            text.style.display = 'none';
            fixedTexts++;
          }
        });

        if (fixedLines > 0 || fixedCircles > 0 || fixedTexts > 0) {
          console.log(`修复了 ${fixedLines} 条线, ${fixedCircles} 个圆圈, ${fixedTexts} 个文本的 NaN 坐标`);

          // 延迟重新渲染
          setTimeout(() => {
            if (mm) {
              console.log('重新适配容器...');
              mm.fit();
            }
          }, 100);
        }
      },

      // 修复 SVG 相对长度错误
      fixSVGLengthErrors() {
        const svg = document.querySelector('.markmap-container svg');
        if (!svg) return;

        console.log('修复 SVG 长度错误...');

        try {
          // 确保 SVG 有固定的尺寸属性
          const container = document.querySelector(".markmap-container");
          if (container) {
            const rect = container.getBoundingClientRect();
            const width = Math.max(200, rect.width || 400);
            const height = Math.max(100, rect.height || 300);

            svg.setAttribute('width', width.toString());
            svg.setAttribute('height', height.toString());
            svg.style.width = width + 'px';
            svg.style.height = height + 'px';

            console.log(`SVG 尺寸设置为: ${width} x ${height}`);
          }

          // 移除可能导致问题的相对单位
          const allElements = svg.querySelectorAll('*');
          allElements.forEach(element => {
            try {
              // 检查并修复可能的相对长度属性
              const attributes = ['width', 'height', 'x', 'y', 'cx', 'cy', 'r', 'x1', 'y1', 'x2', 'y2'];
              attributes.forEach(attr => {
                const value = element.getAttribute(attr);
                if (value && (value.includes('%') || value.includes('em') || value.includes('rem'))) {
                  console.warn(`移除相对单位属性: ${attr}=${value}`);
                  element.removeAttribute(attr);
                }
              });
            } catch (error) {
              // 忽略单个元素的错误
            }
          });

        } catch (error) {
          console.error('修复 SVG 长度错误失败:', error);
        }
      },

      // 设置可编辑功能
      setupEditableFeatures(svg) {
        // 添加节点点击事件
        svg.on('click', (event) => {
          if (!this.editMode) return;

          const target = event.target;
          const nodeElement = target.closest('.markmap-node');
          if (nodeElement) {
            const nodeData = nodeElement.__data__;
            this.selectNode(nodeData);

            // 双击编辑
            if (event.detail === 2) {
              this.startEditNode(nodeData, nodeElement);
            }
          }
        });

        // 添加右键菜单
        svg.on('contextmenu', (event) => {
          if (!this.editMode) return;

          event.preventDefault();
          const target = event.target;
          const nodeElement = target.closest('.markmap-node');
          if (nodeElement) {
            const nodeData = nodeElement.__data__;
            this.showContextMenu(event, nodeData);
          }
        });
      },

      // 设置编辑模式
      setEditMode(enabled) {
        this.editMode = enabled;
        const container = document.querySelector(".markmap-container");
        if (container) {
          if (enabled) {
            container.classList.add('edit-mode');
          } else {
            container.classList.remove('edit-mode');
            this.selectedNode = null;
          }
        }
      },

      // 选择节点
      selectNode(node) {
        // 移除之前的选中状态
        const prevSelected = document.querySelector('.markmap-node.selected');
        if (prevSelected) {
          prevSelected.classList.remove('selected');
        }

        // 添加新的选中状态
        const nodeElements = document.querySelectorAll('.markmap-node');
        nodeElements.forEach(el => {
          if (el.__data__ === node) {
            el.classList.add('selected');
          }
        });

        this.selectedNode = node;

        // 通知主组件
        if (this.ownerInstance) {
          this.ownerInstance.selectNode(node);
        }
      },

      // 开始编辑节点
      startEditNode(node, element) {
        const textElement = element.querySelector('text');
        if (!textElement) return;

        const rect = textElement.getBoundingClientRect();
        const input = document.createElement('input');
        input.type = 'text';
        input.value = this.getNodeText(node);
        input.style.position = 'fixed';
        input.style.left = rect.left + 'px';
        input.style.top = rect.top + 'px';
        input.style.width = Math.max(100, rect.width) + 'px';
        input.style.height = rect.height + 'px';
        input.style.fontSize = window.getComputedStyle(textElement).fontSize;
        input.style.fontFamily = window.getComputedStyle(textElement).fontFamily;
        input.style.border = '2px solid #007aff';
        input.style.borderRadius = '4px';
        input.style.padding = '2px 4px';
        input.style.zIndex = '9999';
        input.style.background = '#fff';

        document.body.appendChild(input);
        input.focus();
        input.select();

        const finishEdit = () => {
          const newText = input.value.trim();
          if (newText && newText !== this.getNodeText(node)) {
            this.updateNodeText(node, newText);
          }
          document.body.removeChild(input);
        };

        input.addEventListener('blur', finishEdit);
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            finishEdit();
          } else if (e.key === 'Escape') {
            document.body.removeChild(input);
          }
        });
      },

      // 获取节点文本
      getNodeText(node) {
        return node.content || '';
      },

      // 更新节点文本
      updateNodeText(node, newText) {
        node.content = newText;

        // 重新渲染
        if (mm) {
          mm.setData(this.currentData);
        }

        // 通知主组件
        if (this.ownerInstance) {
          this.ownerInstance.editNodeText(node, newText);
          this.ownerInstance.$emit('data-change', this.dataToMarkdown(this.currentData));
        }
      },

      // 添加节点
      addNode(parentNode, text) {
        if (!parentNode) {
          parentNode = this.currentData; // 根节点
        }

        const newNode = {
          content: text || '新节点',
          children: [],
          payload: {
            tag: 'li'
          }
        };

        if (!parentNode.children) {
          parentNode.children = [];
        }
        parentNode.children.push(newNode);

        // 重新渲染
        if (mm) {
          mm.setData(this.currentData);
        }

        // 通知主组件
        if (this.ownerInstance) {
          this.ownerInstance.$emit('data-change', this.dataToMarkdown(this.currentData));
        }
      },

      // 删除节点
      deleteNode(nodeToDelete) {
        if (!nodeToDelete || nodeToDelete === this.currentData) {
          return; // 不能删除根节点
        }

        const deleteFromParent = (parent) => {
          if (parent.children) {
            const index = parent.children.indexOf(nodeToDelete);
            if (index > -1) {
              parent.children.splice(index, 1);
              return true;
            }

            for (let child of parent.children) {
              if (deleteFromParent(child)) {
                return true;
              }
            }
          }
          return false;
        };

        deleteFromParent(this.currentData);

        // 重新渲染
        if (mm) {
          mm.setData(this.currentData);
        }

        // 通知主组件
        if (this.ownerInstance) {
          this.ownerInstance.$emit('data-change', this.dataToMarkdown(this.currentData));
        }
      },

      // 将数据转换为 Markdown
      dataToMarkdown(node, level = 1) {
        let markdown = '';
        const prefix = '#'.repeat(level);

        if (node.content) {
          markdown += `${prefix} ${node.content}\n`;
        }

        if (node.children && node.children.length > 0) {
          for (let child of node.children) {
            if (child.payload && child.payload.tag === 'li') {
              markdown += `${'  '.repeat(level - 1)}- ${child.content}\n`;
              if (child.children && child.children.length > 0) {
                for (let subChild of child.children) {
                  markdown += this.dataToMarkdown(subChild, level + 1);
                }
              }
            } else {
              markdown += this.dataToMarkdown(child, level + 1);
            }
          }
        }

        return markdown;
      },

      showError(message) {
        const container = document.querySelector(".markmap-container");
        if (container) {
          container.innerHTML = `
            <div style="
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100%;
              background: #f5f5f5;
              border-radius: 8px;
              color: #666;
              font-size: 14px;
              text-align: center;
              padding: 20px;
            ">
              <div>
                <div style="font-size: 16px; margin-bottom: 8px;">⚠️ 思维导图渲染失败</div>
                <div style="font-size: 12px; color: #999;">${message}</div>
                <div style="font-size: 12px; color: #999; margin-top: 8px;">请检查数据格式或刷新页面重试</div>
              </div>
            </div>
          `;
        }
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .x-mindmap-wrapper {
    position: relative;
    border-radius: 12rpx;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &.with-toolbar {
      .markmap-container {
        border-top: none;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    }
  }

  .x-mindmap-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    background: #f8f9fa;
    border: 1px solid #e5e5e5;
    border-bottom: none;
    border-top-left-radius: 12rpx;
    border-top-right-radius: 12rpx;

    .toolbar-group {
      display: flex;
      gap: 8px;
    }

    .toolbar-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: 1px solid #ddd;
      border-radius: 6px;
      background: #fff;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: #f0f0f0;
        border-color: #ccc;
      }

      &:active {
        background: #e0e0e0;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;

        &:hover {
          background: #fff;
          border-color: #ddd;
        }
      }

      &.active {
        background: #007aff;
        border-color: #007aff;

        .btn-icon {
          color: #fff;
        }
      }

      .btn-icon {
        font-size: 16px;
        font-weight: bold;
        color: #666;
      }
    }
  }

  .markmap-container {
    width: 100%;
    border: 1px solid #e5e5e5;
    border-radius: 12rpx;
    background: #fff;
    overflow: hidden;
    position: relative;
  
    :deep(.markmap-svg) {
      width: 100%;
      height: 100%;
      display: block;
  
      // 确保SVG内容可见
      * {
        vector-effect: non-scaling-stroke;
      }
  
      // 连接线样式
      .markmap-link {
        fill: none;
        stroke: #ccc;
        stroke-width: 2px;
        stroke-opacity: 0.8;
      }
  
      // 节点样式
      .markmap-node {
        cursor: pointer;

        > circle {
          fill: #fff;
          stroke-width: 2px;
        }

        > text {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          fill: #333;
          text-anchor: start;
          dominant-baseline: central;
        }

        // 选中状态
        &.selected {
          > circle {
            stroke: #007aff;
            stroke-width: 3px;
            fill: rgba(0, 122, 255, 0.1);
          }

          > text {
            fill: #007aff;
            font-weight: bold;
          }
        }
      }
  
      // 确保路径元素可见
      path {
        vector-effect: non-scaling-stroke;
      }
    }
  
    // 加载状态样式
    &::before {
      content: '正在渲染思维导图...';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #666;
      font-size: 14px;
      z-index: 1;
      white-space: nowrap;
    }
  
    // 当有内容时隐藏加载文字
    &:has(.markmap-svg) {
      &::before {
        display: none;
      }
    }

    // 编辑模式样式
    &.edit-mode {
      border-color: #007aff;
      box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.2);

      .markmap-node {
        cursor: pointer;

        &:hover {
          > circle {
            stroke: #007aff;
            stroke-width: 2px;
            fill: rgba(0, 122, 255, 0.05);
          }
        }
      }
    }
  }
  
  // 主题样式
  .theme-dark {
    .x-mindmap-toolbar {
      background: #2d3748;
      border-color: #4a5568;

      .toolbar-btn {
        background: #4a5568;
        border-color: #718096;

        &:hover {
          background: #718096;
        }

        .btn-icon {
          color: #e2e8f0;
        }
      }
    }

    .markmap-container {
      background: #1a202c;
      border-color: #4a5568;

      &::before {
        color: #a0aec0;
      }
    }
  }

  .theme-minimal {
    .x-mindmap-toolbar {
      background: #fafafa;
      border-color: #f0f0f0;

      .toolbar-btn {
        border-color: #e0e0e0;

        .btn-icon {
          color: #888;
        }
      }
    }

    .markmap-container {
      border-color: #f0f0f0;
      box-shadow: none;
    }
  }

  .theme-colorful {
    .x-mindmap-toolbar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-color: #667eea;

      .toolbar-btn {
        background: rgba(255, 255, 255, 0.9);
        border-color: rgba(255, 255, 255, 0.3);

        &:hover {
          background: rgba(255, 255, 255, 1);
        }

        .btn-icon {
          color: #667eea;
        }
      }
    }
  }

  // 响应式设计
  @media (max-width: 768px) {
    .x-mindmap-wrapper {
      border-radius: 8rpx;
    }

    .x-mindmap-toolbar {
      padding: 6px 8px;
      border-top-left-radius: 8rpx;
      border-top-right-radius: 8rpx;

      .toolbar-btn {
        width: 28px;
        height: 28px;

        .btn-icon {
          font-size: 14px;
        }
      }
    }

    .markmap-container {
      border-radius: 8rpx;
    }
  }
  </style>
  