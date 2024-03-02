async function answerQuestion() {
    const paragraph = "A computer is a machine that can be programmed to automatically carry out sequences of arithmetic or logical operations (computation). Modern digital electronic computers can perform generic sets of operations known as programs. These programs enable computers to perform a wide range of tasks. The term computer system may refer to a nominally complete computer that includes the hardware, operating system, software, and peripheral equipment needed and used for full operation; or to a group of computers that are linked and function together, such as a computer network or computer cluster.";
    const question = "What is computer."

    // Load the pre-trained BERT model and tokenizer
    const model = await transformers.QuestionAnswering.fromPretrained('bert-large-uncased-whole-word-masking-finetuned-squad');
    const tokenizer = await transformers.BertTokenizer.fromPretrained('bert-large-uncased-whole-word-masking-finetuned-squad');

    // Tokenize input
    const inputs = await tokenizer.encodePlus(question, paragraph, { return_tensors: 'tf' });

    // Get the start and end logits for the answer
    const outputs = await model(inputs);
    const startLogits = outputs.start_logits.arraySync();
    const endLogits = outputs.end_logits.arraySync();

    // Find the tokens with the highest start and end logits
    const startIndex = tf.tensor(startLogits[0]).argMax().arraySync();
    const endIndex = tf.tensor(endLogits[0]).argMax().arraySync();
    const answerTokens = inputs['input_ids'].slice(startIndex, endIndex + 1).arraySync();

    // Decode answer tokens
    const answer = await tokenizer.decode(answerTokens);

    // Display the answer
    console.log(answer);
}

answerQuestion();
