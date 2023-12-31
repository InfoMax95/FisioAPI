import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    reading_time: { type: Number, required: false }, // in minutes
    tags: { type: [String], required: true },
    author: { type: String, required: true },
    level: { type: String, required: true, enumValues: ["entry", "expert"] },
    creation_date: { type: Date, required: true },
    summary: { type: String, required: true }
});

export const PostModel = mongoose.model("Post", PostSchema);
export const getPosts = () => PostModel.find();
export const getPostById = (id: string) => PostModel.findById({ id });
export const addPost = (values: Record<string, any>) => new PostModel(values)
    .save().then((post) => post.toObject());
export const addManyPosts = (values: Record<string, any>[]) => PostModel.insertMany(values)
    .then((posts) => posts);
export const deletePostById = (id: string) => PostModel.findOneAndDelete({ _id: id });
export const updatePostById = (id: string, values: Record<string, any>) => PostModel.findByIdAndUpdate(id, values);