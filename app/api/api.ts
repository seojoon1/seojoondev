// 엑시오스로 API 호출 함수 정의
import axios, { type InternalAxiosRequestConfig } from 'axios';
// API 기본 URL 설정
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 메모리에 저장할 Access Token (대신 localStorage 사용 권장)
// SPA 환경이거나 새로고침 시에도 유지되도록 localStorage를 활용합니다.
export const setAccessToken = (token: string | null) => {
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
  }
};

export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
};

//axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// 요청 인터셉터: Access Token을 헤더에 추가
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // getter 함수를 사용하여 최신 토큰 값 가져오기
    const token = getAccessToken();
    // console.log('📤 API 요청:', config.url, '| Token:', token ? '있음 (***' + token.slice(-8) + ')' : '❌ 없음');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log('✅ Authorization 헤더 추가됨');
    } else if (!token) {
      // console.warn('⚠️ 토큰이 없어서 Authorization 헤더를 추가하지 않았습니다!');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 에러 처리
api.interceptors.response.use(
  (response) => {
    console.log('✅ API 응답 성공:', response.config.url);
    return response;
  },
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // 403 에러이고 재시도하지 않은 요청인 경우
    if (error.response?.status ===  401 && !originalRequest._retry) {
      console.log('⚠️ 403  에러 발생! 토큰 갱신 시도...');
      originalRequest._retry = true;

      try {
        // Refresh Token으로 새로운 Access Token 요청
        const response = await api.post<{ access_token: string }>('/auth/refresh');

        console.log('🔄 토큰 갱신 성공!');
        // 새 Access Token 저장
        setAccessToken(response.data.access_token);

        // 원래 요청 재시도
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        console.log('❌ 토큰 갱신 실패! 로그인 페이지로 이동...');
        // Refresh Token도 만료된 경우 로그인 페이지로 리다이렉트
        setAccessToken(null);

        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      }
    }

    console.error('❌ API 에러:', error.response?.status, error.config.url);
    return Promise.reject(error);
  }
);

//응답 타입 지정
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  image: string;
}

//프로젝트 데이터 가져오는 함수
export const getProjects = async (): Promise<Project[]> => {
  try{
    const response = await api.get<Project[]>('/projects');
    return response.data;
  }
  catch(error){
    console.error('프로젝트 데이터를 가져오는 중 오류 발생:', error);
    throw error;
  }
}

//블로그 응답 타입 지정
export interface Blog {
  id: string;
  title: string;
  content: string;
  tags: string[];
  image: string;
}


//블로그 데이터 가져오는 함수
export const getBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await api.get<Blog[]>('/posts');
    return response.data;
  } catch (error) {
    console.error('블로그 데이터를 가져오는 중 오류 발생:', error);
    throw error;
  }
}

// 블로그 생성 요청 타입
export interface CreateBlogData {
  title: string;
  content: string;
  tags: string;
  image?: string | null;
  image_file?: File | null;
}

export const postBlog = async (data: CreateBlogData): Promise<Blog> => {
  try {
    // image_file이 있으면 FormData 사용, 없으면 JSON 전송
    if (data.image_file) {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('tags', data.tags);
      if (data.image) {
        formData.append('image', data.image);
      }
      formData.append('image_file', data.image_file);

      const response = await api.post<Blog>('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      const response = await api.post<Blog>('/posts', {
        title: data.title,
        content: data.content,
        tags: data.tags,
        image: data.image || null,
      });
      return response.data;
    }
  } catch (error) {
    console.error('블로그 생성 중 오류 발생:', error);
    throw error;
  }
}

// 블로그 삭제하는 함수
export const deleteBlog = async (id: string): Promise<void> => {
  try {
    await api.delete(`/posts/${id}`);
  } catch (error) {
    console.error('블로그 삭제 중 오류 발생:', error);
    throw error;
  }
}


//로그인
export const adminLogin = async(username: string, password: string): Promise<{ token: string }> => {
  try {
    const response = await api.post<any>('/auth/login', { username, password });
    
    // 서버가 주는 키가 token인지 access_token인지 확인하여 안전하게 저장
    const tokenToSave = response.data.access_token;
    
    console.log('로그인 응답 토큰:', tokenToSave ? '정상 발급' : '없음 (서버 응답 확인 필요)');
    setAccessToken(tokenToSave);

    return response.data;
  }
  catch(error) {
    throw error;
  }
}

// 로그아웃
export const logout = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
    setAccessToken(null);
  } catch (error) {
    console.error('로그아웃 중 오류 발생:', error);
    throw error;
  }
}
// 프로젝트 생성 요청 타입 (이미지는 파일만 허용)
export interface CreateProjectData {
  title: string;
  description: string;
  tags: string;
  github: string;
  demo: string;
  image_file: File;
}

export const postProject = async (data: CreateProjectData): Promise<Project> => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('tags', data.tags);
  formData.append('github', data.github);
  formData.append('demo', data.demo);
  formData.append('image_file', data.image_file);

  try {
    const response = await api.post<Project>('/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('프로젝트 생성 중 오류 발생:', error);
    throw error;
  }
}

export const deleteProject = async (id: string): Promise<void> => {
  try {
    await api.delete(`/projects/${id}`);
  } catch (error) {
    console.error('프로젝트 삭제 중 오류 발생:', error);
    throw error;
  }
}