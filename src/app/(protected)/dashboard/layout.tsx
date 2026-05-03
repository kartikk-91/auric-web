import { CheckFormExistsByOrgId } from "@/app/actions/check-feedback-form";
import { CheckOrgExists } from "@/app/actions/check-organization";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { ReactNode } from "react";


interface ProtectedLayoutProps {
  children: ReactNode;
}

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps){
    const session=await auth();
    if(!session) redirect("/auth/login");

    const orgExists=await CheckOrgExists(session.user.id);
    if(!orgExists) redirect("/organization")
    
    const formExists=await CheckFormExistsByOrgId(orgExists.c_id);
    if(!formExists) redirect("/build/feedbackForm")

    return (
        <div className="min-h-screen w-full">
            {children}
        </div>
    )
}