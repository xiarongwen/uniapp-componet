#!/usr/bin/env node

// 验证 X-Mindmap 插件的完整性和功能
const fs = require('fs');
const path = require('path');

console.log('🔍 验证 X-Mindmap 插件...\n');

// 检查必要文件
const requiredFiles = [
  'package.json',
  'components/x-mindmap/x-mindmap.vue',
  'example/demo.vue',
  'readme.md',
  'changelog.md',
  'config.js'
];

console.log('📁 检查文件结构...');
let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - 缺失`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log('\n❌ 文件结构检查失败');
  process.exit(1);
}

// 检查依赖
console.log('\n📦 检查依赖...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = {
    'markmap-lib': '^0.18.12',
    'markmap-view': '^0.18.12',
    'markmap-common': '^0.18.9',
    'd3': '^7.9.0'
  };

  let depsOk = true;
  Object.entries(requiredDeps).forEach(([dep, version]) => {
    if (packageJson.dependencies[dep]) {
      console.log(`✅ ${dep}: ${packageJson.dependencies[dep]}`);
    } else {
      console.log(`❌ ${dep}: 缺失`);
      depsOk = false;
    }
  });

  if (!depsOk) {
    console.log('\n❌ 依赖检查失败');
    process.exit(1);
  }
} catch (error) {
  console.log(`❌ 无法读取 package.json: ${error.message}`);
  process.exit(1);
}

// 检查 node_modules
console.log('\n🔧 检查已安装的依赖...');
const nodeModulesPath = 'node_modules';
if (fs.existsSync(nodeModulesPath)) {
  const installedDeps = ['markmap-lib', 'markmap-view', 'markmap-common', 'd3'];
  let installedOk = true;
  
  installedDeps.forEach(dep => {
    const depPath = path.join(nodeModulesPath, dep);
    if (fs.existsSync(depPath)) {
      console.log(`✅ ${dep} 已安装`);
    } else {
      console.log(`❌ ${dep} 未安装`);
      installedOk = false;
    }
  });

  if (!installedOk) {
    console.log('\n⚠️  部分依赖未安装，请运行: pnpm install');
  }
} else {
  console.log('⚠️  node_modules 不存在，请运行: pnpm install');
}

// 测试核心功能
console.log('\n🧪 测试核心功能...');
try {
  const { Transformer } = require('./node_modules/markmap-lib/dist/index.js');
  
  const transformer = new Transformer();
  const testData = `# 测试
## 分支1
- 项目1
- 项目2
## 分支2
- 项目3`;

  const result = transformer.transform(testData);

  console.log('转换结果:', JSON.stringify(result.root, null, 2));

  if (result && result.root && result.root.content) {
    console.log('✅ 数据转换功能正常');
    console.log(`根节点内容: "${result.root.content}"`);
  } else {
    console.log('❌ 数据转换功能异常');
    console.log('结果:', result);
    process.exit(1);
  }

  const assets = transformer.getUsedAssets(result.features);
  console.log('✅ 资源获取功能正常');
  
} catch (error) {
  console.log(`❌ 核心功能测试失败: ${error.message}`);
  process.exit(1);
}

// 检查组件语法
console.log('\n📝 检查组件语法...');
try {
  const vueContent = fs.readFileSync('components/x-mindmap/x-mindmap.vue', 'utf8');
  
  // 基本语法检查
  const hasTemplate = vueContent.includes('<template>');
  const hasScript = vueContent.includes('<script>');
  const hasStyle = vueContent.includes('<style');
  const hasRenderjs = vueContent.includes('renderjs');

  if (hasTemplate && hasScript && hasStyle && hasRenderjs) {
    console.log('✅ Vue 组件结构正确');
  } else {
    console.log('❌ Vue 组件结构异常');
    console.log('检查结果:');
    console.log('- template:', hasTemplate);
    console.log('- script:', hasScript);
    console.log('- style:', hasStyle);
    console.log('- renderjs:', hasRenderjs);
    process.exit(1);
  }

  // 检查关键导入
  if (vueContent.includes('markmap-lib') && vueContent.includes('markmap-view')) {
    console.log('✅ 依赖导入正确');
  } else {
    console.log('❌ 依赖导入缺失');
    process.exit(1);
  }

} catch (error) {
  console.log(`❌ 组件检查失败: ${error.message}`);
  process.exit(1);
}

// 检查配置文件
console.log('\n⚙️  检查配置文件...');
try {
  const configContent = fs.readFileSync('config.js', 'utf8');
  if (configContent.includes('themes') && 
      configContent.includes('presets') && 
      configContent.includes('sampleData')) {
    console.log('✅ 配置文件完整');
  } else {
    console.log('❌ 配置文件不完整');
  }
} catch (error) {
  console.log(`❌ 配置文件检查失败: ${error.message}`);
}

console.log('\n🎉 验证完成！');
console.log('\n📋 总结:');
console.log('✅ 文件结构完整');
console.log('✅ 依赖配置正确');
console.log('✅ 核心功能正常');
console.log('✅ 组件语法正确');

console.log('\n🚀 插件已准备就绪，可以在 uniapp 项目中使用！');
console.log('\n📖 使用方法:');
console.log('1. 将 x-mindmap 文件夹复制到项目的 uni_modules 目录');
console.log('2. 在页面中导入组件: import XMindmap from "@/uni_modules/x-mindmap/components/x-mindmap/x-mindmap.vue"');
console.log('3. 使用组件: <x-mindmap :data="mindmapData" :height="400" />');
console.log('\n📚 更多信息请查看 readme.md 文件');
