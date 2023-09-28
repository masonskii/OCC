import logging

from fastapi import APIRouter, UploadFile, File, Depends
from fastapi_users.authentication import AuthenticationBackend
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.src.database import get_async_session
from backend.src.file_manager.utils import delete_file, upload_file
from backend.src.auth.base_config import current_user
from backend.src.auth.models import User
logging.basicConfig(filename='./log/logfile.log', level=logging.DEBUG,
                    format='%(asctime)s %(levelname)s: %(message)s')

router = APIRouter(
    prefix="/file",
    tags=["File"]
)


@router.delete("/file/{file_id}")
async def delete(file_id: str, user: User = Depends(current_user), session: AsyncSession = Depends(get_async_session)):
    # query = select(User.storage).filter(User.id == user.id)
    # result = await session.execute(query)
    return delete_file(file_id, "./storage/user_storage_1/2023-09-27_01-44-08")


@router.post('/upload')
async def upload(file: UploadFile = File(...), user: User = Depends(current_user), session: AsyncSession = Depends(get_async_session)):
    query = select(User.storage).filter(User.id == user.id)
    result = await session.execute(query)
    return upload_file(str(result.all()), file)
