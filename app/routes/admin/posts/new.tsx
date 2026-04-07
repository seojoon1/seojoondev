import type { Route } from "./+types/new";
import { useState } from "react";
import { useNavigate } from "react-router";
import { requireAuth } from "~/utils/auth";
import { postBlog, postProject } from "~/api/api";
import { useTheme } from "~/contexts/ThemeContext";
import ReactMarkdown from 'react-markdown';

export function clientLoader() {
  requireAuth();
  return null;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "새 포스트 작성 | Admin" },
    { name: "description", content: "새 블로그 포스트 작성" },
  ];
}

const inputClass = "w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:opacity-50 text-sm transition-colors";
const labelClass = "block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [github, setGithub] = useState("");
  const [demo, setDemo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [onMarkdown, setOnMarkdown] = useState(false);
  const [postType, setPostType] = useState<"blog" | "project">("blog");
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (postType === "blog") {
        await postBlog({ title, content, tags, image: image || null, image_file: imageFile });
      } else {
        await postProject({ title, description: content, tags, github, demo, image_file: imageFile! });
      }
      navigate("/admin/dashboard");
    } catch (error: any) {
      setError(error.response?.data?.message || "생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 헤더 */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-bold text-gray-900 dark:text-white">새 글 작성</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              aria-label="다크모드 전환"
            >
              {isDark ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 타입 탭 */}
          <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700">
            {(["blog", "project"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setPostType(type)}
                className={`pb-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  postType === type
                    ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {type === "blog" ? "블로그" : "프로젝트"}
              </button>
            ))}
          </div>

          {/* 에러 */}
          {error && (
            <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
          )}

          {/* 제목 */}
          <div>
            <label htmlFor="title" className={labelClass}>제목 *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isLoading}
              className={inputClass}
              placeholder="제목을 입력하세요"
            />
          </div>

          {/* 내용 */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="content" className={labelClass + " mb-0"}>
                {postType === "blog" ? "내용" : "설명"} *
              </label>
              {postType === "blog" && (
                <div className="flex rounded border border-gray-300 dark:border-gray-600 overflow-hidden text-xs">
                  <button
                    type="button"
                    onClick={() => setOnMarkdown(false)}
                    className={`px-2.5 py-1 transition-colors ${
                      !onMarkdown ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    작성
                  </button>
                  <button
                    type="button"
                    onClick={() => setOnMarkdown(true)}
                    className={`px-2.5 py-1 transition-colors border-l border-gray-300 dark:border-gray-600 ${
                      onMarkdown ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    미리보기
                  </button>
                </div>
              )}
            </div>
            {onMarkdown && postType === "blog" ? (
              <div className="w-full min-h-48 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 overflow-y-auto">
                {content
                  ? <div className="prose prose-gray dark:prose-invert max-w-none text-sm"><ReactMarkdown>{content}</ReactMarkdown></div>
                  : <p className="text-gray-400 text-sm">미리볼 내용이 없습니다.</p>
                }
              </div>
            ) : (
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                disabled={isLoading}
                rows={8}
                className={inputClass + " resize-y"}
                placeholder={postType === "blog" ? "내용을 작성하세요 (마크다운 지원)" : "프로젝트 설명을 입력하세요"}
              />
            )}
          </div>

          {/* 태그 */}
          <div>
            <label htmlFor="tags" className={labelClass}>태그 *</label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
              disabled={isLoading}
              className={inputClass}
              placeholder="JavaScript, React, Web"
            />
          </div>

          {/* 블로그 — 이미지 URL */}
          {postType === "blog" && (
            <div>
              <label htmlFor="image" className={labelClass}>이미지 URL</label>
              <input
                type="text"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                disabled={isLoading}
                className={inputClass}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          )}

          {/* 프로젝트 — GitHub / Demo */}
          {postType === "project" && (
            <>
              <div>
                <label htmlFor="github" className={labelClass}>GitHub URL</label>
                <input
                  type="text"
                  id="github"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  disabled={isLoading}
                  className={inputClass}
                  placeholder="https://github.com/username/repo"
                />
              </div>
              <div>
                <label htmlFor="demo" className={labelClass}>Demo URL</label>
                <input
                  type="text"
                  id="demo"
                  value={demo}
                  onChange={(e) => setDemo(e.target.value)}
                  disabled={isLoading}
                  className={inputClass}
                  placeholder="https://your-demo.com"
                />
              </div>
            </>
          )}

          {/* 이미지 파일 */}
          <div>
            <label className={labelClass}>
              {postType === "blog" ? "또는 이미지 파일" : "이미지 파일 *"}
            </label>
            <label className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {imageFile ? imageFile.name : "클릭하여 이미지 선택"}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                disabled={isLoading}
                className="hidden"
              />
            </label>
          </div>

          {/* 제출 */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "생성 중..." : "생성"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
