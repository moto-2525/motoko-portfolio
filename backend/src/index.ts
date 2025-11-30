import express from 'express';
import cors from 'cors'; // ← 追加！
import { PrismaClient } from '@prisma/client';

const app = express();

app.use(cors()); // ← これを必ず追加！

const prisma = new PrismaClient();

app.use(express.json());

// GET 全取得
app.get('/contact', async (req, res) => {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json(contacts);
});

// 🏠 Home API
app.get('/api/home', async (req, res) => {
  try {
    const data = await prisma.homeContent.findFirst();
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Failed to fetch home content' });
  }
});

// 🔥 画像URL更新API
app.post('/api/home/update-image', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl)
      return res.status(400).json({ error: 'imageUrl が必要です' });

    const updated = await prisma.homeContent.update({
      where: { id: 1 }, // HomeContentが1行ならID=1固定
      data: { imageUrl },
    });

    res.json(updated);
  } catch (error) {
    res
      .status(500)
      .json({ error: '画像URL更新に失敗しました', details: error });
  }
});

/* ===========================
   🔥 Skills API
===========================*/
app.get('/api/skills', async (req, res) => {
  const skills = await prisma.skill.findMany();
  res.json(skills);
});

app.post('/api/skills', async (req, res) => {
  const { name } = req.body;
  const skill = await prisma.skill.create({ data: { name } });
  res.json(skill);
});

app.delete('/api/skills/:id', async (req, res) => {
  await prisma.skill.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: 'deleted' });
});

/* ===========================
   🔥 Works API
===========================*/
app.get('/api/works', async (req, res) => {
  const works = await prisma.work.findMany();
  res.json(works);
});

app.post('/api/works', async (req, res) => {
  const { title, url } = req.body;
  const work = await prisma.work.create({ data: { title, url } });
  res.json(work);
});

app.delete('/api/works/:id', async (req, res) => {
  await prisma.work.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: 'deleted' });
});

// POST 新規登録
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: '必須項目が不足しています' });
  }

  const contact = await prisma.contact.create({
    data: { name, email, message },
  });
  res.status(201).json(contact);
});

app.listen(3001, () => console.log('🚀 Backend API is running on 3001'));

//PATCH（更新）
app.patch('/contact/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, message } = req.body;

  const updated = await prisma.contact.update({
    where: { id: Number(id) },
    data: { name, email, message },
  });

  res.json(updated);
});

//DELETE（削除）

app.delete('/contact/:id', async (req, res) => {
  const { id } = req.params;

  await prisma.contact.delete({
    where: { id: Number(id) },
  });

  res.json({ message: '削除しました' });
});
