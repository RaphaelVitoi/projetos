'use client';

/**
 * IDENTITY: Motor de Quiz Interativo
 * PATH: src/components/simulator/ui/QuizEngine.tsx
 * ROLE: Renderizar quiz com shuffle, feedback visual (correto/errado) e explicação.
 * BINDING: [engine/types.ts, simulator.module.css]
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Quiz } from '../engine/types';
import styles from '../simulator.module.css';

interface QuizEngineProps {
  /** Dados do quiz */
  quiz: Quiz;
  /** Callback ao completar o quiz */
  onComplete?: (wasCorrect: boolean) => void;
}

/**
 * Embaralha array com Fisher-Yates (cópia imutável)
 */
function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function QuizEngine({
  quiz,
  onComplete,
}: Readonly<QuizEngineProps>) {
  const [answered, setAnswered] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Embaralha opções quando o quiz muda
  const shuffledOptions = useMemo(
    () => shuffleArray(quiz.options),
    [quiz]
  );

  // Reset ao mudar de quiz
  useEffect(() => {
    setAnswered(false);
    setSelectedIdx(null);
  }, [quiz]);

  const handleSelect = useCallback(
    (idx: number) => {
      if (answered) return;

      setSelectedIdx(idx);
      setAnswered(true);

      const wasCorrect = shuffledOptions[idx].correct;
      onComplete?.(wasCorrect);
    },
    [answered, shuffledOptions, onComplete]
  );

  return (
    <div className={styles.quizContainer}>
      {/* Pergunta */}
      <p className={styles.quizQuestion}>{quiz.question}</p>

      {/* Opções */}
      <div className={styles.quizOptions}>
        {shuffledOptions.map((opt, idx) => {
          const isSelected = selectedIdx === idx;
          const showCorrect = answered && opt.correct;
          const showWrong = answered && isSelected && !opt.correct;
          const isDisabled = answered && !isSelected && !opt.correct;

          let stateClass = '';
          if (showCorrect) stateClass = styles.quizCorrect;
          else if (showWrong) stateClass = styles.quizWrong;
          else if (isDisabled) stateClass = styles.quizDisabled;

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`${styles.quizOption} ${stateClass}`}
              disabled={answered && !isSelected && !opt.correct}
              aria-label={`Opção ${idx + 1}`}
            >
              <div className={styles.quizOptionIndicator}>
                {showCorrect && (
                  <span className={styles.quizCheckIcon}>&#x2713;</span>
                )}
                {showWrong && (
                  <span className={styles.quizXIcon}>&#x2717;</span>
                )}
              </div>
              <span className={styles.quizOptionText}>{opt.text}</span>
            </button>
          );
        })}
      </div>

      {/* Explicação (aparece após resposta) */}
      {answered && (
        <div className={styles.quizExplanation}>
          <div className={styles.quizExplanationBar} />
          <h4 className={styles.quizExplanationTitle}>Auditoria Lógica</h4>
          <p className={styles.quizExplanationText}>{quiz.explanation}</p>
        </div>
      )}
    </div>
  );
}
