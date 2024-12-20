"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const loginSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = handleSubmit(async (data) => {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        if (response.ok) {
            const user = await response.json()
            if (user.role === "admin") {
                router.push("/admin")
            } else {
                router.push("/")
            }
        } else {
            setError("Invalid username or password")
        }
    })

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16">
            <h1 className="text-3xl font-bold mb-2">Login</h1>
            <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 rounded-md border border-input bg-primary-foreground p-6 shadow-md">
                <Input
                    type="text"
                    aria-label="Username"
                    placeholder="Username"
                    aria-errormessage={errors.username?.message}
                    {...register("username")}
                    className="w-full"
                />
                <Input
                    type="password"
                    aria-label="Password"
                    placeholder="Password"
                    aria-errormessage={errors.password?.message}
                    {...register("password")}
                    className="w-full"
                />
                {error && <p className="text-red-600">{error}</p>}
                <Button type="submit" className="w-full">Login</Button>
            </form>
        </div>
    )
}
