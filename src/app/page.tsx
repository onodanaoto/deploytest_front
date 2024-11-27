import Image from "next/image";

export default function Home() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const date = ...; // 日付を取得するロジックを追加
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/askdate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date }),
        });
        const data = await res.json();
        // 取得したデータを処理するロジックを追加
    };

    return (
        <div>
            {/* フォームやその他のコンテンツ */}
        </div>
    );
}
