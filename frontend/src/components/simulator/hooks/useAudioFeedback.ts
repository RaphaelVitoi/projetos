/**
 * IDENTITY: Hook de Feedback Sonoro (Data Sonification)
 * PATH: src/components/simulator/hooks/useAudioFeedback.ts
 * ROLE: Sintetizar sons via AudioContext para feedback tátil nas zonas críticas.
 *       Port do sintetizador de risk-gauge.js para React hooks.
 * BINDING: Nenhum externo (usa Web Audio API nativa)
 */

import { useState, useCallback, useRef, useEffect } from 'react';

interface UseAudioFeedbackReturn {
  /** Tom grave sawtooth (40-80Hz) para Death Zone (RP >= 40%) */
  playDeathZone: (intensity?: number) => void;
  /** Ping agudo sine sweep (1200-2200Hz) para Predator Zone */
  playPredatorZone: (intensity?: number) => void;
  /** Estado de mudo */
  isMuted: boolean;
  /** Alterna mudo */
  toggleMute: () => void;
}

/**
 * Fornece feedback sonoro sintetizado via AudioContext.
 * Sem arquivos de áudio externos. Geração procedural.
 *
 * Death Zone: Tom grave "Geiger" (sawtooth 40-80Hz) quando RP >= 40%
 * Predator Zone: Radar ping (sine sweep 1200-2200Hz) quando oponente em Death Zone
 */
export function useAudioFeedback(): UseAudioFeedbackReturn {
  const [isMuted, setIsMuted] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  // Cleanup do AudioContext ao desmontar
  useEffect(() => {
    return () => {
      if (ctxRef.current && ctxRef.current.state !== 'closed') {
        ctxRef.current.close().catch(() => {
          // Falha silenciosa se o contexto já estiver fechado
        });
      }
    };
  }, []);

  const getContext = useCallback((): AudioContext | null => {
    try {
      if (!ctxRef.current || ctxRef.current.state === 'closed') {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return null;
        ctxRef.current = new AudioCtx();
      }
      return ctxRef.current;
    } catch {
      return null;
    }
  }, []);

  const playDeathZone = useCallback((intensity: number = 40) => {
    if (isMuted) return;

    const ctx = getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      // Frequência inversamente proporcional à intensidade (40% -> 80Hz, 80% -> 40Hz)
      const freq = Math.max(40, 80 - ((intensity - 40) * 1));

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // Falha silenciosa (autoplay policy do navegador)
    }
  }, [isMuted, getContext]);

  const playPredatorZone = useCallback((intensity: number = 40) => {
    if (isMuted) return;

    const ctx = getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      // Frequência proporcional ao RP do vilão (40% -> 1200Hz, 80% -> 2200Hz)
      const freq = 1200 + ((intensity - 40) * 25);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // Falha silenciosa (autoplay policy do navegador)
    }
  }, [isMuted, getContext]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  return {
    playDeathZone,
    playPredatorZone,
    isMuted,
    toggleMute,
  };
}
