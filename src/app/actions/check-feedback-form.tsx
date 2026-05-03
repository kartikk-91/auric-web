import { getFormByOrgId } from "@/data/form";

export async function CheckFormExistsByOrgId(c_id:string){
    return getFormByOrgId(c_id);
}