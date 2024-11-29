// pages/index.js
// Reactの'useState'フックをインポートします。これにより、コンポーネント内で状態を管理できます。
import { useState } from 'react';

// メインのHomeコンポーネントを定義します。これがページの主要な内容になります。
export default function Home() {
  // 'useState'フックを使用して、誕生日の入力値と計算結果を保持する状態を作成します。
  // 'birthday'は現在の値、'setBirthday'はその値を更新する関数です。
  const [selectedDate, setSelectedDate] = useState('');
  const [result, setResult] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // 新しい状態を追加
  const [getMessage, setGetMessage] = useState('');
  const [getId, setGetId] = useState('');
  const [idResponse, setIdResponse] = useState('');
  const [postId, setPostId] = useState('');
  const [postResponse, setPostResponse] = useState('');

  // フォーム送信時に呼び出される関数です。
  const handleDateSubmit = async (e) => {
    // フォームのデフォルトの送信動作を防ぎま。
    e.preventDefault();
    
    try {
      const res = await fetch('http://localhost:5000/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: selectedDate }),
      });
      
      const data = await res.json();
      
      if (data.error) {
        console.error('Error:', data.error);
        setResult(`エラーが発生しました: ${data.error}`);
        return;
      }
      
      setResult(data.text);
      if (data.image) {
        setImageUrl(data.image);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setResult('サーバーとの通信に失敗しました');
    }
  };

  // 新しいハンドラを追加
  const handleGetRequest = async () => {
    const response = await fetch('http://localhost:5000/');
    const data = await response.json();
    setGetMessage(data.message);
  };

  const handleGetById = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/get/${getId}`);
    const data = await response.json();
    setIdResponse(data.result);
  };

  const handlePostRequest = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: postId }),
    });
    const data = await response.json();
    setPostResponse(data.echo);
  };

  // コンポーネントのUIをJSX形式で返します。
  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* 既存の「今日は何の日」セクション */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">今日は何の日？</h1>
        <form onSubmit={handleDateSubmit} className="space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border rounded"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            送信
          </button>
        </form>
        {result && (
          <div className="mt-8 p-4 bg-white rounded-lg shadow max-w-2xl">
            <p className="text-lg mb-4">{result}</p>
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt="Generated illustration" 
                className="w-64 h-64 mx-auto rounded-lg shadow-lg"
              />
            )}
          </div>
        )}
      </div>

      {/* GETリクエストセクション */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold">GETリクエストを送信</h2>
        <button 
          onClick={handleGetRequest}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          GETリクエストを送信
        </button>
        {getMessage && <p>サーバーからのGET応答: {getMessage}</p>}
      </div>

      {/* IDを指定したGETリクエストセクション */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold">IDを指定してGETリクエストを送信</h2>
        <form onSubmit={handleGetById} className="flex space-x-2">
          <input
            type="text"
            value={getId}
            onChange={(e) => setGetId(e.target.value)}
            className="px-4 py-2 border rounded"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            送信
          </button>
        </form>
        {idResponse && <p>Flaskからの応答: {idResponse}</p>}
      </div>

      {/* POSTリクエストセクション */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold">POSTリクエストを送信</h2>
        <form onSubmit={handlePostRequest} className="flex space-x-2">
          <input
            type="text"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
            className="px-4 py-2 border rounded"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            送信
          </button>
        </form>
        {postResponse && <p>FlaskからのPOST応答: echo: {postResponse}</p>}
      </div>
    </div>
  );
}