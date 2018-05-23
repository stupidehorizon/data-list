# 下拉输入框组件

> 一种下拉输入组件，支持本地数据和网络数据，支持数据筛选。

## 安装

通过在 head 里面引入 js 文件来进行组件初始化。

```js
<script src="./data-list.js"></script>
```

## 使用

### 一、本地数据

> 直接在组件里设置填写 option 选项。

```html
  <data-list id="from-branch"  placeholder="下拉输入组件">
    <option value="1111">本地1111</option>
    <option value="2222">本地2222</option>
    <option value="3333">本地3333</option>
    <option value="4444">本地4444</option>
  </data-list>
```

### 二、异步数据

> 通过指定异步数据请求地址来进行异步数据加载。目前只支持 GET 请求。
> 
> 请求返回的数据为数据格式为: [{value: '值', title: '名称'}，...]; 其中 title 作为显示名称, value 作为返回值。

```html
  <data-list id="from-branch" src="https://xxxx" placeholder="下拉输入组件">
  </data-list>
```

## API

### 一、placeholder

同 input 的 placeholder。

### 二、src

需要异步加载数据时指定。