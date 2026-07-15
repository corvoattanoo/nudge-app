import { FastifyRequest, FastifyReply } from "fastify";
import prisma from '../lib/prisma'

export async function eventDisplay(request: FastifyRequest, reply: FastifyReply){
    
    //const userId = request.user.id

    const events = await prisma.event.findMany({})

    return reply.status(200).send(events)
}

export async function eventDetails(request: FastifyRequest, reply: FastifyReply){
    
    //const userId = request.user.id

    const {id} = request.params as {id: string}

    const events = await prisma.event.findFirst({
        where: {
            id: parseInt(id)
        }
    })

    return reply.status(200).send(events)
}


export async function shareEvent(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id
    const {group_id, event_id} = request.body as {group_id: number, event_id: number}

    const isMember = await prisma.groupMembers.findFirst({
        where: {
            group_id: group_id,
            user_id: userId
        }
    })
    const isEvent = await prisma.event.findUnique({
        where: {
            id: event_id,
        }
    })

    if(!isMember) 
        {
            return reply.status(404).send({message: "You are not a member of this group"})}
    if(!isEvent){
        return reply.status(404).send({message: "The event is not exist"})}


    const alreadyShared = await prisma.event_shares.findFirst({
        where: {event_id, group_id}
    })

    if (alreadyShared) {
        return reply.status(400).send({message: "Already shared to this group"})
    }

    const share = await prisma.event_shares.create({
        data: {
            event_id,
            group_id,
            user_id: userId,
            status: 'PENDING'
        }
    })
    return reply.status(200).send(share)
}


