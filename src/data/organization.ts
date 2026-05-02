import { prisma } from "@/lib/db"

export const getOrgByUserId=async (u_id:string)=>{
    try {
        const org = await prisma.company.findFirstOrThrow({
            where:{u_id}
        });
        return org;
    }
    catch{
        return null;
    }
}