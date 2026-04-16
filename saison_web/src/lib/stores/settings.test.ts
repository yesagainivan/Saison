import { expect, test, describe, beforeEach } from 'vitest';
import { appSettings } from './settings.svelte';

describe('Settings Mathematics', () => {
	beforeEach(() => {
		// Reset state before tests
		appSettings.hemisphere = 'northern';
		appSettings.climateShift = 0;
	});

	test('Standard Northern Hemisphere Zone 7 evaluates transparently', () => {
		expect(appSettings.transformMonth(1)).toBe(1); // Jan -> Jan
		expect(appSettings.transformMonth(6)).toBe(6); // Jun -> Jun
		expect(appSettings.transformMonth(12)).toBe(12); // Dec -> Dec
	});

	test('Southern Hemisphere offsets strictly by six months', () => {
		appSettings.hemisphere = 'southern';
		expect(appSettings.transformMonth(1)).toBe(7); // Southern Summer (Jan) acts like Northern Summer (July)
		expect(appSettings.transformMonth(7)).toBe(1); // Southern Winter (July) acts like Northern Winter (Jan)

		// Wrap around boundary check
		expect(appSettings.transformMonth(8)).toBe(2); // Aug -> Feb
		expect(appSettings.transformMonth(12)).toBe(6); // Dec -> June
	});

	test('Climate Shifts micro-adjust the mapping effectively', () => {
		appSettings.climateShift = -1; // Colder Zone. Calendar Spring occurs later!
		expect(appSettings.transformMonth(5)).toBe(4); // Cal May acts like DB April
		expect(appSettings.transformMonth(1)).toBe(12); // Cal Jan acts like DB Dec

		appSettings.climateShift = 1; // Warmer Zone. Calendar Spring occurs earlier!
		expect(appSettings.transformMonth(3)).toBe(4); // Cal March acts like DB April
		expect(appSettings.transformMonth(12)).toBe(1); // Cal Dec acts like DB Jan
	});

	test('Combined Hemisphere and Climate Shift perfectly stack', () => {
		// Eg: Patagonia. Southern Hemisphere but slightly colder.
		appSettings.hemisphere = 'southern';
		appSettings.climateShift = -1;

		// January (1) in Southern is normally July (7). But it's colder, so it behaves like DB June (6).
		expect(appSettings.transformMonth(1)).toBe(6);
	});
});
