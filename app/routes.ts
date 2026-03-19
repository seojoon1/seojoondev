import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("projects", "routes/projects.tsx"),
  route("blog", "routes/blog.tsx"),
  route("login", "routes/login.tsx"),
  route("admin/dashboard", "routes/admin/dashboard.tsx"),
  route("admin/posts/new", "routes/admin/posts/new.tsx"),
] satisfies RouteConfig;
