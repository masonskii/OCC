import React, { useState } from "react";
import FileList from "./FileList.js";
import UploadButton from "./UploadButton.js";

function FileListComponent({ onFileSelect }) {
  const [files, setFiles] = useState([]);

  const handleUpload = async (uploadedFile) => {
    const formData = new FormData();
    formData.append("file", uploadedFile);

    const response = await fetch("http://127.0.0.1:8000/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const { fileId, filename } = await response.json();
      console.log(uploadedFile); // Получение fileId от сервера
      setFiles([...files, { ...uploadedFile, id: fileId, name: filename }]); // Добавление файла с fileId в состояние 'files'
      console.log("File uploaded successfully");
    } else {
      console.error("File upload failed");
    }
  };

  const handleDelete = async (fileId) => {
    console.log(fileId);
    // Удаление файла с сервера
    try {
      const response = await fetch(`http://127.0.0.1:8000/files/${fileId}`, {
        method: "DELETE",
        headers: {
          // Опционально: если ваш сервер требует аутентификации, укажите здесь заголовок 'Authorization'
          // 'Authorization': `Bearer ${your_token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Файл удален с сервера.");
        // Обновление состояния приложения
        setFiles(files.filter((f) => f.id !== fileId));
      } else {
        console.error(`Ошибка удаления файла: ${response.status}`);
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
    }
    setFiles(files.filter((f) => f.id !== fileId));
  };

  const handleDownload = async (fileId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/download/${fileId}`);
      const blob = await response.blob(); // получаем данные в виде Blob объекта
      const url = window.URL.createObjectURL(blob); // создаем URL для скачивания
      const link = document.createElement("a"); // создаем новый элемент <a>
      link.href = url;
      link.setAttribute("download", `file_${fileId}.txt`); // задаем имя скачиваемого файла
      document.body.appendChild(link); // добавляем созданный элемент в документ
      link.click(); // имитируем клик пользователя для начала скачивания
      link.remove(); // удаляем элемент из документа
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="App">
      <h1> File Manager </h1> <UploadButton onUpload={handleUpload} />{" "}
      <FileList
        files={files}
        onDelete={handleDelete}
        onDownload={handleDownload}
        onSelect={onFileSelect}
      />{" "}
    </div>
  );
}
export default FileListComponent;
