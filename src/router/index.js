import Vue from "vue";
import VueRouter from "vue-router";
//import Home from "@/views/home/Home";
import Manage from "@/views/dataset/Manage";
import TransferAnalyzeData from "@/views/dataset/TransferAnalyzeData";
import Visualize from "@/views/status/Visualize";
import Statistic from "@/views/status/Statistic";
import MissingValue from "@/views/preprocessing/MissingValue";
//import Noise from "@/views/preprocessing/Noise";
import Column from "@/views/preprocessing/Column";
import ModelTrain from "@/views/datatrain/ModelTrain";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "root",
        component: Manage,
    },
    {
        path: "/home",
        name: "home",
        component: Manage,
    },
    {
        path: "/dataset/manage",
        name: "manage",
        component: Manage,
    },
    {
        path: "/dataset/TransferAnalyzeData",
        name: "TransferAnalyzeData",
        component: TransferAnalyzeData,
    },
    {
        path: "/status/visualize",
        name: "visualize",
        component: Visualize,
    },
    {
        path: "/status/statistic",
        name: "statistic",
        component: Statistic,
    },
    {
        path: "/preprocessing/missing-value",
        name: "missing-value",
        component: MissingValue,
    },
    /*{
        path: "/preprocessing/noise",
        name: "noise",
        component: Noise,
    },*/
    {
        path: "/preprocessing/column",
        name: "column-engineering",
        component: Column,
    },
    {
        path: "/datatrain/model-train",
        name: "model-train",
        component: ModelTrain,
    },
];
const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;