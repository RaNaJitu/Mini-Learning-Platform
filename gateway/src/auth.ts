import jwt from 'jsonwebtoken';
import { FastifyReply, FastifyRequest } from 'fastify';
export type Role = 'ADMIN' | 'STUDENT';

function verify(token?: string) {
  if (!token) throw new Error('no token');
  return jwt.verify(token, process.env.JWT_SECRET || 'devsecret') as any;
}

export async function routeAwareGuard(req: FastifyRequest, res: FastifyReply) {
  const url = req.url;       // e.g. /lessons/abc/enroll
  const method = req.method; // GET/POST/PATCH/DELETE
  const auth = req.headers.authorization;
  const bearer = auth?.startsWith('Bearer ') ? auth.slice(7) : undefined;

  // 1) Lessons
  if (url.startsWith('/lessons')) {
    // Public read:
    if (method === 'GET') return;
    // Student actions:
    const isStudentAction = /\/lessons\/[^/]+\/(enroll|complete)$/.test(url) && method === 'POST';
    if (isStudentAction) { verify(bearer); return; }
    // Admin writes:
    if (method === 'POST' || method === 'PATCH' || method === 'DELETE') {
      const payload = verify(bearer);
      if (payload.role !== 'ADMIN') return res.code(403).send({ error: 'Forbidden' });
      return;
    }
  }

  // 2) Users
  if (url === '/users/me') { verify(bearer); return; }
  // Registration & login are public: POST /users, POST /users/auth/login

  // 3) Achievements
  if (url.startsWith('/achievements')) { verify(bearer); return; }
}
