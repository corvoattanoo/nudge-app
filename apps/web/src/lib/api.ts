
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3004/api";

export async function login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password
        }),
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    return response.json();
}

export async function register(email: string, username: string, password: string ){
    const response = await fetch(`${API_URL}/auth/register`,{
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
            username
        }),
        credentials: 'include',
    });

    if(!response.ok){
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Register fail");
    }

    return response.json();
}

export interface EventItem {
    id: number;
  title: string;
  description?: string | null;
  location_name: string;
  lat: number;
  lng: number;
  starts_at: string;
  ends_at?: string | null;
  price: string | number;
  currency: string;
  category: string;
  imageUrl: string;
  sourceUrl: string;
}

export async function getEvents(): Promise<EventItem[]> {
    const response = await fetch(`${API_URL}/events`, {
        method: "GET",
        headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    });

    if(!response.ok){
        throw new Error("Failed to fetch events");
    }

    return response.json();
}