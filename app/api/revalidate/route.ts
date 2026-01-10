import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Optional: Add a secret token for security
    const secret = request.nextUrl.searchParams.get('secret');
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // Get the type of document that was updated
    const { _type, slug } = body;

    if (_type === 'ponuda' && slug?.current) {
      // Revalidate specific ponuda page
      revalidatePath(`/ponuda/${slug.current}`);
      console.log(`Revalidated: /ponuda/${slug.current}`);
    }

    // Revalidate main pages that list offers
    revalidatePath('/');
    revalidatePath('/putovanja');

    // If there's a category, revalidate that too
    if (body.kategorije && Array.isArray(body.kategorije)) {
      body.kategorije.forEach((kat: any) => {
        if (kat.slug?.current) {
          revalidatePath(`/kategorija/${kat.slug.current}`);
          console.log(`Revalidated: /kategorija/${kat.slug.current}`);
        }
      });
    }

    return NextResponse.json({
      revalidated: true,
      message: 'Revalidation successful',
      paths: [
        _type === 'ponuda' && slug?.current ? `/ponuda/${slug.current}` : null,
        '/',
        '/putovanja'
      ].filter(Boolean)
    });
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 }
    );
  }
}

// Also support GET for manual testing
export async function GET(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get('secret');
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const path = request.nextUrl.searchParams.get('path');

    if (path) {
      revalidatePath(path);
      return NextResponse.json({
        revalidated: true,
        message: `Revalidated path: ${path}`
      });
    }

    // Revalidate all main paths
    revalidatePath('/');
    revalidatePath('/putovanja');

    return NextResponse.json({
      revalidated: true,
      message: 'Revalidated main paths'
    });
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 }
    );
  }
}
