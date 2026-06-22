import { expect, test } from '@playwright/test';

async function waitForMapDebug(page, consoleErrors = []) {
  await page.goto('/?mode=browse&debug=1&browser-test=map-render', { waitUntil: 'domcontentloaded' });
  try {
    await page.waitForFunction(() => Boolean(window.__londontourMapDebug?.adapter?._map), null, { timeout: 15_000 });
  } catch (error) {
    const state = await page.evaluate(() => ({
      href: location.href,
      readyState: document.readyState,
      hasMaplibre: Boolean(window.maplibregl),
      hasPmtiles: Boolean(window.pmtiles),
      hasLeafletAdapter: Boolean(window.L),
      hasMapDebug: Boolean(window.__londontourMapDebug),
      bodyClass: document.body.className,
      statusText: document.querySelector('#status')?.textContent,
      scriptSrcs: [...document.scripts].map((script) => script.src),
      mapChildCount: document.querySelector('#map')?.childElementCount,
    }), { timeout: 5_000 });
    throw new Error(`Map debug hook did not appear: ${JSON.stringify({ state, consoleErrors }, null, 2)}`);
  }
  try {
    await page.waitForFunction(
      () => {
        const map = window.__londontourMapDebug?.adapter?._map;
        return Boolean(map?.getStyle?.() && map?.getCanvas?.()?.width);
      },
      null,
      { timeout: 15_000 }
    );
  } catch (error) {
    const state = await page.evaluate(() => {
      const map = window.__londontourMapDebug?.adapter?._map;
      return {
        href: location.href,
        hasStyle: Boolean(map?.getStyle?.()),
        styleLayerCount: map?.getStyle?.()?.layers?.length || 0,
        canvas: map?.getCanvas?.() ? {
          width: map.getCanvas().width,
          height: map.getCanvas().height,
          clientWidth: map.getCanvas().clientWidth,
          clientHeight: map.getCanvas().clientHeight,
        } : null,
        mapContainerBox: document.querySelector('#map')?.getBoundingClientRect?.().toJSON?.(),
        bodyClass: document.body.className,
      };
    }, { timeout: 5_000 });
    throw new Error(`MapLibre style/canvas did not become ready: ${JSON.stringify({ state, consoleErrors }, null, 2)}`);
  }
}

test('MapLibre renders the tube and river line overlays', async ({ page }) => {
  const consoleErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => consoleErrors.push(error.message));

  await waitForMapDebug(page, consoleErrors);
  await page.waitForFunction(
    () => {
      const groups = window.__londontourMapDebug?.nativeLineGroups?.() || [];
      const tube = groups.find((group) => group.id === 'tube-network-lines');
      const river = groups.find((group) => group.id === 'river-service-lines');
      return tube?.layerExists && tube?.sourceExists && tube?.featureCount > 500 &&
        river?.layerExists && river?.sourceExists && river?.featureCount > 0;
    },
    null,
    { timeout: 15_000 }
  );

  const debug = await page.evaluate(() => {
    const groups = window.__londontourMapDebug.nativeLineGroups();
    const styleLayers = window.__londontourMapDebug.styleLayerIds();
    return {
      groups,
      tubeLayerIndex: styleLayers.indexOf('tube-network-lines'),
      riverLayerIndex: styleLayers.indexOf('river-service-lines'),
      lastBaseLayerIndex: Math.max(
        styleLayers.indexOf('place-labels'),
        styleLayers.indexOf('poi-labels')
      ),
    };
  });

  const tube = debug.groups.find((group) => group.id === 'tube-network-lines');
  const river = debug.groups.find((group) => group.id === 'river-service-lines');
  expect(tube.featureCount).toBeGreaterThan(2_000);
  expect(tube.colors.length).toBeGreaterThanOrEqual(10);
  expect(river.featureCount).toBeGreaterThan(0);
  expect(debug.tubeLayerIndex).toBeGreaterThan(debug.lastBaseLayerIndex);
  expect(debug.riverLayerIndex).toBeGreaterThan(debug.lastBaseLayerIndex);
  expect(consoleErrors).toEqual([]);
});

test('nearby results fit in a scrollable mobile sheet', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile layout check');

  await waitForMapDebug(page);
  await page.locator('#radius-button').click();
  await expect(page.locator('#radius-panel')).toBeVisible();

  const panelBox = await page.locator('#radius-panel').boundingBox();
  const resultsStyles = await page.locator('#radius-results').evaluate((element) => {
    const styles = getComputedStyle(element);
    return {
      overflowY: styles.overflowY,
      maxHeight: styles.maxHeight,
      clientHeight: element.clientHeight,
      scrollHeight: element.scrollHeight,
    };
  });

  expect(panelBox.height).toBeLessThan(520);
  expect(resultsStyles.overflowY).toMatch(/auto|scroll/);
});
