'use client'

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { z } from 'zod';
import { register } from "@/lib/api";
import { toast } from "sonner";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least6 characters"),
});

type RegisterData = z.infer<typeof registerSchema>;

export function RegisterForm(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{username?: string, email?: string, password?: string}>({});

    const router = useRouter();

    const mutation = useMutation({
    mutationFn: ({ username, email, password }: RegisterData) =>
      register(email, username, password),
    onSuccess: () => {
      toast.success("Account created successfully! Please log in.");
      router.push("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create account");
    },
  });

  function handleSubmit(e: React.FormEvent){
    e.preventDefault();

    const result = registerSchema.safeParse({username, email, password});
      if(!result.success){
        const fieldErrors = result.error.issues;
        const newErrors: {username?: string; email?: string; password?:string} = {};

        for(const issue of fieldErrors){
          const field = issue.path[0] as keyof typeof newErrors;
          newErrors[field] = issue.message
        }
        setErrors(newErrors);
        return;    
      }     
      setErrors({});
      mutation.mutate({ username, email, password });
    }
    return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      <div className="space-y-1">
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && (
          <p className="text-xs text-destructive">{errors.username}</p>
        )}
      </div>
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
      <Button type="submit" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? "Creating account..." : "Sign up"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="underline hover:text-foreground">
          Log in
        </Link>
      </p>
    </form>
  );
}

