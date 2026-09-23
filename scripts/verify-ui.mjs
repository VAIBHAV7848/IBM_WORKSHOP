import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.join(process.cwd(), 'screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// Helper to click an element by text content
async function clickByText(page, selector, text) {
  const clicked = await page.evaluate((sel, txt) => {
    const elements = Array.from(document.querySelectorAll(sel));
    const target = elements.find((el) => el.textContent && el.textContent.includes(txt));
    if (target) {
      target.click();
      return true;
    }
    return false;
  }, selector, text);

  if (!clicked) {
    throw new Error(`Could not find element matching "${selector}" containing text "${text}"`);
  }
}

async function runVerification() {
  console.log('🚀 Starting Comprehensive End-to-End UI/UX Verification...');

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--window-size=1920,1080'],
    headless: true,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const txt = msg.text();
      // Ignore non-critical favicon 404 if any
      if (!txt.includes('favicon.ico')) {
        consoleErrors.push(txt);
        console.error('❌ Browser Console Error:', txt);
      }
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
    console.error('❌ Page Error:', err.toString());
  });

  try {
    // 1. Load Main Page
    console.log('1️⃣ Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 15000 });

    const title = await page.title();
    console.log(`   Page Title: "${title}"`);
    if (!title.includes('Research Agent')) throw new Error('Incorrect page title');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_initial_studio.png') });
    console.log('   📸 Captured 01_initial_studio.png');

    // 2. Verify Canvas Rendering
    console.log('2️⃣ Verifying 2D Physics Canvas...');
    const canvas = await page.$('canvas');
    if (!canvas) throw new Error('Canvas element not found in DOM');
    console.log('   ✓ Canvas element active and rendering');

    // 3. Test Domain Switching (Quantum Computing)
    console.log('3️⃣ Testing Domain Switcher to Quantum Computing...');
    await clickByText(page, 'button', 'Quantum Computing');
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_quantum_domain.png') });
    console.log('   📸 Captured 02_quantum_domain.png');

    // 4. Switch back to Agentic AI
    console.log('4️⃣ Switching back to Agentic AI & Granite...');
    await clickByText(page, 'button', 'Agentic AI & Granite');
    await new Promise((r) => setTimeout(r, 600));

    // 5. Test Workbench Tabs (Emerging Trends)
    console.log('5️⃣ Testing Emerging Trends Tab...');
    await clickByText(page, 'button', 'Emerging Trends');
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_emerging_trends.png') });
    console.log('   📸 Captured 03_emerging_trends.png');

    // 6. Test Citation Gaps Tab
    console.log('6️⃣ Testing Citation Gaps Tab...');
    await clickByText(page, 'button', 'Citation Gaps');
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_citation_gaps.png') });
    console.log('   📸 Captured 04_citation_gaps.png');

    // 7. Return to 2D Citation Graph
    console.log('7️⃣ Returning to 2D Citation Graph...');
    await clickByText(page, 'button', '2D Citation Graph');
    await new Promise((r) => setTimeout(r, 600));

    // 8. Test Paper Selection & Detail Drawer
    console.log('8️⃣ Clicking Granite 3.0 Paper Card in Library...');
    await clickByText(page, 'h4', 'Granite 3.0 Language Models');
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_paper_detail_drawer.png') });
    console.log('   📸 Captured 05_paper_detail_drawer.png');

    // 9. Test "Synthesize with Research Agent" button
    console.log('9️⃣ Testing "Synthesize with Research Agent"...');
    await clickByText(page, 'button', 'Synthesize with Research Agent');
    console.log('   Waiting for Granite RAG response generation...');
    await new Promise((r) => setTimeout(r, 2200));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_chat_synthesis.png') });
    console.log('   📸 Captured 06_chat_synthesis.png');

    // 10. Test Literature Review Tab & Generation
    console.log('🔟 Testing Literature Review Generation...');
    await clickByText(page, 'button', 'Literature Review');
    await new Promise((r) => setTimeout(r, 600));

    await clickByText(page, 'button', 'Generate Comprehensive Literature Review');
    console.log('   Waiting for multi-agent synthesis pipeline...');
    await new Promise((r) => setTimeout(r, 2500));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07_literature_review_generated.png') });
    console.log('   📸 Captured 07_literature_review_generated.png');

    // 11. Test Export Modal
    console.log('1️⃣1️⃣ Testing Export Modal...');
    await clickByText(page, 'button', 'Export');
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08_export_modal.png') });
    console.log('   📸 Captured 08_export_modal.png');

    // Close Export Modal
    await page.evaluate(() => {
      const closeButtons = Array.from(document.querySelectorAll('button'));
      const close = closeButtons.find((b) => b.querySelector('svg.lucide-x'));
      if (close) close.click();
    });
    await new Promise((r) => setTimeout(r, 400));

    // 12. Test Settings Modal
    console.log('1️⃣2️⃣ Testing Watsonx Settings Modal...');
    await clickByText(page, 'button', 'Settings');
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09_settings_modal.png') });
    console.log('   📸 Captured 09_settings_modal.png');

    console.log('\n=========================================');
    console.log(`✅ All 12 interaction flows completed successfully!`);
    console.log(`Console Errors: ${consoleErrors.length}`);
    console.log('=========================================');

    if (consoleErrors.length > 0) {
      throw new Error(`Encountered ${consoleErrors.length} console errors during verification`);
    }
  } catch (error) {
    console.error('❌ Verification Failed:', error);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'error_state.png') });
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

runVerification();
