import asyncHandler from 'express-async-handler';
import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async(req, res) => {
    let { email } = req.body;

    // true if the document with the email is found
    const userExists = await prisma.user.findUnique({
        where: {email: email}
    });

    if (!userExists) {
        const user = await prisma.user.create({ data: req.body });
        res.send({
            message: "User registered successfully",
            user: user,
        });
    } else {
        res.status(201).json({message: "User already registered"});
    }
});

// to book a visit to a residency
export const bookVisit = asyncHandler(async(req, res) => {
    const { email, date } = req.body;
    const { id } = req.params;

    try {
        const alreadyBooked = await prisma.user.findUnique({
            where: { email },
            select: { bookedVisits: true }
        });

        if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
            res.status(400).json({
                message: "This residency is alredy booked by you."
            });
        } else {
            await prisma.user.update({
                where: { email: email },
                data: {
                    bookedVisits: { push : {id, date} }
                }
            });
            res.send("Your visit is booked successfully");
        }
    } catch (err) {
        throw new Error(err.message);
    }
});

// to get booked visits
export const getBookedVisits = asyncHandler(async(req, res) => {
    const { email } = req.body;
    try {
        const bookings = await prisma.user.findUnique({
            where: {email},
            select: {bookedVisits: true}
        });
        res.status(200).send(bookings);
    } catch (error) {
        throw new Error(err.message);
    }
});

// to cancel a booked visit
export const cancelBookedVisit = asyncHandler(async(req, res) => {
    const { email} = req.body;
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {email: email},
            select: {bookedVisits: true}
        });

        const index = user.bookedVisits.findIndex((visit) => visit.id === id);

        if (index === -1) {
            res.status(404).json({
                message: "Booking not found"
            });
        } else {
            user.bookedVisits.splice(index, 1);
            await prisma.user.update({
                where: {email: email},
                data: {
                    bookedVisits: user.bookedVisits
                }
            });
            res.send("Booking cancelled successfully");
        }
    } catch (err) {
        throw new Error(err.message);
    }
});

// to add a residency in favorites or remove it
export const toFavorites = asyncHandler(async(req, res) => {
    const { email} = req.body;
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {email: email}
        });

        if (user.favResidenciesId.includes(id)) {
            const updatedUser = await prisma.user.update({
                where: {email: email},
                data: {
                    favResidenciesId: {
                        set: user.favResidenciesId.filter((rid) => rid !== id)
                    }
                }
            });
            res.send({
                message: "Removed from favorites.",
                user: updatedUser
            });
        } else {
            const updatedUser = await prisma.user.update({
                where: {email: email},
                data: {
                    favResidenciesId: {
                        push: id
                    }
                }
            });
            res.send({
                message: "Added to favorites.",
                user: updatedUser
            });
        }
    } catch (err) {
        throw new Error(err.message);
    } 
});

// to get favorites
export const getFavorites = asyncHandler(async(req, res) => {
    const { email } = req.body;
    try {
        const favorites = await prisma.user.findUnique({
            where: {email},
            select: {favResidenciesId: true}
        });
        res.status(200).send(favorites);
    } catch (error) {
        throw new Error(err.message);
    }
});
