import type { Tone } from "./types";

export const TONE_GRADIENTS: Record<Tone, string> = {
  1: "linear-gradient(160deg, #1c1a16, #2a2419 60%, #0b0b0c)",
  2: "linear-gradient(160deg, #211b12, #3a2d16 60%, #0b0b0c)",
  3: "linear-gradient(160deg, #181818, #262220 60%, #0b0b0c)",
  4: "linear-gradient(160deg, #221d10, #4a3a18 60%, #0b0b0c)",
};

export function nextTone(tone: Tone): Tone {
  return ((tone % 4) + 1) as Tone;
}

export function toneSequence(start: Tone): Tone[] {
  const seq: Tone[] = [start];
  for (let i = 0; i < 3; i++) seq.push(nextTone(seq[seq.length - 1]));
  return seq;
}
