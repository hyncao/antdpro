## ant design pro踩坑

### 路由和菜单究竟怎么配置

配置是多级嵌套的，最外面一般情况下只有两级，一级用来做登录，忘记密码等等。
另外一级则是项目菜单的配置。两套东西是用的不同的layout, UserLayout和BasicLayout。
UserLayout是不会渲染菜单的，只有BasicLayout会渲染菜单，你想配置menu菜单，一定要确保选择BasicLayout。

path，component组成了最简单的路由规则，如果有routes，则会继续向下匹配。
hideInMenu是不展示菜单，只是单纯的配置路由规则，不在左侧菜单展示。

下面说一下路由匹配规则，看一个简单的例子：
  {
    path: '/login',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/',
        redirect: './login',
      },
      {
        path: '/login',
        name: 'login',
        icon: 'login',
        component: './Login',
      },
      {
        component: './404',
      },
    ],
  }
首先看到UserLayout，说明本规则与菜单无关，只是路由规则。
url地址从/login开始，匹配到之后再从routes里面匹配，**从上至下**的寻找，实在找不到则会返回最下面的/404组件。

下一级的path并不会自动拼接到上一级的path后面。很多人会觉得routes第二项的规则是不是匹配/login/login，完整的地址是由最下一级决定，上面一级其实是决定layout和路由规则寻找的方向

访问地址为/login，匹配到routes第二项，/login规则，会返回Login组件
访问地址为/login/，匹配到routes第一项，重定向到/login
访问地址为/，则会报错，因为最外侧路由只配置了/login，访问其他地址都会因为找不到任何规则而报错
访问地址为/login/aaaa，匹配到routes最下面的规则，返回404组件

接下来看一个复杂的例子,将下面的配置加到上面的配置后面：
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/ad',
        name: 'ad',
        icon: 'unordered-list',
        routes: [
          {
            path: '/ad/list',
            name: 'list',
            component: './AdList',
          },
          {
            path: '/ad/detail',
            name: 'detail',
            component: './AdDetail',
            hideInMenu: true,
          },
          {
            component: './404',
          },
        ]
      },
      {
        path: '/contract',
        name: 'contract',
        icon: 'unordered-list',
        routes: [
          {
            path: '/contract/list',
            name: 'list',
            component: './ContractList',
          },
          {
            component: './404',
          },
        ]
      },
      {
        path: '/',
        redirect: './login',
      },
      {
        component: './404',
      },
    ]
  }
访问地址为/，匹配到routes倒数第二个规则，重定向到./login
访问地址为/aaaa，匹配到routes最下面的规则，返回404组件

路由匹配规则到这介绍的差不多了，接下来说说菜单menu的配置，本例中/下面的routes一共有两条规则，这就是第一级的菜单项
拿/ad举例，/ad/list和/ad/detail都是在/ad菜单下面的子菜单，另外由于/ad/detail设置了hideInMenu: true, 不显示在菜单中，所以例子中的menu是长这样的
  /ad
    /ad/list
  /contract
    /contract/list
菜单的嵌套都是由routes字段完成的，路由和菜单就到这里了。

### mock模拟数据
ant design pro 为我们搭好了mock环境，执行npm start自动开启mock，关闭mock执行npm run start:no-mock
根目录下的mock则是mock生效规则，建议按照功能来新建文件，每一个mock文件直接export default一个pure Object即可
  export default {
    'POST /api/customer/getList': (req, res) => {
      res.send({
        code: 200,
        list: [
          {
            id: '1',
            name: '客户1',
          },
          {
            id: '2',
            name: '客户2',
          },
        ],
      });
    },
  };
对象的key为请求方法和地址`'METHOD url'`，官方文档说method可以省略，这边不建议省略，真实的api怎么要求的怎么来
对象的value则为一个function，入参是req和res，可以通过const { data } = req.body获取到请求时的参数，比如通过pageNum不同，返回的list数据会不同。
res.send就可以直接将请求返回，确实很方便。

不使用mock时候，在/config/config.js中可能需要配置一下proxy来访问真正的接口地址。

### ant design Form组件
  {getFieldDecorator('userCount', {
    initialValue: 20,
    rules: [
      { required: true, message: '请输入用户个数' },
      { pattern: /^\d+$/, message: '用户数量输入有误'}
      { validator: this.validator },
    ],
  })(
    <Input placeholder="请输入用户个数" />,
  )}
getFieldDecorator用于实现form和item的双向绑定，也是比较容易糊涂的方法。它是一个高阶组件，先接受两个参数，name String和option Object。
其中name为绑定的组件名字，用于获取错误信息，组件的值等等。option所有的属性官方文档有，这里写一些容易产生坑的属性。
initialValue: 默认值，我们在做detail等页面的回显时，会用到initialValue，不要用setFieldsValue方法。
rules: 限制用户的输入，是一个数组，可以接受很多的限制条件。本例中接受了三个限制条件：required非空，pattern正则，validator自定义校验。
required最直观，组件值为空的时候会触发这个error，pattern为不符合正则规则时触发，还是不满意可以设置validator自定义校验方法。

validator的写法有很多坑，我一个一个说：
+ 入参有三个(rule, value, callback)，value则是组件的输入值，callback为检验方法的回调
 validator(rule, value, callback) {
    const reg = /^\d{4}$/;
    if (value && !reg.test(value)) {
      callback('编号为4位数字');
    }
    callback();
  }

+ callback必须调用
否则validateFields方法将会永远等待你的callback，所以为了保险在方法的最后写上callback()
callback接收的参数及时你想暴露的错误文字，不传则默认没有错误发生

+ validator方法内部报错
  validator(rule, value, callback) {
    if (value.filter(i => i).length === 0) {
      callback('编号为4位数字');
    }
    callback();
  }
例子中如果value的值不为Array，则会报错，报错的时候validateFields方法也会卡住，所以建议在validator中使用try catch语法，可以直接在catch中callback

+ rules有多条规则
由于有required规则限制，编写validator方法的时候可以直接无视非空检验，如果非空报错，则由required规则跑出错误，同理如果有了pattern规则，正则规则也可以无视。

getFieldError和getFieldsError
获取控件的错误信息。不要被误导了，当控件有错误信息的时候，才能获取到，这两个方法不是校验方法，只是单纯的拿出组件的错误信息。
比如组件设置了required规则，而且我没有输入值，调用这两个方法会返回undefined，只有当我调用validateFields方法，或者手动触发组件的错误，再调用者两个方法，才能拿到错误信息。
总的来说没啥用，而且还容易被误导，不建议使用。

setFieldsValue
不要在 componentWillReceiveProps 内使用，否则会导致死循环。

validateFields
常用于提交表单之前，整体对Form的校验，所有被getFieldDecorator绑定过的组件都会被校验到，好用的要死。

### dna方面
models层可以写在/src/models文件夹中，也可以写在每个组件中，和index.jsx文件并列
  /Login
    index.jsx
    index.less
    models
      index.js
dva会将数据放在store中，想用的时候connect进组件就好

另外dispatch也可以用promise语法获取数据，不用存进store
  const res = await dispatch({
    type: 'login/register',
    payload: data,
  })
  console.log(res);

**effects和reducers中的方法名千万不能重名，否则调用时会直接卡死**
