# huksty

* husky可以让项目中方便添加git hooks。

* 在项目添加husky
    - npm install -D husky
    - 在pagage.json中设置需要的git hooks
```
{
    "husky":{
        "hooks":{
            "pre-commit":"npm run test",
            "commit-msg":"commitlint -e $HUSKEY_GIT_PARAMS"
        }
    }
}
```

* 以上是husky6.0版本以前的设置方式

* 新版的husky使用了git2.9开始引入的一个新功能core.hooksPath。 core.hooksPath可以让你指定git hooks所在目录而不是默认的使用.git/hooks/。 这样husky可以使用 husky install将 git hooks的目录指定为 .husky/ ， 然后使用husky add命令向 .husky/中添加hook。 通过这种方式我们就可以只添加我们需要的git hook 而且所有的脚本都保存在了一个地方（.husky/目录下） 因此也就不存在同步文件的问题了


# 新版的husky设置
* npm install -D husky
* 在package.json中添加prepare脚本
```
{
    "script":{
        "prepare":"husky install"
    }
}
// prepare脚本会在npm install之后自动执行。也就是说当我们执行npm install安装完项目依赖后会执行 husky install 命令 该命令会创建 .husky/目录并指定该目录为git hooks所在的目录
```

* 添加git hooks运行一下命令 创建 git hooks
```
npx husky add .husky/pre-commit "npm run test"
// 运行完该命令后我们会看到.husky/目录下新增了一个名为pre-commit的shell脚本。也就是说在在执行git commit命令时会先执行pre-commit这个脚本。pre-commit脚本内容如下：

#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
   
npm run  test

可以看到该脚本的功能就是执行npm run test这个命令
```

