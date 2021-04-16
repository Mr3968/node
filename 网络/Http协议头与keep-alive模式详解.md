# Http协议头与 keep-alive模式详解


## 什么是keep-alive模式

* Http协议采用的是“ 请求-应答 ”模式，当使用普通模式的时候，即非keep-alive模式时，每个请求/应答客户和服务器都要新建一个连接，完成后立即断开连接（http协议为无连接的协议无状态）； 当使用keep-alive模式（又称持久连接，连接重用）的时候 keep-alive功能使客户端到服务器的连接持续有效，当出现对服务器的后继请求时，keep-alive模式避免了建立或者重新建立连接

* http1.0中默认是关闭的，需要在http头加入``` Connection:Keep-Alive ```,才能启用Keep-alive;http1.1中默认启用Keep-alive，如果加入``` Connection:close ```,才关闭。目前大部分浏览器都是用http1.1协议，也就是说默认都回发起keep-alive的连接请求了，所以是否能完成一个完整的keep-alive连接就看服务器设置情况 

* 单用户客户端与任何服务器或代理之间的连接数不应该超过2个，一个代理与其他服务器或代码之间应该使用超过2*N的活跃并发连接，这是为了提高Http响应时间，避免拥塞（冗余的连接并不能代码执行性能的提升）

## 如何判断消息内容/长度的大小

* Keep-alive模式，客户端如何判断请求所得到的响应数据已经接收完成（或者说如何知道服务器已经发生完了数据）？  我们已经知道了Keep-alive模式发送完数据Http服务器不会自动断开连接，所以不能在使用返回EOF来判断

### 判断方法

> 使用消息首部字段Content-Length
* 顾名思义， Content-Length表示实体内容长度，客户端（服务器）可以根据这个值来判断数据是否接受完成。但是如果消息中没有Conent-Length,那该如何来判断呢？ 又在什么情况下会没有Content-Length呢？ 

> 使用消息首部字段Transfer-Encoding 
* 当客户端向服务器请求一个静态页面或者一张图片时，服务器可以很清楚的知道内容大小，然后通过Content-Length消息首部字段告诉客户端需要接受多少数据。但是如果是动态页面等时，服务器是不可能预先知道内容大小，这时就可以使用Transfer-Encoding:chunk模式来传输数据了。即如果要一边产生数据，一边发给客户端，服务器就需要使用```Transfer-Encoding:chunked```这样的方式来代替Content-Length.

* chunk编码将数据分成一块一块的发生，Chunked编码将使用若干Chunk串连而成，由一个标明长度为o的chunk结束。每个chunk分为头部和正文两部分，头部内容置顶正文的字符总数（十六进制的数字）和数量单位，正文部分就指定长度的实际内容，两部分之间用回车换行（CRLF）隔开。在最后一个长度为0的chunk中的内容是称为footer的内容，是一些附近的Header信息（通常可以直接忽略）

## 消息长度的总结

* 上面两总方法都可以归纳为是如何判断http消息的大小、消息的数量

* 一个消息的transfer-length是指消息中的message-body的长度，当应用了transfer-coding(传输编码)，每个消息中的message-body的长度（transfer-length）由一下的几种情况决定（优先级由高到低）
    - 任何不含有消息体的消息（如1XXX,204,304等响应消息和任何头请求的响应消息），总是由一个空行CLRF结束
    - 如果出现了Transfer-Encoding头字段，它的值表示entity-length和transfer-length（传输长度）。如果这个两个长度不一样，那么将不能发送Content-Length头字段。并且如果同时收到了Transfer-Encoding字段和Content-Length头字段，那么必须忽略Content-Length字段
    - 如果出现了任何Transfer-Encoding头字段 并且值为‘identity’,那么transfer-length由"chunked"传输编码定义，除非消息由于关闭连接而终止
    - 如果消息使用媒体类型 “ multipart/byteranges ”并且transfer-length没有另外指定 那么这种自定界（self-delimiting）媒体类型定义transfer-length 除非发送者知道接受者能够解析该类型，否则不能使用该类型
    - 由服务器关闭连接确定消息长度。（注意：关闭连接不能用于确定请求消息的结束，因为服务器不能再发响应消息给客户端）

* 为了兼容HTTP/1.0应用程序，HTTP/1.1 的请求消息体中必须包含一个合法的Content-Length头字段，除非知道服务器兼容HTTP/1.1 一个请求包含消息体，并且Content-Length字段没有给定，如果不能判断消息的长度，服务器应该用400来响应；或者服务器坚持希望收到一个合法的Content-Length字段，用411（length required）来响应

* 所有HTTP/1.1的接收者应用程序必须接受 chunked transfer-Ecoding 因此当不能事先知道消息的长度，允许使用这种机制来传输消息 消息不应该同时包含Content-Length头字段和non-identity transfer-Ecoding  如果一个消息同时包含non-identity transfer-coding和Content-Length  必须忽略Content-Length 

## HTTP头字段总结

* Accept: 告诉服务器自己接受什么介质类型
    - */* 表示任何类型  type/* 表示该类型下的所有子类型

* Accept-Charset: 浏览器申明自己接受的字符集

* Accept-Encoding: 浏览器申明自己接收的编码方法 通常指定压缩方法，是否支持压缩，支持什么压缩（gzip,deflate）

* Accept-Language: 浏览器申明自己接受的语言
    - 语言与字符集的区别： 中文是语言，中文有多种字符集 比如big5,bg2312,gbk等等

* Accept-Ranges: 服务器表明自己是否接受获取其某个实体的一部分的请求。 bytes: 表示接受 none: 表示不接受

* Age: 当代理服务器用自己缓存的实体去响应请求时，用该头部表明该实体从产生到现在经过了多长时间

* Authorization： 当客户端接受到来自服务器的WWW-Authenticate响应时，用该头部来回应自己的身份验证信息给服务器

* Cache-Control: 
    - 请求：
        - no-cache：不要缓存的实体，要求去现在的服务器上去取
        - max-age: 只接受Age值小于max-age值，并且没有过期的对象
        - max-stale: 可以接受过去的对象，但是过期时间必须小于max-stale值
        - min-fresh: 接受其新鲜生命期大于其当前Age跟min-fresh值之和的缓存对象
    - 响应：
        - public: 可以用Cached内容回应任何用户
        - private: 只能用缓存内容回应先前请求该内容的用户
        - no-cache：可以缓存，但是只有在跟服务器验证了其有效后，才能返给客户端
        - max-age: 本响应包含的对象的过期时间
        - ALL：no-store 不允许缓存

* Connection:
    - 请求：
        - close: 告诉服务器或者代理服务器，在完成本次请求的响应后，断开连接，不要等待本次连接的后续请求
        - keepalive:  告诉服务器或者代理服务器，在完成本次请求的响应后，保持连接，等待本次连接的后续请求
    - 响应：
        - close: 连接已经关闭
        - Keep-Alive: 如果浏览器请求保持连接，则该头部表明希望 WEB 服务器保持连接多长时间（秒）。例如：Keep-Alive：300
    - // 7