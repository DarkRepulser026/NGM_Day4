# --- for Users ---
GET    
localhost:3000/api/v1/users
GET    
localhost:3000/api/v1/users/nguyenvana
POST   
localhost:3000/api/v1/users
{
  "username": "testuser",
  "password": "thinkingabouapassword",
  "email": "testuser@gmail.com",
  "fullName": "New User Name",
  "avatarUrl": "https://i.sstatic.net/l60Hf.png",
  "status": true,
  "role": {
    "id": "r3",
    "name": "User",
    "description": "Just a normal user"
  }
}
PUT    
localhost:3000/api/v1/users/nguyenvana
DELETE 
localhost:3000/api/v1/users/nguyenvana

# --- for Roles ---
GET    
localhost:3000/api/v1/roles
GET    
localhost:3000/api/v1/roles/r1
POST   
localhost:3000/api/v1/roles
{
  "id": "r4",
  "name": "Developer",
  "description": "Dev"
}
PUT    
localhost:3000/api/v1/roles/r1
DELETE 
localhost:3000/api/v1/roles/r1
GET    
localhost:3000/api/v1/roles/r1/users