import logging
import subprocess
from utils.execute import execute_code, translate_text
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Configure CORS
origins = [
    "http://localhost:3000",
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


# Configure logging
logging.basicConfig(filename='logfile.log', level=logging.DEBUG,
                    format='%(asctime)s %(levelname)s: %(message)s')



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