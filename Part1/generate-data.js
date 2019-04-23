const fs = require('fs')
const MAXTUPLES = process.env.MAXTUPLES
const file = './' + process.env.FILENAME + '.csv'
let generator, prime

if(MAXTUPLES <= 1000) {
    generator = 279
    prime = 1009
} else if(MAXTUPLES <= 10000) {
    generator = 2969
    prime = 10007
} else if(MAXTUPLES <= 100000) {
    generator = 21395
    prime = 100003
} else if(MAXTUPLES <= 1000000) {
    generator = 2107
    prime = 1000003
} else if(MAXTUPLES <= 10000000) {
    generator = 211
    prime = 10000019
} else if(MAXTUPLES <= 100000000) {
    generator = 21
    prime = 100000007
} else {
    console.log("Specified MAXTUPLES is too high\n")
    return
}

convert = function(unique) {
    let tmp=['', '', '', '', '', '', ''], result=['', '', '', '', '', '', '']
    let i=0, rem=0
    let char = 'A'

    for(i=0; i<7; i++) {
        result[i]='A'
    }
    i=6
    while(unique > 0) {
        rem = Math.floor(unique % 26)
        tmp[i] = String.fromCharCode(char.charCodeAt(0) + rem)
        unique = Math.floor(unique / 26)
        i--
    }
    for(i=i+1; i<=6; i++) {
        result[i] = tmp[i]
    }

    resultString = ""
    result.forEach(el => {
        resultString = resultString.concat(el)
    })

    return resultString
}

rand = function(seed, limit) {
    do { 
        seed = Math.floor((generator * seed) % prime) 
    } while (seed > limit)

    return seed;
}

fs.openSync(file, 'w')
fs.appendFileSync(file, 'unique1,unique2,two,four,ten,twenty,onePercent,tenPercent,twentyPercent,fiftyPercent,unique3,evenOnePercent,oddOnePercent,stringu1,stringu2,string4\n')
let seed = generator
for(i = 0; i < MAXTUPLES; i++) {
    let arr = []
    seed = rand(seed, MAXTUPLES)
    let unique1 = seed - 1
    //let unique1 = Math.floor(Math.random() * Math.floor(MAXTUPLES))
    arr.push(unique1)
    arr.push(i)
    arr.push(Math.floor(unique1 % 2))
    arr.push(Math.floor(unique1 % 4))
    arr.push(Math.floor(unique1 % 10))
    arr.push(Math.floor(unique1 % 20))
    let onePercent = Math.floor(unique1 % 100)
    arr.push(onePercent)
    arr.push(Math.floor(unique1 % 10))
    arr.push(Math.floor(unique1 % 5))
    arr.push(Math.floor(unique1 % 2))
    arr.push(Math.floor(unique1))
    arr.push(Math.floor(onePercent * 2))
    arr.push(Math.floor((onePercent * 2) + 1))

    arr.push(convert(unique1).concat("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"))
    arr.push(convert(i).concat("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"))
    let fourChar, cycle = i % 4
    if(cycle === 0) {
        fourChar = 'AAAA'
    } else if(cycle === 1) {
        fourChar = 'HHHH'
    } else if(cycle === 2) {
        fourChar = 'OOOO'
    } else if(cycle === 3) {
        fourChar = 'VVVV'
    }
    arr.push(fourChar.concat("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"))
    let tuple = ""
    arr.forEach(val => {
        tuple = tuple.concat(val.toString().concat(','))
    })
    
    tuple = tuple.substring(0, tuple.length - 1).concat('\n')
    
    fs.appendFileSync(file, tuple)
}