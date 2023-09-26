from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from auth.base_config import auth_backend, fastapi_users
from auth.schemas import UserRead, UserCreate
from backend.src.executing.routers import router as executing_router

app = FastAPI(
    title="NotebookOpenAPI"
)

# Configure CORS
origins = [
    "http://localhost:3000",
    "*"
    # Add other origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth",
    tags=["Auth"],
)

app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["Auth"],
)
app.include_router(executing_router)
if __name__ == '__main__':
    import uvicorn

    uvicorn.run(app)
