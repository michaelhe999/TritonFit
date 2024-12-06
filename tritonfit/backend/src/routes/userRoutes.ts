import express from 'express';
import { getUser, editUser, getAllUsers, addUser } from '../utils/userModelUtils';
import User from '../models/userModel';

const UserRouter = express.Router();

UserRouter.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    getUser(req, res, id);
})

UserRouter.post("/update/:id", async (req, res) => {
    const id = req.params.id;
    editUser(req, res, id)
})

UserRouter.post('/add', async (req, res) => {
    addUser(req, res);
});
UserRouter.get('/getall', async (req, res) => {
    getAllUsers(req, res);
})

export default UserRouter