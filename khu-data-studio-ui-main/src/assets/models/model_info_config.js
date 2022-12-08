const model_info = [
    {
        "preDatasetId" : 0,
        "userId" : 1,
        "name" : "LSTM 1호",
        "model_name": "LSTM",
        "isPublic" : false,
        "isUseGPU" : false,
        "parameter_json":[
            {
                "param_name" : "Epochs",
                "val" : 10,
                "description" : "Number of iterations"
            },
            {
                "param_name" : "Flag",
                "val" : "ms",
                "description" : "???"
            },
            {
                "param_name" : "Type",
                "val" : "train",
                "description" : "train or test"
            },
            {
                "param_name" : "Input Size",
                "val" : 7,
                "description" : "Input data size"
            },
            {
                "param_name" : "Sequence Length",
                "val" : 24,
                "description" : "Window size per one sequence"
            },
            {
                "param_name" : "Output Size",
                "val" : 1,
                "description" : "Prediction output size"
            },
            {
                "param_name" : "Hidden Size",
                "val" : 64,
                "description" : "The size of hidden layer in LSTM"
            },
            {
                "param_name" : "Number of Layer",
                "val" : 1,
                "description" : "Number of Layer"
            },
            {
                "param_name" : "LR",
                "val" : 0.05,
                "description" : "Learning Rate"
            },
            {
                "param_name" : "batch Size",
                "val" : 30,
                "description" : "Size of datasets per one training"
            },
            {
                "param_name" : "Loss",
                "val" : "MSE",
                "description" : "The algorithm of calculate accuracy"
            },
            {
                "param_name" : "Optimizer",
                "val" : "Adam",
                "description" : "The optimizer"
            },
            {
                "param_name" : "Weight Decay",
                "val" : 1e-4,
                "description" : "Weight"
            },
            {
                "param_name" : "Bidirectional",
                "val" : false,
                "description" : "Mono or Bidirectional"
            },
            {
                "param_name" : "Step Size",
                "val" : 10,
                "description" : "Step Size"
            },
            {
                "param_name" : "Gamma",
                "val" : 0.1,
                "description" : "Gamma"
            }
        ]
    },
    
];

export default model_info;