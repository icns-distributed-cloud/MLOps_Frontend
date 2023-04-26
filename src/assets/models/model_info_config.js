const model_info = [
    {
        "model_name": "LSTM",
        "parameter_json":[
            {
                "param_name" : "epochs",
                "val" : 50,
                "val_type" : "int",
                "description" : "Number of iterations"
            },
            {
                "param_name" : "flag",
                "val" : "mm",
                "val_type" : "string",
                "description" : "MultiStep-mm, SingleStep-ms"
            },
            {
                "param_name" : "type",
                "val" : "train",
                "val_type" : "string",
                "description" : "train or test"
            },
            {
                "param_name" : "seq_len",
                "val" : 24,
                "val_type" : "int",
                "description" : "Window size per one sequence"
            },
            {
                "param_name" : "hidden_size",
                "val" : 64,
                "val_type" : "int",
                "description" : "The size of hidden layer in LSTM"
            },
            {
                "param_name" : "num_layer",
                "val" : 1,
                "val_type" : "int",
                "description" : "Number of Layer"
            },
            {
                "param_name" : "lr",
                "val" : 0.005,
                "val_type" : "float",
                "description" : "Learning Rate"
            },
            {
                "param_name" : "batch_size",
                "val" : 30,
                "val_type" : "int",
                "description" : "Size of datasets per one training"
            },
            {
                "param_name" : "loss",
                "val" : "MSE",
                "val_type" : "string",
                "description" : "The algorithm of calculate accuracy"
            },
            {
                "param_name" : "optimizer",
                "val" : "Adam",
                "val_type" : "string",
                "description" : "The optimizer"
            },
            {
                "param_name" : "weight_decay",
                "val" : 1e-4,
                "val_type" : "float",
                "description" : "Weight"
            },
            {
                "param_name" : "bidirectional",
                "val" : false,
                "val_type" : "bool",
                "description" : "Mono or Bidirectional"
            },
            {
                "param_name" : "step_size",
                "val" : 10,
                "val_type" : "int",
                "description" : "Step Size"
            },
            {
                "param_name" : "gamma",
                "val" : 0.1,
                "val_type" : "float",
                "description" : "Gamma"
            }
        ]
    }//,
    /*
    {
        "model_name": "CNN",
        "parameter_json":[
            {
                "param_name" : "epochs",
                "val" : 10,
                "description" : "The number of iterations"
            },
            {
                "param_name" : "type",
                "val" : "train",
                "description" : "Train or test"
            },
            {
                "param_name" : "input_image_width",
                "val" : 128,
                "description" : "The width of input image"
            },
            {
                "param_name" : "input_image_height",
                "val" : 128,
                "description" : "The height of input image"
            },
            {
                "param_name" : "number_of_class",
                "val" : 1,
                "description" : "The number of class at prediction output"
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
                "description" : "Learning Rate (0 ~ 1)"
            },
            {
                "param_name" : "batch_size",
                "val" : 30,
                "description" : "Size of datasets per one training [32 ~ 512]"
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
                "description" : "Regularization"
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
    {
        "model_name": "YOLOv7",
        "parameter_json":[
            {
                "param_name" : "weight",
                "val" :  "yolo7.pt",
                "description" : "The pre-trained weight. defualt='yolo7.pt'"
            },
            {
                "param_name" : "cfg",
                "val" :  "yolo7.yaml",
                "description" : "The pre-set config file. defualt='yolo7.yaml'"
            },
            {
                "param_name" : "epochs",
                "val" : 10,
                "description" : "The number of iterations"
            },
            {
                "param_name" : "type",
                "val" : "train",
                "description" : "Train or test"
            },
            {
                "param_name" : "input_image_size",
                "val" : 128,
                "description" : "The size of input image, It must be square."
            },
            {
                "param_name" : "multi_scale",
                "val" : true,
                "description" : "Check the box when process vary input image +/- 50%"
            },
            {
                "param_name" : "single_cls",
                "val" : true,
                "description" : "Check the box when train multi-class data as single-class"
            },
            {
                "param_name" : "lr",
                "val" : 0.05,
                "description" : "Learning Rate (1, 1e-5, 1e-1)"
            },
            {
                "param_name" : "momentum",
                "val" : 0.05,
                "description" : "SGD momentum/Adam beta1 (0.3, 0.6, 0.98)"
            },
            
            {
                "param_name" : "batch_size",
                "val" : 30,
                "description" : "Size of datasets per one training [32 ~ 512]"
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
                "description" : "Regularization (1, 0.0, 0.001)"
            },
        ]
    },
    {
        "model_name": "HAT",
        "parameter_json":[
            {
                "param_name" : "epochs",
                "val" : 10,
                "description" : "The number of iterations"
            },
            {
                "param_name" : "type",
                "val" : "train",
                "description" : "Train or test"
            },
            {
                "param_name" : "gt_image_size",
                "val" : 512,
                "description" : "The size of ground truth image"
            },
            {
                "param_name" : "lq_image_size",
                "val" : 16,
                "description" : "The size of low quality image"
            },
            {
                "param_name" : "upscale",
                "val" : 4,
                "description" : "The upscale ratio of outputs"
            },
            {
                "param_name" : "window_size",
                "val" : 16,
                "description" : "The window size"
            },
            {
                "param_name" : "squeeze_factor",
                "val" : 16,
                "description" : "The squeeze factor"
            },
            {
                "param_name" : "compress_ratio",
                "val" : 3,
                "description" : "The compress ratio"
            },
            {
                "param_name" : "conv_scale",
                "val" : 0.01,
                "description" : "The conv scale"
            },
            {
                "param_name" : "overlap_ratio",
                "val" : 0.5,
                "description" : "The overlap ratio"
            },
            {
                "param_name" : "lr",
                "val" : 0.05,
                "description" : "Learning Rate (1, 1e-5, 1e-1)"
            },
            {
                "param_name" : "batch_size",
                "val" : 30,
                "description" : "Size of datasets per one training [32 ~ 512]"
            },
            {
                "param_name" : "optimizer",
                "val" : "Adam",
                "description" : "The optimizer"
            },
            {
                "param_name" : "weight_decay",
                "val" : 0,
                "description" : "Regularization (1, 0.0, 0.001)"
            },
            {
                "param_name" : "gamma",
                "val" : 0.1,
                "description" : "Focal loss gamma (0, 0.0, 2.0)"
            }
        ]
    },
    */
];

export default model_info;
