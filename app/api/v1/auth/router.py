from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.get("/")
def test_auth():
    return {"msg": "auth ok"}

@router.post("/login")
def login():
    return {"msg": "login temporal"}