import { prisma } from '@/server/prisma';

export async function GET() {
  const projects = await prisma.project.findMany();
  return Response.json(projects);
}
