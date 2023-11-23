import express from "express";
import { body, validationResult } from "express-validator";
import { deleteUserById, getUserById, getUsers } from "../models/user";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const users = await getUsers();
        return res.status(200).json(users).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteUsers = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);
        return res.json(deletedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username) return res.sendStatus(400);

        const user = await getUserById(id);
        if (!user) return res.sendStatus(404);
        user.username = username;
        await user.save();
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}