import express from "express";
import { addPost, getPostById, getPosts } from "../models/post";

export const getAllPosts = async (req: express.Request, res: express.Response) => {
    try {
        const posts = await getPosts();
        if (!posts) return res.sendStatus(404);
        return res.status(200).json(posts).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getPost = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id;
        const post = await getPostById(id);
        if (!post) return res.sendStatus(400);
        return res.status(200).json(post).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const createPost = async (req: express.Request, res: express.Response) => {
    try {
        const values = req.body;
        const post = await addPost(values);
        return res.status(200).json(post).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};