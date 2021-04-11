# Setup
1. create virual envierment in this folder: 

for windows:
```
python -m venv venv
venv\Scripts\activate
```


2. run from this folder:
```
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

# Documentation will be on
1. http://127.0.0.1:8000/swagger/
2. http://127.0.0.1:8000/redoc/