import axiosInstance from "./axiosInstance"
import type { Tag } from "./tagService";
import type { User } from "./userService";
import type Comment from "./commentService"

export interface Post{
  createdAt: string | number | Date;
  _id: number;
  comments: Comment[];
  user: User | null;
  texto: string;
  images?: Image[]; 
  tags?: Tag[]; 
}

export interface Image {
  _id: string;
  url: string;
}

export interface CreatePost {
  user: string;
  texto: string;
  images?: Image[]; 
  tags?: Tag[]; 
}



export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await axiosInstance.get<Post[]>("/post");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los posts:", error);
    throw error;
  }
};

export const newPost = async (createPost: CreatePost): Promise<Post> => {
  try {
    const response = await axiosInstance.post<Post>("/post", createPost);
  return response.data;
  } catch (error) {
    console.error("Error al crear el post: ", error)
    throw error
  }
};

export const getPostById = async (id:string): Promise<Post> => {
  try {
    const response = await axiosInstance.get<Post>(`/post/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el post", error);
    throw error;
  }
};