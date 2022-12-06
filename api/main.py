from fastapi import FastAPI
import json
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# origins에는 protocal, domain, port만 등록한다.
origins = [
    # "http://192.168.0.13:3000", # url을 등록해도 되고
    "*" # private 영역에서 사용한다면 *로 모든 접근을 허용할 수 있다.
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, # cookie 포함 여부를 설정한다. 기본은 False
    allow_methods=["*"],    # 허용할 method를 설정할 수 있으며, 기본값은 'GET'이다.
    allow_headers=["*"],	# 허용할 http header 목록을 설정할 수 있으며 Content-Type, Accept, Accept-Language, Content-Language은 항상 허용된다.
)

@app.get("/training-api/modelinfo")
async def get_model_info():
    model_data = []
    with open("/root/MLOps_Frontend/api/Model_Templates/LSTM.json", "r") as model_json:
        model_data.append(json.load(model_json))
    return {"message":"get_model_info returns responses.", "data":model_data, "code":200}

@app.post("/training-api/runmodel")
async def Generate_Model_Container(item:dict):
    '''
    PATH = os.path.join(os.environ["PWD"], item['datasetId'])
    CONFIG_PATH = os.path.join(PATH, item['model_name'])+".json"
    if os.path.isdir(CONFIG_PATH):
        return {"message":"Model Already Exist!", "data":"", "code":400}
    else:
        os.makedirs(PATH, exist_os=True)
        with open(CONFIG_PATH, 'w') as outfile:
            json.dump(item, outfile)
        return {"message":"Model created", "data":CONFIG_PATH, "code":200}
    '''
    with open("/root/test.json", "w") as outfile:
        json.dump(item, outfile)
    with open("/root/test2.txt", "w") as outfile:
        outfile.write(" ".join(list(item.items())))
    return {"message":"TEST", "data":"", "code":200}

    
