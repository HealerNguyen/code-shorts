/** Default reading speed for English-ish text (words per minute). */
const DEFAULT_WPM = 200

/**
 * Estimate reading time in whole minutes from plain text (word count / WPM), minimum 1.
 */
export function calculateReadingTimeMinutes(
  content: string,
  wordsPerMinute: number = DEFAULT_WPM,
): number {
  const trimmed = content.trim()
  if (!trimmed) return 1
  const words = trimmed.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}
