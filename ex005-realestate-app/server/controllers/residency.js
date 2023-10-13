import asyncHandler from 'express-async-handler';
import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async(req, res) => {
    const { title, description, price, address, city, country, image, facilities, userEmail } = req.body.data

    console.log(req.body.data);

    try {
        const residency = await prisma.residency.create({
            data: {
                title, 
                description,
                price,
                address,
                city, 
                country, 
                image, 
                facilities, 
                owner: { connect : { email: userEmail }},
            },
        });
        res.send({
            message: "Residency registered successfully",
            residency: residency,
        });
    } catch (err) {
        if (err.code === "P2002") {
            throw new Error("A residency with address already existed");
        } else {
            throw new Error(err.message);
        }
        
    }
});

export const getAllResidencies = asyncHandler(async(req, res) => {
    try {
        const residencies = await prisma.residency.findMany({
            orderBy: {
                createdAt: "desc"
            },
        });
        res.send(residencies);
    } catch (err) {
        throw new Error(err.message);
    }
});

export const getResidency = asyncHandler(async(req, res) => {
    try {
        const { id } = req.params;
        const residency = await prisma.residency.findUnique({
            where: { id },
        });
        res.send(residency);
    } catch (err) {
        throw new Error(err.message);
    }
});

