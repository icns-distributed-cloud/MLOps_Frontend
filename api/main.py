from fastapi import FastAPI, Request, HTTPException
import json
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# origins에는 protocal, domain, port만 등록한다.
origins = [
    # "http://192.168.0.13:3000", # url을 등록해도 되고
    "http://163.180.117.38:8081" # private 영역에서 사용한다면 *로 모든 접근을 허용할 수 있다.
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
async def Generate_Model_Container(request:Request):
    req = await request.json()

    PATH = os.path.join(os.environ["PWD"], "Model_Templates", req['name'])
    CONFIG_PATH = os.path.join(PATH, 'config.json')
    if os.path.isdir(CONFIG_PATH):
        return {"message":"Model Already Exist!", "data":"", "code":400}
    else:
        os.makedirs(PATH, exist_ok=True)
        with open(CONFIG_PATH, 'w') as outfile:
            json.dump(req, outfile)
        return {"message":"Model created", "data":CONFIG_PATH, "code":200}

    return {"message":"TEST", "data":"", "code":200}

    
