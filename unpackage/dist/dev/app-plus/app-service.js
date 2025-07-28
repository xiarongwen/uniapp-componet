if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const block0 = (Comp) => {
    (Comp.$renderjs || (Comp.$renderjs = [])).push("markmap");
    (Comp.$renderjsModules || (Comp.$renderjsModules = {}))["markmap"] = "62e994b9";
  };
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$2 = {
    name: "XMindmap",
    props: {
      // 思维导图数据（markdown格式）
      data: {
        type: String,
        default: ""
      },
      // 容器高度
      height: {
        type: Number,
        default: 400
      },
      // 容器宽度
      width: {
        type: [Number, String],
        default: "100%"
      },
      // 主题配置
      theme: {
        type: String,
        default: "default"
        // default, dark, colorful, minimal
      },
      // 自定义颜色数组
      colors: {
        type: Array,
        default: () => [
          "#007aff",
          "#34c759",
          "#ff9500",
          "#ff3b30",
          "#af52de",
          "#5ac8fa",
          "#ffcc00",
          "#ff2d92"
        ]
      },
      // 动画持续时间
      duration: {
        type: Number,
        default: 500
      },
      // 最大节点宽度
      maxWidth: {
        type: Number,
        default: 300
      },
      // 初始展开层级 (-1表示全部展开)
      initialExpandLevel: {
        type: Number,
        default: -1
      },
      // 节点间距配置
      spacing: {
        type: Object,
        default: () => ({
          horizontal: 80,
          vertical: 5,
          paddingX: 8
        })
      },
      // 字体配置
      font: {
        type: Object,
        default: () => ({
          family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          baseSize: 14,
          maxSize: 20,
          minSize: 12
        })
      },
      // 是否显示工具栏
      showToolbar: {
        type: Boolean,
        default: false
      },
      // 是否可缩放
      zoomable: {
        type: Boolean,
        default: true
      },
      // 是否可拖拽
      draggable: {
        type: Boolean,
        default: true
      },
      // 自定义样式
      customStyle: {
        type: Object,
        default: () => ({})
      },
      // 是否可编辑
      editable: {
        type: Boolean,
        default: false
      },
      // 编辑模式下的配置
      editConfig: {
        type: Object,
        default: () => ({
          allowAddNode: true,
          allowDeleteNode: true,
          allowEditText: true,
          allowDragNode: false
        })
      }
    },
    emits: [
      "node-click",
      "node-expand",
      "node-collapse",
      "ready",
      "error",
      "node-add",
      "node-delete",
      "node-edit",
      "data-change",
      "edit-mode-change"
    ],
    computed: {
      containerStyle() {
        const style = {
          width: typeof this.width === "number" ? `${this.width}px` : this.width,
          height: `${this.height}px`,
          ...this.customStyle
        };
        return style;
      },
      mindmapStyle() {
        const toolbarHeight = this.showToolbar ? 50 : 0;
        return {
          height: `${this.height - toolbarHeight}px`
        };
      }
    },
    methods: {
      // 工具栏方法
      zoomIn() {
        this.$emit("zoom-in");
        if (this.$refs.markmap) {
          this.$refs.markmap.zoomIn();
        }
      },
      zoomOut() {
        this.$emit("zoom-out");
        if (this.$refs.markmap) {
          this.$refs.markmap.zoomOut();
        }
      },
      resetZoom() {
        this.$emit("reset-zoom");
        if (this.$refs.markmap) {
          this.$refs.markmap.resetZoom();
        }
      },
      expandAll() {
        this.$emit("expand-all");
        if (this.$refs.markmap) {
          this.$refs.markmap.expandAll();
        }
      },
      collapseAll() {
        this.$emit("collapse-all");
        if (this.$refs.markmap) {
          this.$refs.markmap.collapseAll();
        }
      },
      exportSVG() {
        this.$emit("export-svg");
        if (this.$refs.markmap) {
          this.$refs.markmap.exportSVG();
        }
      },
      // 编辑功能方法
      toggleEditMode() {
        this.editMode = !this.editMode;
        this.selectedNode = null;
        this.editingNode = null;
        this.$emit("edit-mode-change", this.editMode);
        if (this.$refs.markmap) {
          this.$refs.markmap.setEditMode(this.editMode);
        }
      },
      addNode() {
        if (!this.editMode)
          return;
        const newNodeText = "新节点";
        this.$emit("node-add", {
          parentNode: this.selectedNode,
          text: newNodeText
        });
        if (this.$refs.markmap) {
          this.$refs.markmap.addNode(this.selectedNode, newNodeText);
        }
      },
      deleteNode() {
        if (!this.editMode || !this.selectedNode)
          return;
        this.$emit("node-delete", this.selectedNode);
        if (this.$refs.markmap) {
          this.$refs.markmap.deleteNode(this.selectedNode);
        }
        this.selectedNode = null;
      },
      editNodeText(node, newText) {
        if (!this.editMode)
          return;
        this.$emit("node-edit", {
          node,
          oldText: node.content,
          newText
        });
        if (this.$refs.markmap) {
          this.$refs.markmap.editNode(node, newText);
        }
      },
      selectNode(node) {
        this.selectedNode = node;
        this.$emit("node-click", node);
      }
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
          node: null
        }
      };
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["x-mindmap-wrapper", [`theme-${$props.theme}`, { "with-toolbar": $props.showToolbar }]]),
        style: vue.normalizeStyle($options.containerStyle)
      },
      [
        vue.createCommentVNode(" 工具栏 "),
        $props.showToolbar ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "x-mindmap-toolbar"
        }, [
          vue.createElementVNode("view", { class: "toolbar-group" }, [
            vue.createElementVNode("button", {
              class: "toolbar-btn",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.zoomIn && $options.zoomIn(...args)),
              disabled: !$props.zoomable
            }, [
              vue.createElementVNode("text", { class: "btn-icon" }, "+")
            ], 8, ["disabled"]),
            vue.createElementVNode("button", {
              class: "toolbar-btn",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.zoomOut && $options.zoomOut(...args)),
              disabled: !$props.zoomable
            }, [
              vue.createElementVNode("text", { class: "btn-icon" }, "-")
            ], 8, ["disabled"]),
            vue.createElementVNode("button", {
              class: "toolbar-btn",
              onClick: _cache[2] || (_cache[2] = (...args) => $options.resetZoom && $options.resetZoom(...args)),
              disabled: !$props.zoomable
            }, [
              vue.createElementVNode("text", { class: "btn-icon" }, "⌂")
            ], 8, ["disabled"])
          ]),
          vue.createElementVNode("view", { class: "toolbar-group" }, [
            vue.createElementVNode("button", {
              class: "toolbar-btn",
              onClick: _cache[3] || (_cache[3] = (...args) => $options.expandAll && $options.expandAll(...args))
            }, [
              vue.createElementVNode("text", { class: "btn-icon" }, "⊞")
            ]),
            vue.createElementVNode("button", {
              class: "toolbar-btn",
              onClick: _cache[4] || (_cache[4] = (...args) => $options.collapseAll && $options.collapseAll(...args))
            }, [
              vue.createElementVNode("text", { class: "btn-icon" }, "⊟")
            ])
          ]),
          $props.editable ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "toolbar-group"
          }, [
            vue.createElementVNode(
              "button",
              {
                class: vue.normalizeClass(["toolbar-btn", { active: $data.editMode }]),
                onClick: _cache[5] || (_cache[5] = (...args) => $options.toggleEditMode && $options.toggleEditMode(...args))
              },
              [
                vue.createElementVNode("text", { class: "btn-icon" }, "✎")
              ],
              2
              /* CLASS */
            ),
            vue.createElementVNode("button", {
              class: "toolbar-btn",
              onClick: _cache[6] || (_cache[6] = (...args) => $options.addNode && $options.addNode(...args)),
              disabled: !$data.editMode
            }, [
              vue.createElementVNode("text", { class: "btn-icon" }, "⊕")
            ], 8, ["disabled"]),
            vue.createElementVNode("button", {
              class: "toolbar-btn",
              onClick: _cache[7] || (_cache[7] = (...args) => $options.deleteNode && $options.deleteNode(...args)),
              disabled: !$data.editMode || !$data.selectedNode
            }, [
              vue.createElementVNode("text", { class: "btn-icon" }, "⊖")
            ], 8, ["disabled"])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "toolbar-group" }, [
            vue.createElementVNode("button", {
              class: "toolbar-btn",
              onClick: _cache[8] || (_cache[8] = (...args) => $options.exportSVG && $options.exportSVG(...args))
            }, [
              vue.createElementVNode("text", { class: "btn-icon" }, "↓")
            ])
          ])
        ])) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" 思维导图容器 "),
        vue.createElementVNode("view", {
          class: "markmap-container",
          data: vue.wp($props.data),
          theme: vue.wp($props.theme),
          colors: vue.wp($props.colors),
          spacing: vue.wp($props.spacing),
          font: vue.wp($props.font),
          duration: $props.duration,
          "max-width": $props.maxWidth,
          "initial-expand-level": $props.initialExpandLevel,
          zoomable: $props.zoomable,
          draggable: $props.draggable,
          editable: $props.editable,
          "change:data": _ctx.markmap.init,
          "change:theme": _ctx.markmap.updateTheme,
          "change:colors": _ctx.markmap.updateColors,
          "change:spacing": _ctx.markmap.updateSpacing,
          "change:font": _ctx.markmap.updateFont,
          style: vue.normalizeStyle($options.mindmapStyle)
        }, null, 12, ["data", "theme", "colors", "spacing", "font", "duration", "max-width", "initial-expand-level", "zoomable", "draggable", "editable", "change:data", "change:theme", "change:colors", "change:spacing", "change:font"])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  if (typeof block0 === "function")
    block0(_sfc_main$2);
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-c6d39596"], ["__file", "/Users/it/study/x-mindmap/uni_modules/x-mindmap/components/x-mindmap/x-mindmap.vue"]]);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const _sfc_main$1 = {
    components: { XMindmap: __easycom_0 },
    data() {
      return {
        mindmapData: `# 我的思维导图
## 分支1
- 子项1
- 子项2`
      };
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_x_mindmap = resolveEasycom(vue.resolveDynamicComponent("x-mindmap"), __easycom_0);
    return vue.openBlock(), vue.createBlock(_component_x_mindmap, {
      data: $data.mindmapData,
      height: 400
    }, null, 8, ["data"]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "/Users/it/study/x-mindmap/pages/index/index.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/it/study/x-mindmap/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
