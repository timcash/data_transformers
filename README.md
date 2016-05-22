### Declarative Workshop

This workshop is designed to help understand the differences between programming in an imperative and declarative style

Inside the imperative style functions please try to use explicit for loops like

```
for(let i = 0: i < data.length; i++) {

}
```
For the Declarative style functions we will use a library called Ramda. Docs can be found here
```
http://ramdajs.com/0.21.0/docs/
```

### Setup instructions
Make sure you have nvm installed
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash
```
install the right version of node
```
nvm install v6.2.0
```
Install the project
```
git clone git@github.com:timcash/declarative_workshop.git
cd declarative_workshop
nvm use
npm install
npm test
```
