import { prisma } from '../../config/db.js'
import { calculateReadingTimeMinutes } from '../../utils/readingTime.js'
import { titleToSlug } from '../../utils/slug.js'
import type { CreatePostInput, UpdatePostInput } from './post.schema.js'

async function ensureUniqueSlug(base: string, excludePostId?: string): Promise<string> {
  let candidate = base || 'post'
  let n = 2
  for (;;) {
    const existing = await prisma.post.findUnique({ where: { slug: candidate } })
    if (!existing || existing.id === excludePostId) return candidate
    candidate = `${base}-${n}`
    n += 1
  }
}

export async function createPost(input: CreatePostInput) {
  const baseSlug = titleToSlug(input.title)
  const slug = await ensureUniqueSlug(baseSlug)
  const readingTimeMinutes = calculateReadingTimeMinutes(input.content)

  return prisma.post.create({
    data: {
      title: input.title,
      slug,
      content: input.content,
      readingTimeMinutes,
    },
  })
}

export async function listPosts() {
  return prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({ where: { slug } })
}

export async function getPostById(id: string) {
  return prisma.post.findUnique({ where: { id } })
}

export async function updatePost(id: string, input: UpdatePostInput) {
  const existing = await prisma.post.findUnique({ where: { id } })
  if (!existing) return null

  let slug = existing.slug
  if (input.title !== undefined) {
    slug = await ensureUniqueSlug(titleToSlug(input.title), id)
  }

  let readingTimeMinutes = existing.readingTimeMinutes
  if (input.content !== undefined) {
    readingTimeMinutes = calculateReadingTimeMinutes(input.content)
  }

  return prisma.post.update({
    where: { id },
    data: {
      ...(input.title !== undefined ? { title: input.title } : {}),
      ...(input.content !== undefined ? { content: input.content } : {}),
      slug,
      readingTimeMinutes,
    },
  })
}

export async function deletePost(id: string) {
  try {
    await prisma.post.delete({ where: { id } })
    return true
  } catch {
    return false
  }
}
