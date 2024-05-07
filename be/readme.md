to-do :
rename .env.example jadi .env
ganti jadi DB_DATABASE = {nama_db}
nyalain xampp
buat db baru yg nama ny {nama_db}

console cmd di folder be:
composer install // install laravel ny
php artisan key:generate // generate key di .env
php artisan storage:link // biar bisa crud gambar
php artisan migrate // generate table2 ke xampp
php artisan db:seed // generate data dummy
php artisan serve // nyalain server

optional : 
tambah image manual di public/storage/turrets/ , nama ny liat di db
