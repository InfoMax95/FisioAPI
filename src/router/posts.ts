import { createPost, getAllPosts, getPost } from "../controllers/posts";
import express from "express";
import { body } from "express-validator";

const taskValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('completed').isBoolean().withMessage('Completed must be a boolean'),
];

export default (router: express.Router) => {
    router.get("/posts", getAllPosts);
    router.get("/posts/:id", getPost);
    router.post("/post", createPost);
}