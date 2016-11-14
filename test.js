function a(){
  console.log('a');
}
function b(){
  console.log('b');
}

function c(dieukien, f1, f2){
  if(dieukien){
    f1();
  }else {
    f2();
  }
}

//Cach 1
//c(true, a, b);

//Cach 2
// c(false,
//   function(){
//     console.log('f1');
//   },
//   function(){
//     console.log('f2');
//   }
// );

function d(soa, sob, isAdd, f1, f2){
  if(isAdd){
    f1(soa, sob);
  }else{
    f2(soa, sob);
  }
}

d(1, 2, true, func1, func2);

function func1(a, b){
  console.log(`a + b = ${a + b}`);
  console.log('Thuc hien phep cong');
}
function func2(a, b){
  console.log(`a - b = ${a - b}`);
  console.log('Thuc hien phep tru');
}
