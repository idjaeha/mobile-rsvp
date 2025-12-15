#!/usr/bin/env node

/**
 * 이미지 최적화 스크립트
 * JPEG/PNG 이미지를 WebP로 변환하고 LQIP(Low Quality Image Placeholder)를 생성합니다.
 *
 * 사용법:
 *   node scripts/optimize-images.mjs [폴더경로]
 *   npm run optimize:images [폴더경로]
 *
 * 예시:
 *   node scripts/optimize-images.mjs src/assets/main
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

// 설정
const CONFIG = {
  webp: {
    quality: 85,
    effort: 6, // 0-6, 높을수록 더 나은 압축 (느림)
  },
  lqip: {
    width: 40,
    quality: 20,
  },
  extensions: ['.jpg', '.jpeg', '.png'],
};

// 컬러 출력 헬퍼
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * 이미지를 WebP로 변환
 */
async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({
        quality: CONFIG.webp.quality,
        effort: CONFIG.webp.effort,
      })
      .toFile(outputPath);
    return true;
  } catch (error) {
    log(`  ❌ WebP 변환 실패: ${error.message}`, 'red');
    return false;
  }
}

/**
 * LQIP 이미지 생성
 */
async function generateLQIP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .resize(CONFIG.lqip.width)
      .webp({ quality: CONFIG.lqip.quality })
      .toFile(outputPath);
    return true;
  } catch (error) {
    log(`  ❌ LQIP 생성 실패: ${error.message}`, 'red');
    return false;
  }
}

/**
 * 파일 크기를 읽기 쉬운 형식으로 변환
 */
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
}

/**
 * 파일 크기 가져오기
 */
async function getFileSize(filePath) {
  try {
    const stats = await stat(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

/**
 * 디렉토리의 모든 이미지 파일 찾기
 */
async function findImageFiles(dir) {
  const files = await readdir(dir);
  const imageFiles = [];

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (CONFIG.extensions.includes(ext)) {
      imageFiles.push(join(dir, file));
    }
  }

  return imageFiles;
}

/**
 * 단일 이미지 처리
 */
async function processImage(imagePath) {
  const ext = extname(imagePath);
  const base = basename(imagePath, ext);
  const dir = imagePath.substring(0, imagePath.lastIndexOf('/'));

  const webpPath = join(dir, `${base}.webp`);
  const lqipPath = join(dir, `${base}-lqip.webp`);

  log(`\n📸 처리 중: ${basename(imagePath)}`, 'blue');

  // 원본 파일 크기
  const originalSize = await getFileSize(imagePath);
  log(`  원본: ${formatBytes(originalSize)}`, 'yellow');

  // WebP 변환
  const webpSuccess = await convertToWebP(imagePath, webpPath);
  if (webpSuccess) {
    const webpSize = await getFileSize(webpPath);
    const reduction = ((1 - webpSize / originalSize) * 100).toFixed(1);
    log(`  ✅ WebP: ${formatBytes(webpSize)} (${reduction}% 감소)`, 'green');
  }

  // LQIP 생성
  const lqipSuccess = await generateLQIP(webpPath, lqipPath);
  if (lqipSuccess) {
    const lqipSize = await getFileSize(lqipPath);
    log(`  ✅ LQIP: ${formatBytes(lqipSize)}`, 'green');
  }

  return {
    original: imagePath,
    webp: webpSuccess ? webpPath : null,
    lqip: lqipSuccess ? lqipPath : null,
    originalSize,
    webpSize: webpSuccess ? await getFileSize(webpPath) : 0,
  };
}

/**
 * 메인 함수
 */
async function main() {
  const targetDir = process.argv[2] || 'src/assets/main';

  log('\n🚀 이미지 최적화 시작', 'blue');
  log(`📁 대상 폴더: ${targetDir}\n`, 'yellow');

  try {
    // 이미지 파일 찾기
    const imageFiles = await findImageFiles(targetDir);

    if (imageFiles.length === 0) {
      log('❌ 처리할 이미지 파일을 찾을 수 없습니다.', 'red');
      log(`   지원 형식: ${CONFIG.extensions.join(', ')}`, 'yellow');
      return;
    }

    log(`✅ ${imageFiles.length}개 이미지 파일 발견\n`, 'green');

    // 각 이미지 처리
    const results = [];
    for (const imagePath of imageFiles) {
      const result = await processImage(imagePath);
      results.push(result);
    }

    // 요약 통계
    const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
    const totalWebp = results.reduce((sum, r) => sum + r.webpSize, 0);
    const totalReduction = ((1 - totalWebp / totalOriginal) * 100).toFixed(1);

    log('\n' + '='.repeat(50), 'blue');
    log('📊 최적화 완료', 'green');
    log('='.repeat(50), 'blue');
    log(`총 처리: ${results.length}개 파일`);
    log(`원본 크기: ${formatBytes(totalOriginal)}`);
    log(`최적화 후: ${formatBytes(totalWebp)}`);
    log(`총 감소량: ${formatBytes(totalOriginal - totalWebp)} (${totalReduction}%)`, 'green');
    log('='.repeat(50) + '\n', 'blue');

  } catch (error) {
    log(`\n❌ 오류 발생: ${error.message}`, 'red');
    process.exit(1);
  }
}

main();
