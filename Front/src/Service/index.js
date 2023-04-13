import API from "./API";
import { ENDPOINTS } from "../appConstants";

const { get, post, put, del } = API

export const getPostList = async () => {
  return get(ENDPOINTS.POST)
}

export const getPostDetail = async (id) => {
  return get(`${ENDPOINTS.POST}/${id}`)
}

export const createPost = async (username, data) => {
  return post(`${ENDPOINTS.POST}?username=${username}`, data)
}

export const updatePost = async (id, data) => {
  return put(`${ENDPOINTS.POST}/${id}`, data);
}

export const deletePost = async (id) => {
  return del(`${ENDPOINTS.POST}/${id}`)
}

export const getAuthorList = async () => {
  return get(ENDPOINTS.AUTHOR)
}

export const getAuthorByEmail = async (email) => {
  return get(`${ENDPOINTS.AUTHOR}/email/${email}`)
}

export const getAuthorByUsername = async (username) => {
  return get(`${ENDPOINTS.AUTHOR}/username/${username}`)
}
