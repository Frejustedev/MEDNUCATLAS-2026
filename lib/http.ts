import 'server-only';
import { NextResponse } from 'next/server';
import { ZodError, type ZodSchema } from 'zod';
import { HttpError } from './firebase-admin';

export type ApiHandler = (req: Request) => Promise<Response>;

export function json(data: unknown, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

export function withErrorHandling(handler: ApiHandler): ApiHandler {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (err) {
      if (err instanceof HttpError) {
        return json({ error: err.message }, { status: err.status });
      }
      if (err instanceof ZodError) {
        return json(
          {
            error: 'Données invalides',
            issues: err.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
          },
          { status: 400 }
        );
      }
      if (err instanceof SyntaxError) {
        return json({ error: 'JSON invalide' }, { status: 400 });
      }
      console.error('[api] erreur non gérée:', err);
      return json({ error: 'Erreur serveur' }, { status: 500 });
    }
  };
}

export async function parseBody<T>(req: Request, schema: ZodSchema<T>): Promise<T> {
  const body = await req.json();
  return schema.parse(body);
}
