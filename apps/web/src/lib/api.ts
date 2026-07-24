const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3004/api";

export async function login(email: string, password: string){
    const response = await fetch(`${API_URL}/auth/login`,{
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password
        }),
    });

    if (!response.ok) {
    throw new Error("Login failed");
  }

    return response.json();
}