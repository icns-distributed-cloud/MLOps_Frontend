const model_info = [
    {
        "model_name": "LSTM",
        "parameter_json":[
            {
                "param_name" : "epochs",
                "val" : 10,
                "description" : "Number of iterations"
            },
            {
                "param_name" : "flag",
                "val" : "ms",
                "description" : "???"
            },
            {
                "param_name" : "type",
                "val" : "train",
                "description" : "train or test"
            },
            {
                "param_name" : "input_size",
                "val" : 7,
                "description" : "Input data size"
            },
            {
                "param_name" : "seq_len",
                "val" : 24,
                "description" : "Window size per one sequence"
            },
            {
                "param_name" : "output_size",
                "val" : 1,
                "description" : "Prediction output size"
            },
            {
                "param_name" : "hidden_size",
                "val" : 64,
                "description" : "The size of hidden layer in LSTM"
            },
            {
                "param_name" : "num_layer",
                "val" : 1,
                "description" : "Number of Layer"
            },
            {
                "param_name" : "lr",
                "val" : 0.05,
                "description" : "Learning Rate"
            },
            {
                "param_name" : "batch_size",
                "val" : 30,
                "description" : "Size of datasets per one training"
            },
            {
                "param_name" : "loss",
                "val" : "MSE",
                "description" : "The algorithm of calculate accuracy"
            },
            {
                "param_name" : "optimizer",
                "val" : "Adam",
                "description" : "The optimizer"
            },
            {
                "param_name" : "weight_decay",
                "val" : 1e-4,
                "description" : "Weight"
            },
            {
                "param_name" : "bidirectional",
                "val" : false,
                "description" : "Mono or Bidirectional"
            },
            {
                "param_name" : "step_size",
                "val" : 10,
                "description" : "Step Size"
            },
            {
                "param_name" : "gamma",
                "val" : 0.1,
                "description" : "Gamma"
            }
        ]
    },
    
];

export default model_info;
