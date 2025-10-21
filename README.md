# E-Cell Website 
### To run website use the following commands. 
    1. Docker Installation:
        - sudo apt update
        - sudo apt install docker.io
        - sudo usermod -aG docker $USER
    2. Clone the git repository:
        - git clone GIT_REPO_LINK
    3. Setup Environment Variables in project folder.
        - DATABASE_URL=""
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
    3. Run the Dockerfile.
        - 