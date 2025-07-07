// scripts/validate-i18n.js
// Create this file in your project root and run with: node scripts/validate-i18n.js

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating i18n Implementation...\n');

// Required files checklist
const requiredFiles = [
  // Core config
  { path: 'src/i18n/config.ts', description: 'i18n configuration' },
  { path: 'src/i18n/request.ts', description: 'i18n request handler' },
  { path: 'middleware.ts', description: 'Next.js middleware' },
  
  // Translation files
  { path: 'src/i18n/locales/zh.json', description: 'Chinese translations' },
  { path: 'src/i18n/locales/en.json', description: 'English translations' },
  { path: 'src/i18n/locales/ja.json', description: 'Japanese translations' },
  
  // App structure
  { path: 'src/app/layout.tsx', description: 'Root layout' },
  { path: 'src/app/page.tsx', description: 'Root redirect page' },
  { path: 'src/app/[locale]/layout.tsx', description: 'Locale layout' },
  { path: 'src/app/[locale]/page.tsx', description: 'Main component' },
  { path: 'src/app/[locale]/globals.css', description: 'Global styles' },
  
  // Components
  { path: 'src/components/LanguageSwitcher.tsx', description: 'Language switcher' },
  
  // Config files
  { path: 'package.json', description: 'Package configuration' },
  { path: 'next.config.js', description: 'Next.js configuration' },
];

let allFilesExist = true;
let score = 0;

console.log('📁 File Structure Check:');
console.log('========================');

requiredFiles.forEach(file => {
  const exists = fs.existsSync(file.path);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${file.path.padEnd(35)} - ${file.description}`);
  
  if (exists) score++;
  else allFilesExist = false;
});

console.log(`\nScore: ${score}/${requiredFiles.length} files present\n`);

// Check dependencies
console.log('📦 Dependencies Check:');
console.log('======================');

try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const hasNextIntl = packageJson.dependencies?.['next-intl'] || packageJson.devDependencies?.['next-intl'];
  const hasNext = packageJson.dependencies?.['next'];
  
  console.log(`${hasNextIntl ? '✅' : '❌'} next-intl dependency`);
  console.log(`${hasNext ? '✅' : '❌'} next dependency`);
  
  if (hasNext) {
    console.log(`   Next.js version: ${hasNext}`);
  }
  if (hasNextIntl) {
    console.log(`   next-intl version: ${hasNextIntl}`);
  }
} catch (error) {
  console.log('❌ Error reading package.json');
}

// Check translation file structure
console.log('\n🌍 Translation Files Validation:');
console.log('=================================');

const locales = ['zh', 'en', 'ja'];
const requiredTranslationKeys = [
  'app.title',
  'buttons.importData',
  'forms.advisorNickname',
  'scoreLabels.personality',
  'results.comparisonSummary'
];

locales.forEach(locale => {
  const filePath = `src/i18n/locales/${locale}.json`;
  try {
    if (fs.existsSync(filePath)) {
      const translations = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      console.log(`\n📝 ${locale.toUpperCase()} translations:`);
      
      requiredTranslationKeys.forEach(key => {
        const value = key.split('.').reduce((obj, k) => obj?.[k], translations);
        const exists = value !== undefined;
        console.log(`   ${exists ? '✅' : '❌'} ${key}`);
      });
    }
  } catch (error) {
    console.log(`❌ Error parsing ${filePath}: ${error.message}`);
  }
});

// Check next.config.js
console.log('\n⚙️  Configuration Check:');
console.log('========================');

try {
  if (fs.existsSync('next.config.js')) {
    const configContent = fs.readFileSync('next.config.js', 'utf8');
    const hasIntlPlugin = configContent.includes('next-intl/plugin');
    const hasExport = configContent.includes('output: \'export\'');
    
    console.log(`${hasIntlPlugin ? '✅' : '❌'} next-intl plugin configured`);
    console.log(`${hasExport ? '✅' : '❌'} static export configured`);
  } else {
    console.log('❌ next.config.js not found');
  }
} catch (error) {
  console.log('❌ Error reading next.config.js');
}

// Final assessment
console.log('\n🎯 Final Assessment:');
console.log('====================');

if (allFilesExist && score === requiredFiles.length) {
  console.log('🎉 All files present! Ready to test.');
  console.log('\n📋 Next Steps:');
  console.log('   1. Run: npm install');
  console.log('   2. Run: npm run dev');
  console.log('   3. Visit: http://localhost:3000');
  console.log('   4. Test language switching');
  console.log('   5. Check console for errors');
} else {
  console.log(`❌ Missing ${requiredFiles.length - score} required files.`);
  console.log('\n🔧 What to do:');
  console.log('   1. Create missing files from the artifacts');
  console.log('   2. Run this script again');
  console.log('   3. Install dependencies: npm install next-intl');
}

console.log('\n🐛 Quick Debug Commands:');
console.log('========================');
console.log('npm run build          # Test build process');
console.log('npm run dev           # Start development server');
console.log('npm list next-intl    # Check if next-intl is installed');
console.log('ls -la middleware.ts  # Check middleware file exists');

// Test URLs to check
console.log('\n🌐 Test URLs (after npm run dev):');
console.log('==================================');
console.log('http://localhost:3000/     # Should redirect to /zh');
console.log('http://localhost:3000/zh   # Chinese version');
console.log('http://localhost:3000/en   # English version');
console.log('http://localhost:3000/ja   # Japanese version');
console.log('http://localhost:3000/xx   # Should show 404');

console.log('\n✨ Happy coding! ✨');
