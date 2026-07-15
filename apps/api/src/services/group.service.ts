// Put group-related database and business logic here.
import prisma from '../lib/prisma'

export async function isGroupMember(user_id: number, group_id: number): Promise<boolean> {
  const member = await prisma.groupMembers.findFirst({
    where: { user_id, group_id }
  })
  return !!member //!!member ne yapıyor: objeyi boolean'a çeviriyor. Kayıt varsa true, nullise false.
}

export async function voteduplicate(user_id:number , event_share_id: number): Promise<boolean> {
    const vote = await prisma.vote.findFirst({
        where: {user_id, event_share_id}
    })

    return !!vote
}

