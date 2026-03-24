import type { Route } from "./+types/dashboard";
import { useState } from "react";
import { useNavigate } from "react-router";
import { getBlogs, deleteBlog, logout, type Blog } from "~/api/api";
import { requireAuth } from "~/utils/auth";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin Dashboard | seojoon1" },
    { name: "description", content: "관리자 대시보드" },
  ];
}

export async function clientLoader() {
  const token = requireAuth();
  const blogs = await getBlogs();
  return { blogs, token };
}

export default function AdminDashboard({ loaderData }: Route.ComponentProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>(loaderData.blogs);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNewPost = () => {
    navigate("/admin/posts/new");
  };



  const handleDeletePost = async (blog: Blog) => {
    if (confirm(`"${blog.title}" 글을 삭제하시겠습니까?`)) {
      try {
        await deleteBlog(blog.id);
        // 목록에서 제거
        setBlogs(blogs.filter((b) => b.id !== blog.id));
        alert("삭제되었습니다.");
      } catch (error) {
        alert("삭제에 실패했습니다.");
        console.error("Delete error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 헤더 */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* 로고 & 햄버거 메뉴 */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors lg:hidden"
                aria-label="메뉴 열기"
              >
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                <span className="hidden sm:inline">Admin Dashboard</span>
                <span className="sm:hidden">Dashboard</span>
              </h1>
            </div>

            {/* 우측 메뉴 */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">로그아웃</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* 사이드바 */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 top-16 z-40 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            lg:block overflow-y-auto
          `}
        >
          <nav className="p-4 space-y-2">
            <a
              href="/admin/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              대시보드
            </a>

            <a
              href="/admin/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              블로그 관리
            </a>
          </nav>
        </aside>

        {/* 사이드바 오버레이 (모바일) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden top-16"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* 메인 컨텐츠 */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full overflow-x-hidden">
          {/* 헤더 섹션 */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  블로그 포스트 관리
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  총 {blogs.length}개의 포스트
                </p>
              </div>
              <button
                onClick={handleNewPost}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm w-full sm:w-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                새 글 작성
              </button>
            </div>
          </div>

          {/* 블로그 포스트 목록 */}
          <div className="grid gap-4 sm:gap-6">
            {blogs.map((blog, index) => (
              <div
                key={blog.id || index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* 썸네일 */}
                  <div className="flex-shrink-0 w-full sm:w-48 h-40 sm:h-32 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                    {blog.image ? (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* 포스트 정보 */}
                  <div className="flex-grow min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 break-words">
                      {blog.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 break-words">
                      {blog.content}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(Array.isArray(blog.tags) ? blog.tags : [blog.tags]).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2.5 sm:px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* 액션 버튼 */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleDeletePost(blog)}
                        className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors w-full sm:w-auto"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* 포스트 없을 때 */}
            {blogs.length === 0 && (
              <div className="text-center py-12">
                <svg
                  className="mx-auto w-16 h-16 text-gray-400 dark:text-gray-600 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg mb-4">
                  아직 작성된 포스트가 없습니다
                </p>
                <button
                  onClick={handleNewPost}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  첫 포스트 작성하기
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
