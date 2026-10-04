from pydantic import BaseModel, Field

class RegisterIn(BaseModel):
    nombre: str = Field(min_length=3)
    email: str
    password: str = Field(min_length=8)

class LoginIn(BaseModel):
    email: str
    password: str

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"