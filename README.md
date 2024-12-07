

> ## **git里面是我们自己把生成的的公钥配置到了git的服务器，之后通过私钥和公钥进行匹配，匹配成功就可以进行代码拉取。每一次我换不同的机器或者去出差，这样就可以保证依然可以使用git。**

# 配置用户名

git config --global user.name "VeteranBoLuo"

# 配置邮箱

git config --global user.email "1902013368@qq.com"

# 验证配置

git config --list



# windows生成SSH密钥

****ssh-keygen -t rsa -C "1902013368@qq.com"

# 查看公钥内容

cat ~/.ssh/id_rsa.pub

本地电脑公钥：xxx






ssh-keygen -t rsa -b 4096 -C "1902013368@qq.com" 生成服务器密钥

Enter file in which to save the key (/root/.ssh/id_rsa)

github-token：xxx

//输入下面语句打开公钥代码
cat /root/.ssh/id_rsa.pub



服务器公钥：xxx
SERVER_ADDRESS 139.9.83.16
SERVER_USER root
SSH_PEM_KEY 

服务器私钥：xxx

git config --global https.proxy 127.0.0.1:**1**2335
git config --global http.proxy 127.0.0.1:12335






最关键的是需要在一定要先在本地电脑上生成密钥而不是服务器上，将生成的公钥放入服务器的.ssh/authorized_kes中，然后在gthub对应项目的secerts中新建一个secret，名子最好为KEY，值为生成的私钥
