import slugifyImport from 'slugify'

const slugifyOptions = {
  lower: true,
  strict: true,
  trim: true,
} as const

/** CJS default export typing is awkward under `moduleResolution: "NodeNext"`. */
const slugify = slugifyImport as unknown as (
  string: string,
  options?: typeof slugifyOptions,
) => string

export function titleToSlug(title: string): string {
  return slugify(title, slugifyOptions)
}
