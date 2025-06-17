// 简单的依赖测试
const { Transformer } = require('./node_modules/markmap-lib/dist/index.js');

console.log('Testing markmap dependencies...');

try {
  // 测试 Transformer
  const transformer = new Transformer();
  console.log('✅ Transformer created successfully');
  
  // 测试数据转换
  const testData = `# Test
## Branch 1
- Item 1
- Item 2
## Branch 2
- Item 3`;

  const result = transformer.transform(testData);
  console.log('✅ Transform successful');
  console.log('Root node:', result.root.content);
  console.log('Features:', Object.keys(result.features));
  
  // 测试资源获取
  const assets = transformer.getUsedAssets(result.features);
  console.log('✅ Assets retrieved');
  console.log('Styles count:', assets.styles?.length || 0);
  console.log('Scripts count:', assets.scripts?.length || 0);
  
  console.log('\n🎉 All tests passed! Dependencies are working correctly.');
  
} catch (error) {
  console.error('❌ Test failed:', error.message);
  console.error(error.stack);
  process.exit(1);
}
