"use server";

import { getOrgByUserId } from "@/data/organization";

export async function CheckOrgExists(u_id:string){
    return getOrgByUserId(u_id);
}