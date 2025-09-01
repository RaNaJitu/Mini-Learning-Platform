import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function authRoutes(app: FastifyInstance) {
  const registerBody = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['ADMIN','STUDENT']).optional()
  });

  const loginBody = z.object({
    email: z.string().email(),
    password: z.string().min(8)
  });

  app.post('/users', async (req, res) => {
    const body = registerBody.parse(req.body);
    const hash = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: { email: body.email, passwordHash: hash, role: body.role ?? 'STUDENT' }
    });
    return { id: user.id, email: user.email, role: user.role };
  });

  app.post('/users/auth/login', async (req, res) => {
    const body = loginBody.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) return res.code(401).send({ error: 'Bad credentials' });
    const ok = await bcrypt.compare(body.password, user.passwordHash);
    if (!ok) return res.code(401).send({ error: 'Bad credentials' });
    const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '1d' });
    return { token };
  });

  app.get('/users/me', async (req: any, res) => {
    const auth = req.headers.authorization;
    if (!auth?.startsWith('Bearer ')) return res.code(401).send({ error: 'Missing token' });
    try {
      const payload = jwt.verify(auth.slice(7), process.env.JWT_SECRET || 'devsecret') as any;
      const me = await prisma.user.findUnique({ where: { id: payload.sub } });
      return me ? { id: me.id, email: me.email, role: me.role } : res.code(404).send({ error: 'Not found' });
    } catch {
      return res.code(401).send({ error: 'Invalid token' });
    }
  });
}
