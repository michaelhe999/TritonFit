import { Response, Request } from 'express';
import Users from '../models/userModel';
import { userProfile } from '../types';

export async function getUser(req: Request, res: Response, id: string) {
    try {
        console.log("ID received:", id);
        const userInfo = await Users.findOne({ email: id });
        console.log("Query executed:", { email: id });
        if (!userInfo) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(userInfo);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch user", error: err});
    }
}

export async function editUser(req: Request, res: Response, id: string) {
    try {
        const { 
            firstName, 
            lastName, 
            email, 
            major, 
            year, 
            experience, 
            aboutMe } = req.body as {firstName: string, 
                lastName: string,
                email: string,
                major: string,
                year: string,
                experience: string,
                aboutMe: string
            };

        if (!firstName || !lastName || !email || !major || !year || !experience || !aboutMe) {
            return res.status(400).send({error: "Missing required fields"});
        }

        const updatedUser = await Users.findOneAndUpdate(
            { email: id },
            {
                $set: { firstName: firstName, 
                    lastName: lastName, 
                    email: email, 
                    major: major, 
                    year: year, 
                    experience: experience, 
                    aboutMe: aboutMe 
                },
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        res.status(201).send({ message: "Successfully changed user info"});
    }
    catch (err) {
        res.status(500).json({ message: "failed to change user info", error: err});
    }
}