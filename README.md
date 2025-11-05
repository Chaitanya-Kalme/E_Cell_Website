# ***E-Cell Website*** 

### *To run website use the following commands*

1. ***Docker Installation***
- `sudo apt update`
- `sudo apt-get install ca-certificates curl`
- `sudo install -m 0755 -d /etc/apt/keyrings`
- `sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc`
- `sudo chmod a+r /etc/apt/keyrings/docker.asc`
- `echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`
- `sudo apt-get update`
- `sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin`


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
5. To access any container:
    - docker exec -it <container_id> bash 
6. To access database:
    - docker exec -it postgres_db psql -U E_Cell -d E_Cell_Website

