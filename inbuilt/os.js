let os = require('os')
console.log(os.platform()) //darwin
console.log(os.arch()) //x64
console.log(os.cpus().length+" core") // 4 core
console.log(os.freemem()) //20193280 bytes
console.log(os.uptime()) //1266518 sec
