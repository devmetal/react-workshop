# How to try?

## Clone this repository

```bash
git clone git@github.com:devmetal/react-workshop.git
```

## Dependencies

### Redis

The backend use it for the job and the message queue. You have to install or config a redis connection. I suggest to install it.

Here is the offical redis instructions for current stable version for linux:

```bash
$ wget http://download.redis.io/releases/redis-3.2.8.tar.gz
$ tar xzf redis-3.2.8.tar.gz
$ cd redis-3.2.8
$ make
```

Other platforms: [Redis Download Page](https://redis.io/download)

### Node

Its important to install minimum the current LTS of nodejs.

### For modules

For each modules, the dependencies are npm packages. So you have to install in all module.
I suggest use yarn. Because its faster and its so hyped! :D

## Run the full example

Sadly i not included any runner or automated solution for this.
So you have to start each significant module.

1. Start redis
2. Start the worker module with npm start commnand in worker folder
3. Start the server module with npm start command in server folder
4. Start the client moduel with npm start command in client folder

The last command will start server in development mode
