import logging

import shutil
import os
import subprocess
import uuid
from utils.execute import execute_code, translate_text
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
# Configure CORS
origins = [
    "http://localhost:3000",
    "*"
    # Add other origins if needed
]
USING_LANGUAGE = ['python', 'c', 'cpp', 'js', 'cs', 'ruby', 'go']



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

files_db = {}
# Configure logging
logging.basicConfig(filename='logfile.log', level=logging.DEBUG,
                    format='%(asctime)s %(levelname)s: %(message)s')

@app.delete("/file/{file_id}")
async def delete_file(file_id: str):
    print(files_db)
    try:
        file = files_db[file_id]
        os.remove(file['path'])
        return {"message": f"{file['path']} has been deleted."}
    except OSError as err:
        return {"error": f"Unable to delete {file['path']}. Error: {err}"}
    
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_id = str(uuid.uuid4())
    
    with open(f"uploaded_files/{file.filename}", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    files_db[file_id] = {'name':file.filename,'path':f"uploaded_files/{file.filename}"}
    print(files_db)
    return {"fileId": file_id, "filename": file.filename, "message": "File uploaded successfully"}

@app.get('/download/{file_id}', tags=["files"])
async def download_file(file_id: str):
    file_name = f"file_{file_id}"
    try:
        return FileResponse(file_name, media_type='application/octet-stream', filename=file_name)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"File '{file_name}' not found")
    

@app.get('/runcode')
async def docs():
    return {"data":"Corrected url"}


@app.post('/runcode')
def exec(params: dict):
    language = params['language']
    logging.info(language)
    if language in USING_LANGUAGE:
        try:
            output, error = execute_code(params)
        except subprocess.CalledProcessError as e:
            output = ''
            error = str(e)
        except Exception as e:
            output = ''
            error = str(e)

        result = {
            'output': output,
            'error': error
        }
        logging.info(result)
    else:
        result = {
            'output': '',
            'error': 'Unsupported language'
        }
    return result

@app.get('/')
async def index():
    return {"data":"Hello!"}