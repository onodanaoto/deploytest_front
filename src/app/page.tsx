import Image from "next/image";
import { FormEvent } from 'react';

export default function Home() {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const date = new Date().toISOString().split('T')[0];
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/askdate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date }),
        });
        const data = await res.json();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button type="submit">送信</button>
            </form>
        </div>
    );
}
