import 'next-auth'
import { DefaultSession } from 'next-auth'



declare module "next-auth"{
    interface Session {
        user: {
          id: string
          c_id?: string
        } & DefaultSession["user"]
      }
    interface User {
        id: string
        c_id?: string
    }
}

declare module "next-auth/jwt" {
  interface JWT {
    c_id?: string
  }
}

