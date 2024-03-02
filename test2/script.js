
let value = "what is computer"

let data = [{
    questions:["weather today"],
    responses:["Its good!!","Its sunny","Its raining"]
},{
    questions:["Who are you","what are you called"],
    responses:["I am a bot named tim \(> <)/","I am tim the bot"]
},{
    questions:["hi", "hey", "hello"],
    responses:["Hello!", "Hi!", "Hey!", "Hi there!"]  
},{
    questions:["sure", "yes", "no"],
    responses:["Okay"]
},{
    questions:["are you genious", "are you nerd", "are you intelligent"],
    responses:["Yes I am! "]
},{
    questions:["i hate you", "i dont like you"],
    responses:["I'm sorry about that. But I like you dude."]
},{
    questions:["how are you", "how is life", "how are things", "how are you doing"],
    responses: [
        "Fine... how are you?",
        "Pretty well, how are you?",
        "Fantastic, how are you?"
      ]
},{
    questions:["who are you", "are you human", "are you bot", "are you human or bot"],
    responses:["I am nameless", "I don't have a name"]
},{
    questions:[
        "your name please",
        "your name",
        "may i know your name",
        "what is your name",
        "what call yourself"
      ],
    responses:["I am nameless", "I don't have a name"]
},{
    questions:["happy", "good", "fun", "wonderful", "fantastic", "cool", "very good"],
    responses: ["Have you ever felt bad?", "Glad to hear it"]
},{
    questions:["what", "why", "how", "where", "when"],
    responses:["I am just a bot", "I am a bot. What are you?"]
},{
    questions:["i dont know"],
    responses:["Say something interesting"]
},{
    questions: ["im tired"],
    responses: ["Take some rest, Dude!"]
}]





let valueArr = value.split(" ")
let match;
let answer = [];
data.forEach((xyz)=>{
    //    console.log(xyz);
             xyz.questions.forEach((aaa)=>{
               match = 0;
               valueArr.forEach((nnn)=>{               
              if(aaa.split(" ").includes(nnn.toLowerCase()))
             { 
                match+=100/valueArr.length      
             }
            })
            if(match>=70){
                answer.push((xyz.responses[Math.floor(Math.random()*(xyz.responses.length-0.1))]))
             }
        })

})
if(answer.length>0)
{
    console.log(answer[0]);
}
else{
    
    const net = new brain.recurrent.LSTM();

let para = "A computer is a machine that can be programmed to automatically carry out sequences of arithmetic or logical operations (computation). Modern digital electronic computers can perform generic sets of operations known as programs. These programs enable computers to perform a wide range of tasks. The term computer system may refer to a nominally complete computer that includes the hardware, operating system, software, and peripheral equipment needed and used for full operation; or to a group of computers that are linked and function together, such as a computer network or computer cluster.";

// Split the paragraph into sentences using a period (.) 
let sentences = para.split('.');
let trainingData =  [
    { input: "They do not!", output: "They do to!" },
    { input: "I hope so.", output: "She okay?" },
    { input: "Let's go.", output: "Wow" },
    { input: "Okay", output: "No" },
    { input: "What is computer", output: "It is a machine" }
  ];
  

    sentences.forEach(sentence => {
    trainingData.push({
        input: sentence.trim(),
        output: sentence.trim()
    });
});

net.train(trainingData, {
    iterations: 100,
    log: true,
    errorThresh: 0.01
});

let question = "Lets go";
let output = net.run(question);

console.log(output);

}



