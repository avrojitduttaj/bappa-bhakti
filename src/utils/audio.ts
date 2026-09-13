import type { AudioSettings } from '../types/game';

class SoundEngine {
  private ctx: AudioContext | null = null;

  private isMutedBgm = false;
  private isMutedSfx = false;

  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;

  private isAmbientPlaying = false;
  // private autoplayAttempted = false;

  // Royalty-free Dhol-Tasha background audio
  private dholAudio: HTMLAudioElement | null = null;

  private fadeInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initDholAudio();

      // Attempt to start music immediately.
      this.startAmbient();

      // If the browser blocks autoplay, start it
      // automatically after the user's first interaction.
      this.setupAutoplayFallback();
    }
  }

  /**
   * Initialize Dhol-Tasha audio.
   *
   * File location:
   * public/audio/dhol-tasha.mp3
   */
  private initDholAudio() {
    if (typeof window === 'undefined') return;

    try {
      this.dholAudio = new Audio('/audio/dhol-tasha.mp3');

      this.dholAudio.loop = true;
      this.dholAudio.preload = 'auto';
      this.dholAudio.volume = 0;

      this.dholAudio.addEventListener('error', () => {
        console.error(
          '❌ Failed to load Dhol-Tasha audio:',
          this.dholAudio?.src
        );
      });

      this.dholAudio.addEventListener('canplaythrough', () => {
        console.log('🥁 Dhol-Tasha audio loaded');
      });
    } catch (error) {
      console.error(
        '❌ Failed to initialize Dhol-Tasha audio:',
        error
      );

      this.dholAudio = null;
    }
  }

  /**
   * Attempt autoplay again after the browser receives
   * a real user interaction.
   */
  private setupAutoplayFallback() {
    if (typeof window === 'undefined') return;

    const startAfterInteraction = () => {
      if (!this.isAmbientPlaying && !this.isMutedBgm) {
        console.log(
          '👆 User interaction detected — starting Dhol-Tasha'
        );

        this.init();

        this.startAmbient();
      }

      window.removeEventListener(
        'click',
        startAfterInteraction
      );

      window.removeEventListener(
        'touchstart',
        startAfterInteraction
      );

      window.removeEventListener(
        'keydown',
        startAfterInteraction
      );
    };

    window.addEventListener(
      'click',
      startAfterInteraction,
      { once: true }
    );

    window.addEventListener(
      'touchstart',
      startAfterInteraction,
      { once: true }
    );

    window.addEventListener(
      'keydown',
      startAfterInteraction,
      { once: true }
    );
  }

  /**
   * Initialize Web Audio API.
   */
  private initCtx(): AudioContext | null {
    if (typeof window === 'undefined') {
      return null;
    }

    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (
          window as unknown as {
            webkitAudioContext: typeof AudioContext;
          }
        ).webkitAudioContext;

      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }

    if (this.ctx?.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  /**
   * Initialize audio systems.
   */
  public init() {
    this.initCtx();

    if (!this.dholAudio) {
      this.initDholAudio();
    }
  }

  /**
   * Update audio settings.
   */
  public setSettings(settings: AudioSettings) {
    this.isMutedBgm = !settings.bgm;
    this.isMutedSfx = !settings.sfx;

    if (this.isMutedBgm) {
      this.stopAmbient();
    } else if (!this.isAmbientPlaying) {
      this.startAmbient();
    }
  }

  /**
   * Temple bell / shankh sound.
   */
  public playSelect() {
    if (this.isMutedSfx) return;

    const ctx = this.initCtx();

    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      const frequencies = [
        523.25,
        659.25,
        783.99,
        1046.5,
      ];

      frequencies.forEach((freq, idx) => {
        const startTime = now + idx * 0.04;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';

        osc.frequency.setValueAtTime(
          freq,
          startTime
        );

        gain.gain.setValueAtTime(
          0.15 / (idx + 1),
          startTime
        );

        gain.gain.exponentialRampToValueAtTime(
          0.001,
          startTime + 0.8
        );

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.85);
      });
    } catch {
      // Ignore audio errors
    }
  }

  /**
   * Pickup / lift sound.
   */
  public playPickup() {
    if (this.isMutedSfx) return;

    const ctx = this.initCtx();

    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';

      osc.frequency.setValueAtTime(
        220,
        now
      );

      osc.frequency.exponentialRampToValueAtTime(
        440,
        now + 0.2
      );

      gain.gain.setValueAtTime(
        0.1,
        now
      );

      gain.gain.exponentialRampToValueAtTime(
        0.01,
        now + 0.2
      );

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {
      // Ignore
    }
  }

  /**
   * Crunch / munch sound.
   */
  public playMunch() {
    if (this.isMutedSfx) return;

    const ctx = this.initCtx();

    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      [0, 0.12, 0.25].forEach((delay) => {
        const bufferSize = Math.floor(
          ctx.sampleRate * 0.08
        );

        const buffer = ctx.createBuffer(
          1,
          bufferSize,
          ctx.sampleRate
        );

        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();

        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();

        filter.type = 'bandpass';

        filter.frequency.setValueAtTime(
          1200 + Math.random() * 400,
          now + delay
        );

        filter.Q.setValueAtTime(
          3,
          now + delay
        );

        const gain = ctx.createGain();

        gain.gain.setValueAtTime(
          0.3,
          now + delay
        );

        gain.gain.exponentialRampToValueAtTime(
          0.01,
          now + delay + 0.07
        );

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start(now + delay);
        noise.stop(now + delay + 0.08);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * UI click sound.
   */
  public playClick() {
    if (this.isMutedSfx) return;

    const ctx = this.initCtx();

    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';

      osc.frequency.setValueAtTime(
        400,
        now
      );

      osc.frequency.exponentialRampToValueAtTime(
        150,
        now + 0.05
      );

      gain.gain.setValueAtTime(
        0.12,
        now
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.05
      );

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Ignore
    }
  }

  /**
   * Celebration fanfare.
   */
  public playCelebration() {
    if (this.isMutedSfx) return;

    const ctx = this.initCtx();

    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      const notes = [
        523.25,
        659.25,
        783.99,
        1046.5,
        1318.5,
      ];

      notes.forEach((freq, i) => {
        const startTime = now + i * 0.08;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';

        osc.frequency.setValueAtTime(
          freq,
          startTime
        );

        gain.gain.setValueAtTime(
          0.2,
          startTime
        );

        gain.gain.exponentialRampToValueAtTime(
          0.001,
          startTime + 0.6
        );

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.65);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Start Dhol-Tasha background music.
   *
   * This is automatically called when the SoundEngine
   * is created.
   */
  public startAmbient() {
    if (this.isMutedBgm) {
      return;
    }

    if (this.isAmbientPlaying) {
      return;
    }

    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    if (!this.dholAudio) {
      this.initDholAudio();
    }

    if (!this.dholAudio) {
      return;
    }

    this.dholAudio.volume = 0;

    console.log(
      '🥁 Attempting to start Dhol-Tasha:',
      this.dholAudio.src
    );

    const playPromise =
      this.dholAudio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log(
            '🔊 Dhol-Tasha started automatically'
          );

          this.isAmbientPlaying = true;

          this.fadeInDhol();
        })
        .catch((error) => {
          console.warn(
            '⚠️ Autoplay blocked by browser:',
            error
          );

          /*
           * IMPORTANT:
           * Do NOT mark ambient as playing.
           *
           * The click/touch/keyboard fallback
           * will try again automatically.
           */
          this.isAmbientPlaying = false;
          // this.autoplayAttempted = true;
        });
    } else {
      this.isAmbientPlaying = true;

      this.fadeInDhol();
    }
  }

  /**
   * Smooth fade-in to 20% volume.
   */
  private fadeInDhol() {
    if (!this.dholAudio) return;

    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    let volume = this.dholAudio.volume;

    this.fadeInterval = setInterval(() => {
      if (!this.dholAudio) {
        if (this.fadeInterval) {
          clearInterval(this.fadeInterval);
          this.fadeInterval = null;
        }

        return;
      }

      volume += 0.02;

      if (volume >= 0.2) {
        volume = 0.2;

        if (this.fadeInterval) {
          clearInterval(this.fadeInterval);
          this.fadeInterval = null;
        }
      }

      this.dholAudio.volume = volume;
    }, 100);
  }

  /**
   * Stop background Dhol-Tasha.
   */
  public stopAmbient() {
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    if (
      this.dholAudio &&
      !this.dholAudio.paused
    ) {
      let volume =
        this.dholAudio.volume;

      this.fadeInterval = setInterval(() => {
        if (!this.dholAudio) {
          if (this.fadeInterval) {
            clearInterval(this.fadeInterval);
            this.fadeInterval = null;
          }

          return;
        }

        volume -= 0.03;

        if (volume <= 0) {
          volume = 0;

          this.dholAudio.volume = 0;

          this.dholAudio.pause();

          this.dholAudio.currentTime = 0;

          if (this.fadeInterval) {
            clearInterval(this.fadeInterval);
            this.fadeInterval = null;
          }
        } else {
          this.dholAudio.volume = volume;
        }
      }, 50);
    }

    if (
      this.ambientGain &&
      this.ctx
    ) {
      try {
        const now =
          this.ctx.currentTime;

        this.ambientGain.gain.cancelScheduledValues(
          now
        );

        this.ambientGain.gain.setValueAtTime(
          this.ambientGain.gain.value,
          now
        );

        this.ambientGain.gain.linearRampToValueAtTime(
          0.001,
          now + 0.5
        );

        setTimeout(() => {
          if (this.ambientOsc) {
            try {
              this.ambientOsc.stop();
            } catch {
              // Already stopped
            }

            try {
              this.ambientOsc.disconnect();
            } catch {
              // Ignore
            }

            this.ambientOsc = null;
          }

          this.ambientGain = null;
        }, 550);
      } catch {
        // Ignore
      }
    }

    this.isAmbientPlaying = false;
  }
}

export const soundEngine = new SoundEngine();