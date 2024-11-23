import express from 'express';
import { getUser, editUser } from '../utils/userModelUtils';

const UserRouter = express.Router();

UserRouter.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    getUser(req, res, id);
})

UserRouter.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    editUser(req, res, id)
})