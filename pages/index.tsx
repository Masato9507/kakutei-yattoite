// pages/index.tsx
import { useEffect, useState } from "react";
import liff from "@line/liff";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string>("");

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    // ここでSupabase等へのアップロード処理を追加できます
    alert(`"${selectedFile.name}" をアップロードします（仮）`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 font-sans">
      <h1 className="text-2xl font-bold mb-4">Hello, LIFF!</h1>
      {userName && <p className="mb-4">こんにちは、{userName} さん！</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {previewURL && (
        <div className="mb-4">
          <img src={previewURL} alt="プレビュー" className="w-64 rounded shadow" />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!selectedFile}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
      >
        アップロード
      </button>
    </div>
  );
}