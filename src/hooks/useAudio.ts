import { useEffect, useState } from 'react';
import type { AudioSettings } from '../types/game';


import { soundEngine } from '../utils/audio';
import { getAudioSettings, saveAudioSettings } from '../utils/storage';

export function useAudio() {
  const [settings, setSettings] = useState<AudioSettings>(getAudioSettings);

  useEffect(() => {
    soundEngine.setSettings(settings);
    saveAudioSettings(settings);
  }, [settings]);

  const toggleBgm = () => {
    soundEngine.init();
    setSettings((prev) => {
      const next = { ...prev, bgm: !prev.bgm };
      if (next.bgm) {
        soundEngine.startAmbient();
      } else {
        soundEngine.stopAmbient();
      }
      return next;
    });
  };

  const toggleSfx = () => {
    soundEngine.init();
    setSettings((prev) => {
      const next = { ...prev, sfx: !prev.sfx };
      if (next.sfx) {
        soundEngine.playClick();
      }
      return next;
    });
  };

  const initAudioOnInteraction = () => {
    soundEngine.init();
    if (settings.bgm) {
      soundEngine.startAmbient();
    }
  };

  return {
    settings,
    toggleBgm,
    toggleSfx,
    initAudioOnInteraction,
    playSelect: () => soundEngine.playSelect(),
    playPickup: () => soundEngine.playPickup(),
    playMunch: () => soundEngine.playMunch(),
    playClick: () => soundEngine.playClick(),
    playCelebration: () => soundEngine.playCelebration()
  };
}
