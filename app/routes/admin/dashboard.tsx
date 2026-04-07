import type { Route } from "./+types/dashboard";
import { useState } from "react";
import { useNavigate } from "react-router";
import { getBlogs, deleteBlog, getProjects, deleteProject, logout, type Blog, type Project } from "~/api/api";
import { requireAuth } from "~/utils/auth";
import { useTheme } from "~/contexts/ThemeContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin Dashboard | seojoon1" },
    { name: "description", content: "관리자 대시보드" },
  ];
}

export async function clientLoader() {
  requireAuth();
  const [blogs, projects] = await Promise.all([getBlogs(), getProjects()]);
  return { blogs, projects };
}

export default function AdminDashboard({ loaderData }: Route.ComponentProps) {
  const [tab, setTab] = useState<"blog" | "project">("blog");
  const [blogs, setBlogs] = useState<Blog[]>(loaderData.blogs);
  const [projects, setProjects] = useState<Project[]>(loaderData.projects);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDeleteBlog = async (blog: Blog) => {
    if (!confirm(`"${blog.title}" 글을 삭제하시겠습니까?`)) return;
    try {
      await deleteBlog(blog.id);
      setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
    } catch {
      alert("삭제에 실패했습니다.");
    }
  };

  const handleDeleteProject = async (project: Project) => {
    if (!confirm(`"${project.title}" 프로젝트를 삭제하시겠습니까?`)) return;
    try {
      await deleteProject(project.id);
      setProjects((prev) => prev.filter((p) => p.id !== project.id));
    } catch {
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 헤더 */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-bold text-gray-900 dark:text-white">Admin</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/admin/posts/new")}
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              + 새 글
            </button>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* 탭 */}
        <div className="flex gap-4 mb-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setTab("blog")}
            className={`pb-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              tab === "blog"
                ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            블로그 ({blogs.length})
          </button>
          <button
            onClick={() => setTab("project")}
            className={`pb-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              tab === "project"
                ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            프로젝트 ({projects.length})
          </button>
        </div>

        {/* 리스트 */}
        {tab === "blog" && (
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {blogs.length === 0 && (
              <li className="py-8 text-center text-sm text-gray-400">글이 없습니다</li>
            )}
            {blogs.map((blog) => (
              <li key={blog.id} className="flex items-center justify-between py-3 gap-4">
                <span className="text-sm text-gray-800 dark:text-gray-200 truncate">{blog.title}</span>
                <button
                  onClick={() => handleDeleteBlog(blog)}
                  className="flex-shrink-0 text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}

        {tab === "project" && (
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {projects.length === 0 && (
              <li className="py-8 text-center text-sm text-gray-400">프로젝트가 없습니다</li>
            )}
            {projects.map((project) => (
              <li key={project.id} className="flex items-center justify-between py-3 gap-4">
                <span className="text-sm text-gray-800 dark:text-gray-200 truncate">{project.title}</span>
                <button
                  onClick={() => handleDeleteProject(project)}
                  className="flex-shrink-0 text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
