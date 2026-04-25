import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

type WebhookPayload = {
  _type: string
  slug?: string
}

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  const { body, isValidSignature } = await parseBody<WebhookPayload>(
    req,
    secret,
    true
  )

  if (secret && !isValidSignature) {
    return new Response('Invalid signature', { status: 401 })
  }

  if (!body?._type) {
    return new Response('Bad request', { status: 400 })
  }

  try {
    if (body._type === 'product') {
      revalidatePath('/')
      if (body.slug) {
        revalidatePath(`/products/${body.slug}`)
      }
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: body._type,
      slug: body.slug ?? null,
    })
  } catch (err) {
    console.error('Revalidation error:', err)
    return new Response('Revalidation failed', { status: 500 })
  }
}
