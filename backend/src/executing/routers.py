import logging
import subprocess
from typing import List

from fastapi import APIRouter, Depends

from src.executing.schemas import CodeModel
from src.executing.utils import execute_code

USING_LANGUAGE = ['python', 'c', 'cpp', 'js', 'cs', 'ruby', 'go']


# Configure logging
logging.basicConfig(filename='./log/logfile.log', level=logging.DEBUG,
                    format='%(asctime)s %(levelname)s: %(message)s')

router = APIRouter(
    prefix="/code",
    tags=["Code"]
)


@router.post('/exec', response_model=List[CodeModel])
async def executing_code(params: dict):
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


