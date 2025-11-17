const number = 7;

//Variant 1
let i = 1;
while(i <= 10){
    console.log( number + ' x ' + i + ' = ' + number*i);
    i++;
}

//Variant 2
let j = 1;
while(true){
    if(j > 10) break;
    console.log( number + ' x ' + j + ' = ' + number*j);
    j++;
}