# 更新框架代码

- 添加所依赖的框架的地址，这里upstream相当于vben项目的一个别名

  ```shell
  git remote add upstream https://github.com/vbenjs/vue-vben-admin.git
  ```

  不需要多次添加，可以通过以下命令查看

  ```shell
  git remote -v
  
  ======添加后输出为=====
  origin  https://github.com/smartladus/qa-admin.git (fetch)
  origin  https://github.com/smartladus/qa-admin.git (push)
  upstream        https://github.com/vbenjs/vue-vben-admin.git (fetch)
  upstream        https://github.com/vbenjs/vue-vben-admin.git (push)
  ```

- 拉最新更新的框架代码，这里相当于把vben项目pull到当前项目进行合并，注意需要`allow-unrelated-histories`参数

  ```shell
  git pull upstream main --allow-unrelated-histories
  ```

- 此时可能会出现文件冲突，用Github Desktop处理即可



# Vue Grid Layout

- Vue Grid Layout 不支持Vue3，通过以下版本安装

  ```shell
  yarn add vue-grid-layout@3.0.0-beta1
  ```

  
