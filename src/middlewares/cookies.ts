import express from "express";
import { merge, get, identity } from "lodash";

import { getUserBySessionToken } from "../models/user";

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, "identity._id") as unknown as string;

        if (!currentUserId) return res.sendStatus(403);
        if (currentUserId !== id) return res.sendStatus(403);

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies["FISIO-COOKIE"];
        if (!sessionToken) return res.sendStatus(403);

        const existingUser = getUserBySessionToken(sessionToken);
        if (!existingUser) return res.sendStatus(403);

        merge(req, { identity: existingUser });
        return next()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}



