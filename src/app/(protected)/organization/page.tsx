import { CheckOrgExists } from "@/app/actions/check-organization";
import { auth } from "@/auth";
import LeftPanel from "@/components/org/left-panel";
import RightPanel from "@/components/org/right-panel";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
    const session = await auth();

    if (!session) redirect("/auth/login");

    const orgExists = await CheckOrgExists(session.user.id);

    if (orgExists) redirect("/dashboard");

    

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">

            <header className="flex items-center justify-between px-6 pt-4 lg:px-12">
                <div className="flex items-center gap-2">
                    <div>
                        <Image
                            src={'/logo.png'}
                            width={100}
                            height={100}
                            alt={'Auric'}
                        />
                    </div>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row gap-8 px-6 py-4 lg:px-12 lg:py-8 max-w-7xl mx-auto">
                <LeftPanel />
                <RightPanel />
            </div>
        </div>
    );
}