from pydantic import BaseModel


class CodeModel(BaseModel):
    language: str
    code: str
