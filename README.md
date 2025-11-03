# ***E-Cell Website*** 

### *To run website use the following commands*

1. ***Docker Installation***
- `sudo apt update`
- `sudo apt install docker.io`
- `sudo usermod -aG docker $USER`

2. ***Clone the git repository:***
    - `git clone GIT_REPO_LINK`
3. ***Setup Environment Variables in project folder.***
    - DATABASE_URL=""
    - POSTGRES_USER= ""
    - POSTGRES_PASSWORD=""
    - POSTGRES_DB=""
    - NEXTAUTH_SECRET=""
    - ADMIN_EMAIL=""
    - ADMIN_PASSWORD=""
    - JWT_SECRET=""
    - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
    - CLOUDINARY_API_SECRET=""
    - CLOUDINARY_API_KEY=""
    - MAILTRAP_HOST=""
    - MAILTRAP_PORT=""
    - MAILTRAP_USER=""
    - MAILTRAP_PASS=""
    - WEBSITE_DOMAIN=""
3. ***Run the Dockerfile.***
    - If does not build the images:
        - `docker-compose up --build`
    - Else 
        - `docker-compose up `
    - To Stop the container to run 
        - `docker-compose down`
4. Access the website on browser at: http://localhost:8080

### Important Note:- 
    1. Admin Password should be placed here in the encrypted form by bcrypt.
