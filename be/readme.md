# Step by step nyalain api
- rename .env.example jadi .env
- ganti jadi DB_DATABASE = {nama_db}
- nyalain xampp
- buat db baru yg nama ny {nama_db}
- buka console terus input:
    - composer install // install laravel ny
    - php artisan key:generate // generate key di .env
    - php artisan storage:link // biar bisa crud gambar
    - php artisan migrate // generate table2 ke xampp
    - php artisan db:seed // generate data dummy
    - php artisan serve // nyalain server

# API testing
- import json ke postman
- bikin new environment kosong dan nyalain
- bisa run collection bisa di test satu2
    - untuk api-operator di **Create new turret, Update turret, Create new log** harus manual(jalanin satu2), karena postman runner collection ga support input gambar
    - kl mau jalanin satu2 jalanin api login ny dulu buat set bearer token di environment
- api ny sudah pake pre-request script jadi ga perlu input form-data manual tapi harus jalanin login ny dulu
