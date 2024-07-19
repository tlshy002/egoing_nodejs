// node.js에 기본적으로 내장되어 있는 http모듈 로드 => 모듈이란?
var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body) {
  return `
          <!doctype html>
          <html>
          <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
          </head>
          <body>
          <h1><a href="/">WEB</a></h1>
          ${list}
          ${body}
          </body>
          </html>
          `;
}
function templateList(fileList) {
  var list = '<ul>';
  for(i=0; i < fileList.length; i++) {
    list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`
  }
  list = list + '</ul>';
  return list;
}

// 이벤트 리스너
// JS에서 이벤트란 사용자와 웹페이지 간의 상호작용 Ex)검색창에 엔터키를 누르는 행위
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;



    if(pathname == '/') {
      if(queryData.id === undefined) {
        fs.readdir('./data', (err, fileList) => {
          const title = "Welcome";
          var description = "Hello, Node.js!"; 
          var list = templateList(fileList);
          var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);

            response.writeHead(200);
            response.end(template);          
        });


      } else {
        fs.readdir('./data', (err, fileList) => {
          fs.readFile(`data/${queryData.id}`, 'utf8', (err, description) => {
            var title = queryData.id;
            var list = templateList(fileList);
            var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
              response.writeHead(200);
              response.end(template);
          });
        });
        

      }
      
  } else {
    response.writeHead(404);
    response.end('Nor found');
  }

    
    
 
});
app.listen(3000, () => {
    console.log("Server is running...");
});


