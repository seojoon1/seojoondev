import { redirect } from "react-router";
import { getAccessToken } from "~/api/api";

/**
 * 인증이 필요한 페이지의 loader에서 사용하는 가드 함수
 * 토큰이 없으면 로그인 페이지로 리다이렉트
 */
export function requireAuth() {
  const token = getAccessToken();

  if (!token) {
    console.warn('🚫 인증되지 않은 접근 시도 - 로그인 페이지로 리다이렉트');
    throw redirect('/login');
  }

  return token;
}

/**
 * 로그인 페이지에서 사용하는 가드 함수
 * 이미 로그인한 경우 대시보드로 리다이렉트
 */
export function requireGuest() {
  const token = getAccessToken();

  if (token) {
    console.log('✅ 이미 로그인됨 - 대시보드로 리다이렉트');
    throw redirect('/admin/dashboard');
  }
}
