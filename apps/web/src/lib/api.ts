const API_URL = "http://localhost:3000/api";

export async function login(email: string, password: string){
    const respond = await fetch(`${API_URL}/auth/login`,{
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password
        }),
    });

    return respond.json();
}