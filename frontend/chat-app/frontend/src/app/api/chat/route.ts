import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { message } = await request.json();

  const response = await fetch('http://127.0.0.1:11435/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }

  const data = await response.json();
  return NextResponse.json(data);
}