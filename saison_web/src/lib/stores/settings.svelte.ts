import { browser } from '$app/environment';

class SettingsStore {
    hemisphere = $state<'northern' | 'southern'>('northern');
    climateShift = $state<number>(0);

    constructor() {
        if (browser) {
            const rawHemi = localStorage.getItem('saison_hemisphere');
            const rawShift = localStorage.getItem('saison_climate_shift');
            if (rawHemi === 'northern' || rawHemi === 'southern') {
                this.hemisphere = rawHemi;
            }
            if (rawShift) {
                this.climateShift = parseInt(rawShift, 10) || 0;
            }
        }
    }

    private sync() {
        if (browser) {
            localStorage.setItem('saison_hemisphere', this.hemisphere);
            localStorage.setItem('saison_climate_shift', this.climateShift.toString());
        }
    }

    setHemisphere(h: 'northern' | 'southern') {
        this.hemisphere = h;
        this.sync();
    }

    setClimateShift(s: number) {
        this.climateShift = s;
        this.sync();
    }

    /**
     * Transforms the current calendar month into its equivalent effective
     * planting/harvesting calendar month based on Zone 7 benchmarking.
     * 
     * E.g. If you are in the Southern Hemisphere, Month 1 (Jan) effectively behaves as Month 7 (July).
     * If your climate is colder (-1 offset), Month 5 behaves as Month 4.
     */
    transformMonth(m: number): number {
        const hemiOffset = this.hemisphere === 'southern' ? 6 : 0;
        let effective = m + hemiOffset + this.climateShift;
        
        while (effective <= 0) effective += 12;
        effective = ((effective - 1) % 12) + 1;
        
        return effective;
    }
}

// Singleton export
export const appSettings = new SettingsStore();
