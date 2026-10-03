'use client';

import { InfiniteSlider } from '@/components/ui/infinite-slider';

export function InfiniteSliderBasic() {
  return (
    <InfiniteSlider gap={24} reverse className="w-full h-full bg-slate-950 py-6">
      <img
        src="https://motion-primitives.com/apple_music_logo.svg"
        alt="Apple Music logo"
        className="h-[60px] w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
      />
      <img
        src="https://motion-primitives.com/chrome_logo.svg"
        alt="Chrome logo"
        className="h-[60px] w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
      />
      <img
        src="https://motion-primitives.com/strava_logo.svg"
        alt="Strava logo"
        className="h-[60px] w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
      />
      <img
        src="https://motion-primitives.com/nintendo_logo.svg"
        alt="Nintendo logo"
        className="h-[60px] w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
      />
      <img
        src="https://motion-primitives.com/jquery_logo.svg"
        alt="Jquery logo"
        className="h-[60px] w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
      />
      <img
        src="https://motion-primitives.com/prada_logo.svg"
        alt="Prada logo"
        className="h-[60px] w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
      />
    </InfiniteSlider>
  );
}

export default InfiniteSliderBasic;
