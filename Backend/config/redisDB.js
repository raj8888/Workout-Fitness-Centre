const redis = require("redis")

const client = redis.createClient({
    password: 'G3yqXaSVEmTlLBlKvo7j5owvLo8Kxoqa',
    socket: {
        host: 'redis-14741.c241.us-east-1-4.ec2.cloud.redislabs.com',
        port: 14741
    }
});

client.connect();

client.on("error", (error) => {
  console.log(error.message);
});
client.on("connect", () => {
  console.log("Connected to the redis cloud");
});
module.exports={client}