import os
import shutil
import uuid
import re

from fastapi import HTTPException, UploadFile, File
from fastapi.responses import FileResponse

pattern = r"\'([a-zA-Z0-9/_-]+)\'"  # Регулярное выражение для поиска подстроки


def delete_file(file_id: str, user_directory: str) -> dict:
    try:
        file = f"{user_directory}/{file_id}"
        # result = re.search(pattern, file)
        os.remove(file)
        return {
            "status": 200,
            "message": f"{file} has been deleted."
        }
    except OSError as err:
        return {
            "status": 400,
            "message": f"{err} has been deleted."
        }


def upload_file(user_directory: str, file: UploadFile = File(...)) -> dict:
    file_id = str(uuid.uuid4())
    with open(f"{user_directory}/", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"fileId": file_id, "filename": file.filename, "message": "File uploaded successfully"}


async def download_file(file_id: str):
    file_name = f"file_{file_id}"
    try:
        return FileResponse(file_name, media_type='application/octet-stream', filename=file_name)
    except FileNotFoundError:
        raise HTTPException(
            status_code=404, detail=f"File '{file_name}' not found")
