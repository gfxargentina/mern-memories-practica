import { response } from "express";
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    req.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  //para saber si el id es valido
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updatePost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatePost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  //verifica si el usario esta autenticado, req.userId viene del middleware auth.js para saber que usuario es
  if (!req.userId) return res.json({ message: "Unauthenticated" });

  //verifica si existe el post que el usuario quiere modificar
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  const post = await PostMessage.findById(id);

  //para saber si el id del usuario ya esta en el post, esto quiere decir que ya tiene un like
  //findIndex hace un loop por todos los id, cada like es el id del usuario especifico,
  // con esto verifica quien le da like al post especifico
  const index = post.likes.findIndex((id) => id === String(req.userId));

  //si el post no tiene el id del usuario es -1, entonces le da un 1 like del usuario especifico
  //si el post ya tiene el id, le saca el like del usuario
  if (index === -1) {
    //like the post
    post.likes.push(req.userId);
  } else {
    //dislike a post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
