# khu-data-studio-ui
## Run Project
```
git clone -b hyeonki https://github.com/icns-distributed-cloud/MLOps_Frontend.git
cd MLOps_Frontend

apt update
apt upgrade -y
apt install npm -y
npm install
npm run serve
```

# Set Server IP Address
## MLOps_Frontend/src/main.js
Backend connect
```
line 17
axios.defaults.baseURL = "http://[Backend IP Address]:[portnum]";
```

# Set Base URL
## MLOps_Frontend/src/store/index.js
line 11~14
```
state: {
    userId: 0,
    baseURL: "Put base URL"  //example: "http://data.icnslab.net"
  },
```
## MLOps_Frontend/src/components/preprocessing/Column-engineering/CorrMethodSelectModal.vue
//Set Model Info URL
```
line 129~135
  mounted(){
    // 모델정보 읽어올 URL부분 수정
    this.BASEURL= this.$store.state.baseURL + "/outputs/" + String(this.model_info.trainId);
    //this.BASEURL= this.$store.state.baseURL + "/outputs/" + String(1);
    this.FIG1URL= this.BASEURL+"/fig1.png";
    this.FIG2URL= this.BASEURL+"/fig2.png";
    this.LOGURL= this.BASEURL+"/process.log";
```
## MLOps_Frontend/src/components/datatrain/ModelModal.vue

//Set Corelation Figure URL
```
line 63~71
mounted(){
    // 상관계수 이미지 주소 변경할 부분
    this.BASEURL= this.$store.state.baseURL +'/'+ this.dataset.miniDatasetPath.slice(0, -4);
    this.Pearson_heatmap= this.BASEURL+"_Pearson_heatmap.png";
    this.Spearman_heatmap= this.BASEURL+"_Spearman_heatmap.png";
    this.Kendall_heatmap= this.BASEURL+"_Kendall_heatmap.png";

    console.log(this.Pearson_heatmap);
  },
```

# Call DrawDatasetTables
## MLOps_Frontend/src/components/common/DatasetDrawTable.vue
Get table
```
line 77~84
drawTable(){
      this.path = this.$store.state.baseURL +'/'+ this.path;
      console.log(this.path);
      fetch(this.path)
        .then((res) => {
          this.EditTable(res);
        });
    },
```
## MLOps_Frontend/src/components/preprocessing/Column-engineering/DemoDatasetDrawTable.vue
Get table
```
line 77~88
    drawTable(){
      if (this.path == null){
        alert("데이터를 찾을 수 없습니다.");  
      }
      else{
        this.path = this.$store.state.baseURL +'/'+ this.path;
        fetch(this.path)
        .then((res) => {
          this.EditTable(res);
        });
      }
    },
```

## Add
### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
