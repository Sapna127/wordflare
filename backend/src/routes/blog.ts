import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
    const token = c.req.header("Authorization") || "";
  
    try {
      const user = await verify(token, c.env.JWT_SECRET);
      
      if (user && typeof user.id === "string") {
        c.set("userId", user.id as string); 
        return next();
      } else {
        c.status(403);
        return c.json({
          message: "You are not logged in",
        });
      }
    } catch (error) {
      c.status(403);
      return c.json({
        message: "Invalid or expired token",
      });
    }
  });
  

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient().$extends(withAccelerate());
  const blogs = await prisma.post.findMany(); // Assuming `Post` instead of `Blog`
  return c.json({ blogs });
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient().$extends(withAccelerate());
  const id = c.req.param("id");

  const blog = await prisma.post.findFirst({
    where: { id },
  });
  return c.json({ blog });
});

blogRouter.post("/", async (c) => {
    const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	});
	return c.json({
		id: post.id
	});
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient().$extends(withAccelerate());
  const body = await c.req.json();

  const blog = await prisma.post.update({
    where: { id: body.id },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({ id: blog.id });
});

