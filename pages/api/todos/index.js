import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const todos = await prisma.todo.findMany();
    return res.status(200).json(todos);
  }
  if (req.method === "POST") {
    const { title, description, status } = req.body;
    const todo = await prisma.todo.create({
      data: { title, description, status },
    });
    return res.status(201).json(todo);
  }
  return res.status(405).json({ message: "Method not allowed" });
}
