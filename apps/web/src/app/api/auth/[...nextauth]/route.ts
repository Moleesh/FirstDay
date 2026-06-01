/**
 * @format
 * @module AuthProxyRoute
 * @description Thin Next.js route handler placeholder for API auth proxying.
 * @author auto
 * @since 1.0.0
 */

import { NextResponse, type NextRequest } from 'next/server';

/**
 * Proxies auth requests to the NestJS API.
 * @param request - Incoming Next.js request.
 * @returns A proxy response.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
	return NextResponse.json({ ok: true, path: request.nextUrl.pathname });
}

/**
 * Proxies auth mutations to the NestJS API.
 * @param request - Incoming Next.js request.
 * @returns A proxy response.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
	return NextResponse.json({ ok: true, path: request.nextUrl.pathname });
}
