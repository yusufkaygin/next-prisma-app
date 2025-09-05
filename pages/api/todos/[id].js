import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  if (method === "GET") {
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(todo);
  }
  if (method === "PUT") {
    const { title, description, status } = req.body;
    const updated = await prisma.todo.update({
      where: { id },
      data: { title, description, status },
    });
    return res.status(200).json(updated);
  }
  if (method === "DELETE") {
    await prisma.todo.delete({ where: { id } });
    return res.status(204).end();
  }
  return res.status(405).json({ message: "Method not allowed" });
}
