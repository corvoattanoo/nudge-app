'use client'

import React, { useState } from "react";
import { z } from "zod";
import { login } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password should be atleast 6 characters"),
});


export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Hataları saklayacağımız state
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

          // 2. Form verilerini Zod ile doğruluyoruz
        const result = loginSchema.safeParse({ email, password });

        if(!result.success){
            //if error save to state and stop 
            const fieldError = result.error.flatten().fieldErrors;
            setErrors({
                email: fieldError.email?.[0],
                password: fieldError.password?.[0],
            })
            return ;
        }
        //if no error 
        setErrors({});
        try {
            const user = await login(email, password);
            console.log(user);
        } catch (error) {
            console.error("Giriş hatası:", error);
        } 
    }

    return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
      <div className="space-y-1">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email}</p>
        )}
      </div>
      <div className="space-y-1">
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password}</p>
        )}
      </div>
      <Button type="submit" variant="outline" className="w-full">
        Login
      </Button>
    </form>
  );
}

