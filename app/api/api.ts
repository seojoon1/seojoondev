// 엑시오스로 API 호출 함수 정의
import axios from 'axios';
// API 기본 URL 설정
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

//응답 타입 지정
export interface Project {
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

