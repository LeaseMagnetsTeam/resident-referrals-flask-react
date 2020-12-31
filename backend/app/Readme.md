## Set up your venv
python3 -m venv tutorial-env

for windows:
tutorial-env\Scripts\activate.bat

for mac: 
source tutorial-env/bin/activate

pip install -r 'requirements.txt'

## Docker desktop 
https://www.docker.com/products/docker-desktop
Also:
https://www.python.org/downloads/

## run your docker
docker-compose up --build 

## add new pip requirements to docker
pip freeze > 'requirements.txt'

docker-compose down 
docker-compose up --build 
