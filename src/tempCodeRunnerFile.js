function solution(fullname){
    var str=fullname.split('-');
    var answer='';
    console.log(str)
    str.forEach((el)=>{
        console.log(el,el[0])
        answer+=el[0];
    })
    console.log(answer)
    return answer;
}