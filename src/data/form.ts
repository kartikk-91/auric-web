import { prisma } from "@/lib/db"

export const getFormByOrgId=async (c_id:string)=>{
    try{
        const form=await prisma.feedbackForm.findFirstOrThrow({
            where:{c_id}
        });
        return form;
    }
    catch{
        return null;
    }
}