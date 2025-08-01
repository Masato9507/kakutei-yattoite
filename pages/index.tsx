// pages/index.tsx
import { useEffect, useState } from "react";
import liff from "@line/liff";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    liff
      .init({ liffId: "2007862333-bKPAvpj5" })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          liff.getProfile().then((profile) => {
            setUserName(profile.displayName);
          });
        }
      })
      .catch((err) => {
        setError("LIFF初期化エラー: " + err.message);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 font-sans bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Hello, LIFF!</h1>
      {userName ? (
        <p className="text-lg">こんにちは、{userName} さん！</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p className="text-gray-500">ログイン確認中...</p>
      )}
    </div>
  );
}