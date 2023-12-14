NodeJS backend - Microsoft Azure SQL server - EJS render 
=> mn tự chuyển res.render thành res.send hoặc res.json trước khi call api qua frame work nhé(VueJS, ReactJs, Angular,... ).
Khi mà call rest api thì sẽ dính dáng tới cross origin 
=>  npm có hỗ trợ sẵn cái để mà mình đi qua đc là:  app.use(cors({ origin: 'http://127.0.0.1:9000' })) thay ip đó bằng host của mình
CSS => responsive
