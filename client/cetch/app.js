import input from "analiza-sync"

let myUrl = "http://localhost:3000"

async function get(name){
    try {
    const res = await fetch(`${myUrl}/greet?name=${name}`);
    const data = await res.json();
    console.log(data)
    } catch (error){
        console.log(error);
    }
}

async function post(){
    try {
        const res = await fetch(`${myUrl}/math/average`,{
            method: "POST",
            body: JSON.stringify({"numbers": [20,30,40,50]}),
            headers: {"Content-Type": "application/json"}
        })
        const data = await res.json();
        console.log(data);
    } catch (error){
        console.log(error);
    }
}

async function put(word){
    try{
        const res = await fetch(`${myUrl}/shout/${word}`,{
            method: "PUT",
            body: JSON.stringify({word: word})
        })
        const data = await res.json();
        console.log(data);
    } catch (error){
        console.log(error);
    }
}

async function deleteSome(role){
    try{
        const res = await fetch(`${myUrl}/secure/resource`,{
            method: "DELETE",
            headers: {"x-role": role}
        })
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

console.log("1: Get");
console.log("2: Post");
console.log("3: put");
console.log("4: delete");
console.log("5: Call each server endpoint one after the other (in sequence)");
console.log("6: Call all server endpoints in parallel");
console.log("0: exit");
let userInput = input("please choose whitch action do you want to make: ");
switch (userInput){
    case "1":
        let name = input("please write your name: ");
        get(name);
        break;
    case "2":
        post();
        break;
    case "3":
        let word = input("please write a word: ");
        put(word);
        break;
    case "4":
        let role = input("please write your role: ");
        deleteSome(role);
        break;
    case "5":
        let name2 = input("please write your name: ");
        await get(name2)
        await post()
        let word2 = input("please write a word: ");
        await put(word2)
        let role2 = input("please write your role: ");
        await deleteSome(role2)
        console.log("all execution are finish");
        break
    case "6":
        await Promise.all([get("moti"), post(), put("hello"), deleteSome("admin")])
        console.log("all execution are finish");
        break
    default:
        console.log("please enter good number");
        break;
};