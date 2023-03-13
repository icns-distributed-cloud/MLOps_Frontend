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

# Server Connection
## MLOps_Frontend/src/main.js
Backend connect
```
line 17
axios.defaults.baseURL = "http://[Backend IP Address]:[portnum]";
```
## MLOps_Frontend/src/components/common/DatasetDrawTable.vue
Get table
```
line 77~91
drawTable(){
            console.log(this.path);

            if (this.path == null){
              this.path = "http://data.icnslab.net/datasets/mini/catfish_with_na.csv"  
            }
            else{
              this.path = this.$store.state.baseURL +'/'+ this.path;
            }

            fetch(this.path)
              .then((res) => {
                this.EditTable(res);
              });
}, 
```
## MLOps_Frontend/src/components/preprocessing/Column-engineering/DemoDatasetDrawTable.vue
Get table
```
line 77~89
drawTable(){
      if (this.path == null){
        this.path = "http://data.icnslab.net/datasets/mini/catfish_with_na.csv"  
      }
      else{
        this.path = this.$store.state.baseURL +'/'+ this.path;
      }
      
      fetch(this.path)
        .then((res) => {
          this.EditTable(res);
        });
    },
```
## MLOps_Frontend/src/components/common/DatasetDrawTable.vue
Get model training log
```
line 114~120
ReadLog(){
      var url = "http://data.icnslab.net/outputs/1/process.log";
      fetch(url)
        .then((res) => {
          this.Update_Process_Info(res);
        });
    },
```
## MLOps_Frontend/src/components/common/DatasetDrawTable.vue
Get model training log
```
line 114~120
ReadLog(){
      var url = "http://data.icnslab.net/outputs/1/process.log";
      fetch(url)
        .then((res) => {
          this.Update_Process_Info(res);
        });
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
