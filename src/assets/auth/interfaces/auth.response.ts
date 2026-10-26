import type { User } from "@/assets/interfaces/user.interface";

export interface authResponse {
    user: User,
    token: string
}