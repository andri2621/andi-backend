# andi-backend
backend crud user

Dikarenakan ada sedikit masalah pada saat upload ke heroku (redis terbaca sebagai masalah).
Berikut saya sertalkan screenschoot dari hasil API.

# Pertama kita harus login lebih dahulu untuk bisa mengeksekusi endpoint yang lain.
-karena setiap endpoint memerlukan token di header
 
 http://localhost:3000/api/user/login
 
![login](https://user-images.githubusercontent.com/78326009/110575978-78fd3300-8192-11eb-949c-f5f1c105d50f.PNG)


# setelah mendapatkan token, kita bisa mengakses endpoint yang lain. 


berikut contoh menampilkan seluruh data

 http://localhost:3000/api/user/
 
- jika tanpa menggunakan token pada header, tidak akan bisa tampil.

![readall-tanpa](https://user-images.githubusercontent.com/78326009/110576133-c9749080-8192-11eb-83b3-a09830b17146.PNG)

- menggunakan token pada header Authorization

![tokennn](https://user-images.githubusercontent.com/78326009/110576747-de9def00-8193-11eb-9645-0d0ec65809bb.PNG)

- hasil menampilkan data dengan token

![readall](https://user-images.githubusercontent.com/78326009/110576236-ff197980-8192-11eb-8c63-25db7df1177d.PNG)

# Mencari data berdasarkan Id 

 http://localhost:3000/api/user/find/:userId
 
![finsuserid](https://user-images.githubusercontent.com/78326009/110576326-2bcd9100-8193-11eb-9952-dd7e97bf2d5d.PNG)

# Mencari data berdasarkan AccountNumber

 http://localhost:3000/api/user/account/4

![account](https://user-images.githubusercontent.com/78326009/110576370-3f78f780-8193-11eb-910e-d01605f342a4.PNG)

# Mencari data berdasarkan IdentityNumber

 http://localhost:3000/api/user/identity/3173080706960006

![identity](https://user-images.githubusercontent.com/78326009/110576421-5586b800-8193-11eb-8502-b2f5918c5d7d.PNG)

# Create data

 http://localhost:3000/api/user/create

![create](https://user-images.githubusercontent.com/78326009/110576477-6a634b80-8193-11eb-97b5-6d8de390e874.PNG)

# Update data

 http://localhost:3000/api/user/update/:userId

![update](https://user-images.githubusercontent.com/78326009/110576489-6df6d280-8193-11eb-99d9-7c6bc342ef54.PNG)

# Menghapus data (delete)

 http://localhost:3000/api/user/delete/:userId

![delete](https://user-images.githubusercontent.com/78326009/110576494-6fc09600-8193-11eb-8ef7-1d17b8e9036f.PNG)





# untuk mempercepat dalam mendapatkan data GET, maka digunakan redis.

# Berikut merupakan contoh perbedaan dari kecepatan dengan menggunakan redis

![log](https://user-images.githubusercontent.com/78326009/110576825-02613500-8194-11eb-952d-0813978843da.PNG)

dapat dilihat perbedaan, saat data tidak ada di redis atau saat pertama kali data dieksekusi, maka akan mengecek ke dalam database.

pada saat GET /api/user/identity/3173355082222556960000

saat pertama kali memanggil dari database dengan kecepatan 45.286 ms
dan data akan disimpan ke dalam cache redis di RAM


kemudian saat data akan dipanggil lagi,  GET /api/user/identity/3173355082222556960000

aplikasi akan mengecek lebih dulu ke redis,
apabila ada datanya maka akan ditampilkan. jika tidak, maka aplikasi akan mencari ke dalam database.
dan pada foto berhasil memanggil dengan kecepatan 2.246 ms
dimana itu sangat terlihat perbedaan kecepatannya.
