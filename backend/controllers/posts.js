import { response } from "express";
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 2;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    req.status(404).json({ message: error.message });
  }
};

export const getPostBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  console.log(tags);

  try {
    const title = new RegExp(searchQuery, "i");

    //encuentra todos los posts que matchean 1 o 2 de los criterios dados $or, title or tags
    //$in, significa, hay algun tag en el array de tags de la bd que coincida, split separa la query y la convierte en un array
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
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
