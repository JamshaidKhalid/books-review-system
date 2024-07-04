import axios from 'axios';

const BASE_URL = `http://localhost:8000`;

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/login/`, {
      email,
      password
    });
    const { access, refresh, id } = response.data;
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    localStorage.setItem('userId', id);
    localStorage.setItem('email', email)
    return response.data;
  } catch (error) {
    throw new Error('Operation failed');
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

export const signup = async (email: string, username: string, name: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/register/`, {
      email,
      username,
      name,
      password
    });
    return response.data;
  } catch (error) {
    throw new Error('Operation failed');
  }
};

export const fetchFollowers = async (userId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/profile/${userId}/followers/`);
    return response.data;
  } catch (error) {
    throw new Error('Operation failed');
  }
};

export const fetchFollowing = async (userId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/profile/${userId}/following/`);
    return response.data;
  } catch (error) {
    throw new Error('Operation failed');
  }
};

export const fetchListUsers = async (userId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/list_users/`, {
      params: {
        user_id: userId
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Operation failed');
  }
};

export const followUser = async (userId: number, userToFollowId: number) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/profile/follow/`,
      {
        user_id: userId,
        user_to_follow_id: userToFollowId
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Operation failed');
  }
};

export const unfollowUser = async (userId: number, userToUnfollowId: number) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/profile/unfollow/`,
      {
        user_id: userId,
        user_to_unfollow_id: userToUnfollowId
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Operation failed');
  }
};
