import axios from 'axios';
import { AuthResponse, SignupResponse } from '../types';

const BASE_URL = 'http://localhost:8000';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    console.log(BASE_URL);
    const response = await axios.post<AuthResponse>(`${BASE_URL}/login/`, { email, password });
    const { access, refresh } = response.data;
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    localStorage.setItem('email', email);
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const signup = async (username: string, email: string, password: string, name: string): Promise<SignupResponse> => {
  try {
    console.log(BASE_URL);
    const response = await axios.post<SignupResponse>(`${BASE_URL}/register/`, { username, email, password, name });
    return response.data;
  } catch (error) {
    throw new Error('Signup failed');
  }
};

export const logout = async (): Promise<void> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    await axios.post(`${BASE_URL}/logout/`, {
      refresh: refreshToken
    }, {
    });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('email');
  } catch (error) {
    throw new Error('Logout failed');
  }
};
