import os
from datetime import datetime

from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable
from sqlalchemy import Integer, Column, String, TIMESTAMP, ForeignKey, Boolean, MetaData, Table, JSON

from backend.src.database import Base

metadata = MetaData()

role = Table(
    "role",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
    Column("permissions", JSON),
)

user = Table(
    "user",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
    Column("email", String, nullable=False),
    Column("username", String, nullable=False),
    Column("registered_at", TIMESTAMP, default=datetime.utcnow),
    Column("role_id", Integer, ForeignKey(role.c.id)),
    Column('storage', String),
    Column("hashed_password", String, nullable=False),
    Column("is_active", Boolean, default=True, nullable=False),
    Column("is_superuser", Boolean, default=False, nullable=False),
    Column("is_verified", Boolean, default=False, nullable=False),
)


class User(SQLAlchemyBaseUserTable[int], Base):
    __tablename__ = 'user'
    id: int = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    name: str = Column(String(length=50), nullable=False)
    username: str = Column(String(length=30), nullable=False)
    registered_at: TIMESTAMP = Column(TIMESTAMP, default=datetime.utcnow)
    storage: str = Column(String)
    role_id: int = Column(Integer, ForeignKey(role.c.id))
    email: str = Column(
        String(length=320), unique=True, index=True, nullable=False
    )
    hashed_password: str = Column(
        String(length=1024), nullable=False
    )
    is_active: bool = Column(Boolean, default=True, nullable=False)
    is_superuser: bool = Column(
        Boolean, default=False, nullable=False
    )
    is_verified: bool = Column(
        Boolean, default=False, nullable=False
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # storage_path = f"storage/user_storage_{self.email}/{datetime.now().strftime('%Y-%m-%d_%H-%M-%S')}"
        storage_path = f"storage/user_storage_{self.email}/"
        os.makedirs(storage_path, exist_ok=True)
        self.storage = storage_path
