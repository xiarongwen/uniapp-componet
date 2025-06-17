<template>
  <x-mindmap :data="mindmapData" :height="400" />
</template>

<script>
import XMindmap from '@/uni_modules/x-mindmap/components/x-mindmap/x-mindmap.vue'

export default {
  components: { XMindmap },
  data() {
    return {
      mindmapData: `# 我的思维导图
## 分支1
- 子项1
- 子项2`
    }
  }
}
</script>