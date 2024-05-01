from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel

app = FastAPI()

# Beispielbenutzer
fake_users_db = {
    "admin": {
        "username": "admin",
        "password": "admin1",
        "is_admin": True
    },
    "user": {
        "username": "user",
        "password": "user2",
        "is_admin": True
    }
}

class User(BaseModel):
    username: str
    password: str
    is_admin: bool

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# CORS-Einstellungen
origins = [
    "http://localhost",
    "http://localhost:3000",  # Dies ist die URL deines React-Frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Authorization", "Content-Type"],
)

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    if form_data.username not in fake_users_db:
        raise HTTPException(status_code=400, detail="Falscher Benutzername oder Passwort")
    user_dict = fake_users_db[form_data.username]
    if form_data.password != user_dict["password"]:
        raise HTTPException(status_code=400, detail="Falscher Benutzername oder Passwort")
    return {"access_token": form_data.username, "token_type": "bearer"}

@app.get("/users/me", response_model=User)
async def read_users_me(token: str = Depends(oauth2_scheme)):
    if token not in fake_users_db:
        raise HTTPException(status_code=401, detail="Ungültiger Token")
    user_dict = fake_users_db[token]
    return User(**user_dict)

# Neue Route zum Erstellen eines Benutzers
@app.post("/users/")
async def create_user(user: User):
    if user.username in fake_users_db:
        raise HTTPException(status_code=400, detail="Benutzername bereits vergeben")
    fake_users_db[user.username] = user.dict()
    return {"message": "Benutzer erfolgreich erstellt"}
