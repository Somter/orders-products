import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { createServer } from 'http';
import { Server } from 'socket.io';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const app = express();
const httpServer = createServer(app);
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

const io = new Server(httpServer, {
    cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: 'Доступ запрещен. Токен отсутствует.' });
        return;
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({ error: 'Неверный или просроченный токен.' });
            return;
        }
        (req as any).user = user;
        next();
    });
};

app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: 'Пользователь с таким email уже существует' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword }
        });

        res.json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при регистрации' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(400).json({ error: 'Неверный email или пароль' });
            return;
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, email: user.email });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при авторизации' });
    }
});


app.get('/api/orders', authenticateToken, async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                products: { include: { prices: true } }
            }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении приходов' });
    }
});

app.delete('/api/orders/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.order.delete({ where: { id: Number(id) } });
        res.json({ success: true, message: 'Приход успешно удален' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении прихода' });
    }
});

app.get('/api/products', authenticateToken, async (req, res) => {
    try {
        const { type } = req.query;
        const products = await prisma.product.findMany({
            where: type ? { type: String(type) } : undefined,
            include: {
                prices: true,
                order: true
            }
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении продуктов' });
    }
});

app.delete('/api/products/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.product.delete({ where: { id: Number(id) } });
        res.json({ success: true, message: 'Продукт успешно удален' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении продукта' });
    }
});


let activeSessions = 0;

io.on('connection', (socket) => {
    activeSessions++;
    io.emit('activeSessions', activeSessions);

    socket.on('disconnect', () => {
        activeSessions--;
        io.emit('activeSessions', activeSessions);
    });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
    console.log(`Бэкенд запущен на порту ${PORT}`);
});