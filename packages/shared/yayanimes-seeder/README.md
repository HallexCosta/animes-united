## Animes Seeder

This repository is a automate to scrapping animes datas to feed database.

### Env

```env
# Database URL that will be feed
DB_URL=mongodb+srv://hallex:hallex123@animes-united-cluster.likzk.mongodb.net/animes-united?retryWrites=true&w=majority
````

### How to use?

```sh
# flag "--save" or "-s" to local save empty animes data
$ yarn seeder:local -s datas
```

### IMPORTANT

The command `yarn build` bring the error.

![image](https://user-images.githubusercontent.com/55293671/179863681-8ad5bce4-c38e-401a-a0d0-6a41df6313fd.png)

