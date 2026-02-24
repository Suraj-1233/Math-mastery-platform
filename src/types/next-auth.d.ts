
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
            organizationId?: string | null;
            needsPasswordChange?: boolean;
        } & DefaultSession["user"];
    }

    interface User {
        role: string;
        organizationId?: string | null;
        needsPasswordChange?: boolean;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: string;
        organizationId?: string | null;
        needsPasswordChange?: boolean;
    }
}
