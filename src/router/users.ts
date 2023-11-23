import express from "express";
import { deleteUsers, getAllUsers, updateUser } from "controllers/users";
import { isAuthenticated, isOwner } from "middlewares/cookies";
import { body } from "express-validator";

const taskValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('completed').isBoolean().withMessage('Completed must be a boolean'),
];

export default (router: express.Router) => {
    router.get("/users", isAuthenticated, getAllUsers);
    router.delete("/users/:id", isAuthenticated, isOwner, deleteUsers);
    router.patch("/users/:id", taskValidationRules, isAuthenticated, isOwner, updateUser);
}