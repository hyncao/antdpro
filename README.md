## 修改 theme

/config/defaultSettings.js

## ant design pro 踩坑

### 路由和菜单究竟怎么配置

配置是多级嵌套的，最外面一般情况下只有两级，一级用来做登录，忘记密码等等。另外一级则是项目菜单的配置。两套东西是用的不同的 layout, UserLayout 和 BasicLayout。 UserLayout 是不会渲染菜单的，只有 BasicLayout 会渲染菜单，你想配置 menu 菜单，一定要确保选择 BasicLayout。

path，component 组成了最简单的路由规则，如果有 routes，则会继续向下匹配。 hideInMenu 是不展示菜单，只是单纯的配置路由规则，不在左侧菜单展示。

下面说一下路由匹配规则，看一个简单的例子：

```javascript
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
```

首先看到 UserLayout，说明本规则与菜单无关，只是路由规则。 url 地址从/login 开始，匹配到之后再从 routes 里面匹配，**从上至下**的寻找，实在找不到则会返回最下面的/404 组件。

下一级的 path 并不会自动拼接到上一级的 path 后面。很多人会觉得 routes 第二项的规则是不是匹配/login/login，完整的地址是由最下一级决定，上面一级其实是决定 layout 和路由规则寻找的方向

访问地址为/login，匹配到 routes 第二项，/login 规则，会返回 Login 组件访问地址为/login/，匹配到 routes 第一项，重定向到/login 访问地址为/，则会报错，因为最外侧路由只配置了/login，访问其他地址都会因为找不到任何规则而报错访问地址为/login/aaaa，匹配到 routes 最下面的规则，返回 404 组件

接下来看一个复杂的例子,将下面的配置加到上面的配置后面：

```javascript
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
```

访问地址为/，匹配到 routes 倒数第二个规则，重定向到./login 访问地址为/aaaa，匹配到 routes 最下面的规则，返回 404 组件

路由匹配规则到这介绍的差不多了，接下来说说菜单 menu 的配置，本例中/下面的 routes 一共有两条规则，这就是第一级的菜单项拿/ad 举例，/ad/list 和/ad/detail 都是在/ad 菜单下面的子菜单，另外由于/ad/detail 设置了 hideInMenu: true, 不显示在菜单中，所以例子中的 menu 是长这样的

```
  /ad
    /ad/list
  /contract
    /contract/list
```

菜单的嵌套都是由 routes 字段完成的，路由和菜单就到这里了。

### mock 模拟数据

ant design pro 为我们搭好了 mock 环境，执行 npm start 自动开启 mock，关闭 mock 执行 npm run start:no-mock 根目录下的 mock 则是 mock 生效规则，建议按照功能来新建文件，每一个 mock 文件直接 export default 一个 pure Object 即可

```javascript
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
```

对象的 key 为请求方法和地址`'METHOD url'`，官方文档说 method 可以省略，这边不建议省略，真实的 api 怎么要求的怎么来对象的 value 则为一个 function，入参是 req 和 res，可以通过 const { data } = req.body 获取到请求时的参数，比如通过 pageNum 不同，返回的 list 数据会不同。 res.send 就可以直接将请求返回，确实很方便。

不使用 mock 时候，在/config/config.js 中可能需要配置一下 proxy 来访问真正的接口地址。

### ant design Form 组件

```javascript
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
```

getFieldDecorator 用于实现 form 和 item 的双向绑定，也是比较容易糊涂的方法。它是一个高阶组件，先接受两个参数，name String 和 option Object。其中 name 为绑定的组件名字，用于获取错误信息，组件的值等等。option 所有的属性官方文档有，这里写一些容易产生坑的属性。 initialValue: 默认值，我们在做 detail 等页面的回显时，会用到 initialValue，不要用 setFieldsValue 方法。 rules: 限制用户的输入，是一个数组，可以接受很多的限制条件。本例中接受了三个限制条件：required 非空，pattern 正则，validator 自定义校验。 required 最直观，组件值为空的时候会触发这个 error，pattern 为不符合正则规则时触发，还是不满意可以设置 validator 自定义校验方法。

validator 的写法有很多坑，我一个一个说：

- 入参有三个(rule, value, callback)，value 则是组件的输入值，callback 为检验方法的回调

```javascript
 validator(rule, value, callback) {
    const reg = /^\d{4}$/;
    if (value && !reg.test(value)) {
      callback('编号为4位数字');
    }
    callback();
  }
```

- callback 必须调用否则 validateFields 方法将会永远等待你的 callback，所以为了保险在方法的最后写上 callback() callback 接收的参数及时你想暴露的错误文字，不传则默认没有错误发生

- validator 方法内部报错

```javascript
  validator(rule, value, callback) {
    if (value.filter(i => i).length === 0) {
      callback('编号为4位数字');
    }
    callback();
  }
```

例子中如果 value 的值不为 Array，则会报错，报错的时候 validateFields 方法也会卡住，所以建议在 validator 中使用 try catch 语法，可以直接在 catch 中 callback

- rules 有多条规则由于有 required 规则限制，编写 validator 方法的时候可以直接无视非空检验，如果非空报错，则由 required 规则跑出错误，同理如果有了 pattern 规则，正则规则也可以无视。

getFieldError 和 getFieldsError 获取控件的错误信息。不要被误导了，当控件有错误信息的时候，才能获取到，这两个方法不是校验方法，只是单纯的拿出组件的错误信息。比如组件设置了 required 规则，而且我没有输入值，调用这两个方法会返回 undefined，只有当我调用 validateFields 方法，或者手动触发组件的错误，再调用者两个方法，才能拿到错误信息。总的来说没啥用，而且还容易被误导，不建议使用。

setFieldsValue 不要在 componentWillReceiveProps 内使用，否则会导致死循环。

validateFields 常用于提交表单之前，整体对 Form 的校验，所有被 getFieldDecorator 绑定过的组件都会被校验到，好用的要死。

### dva 方面

models 层可以写在/src/models 文件夹中，也可以写在每个组件中，和 index.jsx 文件并列

```
  /Login
    index.jsx
    index.less
    models
      index.js
```

dva 会将数据放在 store 中，想用的时候 connect 进组件就好

另外 dispatch 也可以用 promise 语法获取数据，不用存进 store

```javascript
const res = await dispatch({
  type: 'login/register',
  payload: data,
});
console.log(res);
```

**effects 和 reducers 中的方法名千万不能重名，否则调用时会直接卡死**
