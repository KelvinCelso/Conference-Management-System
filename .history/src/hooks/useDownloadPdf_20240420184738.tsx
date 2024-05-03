import { useState } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const useDownloadPDF = () => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const downloadLastPdf = async (
    correspondingUserId: string,
    projectId: string
  ) => {
    try {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `user_papers/${correspondingUserId}/${projectId}`
      );

      const files = await listAll(storageRef);
      const lastFile = files.items[files.items.length - 1];

      if (lastFile) {
        const url = await getDownloadURL(lastFile);
        setDownloadUrl(url);
        navigate(url, {
          replace: false,
        });
      } else {
        setError("No files found in the specified path");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { downloadLastPdf, downloadUrl, error };
};

export default useDownloadPDF;
